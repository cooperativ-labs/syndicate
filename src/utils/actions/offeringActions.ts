'use server';

import { ContractOrder } from '@src/components/investor/tradingForms/offering-actions-types';
import { String0x } from '@src/web3/helpersChain';
import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import {
  Document,
  OfferingFull,
  OfferingParticipant,
  RevalidationPath,
  WhitelistTransactionType
} from '@/types';

import { getOrderArrayFromContract } from '../helpersOrder';
import { getLowestOrderPrice } from '../helpersOrder';

import { getOfferingSmartContractSet } from './cryptoActions';
import { retrieveOrders } from './orderActions';
import { getPublicUrl } from './storageActions';

type AddOfferingParams = {
  offeringEntityId: string;
  name: string;
  organizationId: string;
};

type AddOfferingResult = {
  affectedCount: number;
  records: { id: number }[];
};

export async function addOffering({
  offeringEntityId,
  name,
  organizationId
}: AddOfferingParams): Promise<AddOfferingResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('offering')
    .insert(
      {
        offering_entity_id: Number(offeringEntityId),
        name: name
      },
      { count: 'exact' }
    )
    .select('id');

  if (error) {
    throw error;
  }

  revalidatePath(`/manager/${organizationId}`, 'page');

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as { id: number }[]
  };
}

export async function getOfferingById(offeringId: string): Promise<OfferingFull> {
  const supabase = createClient();
  const [{ data: offeringRes, error }, smartContracts] = await Promise.all([
    supabase
      .from('offering')
      .select(
        [
          '*',
          'legalEntity:legal_entity(*, addresses:address(*), jurisdiction:jurisdiction(*))',
          'participants:offering_participant(*, jurisdiction:jurisdiction(*), investorApplication:investor_application(*, applicationDoc:document(*)),whitelistTransactions:whitelist_transaction(*))',
          'descriptions:offering_description_text(*)',
          'distributions:offering_distribution(*)'
        ].join(', ')
      )
      .eq('id', Number(offeringId))
      .single(),
    getOfferingSmartContractSet({ offeringId }) ?? null
  ]);

  const offering = offeringRes as unknown as OfferingFull;
  if (error) throw `getOfferingById: ${error.message}`;

  const [logoUrl, bannerImageUrl] = await Promise.all([
    getPublicUrl({
      bucket: 'offering-assets',
      path: offering.image,
      source: 'getOfferingById'
    }),
    getPublicUrl({
      bucket: 'offering-assets',
      path: offering.banner_image,
      source: 'getOfferingById'
    })
  ]);

  offering.image = logoUrl.data || null;
  offering.banner_image = bannerImageUrl.data || null;

  return { ...offering, offeringSmartContracts: smartContracts ?? null };
}

// Add legal share link (multiple operations)
export async function addLegalShareLink({
  documentOfferingUniqueId,
  offeringId,
  entityId,
  agreementText,
  smartContractId,
  agreementTitle
}: {
  documentOfferingUniqueId: string;
  offeringId: string;
  entityId: string;
  agreementText: string;
  smartContractId: string;
  agreementTitle: string;
  // signature: string;
}): Promise<void> {
  const supabase = createClient();

  // 1) Turn off waitlist
  const { error: updateOfferingError } = await supabase
    .from('offering')
    .update({ waitlist_on: false })
    .eq('id', Number(offeringId));
  if (updateOfferingError) throw updateOfferingError;

  // 2) Insert smart contract set
  const { error: scError } = await supabase.from('offering_smart_contract_set').insert({
    offering_id: Number(offeringId),
    share_contract_id: smartContractId
  });
  if (scError) throw scError;

  // 3) Insert document
  const { error: docError } = await supabase.from('document').insert({
    title: agreementTitle,
    text: agreementText,
    type: 'SHARE_LINK',
    format: 'MARKDOWN',
    owner_id: Number(entityId),
    offering_unique_id: documentOfferingUniqueId,
    offering_id: Number(offeringId),
    access: 'SIGNATORY'
  });
  if (docError) throw docError;

  // 4) Mark smart contract established
  const { error: updateScError } = await supabase
    .from('smart_contract')
    .update({ established: true })
    .eq('id', smartContractId);
  if (updateScError) throw updateScError;

  revalidatePath('/', 'page');
}

// export async function getOfferingParticipant({
//   walletAddress,
// }: {
//   walletAddress: string;
// }): Promise<OfferingParticipant | null> {
//   const supabase = createClient();
//   const { data, error } = await supabase
//     .from("offering_participant")
//     .select("id, name, offering(*)")
//     .eq("wallet_address", walletAddress).single();
//   if (error) throw error;
//   return data ?? null;
// }

export async function addOfferingParticipant({
  addressOfferingId,
  name,
  offeringId,
  walletAddress,
  chainId
}: {
  addressOfferingId: string;
  name?: string | null;
  offeringId: string;
  walletAddress: string;
  chainId: number;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from('offering_participant')
    .insert({
      address_offering_id: addressOfferingId,
      name: name ?? null,
      offering_id: Number(offeringId),
      wallet_address: walletAddress,
      chain_id: Number(chainId)
    })
    .select('id, name, offering_id');
  if (error) throw error;
  revalidatePath(`/manager/[organizationId]/offerings/${offeringId}`, 'page');
}

export async function addOfferingParticipantWithApplication({
  dateSigned,
  addressOfferingId,
  name,
  offeringId,
  offeringEntityId,
  offeringUniqueId,
  walletAddress,
  minPledge,
  maxPledge,
  applicationText,
  applicationTitle,
  signature,
  chainId
}: {
  dateSigned: string;
  addressOfferingId: string;
  name?: string | null;
  offeringId: string | number;
  offeringEntityId: string | number;
  offeringUniqueId: string;
  walletAddress: string;
  minPledge?: number | null;
  maxPledge?: number | null;
  applicationText: string;
  applicationTitle: string;
  signature: string;
  chainId: number;
}): Promise<void> {
  const supabase = createClient();

  const { data: participant, error: pErr } = await supabase
    .from('offering_participant')
    .insert(
      {
        address_offering_id: addressOfferingId,
        name: name ?? null,
        offering_id: Number(offeringId),
        wallet_address: walletAddress,
        min_pledge: minPledge ?? null,
        max_pledge: maxPledge ?? null,
        chain_id: chainId
      },
      { count: 'exact' }
    )
    .select('id')
    .single();
  if (pErr) throw pErr;
  if (!participant?.id) {
    throw new Error('Failed to create offering participant');
  }

  // Insert application with nested document (flattened as two steps)
  const { data: appDoc, error: docErr } = await supabase
    .from('document')
    .insert({
      text: applicationText,
      date: dateSigned || null,
      type: 'AGREEMENT',
      owner_id: Number(offeringEntityId),
      offering_unique_id: offeringUniqueId,
      title: applicationTitle
    })
    .select('id')
    .single();
  if (docErr) throw docErr;

  const { error: appErr } = await supabase.from('investor_application').insert({
    offering_participant_id: participant.id,
    application_doc_id: appDoc.id
  });
  if (appErr) throw appErr;

  // Insert document signatory
  const { error: sigErr } = await supabase.from('document_signatory').insert({
    document_id: appDoc.id,
    signature,
    date: dateSigned || null,
    archived: false,
    signer_address: walletAddress
  });
  if (sigErr) throw sigErr;

  revalidatePath('/', 'page');
}

export type UpsertWhitelistMemberParams = {
  offeringId: string | number;
  addressOfferingId: string;
  walletAddress: String0x;
  chainId: number;
  name?: string | null;
  externalId?: string | null;
  transactionHash?: string | null;
  type: typeof WhitelistTransactionType.ADD | typeof WhitelistTransactionType.REMOVE;
  revalidationPath: RevalidationPath | undefined;
};

export async function upsertWhitelistMember({
  offeringId,
  addressOfferingId,
  walletAddress,
  chainId,
  name,
  externalId,
  transactionHash,
  type,
  revalidationPath
}: UpsertWhitelistMemberParams): Promise<void> {
  const supabase = createClient();

  const { data: participant, error: pErr } = await supabase
    .from('offering_participant')
    .upsert(
      {
        address_offering_id: addressOfferingId,
        wallet_address: walletAddress,
        chain_id: chainId,
        name: name ?? null,
        offering_id: Number(offeringId),
        external_id: externalId ?? null
      },
      { onConflict: 'address_offering_id', ignoreDuplicates: true }
    )
    .select('id')
    .single();
  if (pErr) throw pErr;

  const { error: wErr } = await supabase.from('whitelist_transaction').insert({
    offering_participant_id: participant.id,
    transaction_hash: transactionHash ?? '',
    type
  });
  if (wErr) throw wErr;

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
}

export type UpdateWhitelistParams = {
  offeringParticipantId: string;
  transactionHash: string;
  type: typeof WhitelistTransactionType.ADD | typeof WhitelistTransactionType.REMOVE;
  revalidationPath: RevalidationPath | undefined;
};

export async function updateOfferingParticipant({
  id,
  name,
  externalId,
  jurCountry,
  jurProvince,
  jurisdictionId,
  revalidationPath
}: {
  id: string;
  name?: string | null;
  externalId?: string | null;
  jurCountry: string;
  jurProvince: string | null;
  jurisdictionId?: string | null;
  revalidationPath: RevalidationPath | undefined;
}): Promise<{
  affectedCount: number;
  records: {
    id: string;
    wallet_address: string;
    external_id: string | null;
    name: string | null;
    offering_id: string;
  }[];
}> {
  const supabase = createClient();
  let jurId = jurisdictionId ?? null;
  if (jurCountry && jurProvince) {
    const { data: jurisdictionData, error: jurisdictionError } = await supabase
      .from('jurisdiction')
      .upsert(
        {
          id: jurId ?? undefined,
          country: jurCountry,
          province: jurProvince ?? null
        },
        { onConflict: 'id' }
      )
      .select('id')
      .single();
    if (jurisdictionError) throw jurisdictionError;
    jurId = jurisdictionData?.id ?? null;
  }

  const { data, error, count } = await supabase
    .from('offering_participant')
    .update({
      name: name ?? null,
      external_id: externalId ?? null,
      jurisdiction_id: jurisdictionId ?? null
    })
    .eq('id', id)
    .select('id, wallet_address, external_id, name, offering_id');
  if (error) throw error;
  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
}

export async function removeWhitelistObject({ participantId }: { participantId: string }): Promise<{
  affectedCount: number;
  records: { id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering_participant')
    .delete()
    .eq('id', participantId)
    .select('id');
  if (error) throw error;
  revalidatePath('/', 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
}

export async function getCurrentOrdersAndPrice({
  offeringId,
  paymentTokenDecimals,
  priceStart
}: {
  offeringId: string;
  paymentTokenDecimals: number;
  priceStart: number;
}): Promise<{ currentPrice: number; contractSaleList: ContractOrder[] | [] }> {
  try {
    const smartContracts = await getOfferingSmartContractSet({
      offeringId: offeringId
    });
    const swapContractAddress = smartContracts?.swapContract?.cryptoAddress.address as String0x;
    const orders = await retrieveOrders(swapContractAddress);
    const contractSaleList =
      paymentTokenDecimals && orders && orders.length > 0
        ? await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals)
        : [];

    const currentPrice = contractSaleList ? getLowestOrderPrice(contractSaleList, priceStart) : 0;

    return { currentPrice, contractSaleList };
  } catch (error: any) {
    throw `getCurrentOrdersAndPrice: ${error.message}`;
  }
}

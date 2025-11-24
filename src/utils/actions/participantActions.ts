'use server';

import { String0x } from '@src/web3/helpersChain';
import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import { OfferingParticipant, RevalidationPath, WhitelistTransactionType } from '@/types';

export async function getOfferingParticipant({
  walletAddress
}: {
  walletAddress: string;
}): Promise<OfferingParticipant[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('offering_participant')
    .select('*, offering(*)')
    .eq('wallet_address', walletAddress);
  if (error) throw error;
  return data as OfferingParticipant[];
}

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
}): Promise<{
  affectedCount: number;
  records: { id: string; name: string | null; offering_id: string }[];
}> {
  const supabase = createClient();
  const { data, error, count } = await supabase
    .from('offering_participant')
    .insert(
      {
        address_offering_id: addressOfferingId,
        name: name ?? null,
        offering_id: Number(offeringId),
        wallet_address: walletAddress,
        chain_id: Number(chainId)
      },
      { count: 'exact' }
    )
    .select('id, name, offering_id');
  if (error) throw error;
  revalidatePath('/', 'page');
  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as any
  };
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

// export async function archiveOfferingParticipant({
//   participantId,
// }: {
//   participantId: string;
// }): Promise<{
//   affectedCount: number;
//   records: { id: string; archived: boolean }[];
// }> {
//   const supabase = createClient();
//   const { data, error, count } = await supabase
//     .from("offering_participant")
//     .update({ archived: true })
//     .eq("id", participantId)
//     .select("id, archived");
//   if (error) throw error;
//   revalidatePath("/", "page");
//   return {
//     affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
//     records: (data ?? []) as any,
//   };
// }

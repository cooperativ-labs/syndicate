'use server';

import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import { CryptoAddressTypes, Protocol, SmartContractTypes } from '@/types';
import {
  CryptoAddress,
  CurrencyCodeType,
  LegalEntity,
  OfferingSmartContractSet,
  SmartContract
} from '@/types';
import { Database } from '@/types/database.types';

// =========== CRYPTO ADDRESS ================

type CreateCryptoAddressParams = {
  address: string;
  type: CryptoAddressTypes;
  chainId: number;
  protocol: Protocol;
  ownerId: number;
};

export async function createCryptoAddress(params: CreateCryptoAddressParams): Promise<string> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('crypto_address')
    .insert({
      address: params.address,
      type: params.type,
      chain_id: params.chainId,
      protocol: params.protocol,
      legal_entity_id: params.ownerId
    })
    .select('id')
    .single();

  if (error) {
    throw `createCryptoAddress: ${error.message}`;
  }
  return data.id;
}

type GetCryptoAddressResult = {
  edges: {
    node: Pick<CryptoAddress, 'id' | 'address'> & {
      legal_entity?: Pick<LegalEntity, 'id' | 'legal_name'> | null;
    };
  }[];
};

export async function getCryptoAddress(walletAddress: string): Promise<GetCryptoAddressResult> {
  const supabase = createClient();

  const { data: cryptoAddresses, error } = await supabase
    .from('crypto_address')
    .select('id, address, legal_entity_id')
    .eq('address', walletAddress);

  if (error) {
    throw error;
  }

  if (!cryptoAddresses || cryptoAddresses.length === 0) {
    return { edges: [] };
  }

  // Fetch legal entities for all crypto addresses
  const legalEntityIds = [
    ...new Set(cryptoAddresses.map(ca => ca.legal_entity_id).filter(Boolean))
  ];

  let legalEntities: Record<string, Pick<LegalEntity, 'id' | 'legal_name'>> = {};
  if (legalEntityIds.length > 0) {
    const { data: entities, error: entitiesError } = await supabase
      .from('legal_entity')
      .select('id, legal_name')
      .in('id', legalEntityIds);

    if (!entitiesError && entities) {
      legalEntities = entities.reduce(
        (acc, entity) => {
          acc[entity.id] = entity;
          return acc;
        },
        {} as Record<string, Pick<LegalEntity, 'id' | 'legal_name'>>
      );
    }
  }

  // Transform the data to match GraphQL structure
  return {
    edges: cryptoAddresses.map(item => ({
      node: {
        id: item.id,
        address: item.address,
        legal_entity: item.legal_entity_id ? legalEntities[item.legal_entity_id] || null : null
      }
    }))
  };
}

type UpdateCryptoAddressParams = {
  id: string;
  name?: string | null;
  isPublic?: boolean | null;
};

type UpdateCryptoAddressResult = {
  affectedCount: number;
  records: Pick<
    CryptoAddress,
    'id' | 'name' | 'address' | 'is_public' | 'description' | 'legal_entity_id'
  >[];
};

export async function updateCryptoAddress(
  params: UpdateCryptoAddressParams
): Promise<UpdateCryptoAddressResult> {
  const supabase = createClient();

  const updateData: {
    name?: string | null;
    is_public?: boolean | null;
  } = {};

  if (params.name !== undefined) {
    updateData.name = params.name;
  }
  if (params.isPublic !== undefined) {
    updateData.is_public = params.isPublic;
  }

  const { data, error, count } = await supabase
    .from('crypto_address')
    .update(updateData)
    .eq('id', params.id)
    .select('id, name, address, is_public, description, legal_entity_id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateCryptoAddressResult['records']
  };
}

// =========== SMART CONTRACT ================

export type AddContractPartitionParams = {
  smartContractId: string;
  partition: string;
};

export type AddContractPartitionResult = {
  affectedCount: number;
  records: Pick<SmartContract, 'id' | 'partitions' | 'owner_id'>[];
};

export async function addContractPartition(
  params: AddContractPartitionParams
): Promise<AddContractPartitionResult> {
  const supabase = createClient();

  // First, fetch the current partitions
  const { data: contract, error: fetchError } = await supabase
    .from('smart_contract')
    .select('partitions')
    .eq('id', params.smartContractId)
    .single();

  if (fetchError || !contract) {
    throw fetchError || new Error('Smart contract not found');
  }

  // Append the new partition to the existing array
  const currentPartitions = contract.partitions || [];
  const updatedPartitions = [...currentPartitions, params.partition];

  const { data, error, count } = await supabase
    .from('smart_contract')
    .update({ partitions: updatedPartitions })
    .eq('id', params.smartContractId)
    .select('id, partitions, owner_id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as AddContractPartitionResult['records']
  };
}

type CreateShareContractParams = {
  cryptoAddress: string;
  ownerId: string;
  type: SmartContractTypes;
  chainId: number;
  protocol: Protocol;
};

type CreateShareContractResult = {
  affectedCount: number;
  records: Pick<SmartContract, 'id' | 'owner_id' | 'crypto_address_id' | 'type' | 'established'>[];
};

export async function createShareContract(
  params: CreateShareContractParams
): Promise<CreateShareContractResult> {
  const supabase = createClient();

  const ownerEntityId = Number(params.ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error('createShareContract: ownerId must be numeric');
  }

  const contractId = await createCryptoAddress({
    address: params.cryptoAddress,
    type: 'CONTRACT',
    chainId: params.chainId,
    protocol: params.protocol,
    ownerId: ownerEntityId
  });

  const { data, error, count } = await supabase
    .from('smart_contract')
    .insert(
      {
        crypto_address_id: contractId,
        owner_id: ownerEntityId,
        type: params.type,
        established: false
      },
      { count: 'exact' }
    )
    .select('id, owner_id, crypto_address_id, type, established');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateShareContractResult['records']
  };
}

type UpdateUnestablishedSmartContractParams = {
  id: string;
  established?: boolean | null;
};

type UpdateUnestablishedSmartContractResult = {
  affectedCount: number;
  records: Pick<SmartContract, 'id' | 'owner_id'>[];
};

export async function updateUnestablishedSmartContract(
  params: UpdateUnestablishedSmartContractParams
): Promise<UpdateUnestablishedSmartContractResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('smart_contract')
    .update({
      established: params.established ?? null
    })
    .eq('id', params.id)
    .select('id, owner_id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateUnestablishedSmartContractResult['records']
  };
}

// =========== OFFERING SMART CONTRACT SET ================

type GetSwapContractParams = {
  contractSetId: string;
};

export async function getOfferingSmartContractSet(
  offeringId: string
): Promise<OfferingSmartContractSet | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('offering_smart_contract_set')
      .select(
        [
          '*',
          'swapContract:smart_contract!offering_smart_contract_set_swap_contract_id_fkey(*, crypto_address(*))',
          'distributionContract:smart_contract!offering_smart_contract_set_distribution_contract_id_fkey(*, crypto_address(*))',
          'shareContract:smart_contract!offering_smart_contract_set_share_contract_id_fkey(*, crypto_address(*))'
        ].join(', ')
      )
      .eq('offering_id', Number(offeringId))
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return null;
    }

    // Transform the data to match the expected type structure
    // Supabase returns crypto_address as the nested object, we need to map it to cryptoAddress
    const transformContract = (
      contract: any
    ): (SmartContract & { cryptoAddress: CryptoAddress }) | null => {
      if (!contract) return null;
      const cryptoAddress = contract.crypto_address;
      if (!cryptoAddress) return null;

      // Remove crypto_address from contract and add cryptoAddress
      const { crypto_address, ...contractWithoutCrypto } = contract;
      return {
        ...contractWithoutCrypto,
        cryptoAddress: cryptoAddress
      } as SmartContract & { cryptoAddress: CryptoAddress };
    };

    const result = {
      swapContract: transformContract((data as any).swapContract),
      distributionContract: transformContract((data as any).distributionContract),
      shareContract: transformContract((data as any).shareContract)
    };

    return result as OfferingSmartContractSet;
  } catch (error: any) {
    throw `getOfferingSmartContractSet: ${error.message}`;
  }
}

type CreateSwapContractParams = {
  cryptoAddress: string;
  ownerId: string;
  offeringId: string;
  type: SmartContractTypes;
  contractSetId: string;
  backingToken: CurrencyCodeType;
  protocol: Protocol;
  chainId: number;
};

type CreateSwapContractResult = {
  affectedCount: number;
  records: Pick<SmartContract, 'id' | 'owner_id' | 'crypto_address_id' | 'type' | 'established'>[];
};

export async function createSwapContract(
  params: CreateSwapContractParams
): Promise<CreateSwapContractResult> {
  const supabase = createClient();

  const ownerEntityId = Number(params.ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error('createSwapContract: ownerId must be numeric');
  }
  const offeringId = Number(params.offeringId);
  if (Number.isNaN(offeringId)) {
    throw new Error('createSwapContract: offeringId must be numeric');
  }

  const contractId = await createCryptoAddress({
    address: params.cryptoAddress,
    type: 'CONTRACT',
    chainId: params.chainId,
    protocol: params.protocol,
    ownerId: ownerEntityId
  });

  const { data, error, count } = await supabase
    .from('smart_contract')
    .insert({
      crypto_address_id: contractId,
      owner_id: ownerEntityId,
      type: params.type,
      established: false
    })
    .select('id, owner_id, crypto_address_id, type, established');

  if (error) {
    throw `createSwapContract: ${error.message}`;
  }

  const { error: updateError } = await supabase
    .from('offering_smart_contract_set')
    .update({
      swap_contract_id: data[0].id,
      owner_id: ownerEntityId,
      offering_id: offeringId
    })
    .eq('id', params.contractSetId);

  if (updateError) {
    throw `createSwapContract(updateSet): ${updateError.message}`;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateSwapContractResult['records']
  };
}

export type CreateDistributionContractParams = {
  cryptoAddress: string;
  ownerId: string;
  type: SmartContractTypes;
  contractSetId: string;
  protocol: Protocol;
  chainId: number;
};

type CreateDistributionContractResult = {
  affectedCount: number;
  records: Pick<SmartContract, 'id' | 'owner_id' | 'crypto_address_id' | 'type' | 'established'>[];
};

export async function createDistributionContract(
  params: CreateDistributionContractParams
): Promise<CreateDistributionContractResult> {
  const supabase = createClient();

  const ownerEntityId = Number(params.ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error('createDistributionContract: ownerId must be numeric');
  }

  const contractId = await createCryptoAddress({
    address: params.cryptoAddress,
    type: 'CONTRACT',
    chainId: params.chainId,
    protocol: params.protocol,
    ownerId: ownerEntityId
  });
  const { data, error, count } = await supabase
    .from('smart_contract')
    .insert({
      crypto_address_id: contractId,
      owner_id: ownerEntityId,
      type: params.type,
      established: false
    })
    .select('id, owner_id, crypto_address_id, type, established');

  if (error) {
    throw error;
  }
  await supabase
    .from('offering_smart_contract_set')
    .update({ distribution_contract_id: data[0].id })
    .eq('id', params.contractSetId);

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateDistributionContractResult['records']
  };
}

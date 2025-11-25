"use server";

import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

import {
  CryptoAddressTypes,
  Protocol,
  RevalidationPath,
  SmartContractTypes,
} from "@/types";
import {
  CryptoAddress,
  CurrencyCodeType,
  LegalEntity,
  OfferingSmartContractSet,
  SmartContract,
} from "@/types";

// =========== CRYPTO ADDRESS ================

export async function createCryptoAddress({
  address,
  type,
  chainId,
  protocol,
  ownerId,
  revalidationPath,
}: {
  address: string;
  type: CryptoAddressTypes;
  chainId: number;
  protocol: Protocol;
  ownerId: number;
  revalidationPath?: RevalidationPath;
}): Promise<string> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("crypto_address")
    .insert({
      address: address,
      type: type,
      chain_id: chainId,
      protocol: protocol,
      legal_entity_id: ownerId,
    })
    .select("address")
    .single();

  if (error) {
    throw `createCryptoAddress: ${error.message}`;
  }
  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
  return data.address;
}

type UpdateCryptoAddressResult = {
  affectedCount: number;
  records: Pick<
    CryptoAddress,
    "name" | "address" | "is_public" | "description" | "legal_entity_id"
  >[];
};

export async function updateCryptoAddress({
  address,
  name,
  isPublic,
  revalidationPath,
}: {
  address: string;
  name?: string | null;
  isPublic?: boolean | null;
  revalidationPath?: RevalidationPath;
}): Promise<UpdateCryptoAddressResult> {
  const supabase = createClient();

  const updateData: {
    name?: string | null;
    is_public?: boolean | null;
  } = {};

  if (name !== undefined) {
    updateData.name = name;
  }
  if (isPublic !== undefined) {
    updateData.is_public = isPublic;
  }

  const { data, error, count } = await supabase
    .from("crypto_address")
    .update(updateData)
    .eq("address", address)
    .select("name, address, is_public, description, legal_entity_id");

  if (error) {
    throw error;
  }
  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateCryptoAddressResult["records"],
  };
}

export async function deleteCryptoAddressByAddress({
  address,
  revalidationPath,
}: {
  address: string;
  revalidationPath?: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("crypto_address").delete().eq(
    "address",
    address,
  );
  if (error) {
    throw `deleteCryptoAddressByAddress: ${error.message}` as string;
  }
  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
}

// =========== SMART CONTRACT ================

export type CreateSmartContractParams = {
  cryptoAddressId: string;
  ownerId: string | number;
  type: SmartContractTypes;
  subType?: string;
};

export async function createSmartContract({
  cryptoAddressId,
  ownerId,
  type,
  subType,
}: CreateSmartContractParams): Promise<string> {
  const supabase = createClient();

  const ownerEntityId = Number(ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error("createSmartContract: ownerId must be numeric");
  }

  const { data, error, count } = await supabase
    .from("smart_contract")
    .insert(
      {
        crypto_address_id: cryptoAddressId,
        owner_id: ownerEntityId,
        type: type,
        sub_type: subType,
        established: false,
      },
      { count: "exact" },
    )
    .select("id")
    .single();

  if (error) {
    throw `createSmartContract: ${error.message}`;
  }

  if (!data) {
    throw new Error("createSmartContract: Failed to create smart contract");
  }

  return data.id;
}

export type AddContractPartitionParams = {
  smartContractId: string;
  partition: string;
  revalidationPath?: RevalidationPath;
};

export type AddContractPartitionResult = {
  affectedCount: number;
  records: Pick<SmartContract, "id" | "partitions" | "owner_id">[];
};

export async function addContractPartition({
  smartContractId,
  partition,
  revalidationPath,
}: AddContractPartitionParams): Promise<AddContractPartitionResult> {
  const supabase = createClient();

  // First, fetch the current partitions
  const { data: contract, error: fetchError } = await supabase
    .from("smart_contract")
    .select("partitions")
    .eq("id", smartContractId)
    .single();

  if (fetchError || !contract) {
    throw fetchError || new Error("Smart contract not found");
  }

  // Append the new partition to the existing array
  const currentPartitions = contract.partitions || [];
  const updatedPartitions = [...currentPartitions, partition];

  const { data, error, count } = await supabase
    .from("smart_contract")
    .update({ partitions: updatedPartitions })
    .eq("id", smartContractId)
    .select("id, partitions, owner_id");

  if (error) {
    throw error;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddContractPartitionResult["records"],
  };
}

export type CreateContractSetParams = {
  offeringId: string | number;
  shareContractId: string;
};

export type CreateContractSetResult = {
  affectedCount: number;
  records: Pick<OfferingSmartContractSet, "id">[];
};

export async function createContractSet({
  offeringId,
  shareContractId,
}: CreateContractSetParams): Promise<CreateContractSetResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("offering_smart_contract_set")
    .insert({
      offering_id: Number(offeringId),
      share_contract_id: shareContractId,
    })
    .select("id");

  if (error) {
    throw new Error(
      `createContractSet: Failed to insert contract set: ${error.message}`,
    );
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateContractSetResult["records"],
  };
}

type CreateShareContractParams = {
  cryptoAddress: string;
  ownerId: string | number;
  type: SmartContractTypes;
  chainId: number;
  protocol: Protocol;
  revalidationPath?: RevalidationPath;
  offeringId: string | number;
};

export async function createShareContract({
  cryptoAddress,
  ownerId,
  type,
  chainId,
  protocol,
  revalidationPath,
  offeringId,
}: CreateShareContractParams): Promise<string> {
  const ownerEntityId = Number(ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error("createShareContract: ownerId must be numeric");
  }

  const contractId = await createCryptoAddress({
    address: cryptoAddress,
    type: "CONTRACT",

    chainId: chainId,
    protocol: protocol,
    ownerId: ownerEntityId,
    revalidationPath: revalidationPath,
  });

  const smartContractId = await createSmartContract({
    cryptoAddressId: contractId,
    ownerId: ownerEntityId,
    type: type,
  });

  if (!smartContractId) {
    throw new Error("createShareContract: Failed to create smart contract");
  }

  await createContractSet({
    offeringId: offeringId,
    shareContractId: smartContractId,
  });

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return contractId;
}

type UpdateUnestablishedSmartContractParams = {
  id: string;
  established?: boolean | null;
  revalidationPath?: RevalidationPath;
};

type UpdateUnestablishedSmartContractResult = {
  affectedCount: number;
  records: Pick<SmartContract, "id" | "owner_id">[];
};

export async function updateUnestablishedSmartContract({
  id,
  established,
  revalidationPath,
}: UpdateUnestablishedSmartContractParams): Promise<
  UpdateUnestablishedSmartContractResult
> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("smart_contract")
    .update({
      established: established ?? null,
    })
    .eq("id", id)
    .select("id, owner_id");

  if (error) {
    throw error;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateUnestablishedSmartContractResult["records"],
  };
}

// =========== OFFERING SMART CONTRACT SET ================

export async function getOfferingSmartContractSet({
  offeringId,
}: {
  offeringId: number | string;
}): Promise<OfferingSmartContractSet | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("offering_smart_contract_set")
      .select(
        [
          "*",
          "swapContract:smart_contract!offering_smart_contract_set_swap_contract_id_fkey(*, crypto_address(*))",
          "distributionContract:smart_contract!offering_smart_contract_set_distribution_contract_id_fkey(*, crypto_address(*))",
          "shareContract:smart_contract!offering_smart_contract_set_share_contract_id_fkey(*, crypto_address(*))",
        ].join(", "),
      )
      .eq("offering_id", Number(offeringId))
      .limit(1);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const row = data[0];

    const transformContract = (
      contract: any,
    ): (SmartContract & { cryptoAddress: CryptoAddress }) | null => {
      if (!contract) return null;
      const cryptoAddress = contract.crypto_address;
      if (!cryptoAddress) return null;

      // Remove crypto_address from contract and add cryptoAddress
      const { crypto_address, ...contractWithoutCrypto } = contract;
      return {
        ...contractWithoutCrypto,
        cryptoAddress: cryptoAddress,
      } as SmartContract & { cryptoAddress: CryptoAddress };
    };

    const result = {
      id: (row as unknown as OfferingSmartContractSet).id,
      swapContract: transformContract(
        (row as unknown as OfferingSmartContractSet).swapContract,
      ),
      distributionContract: transformContract(
        (row as unknown as OfferingSmartContractSet).distributionContract,
      ),
      shareContract: transformContract(
        (row as unknown as OfferingSmartContractSet).shareContract,
      ),
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
  revalidationPath?: RevalidationPath;
};

type CreateSwapContractResult = {
  affectedCount: number;
  records: Pick<
    SmartContract,
    "id" | "owner_id" | "crypto_address_id" | "type" | "established"
  >[];
};

export async function createSwapContract({
  cryptoAddress,
  ownerId,
  offeringId,
  type,
  contractSetId,
  protocol,
  chainId,
  revalidationPath,
}: CreateSwapContractParams): Promise<string> {
  const supabase = createClient();

  const ownerEntityId = Number(ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error("createSwapContract: ownerId must be numeric");
  }

  const contractId = await createCryptoAddress({
    address: cryptoAddress,
    type: "CONTRACT",
    chainId: chainId,
    protocol: protocol,
    ownerId: ownerEntityId,
  });

  const smartContractId = await createSmartContract({
    cryptoAddressId: contractId,
    ownerId: ownerEntityId,
    type: type,
  });
  console.log("smartContractId", smartContractId);

  if (!smartContractId) {
    throw new Error("createSwapContract: Failed to create smart contract");
  }

  const { error: updateError } = await supabase
    .from("offering_smart_contract_set")
    .update({
      swap_contract_id: smartContractId,
      offering_id: Number(offeringId),
    })
    .eq("id", contractSetId);

  if (updateError) {
    throw `createSwapContract(offering_smart_contract_set): ${updateError.message}`;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return smartContractId;
}

export type CreateDistributionContractParams = {
  cryptoAddress: string;
  ownerId: string;
  type: SmartContractTypes;
  contractSetId: string;
  protocol: Protocol;
  chainId: number;
  revalidationPath?: RevalidationPath;
};

type CreateDistributionContractResult = {
  affectedCount: number;
  records: Pick<
    SmartContract,
    "id" | "owner_id" | "crypto_address_id" | "type" | "established"
  >[];
};

export async function createDistributionContract({
  cryptoAddress,
  ownerId,
  type,
  contractSetId,
  protocol,
  chainId,
  revalidationPath,
}: CreateDistributionContractParams): Promise<
  CreateDistributionContractResult
> {
  const supabase = createClient();

  const ownerEntityId = Number(ownerId);
  if (Number.isNaN(ownerEntityId)) {
    throw new Error("createDistributionContract: ownerId must be numeric");
  }

  const contractId = await createCryptoAddress({
    address: cryptoAddress,
    type: "CONTRACT",
    chainId: chainId,
    protocol: protocol,
    ownerId: ownerEntityId,
    revalidationPath: revalidationPath,
  });
  const { data, error, count } = await supabase
    .from("smart_contract")
    .insert({
      crypto_address_id: contractId,
      owner_id: ownerEntityId,
      type: type,
      established: false,
    })
    .select("id, owner_id, crypto_address_id, type, established");

  if (error) {
    throw error;
  }
  await supabase
    .from("offering_smart_contract_set")
    .update({ distribution_contract_id: data[0].id })
    .eq("id", contractSetId);

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateDistributionContractResult["records"],
  };
}

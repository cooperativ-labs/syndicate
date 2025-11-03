"use server";

import { createClient } from "@supabase/utils/server";
import { Database } from "@/types/database.types";
import { revalidatePath } from "next/cache";

type CryptoAddress = Database["public"]["Tables"]["crypto_address"]["Row"];
type SmartContract = Database["public"]["Tables"]["smart_contract"]["Row"];
type OfferingSmartContractSet =
 Database["public"]["Tables"]["offering_smart_contract_set"]["Row"];
type LegalEntity = Database["public"]["Tables"]["legal_entity"]["Row"];

// =========== CRYPTO ADDRESS ================

type GetCryptoAddressResult = {
 edges: {
  node: Pick<CryptoAddress, "id" | "address"> & {
   legal_entity?: Pick<LegalEntity, "id" | "legal_name"> | null;
  };
 }[];
};

export async function getCryptoAddress(
 walletAddress: string,
): Promise<GetCryptoAddressResult> {
 const supabase = createClient();

 const { data: cryptoAddresses, error } = await supabase
  .from("crypto_address")
  .select("id, address, legal_entity_id")
  .eq("address", walletAddress);

 if (error) {
  throw error;
 }

 if (!cryptoAddresses || cryptoAddresses.length === 0) {
  return { edges: [] };
 }

 // Fetch legal entities for all crypto addresses
 const legalEntityIds = [
  ...new Set(cryptoAddresses.map((ca) => ca.legal_entity_id).filter(Boolean)),
 ];

 let legalEntities: Record<string, Pick<LegalEntity, "id" | "legal_name">> = {};
 if (legalEntityIds.length > 0) {
  const { data: entities, error: entitiesError } = await supabase
   .from("legal_entity")
   .select("id, legal_name")
   .in("id", legalEntityIds);

  if (!entitiesError && entities) {
   legalEntities = entities.reduce(
    (acc, entity) => {
     acc[entity.id] = entity;
     return acc;
    },
    {} as Record<string, Pick<LegalEntity, "id" | "legal_name">>,
   );
  }
 }

 // Transform the data to match GraphQL structure
 return {
  edges: cryptoAddresses.map((item) => ({
   node: {
    id: item.id,
    address: item.address,
    legal_entity: item.legal_entity_id
     ? legalEntities[item.legal_entity_id] || null
     : null,
   },
  })),
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
  "id" | "name" | "address" | "is_public" | "description" | "legal_entity_id"
 >[];
};

export async function updateCryptoAddress(
 params: UpdateCryptoAddressParams,
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
  .from("crypto_address")
  .update(updateData)
  .eq("id", params.id)
  .select("id, name, address, is_public, description, legal_entity_id");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as UpdateCryptoAddressResult["records"],
 };
}

// =========== SMART CONTRACT ================

type AddContractPartitionParams = {
 id: string;
 partition: string;
};

type AddContractPartitionResult = {
 affectedCount: number;
 records: Pick<SmartContract, "id" | "partitions" | "owner_id">[];
};

export async function addContractPartition(
 params: AddContractPartitionParams,
): Promise<AddContractPartitionResult> {
 const supabase = createClient();

 // First, fetch the current partitions
 const { data: contract, error: fetchError } = await supabase
  .from("smart_contract")
  .select("partitions")
  .eq("id", params.id)
  .single();

 if (fetchError || !contract) {
  throw fetchError || new Error("Smart contract not found");
 }

 // Append the new partition to the existing array
 const currentPartitions = contract.partitions || [];
 const updatedPartitions = [...currentPartitions, params.partition];

 const { data, error, count } = await supabase
  .from("smart_contract")
  .update({ partitions: updatedPartitions })
  .eq("id", params.id)
  .select("id, partitions, owner_id");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as AddContractPartitionResult["records"],
 };
}

type CreateShareContractParams = {
 cryptoAddressId: string;
 ownerId: string;
 type: Database["public"]["Enums"]["smart_contract_type"];
};

type CreateShareContractResult = {
 affectedCount: number;
 records: Pick<
  SmartContract,
  "id" | "owner_id" | "crypto_address_id" | "type" | "established"
 >[];
};

export async function createShareContract(
 params: CreateShareContractParams,
): Promise<CreateShareContractResult> {
 const supabase = createClient();

 const { data, error, count } = await supabase
  .from("smart_contract")
  .insert(
   {
    crypto_address_id: params.cryptoAddressId,
    owner_id: params.ownerId,
    type: params.type,
    established: false,
   },
   { count: "exact" },
  )
  .select("id, owner_id, crypto_address_id, type, established");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as CreateShareContractResult["records"],
 };
}

type UpdateUnestablishedSmartContractParams = {
 id: string;
 established?: boolean | null;
};

type UpdateUnestablishedSmartContractResult = {
 affectedCount: number;
 records: Pick<SmartContract, "id" | "owner_id">[];
};

export async function updateUnestablishedSmartContract(
 params: UpdateUnestablishedSmartContractParams,
): Promise<UpdateUnestablishedSmartContractResult> {
 const supabase = createClient();

 const { data, error, count } = await supabase
  .from("smart_contract")
  .update({ established: params.established ?? null })
  .eq("id", params.id)
  .select("id, owner_id");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as UpdateUnestablishedSmartContractResult["records"],
 };
}

// =========== OFFERING SMART CONTRACT SET ================

type CreateSwapContractParams = {
 contractSetId: string;
 swapContractId: string;
};

type CreateSwapContractResult = {
 affectedCount: number;
 records: Pick<
  OfferingSmartContractSet,
  "id" | "swap_contract_id" | "offering_id"
 >[];
};

export async function createSwapContract(
 params: CreateSwapContractParams,
): Promise<CreateSwapContractResult> {
 const supabase = createClient();

 const { data, error, count } = await supabase
  .from("offering_smart_contract_set")
  .update({ swap_contract_id: params.swapContractId })
  .eq("id", params.contractSetId)
  .select("id, swap_contract_id, offering_id");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as CreateSwapContractResult["records"],
 };
}

type CreateDistributionContractParams = {
 contractSetId: string;
 distributionContractId: string;
};

type CreateDistributionContractResult = {
 affectedCount: number;
 records: Pick<
  OfferingSmartContractSet,
  "id" | "distribution_contract_id" | "offering_id"
 >[];
};

export async function createDistributionContract(
 params: CreateDistributionContractParams,
): Promise<CreateDistributionContractResult> {
 const supabase = createClient();

 const { data, error, count } = await supabase
  .from("offering_smart_contract_set")
  .update({ distribution_contract_id: params.distributionContractId })
  .eq("id", params.contractSetId)
  .select("id, distribution_contract_id, offering_id");

 if (error) {
  throw error;
 }

 return {
  affectedCount: typeof count === "number" ? count : data?.length ?? 0,
  records: (data ?? []) as CreateDistributionContractResult["records"],
 };
}

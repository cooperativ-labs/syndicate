"use server";

import { createClient } from "@supabase/utils/server";

import { Database } from "@/types/database.types";

type ShareTransferEvent =
  Database["public"]["Tables"]["share_transfer_event"]["Row"];
type ShareOrder = Database["public"]["Tables"]["share_order"]["Row"];
type OfferingDistribution =
  Database["public"]["Tables"]["offering_distribution"]["Row"];
type SmartContract = Database["public"]["Tables"]["smart_contract"]["Row"];

// =========== TRANSFER EVENTS ================

export async function retrieveTransferEvents(
  shareContractAddress: string,
): Promise<ShareTransferEvent[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("share_transfer_event")
    .select(
      "id, share_contract_address, order_index, recipient_address, sender_address, amount, price, currency_code, transaction_hash, partition, type",
    )
    .eq("share_contract_address", shareContractAddress);

  if (error) {
    throw error;
  }

  return data;
}

export type AddTransferEventParams = {
  shareContractAddress: string;
  orderIndex?: number | null;
  recipientAddress: string;
  senderAddress: string;
  amount: number;
  price?: string | null;
  currencyCode?: Database["public"]["Enums"]["currency_code"] | null;
  transactionHash: string;
  partition: string;
  type: Database["public"]["Enums"]["share_transfer_event_type"];
};

export type AddTransferEventResult = {
  affectedCount: number;
  records: Pick<
    ShareTransferEvent,
    | "id"
    | "share_contract_address"
    | "order_index"
    | "recipient_address"
    | "sender_address"
    | "amount"
    | "price"
    | "currency_code"
    | "transaction_hash"
    | "partition"
    | "type"
  >[];
};

export async function addTransferEvent(
  params: AddTransferEventParams,
): Promise<AddTransferEventResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("share_transfer_event")
    .insert(
      {
        share_contract_address: params.shareContractAddress,
        order_index: params.orderIndex ?? null,
        recipient_address: params.recipientAddress,
        sender_address: params.senderAddress,
        amount: params.amount,
        price: params.price ?? null,
        currency_code: params.currencyCode ?? null,
        transaction_hash: params.transactionHash,
        partition: params.partition,
        type: params.type,
        archived: false,
      },
      { count: "exact" },
    )
    .select(
      "id, share_contract_address, order_index, recipient_address, sender_address, amount, price, currency_code, transaction_hash, partition, type",
    );

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddTransferEventResult["records"],
  };
}

// =========== DISTRIBUTIONS ================

export const getDistributions = async (
  distributionContractAddress: string,
): Promise<OfferingDistribution[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("offering_distribution")
    .select("*")
    .eq("contract_index", distributionContractAddress);
  return data;
};

type AddDistributionParams = {
  transactionHash: string;
  contractIndex: number;
};

type AddDistributionResult = {
  affectedCount: number;
  records: Pick<
    OfferingDistribution,
    "id" | "transaction_hash" | "contract_index"
  >[];
};

export async function addDistribution(
  params: AddDistributionParams,
): Promise<AddDistributionResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("offering_distribution")
    .insert(
      {
        transaction_hash: params.transactionHash,
        contract_index: params.contractIndex,
      },
      { count: "exact" },
    )
    .select("id, transaction_hash, contract_index");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddDistributionResult["records"],
  };
}

type UpdateContractIndexParams = {
  distributionId: string;
  contractIndex: number;
};

type UpdateContractIndexResult = {
  affectedCount: number;
  records: Pick<
    OfferingDistribution,
    "id" | "transaction_hash" | "contract_index"
  >[];
};

export async function updateContractIndex(
  params: UpdateContractIndexParams,
): Promise<UpdateContractIndexResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("offering_distribution")
    .update({ contract_index: params.contractIndex })
    .eq("id", params.distributionId)
    .select("id, transaction_hash, contract_index");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateContractIndexResult["records"],
  };
}

// =========== SMART CONTRACT ================

type UpdateContractStatusParams = {
  smartshareContractId: string;
  established?: boolean | null;
};

type UpdateContractStatusResult = {
  affectedCount: number;
  records: Pick<SmartContract, "id" | "established">[];
};

export async function updateContractStatus(
  params: UpdateContractStatusParams,
): Promise<UpdateContractStatusResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("smart_contract")
    .update({ established: params.established ?? null })
    .eq("id", params.smartshareContractId)
    .select("id, established");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateContractStatusResult["records"],
  };
}

// =========== ORDER ================

export type CreateOrderParams = {
  contractIndex: number;
  swapContractAddress: string;
  minUnits?: number | null;
  maxUnits?: number | null;
  visible: boolean;
  initiator: string;
  transactionHash: string;
};

export type CreateOrderResult = {
  affectedCount: number;
  records: Pick<
    ShareOrder,
    "id" | "contract_index" | "initiator" | "transaction_hash"
  >[];
};

export async function createOrder(
  params: CreateOrderParams,
): Promise<CreateOrderResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("share_order")
    .insert(
      {
        contract_index: params.contractIndex,
        swap_contract_address: params.swapContractAddress,
        min_units: params.minUnits ?? null,
        max_units: params.maxUnits ?? null,
        visible: params.visible,
        initiator: params.initiator,
        transaction_hash: params.transactionHash,
        archived: false,
      },
      { count: "exact" },
    )
    .select("id, contract_index, initiator, transaction_hash");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as CreateOrderResult["records"],
  };
}

type RetrieveOrdersResult = {
  edges: {
    node: Pick<
      ShareOrder,
      | "id"
      | "contract_index"
      | "initiator"
      | "transaction_hash"
      | "swap_contract_address"
      | "min_units"
      | "max_units"
      | "visible"
      | "archived"
    >;
  }[];
};

export async function retrieveOrders(
  swapContractAddress: string,
): Promise<ShareOrder[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("share_order")
    .select("*")
    .eq("swap_contract_address", swapContractAddress);

  if (error) {
    throw error;
  }

  return data;
}

type UpdateOrderParams = {
  orderId: string;
  visible: boolean;
  archived: boolean;
};

type UpdateOrderResult = {
  affectedCount: number;
  records: Pick<ShareOrder, "id" | "visible" | "archived">[];
};

export async function updateOrder(
  params: UpdateOrderParams,
): Promise<UpdateOrderResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("share_order")
    .update({
      archived: params.archived,
      visible: params.visible,
    })
    .eq("id", params.orderId)
    .select("id, visible, archived");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateOrderResult["records"],
  };
}

type DeleteOrderResult = {
  affectedCount: number;
  records: Pick<ShareOrder, "id">[];
};

export async function deleteOrder(orderId: string): Promise<DeleteOrderResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("share_order")
    .delete({ count: "exact" })
    .eq("id", orderId)
    .select("id");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as DeleteOrderResult["records"],
  };
}

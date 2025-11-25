import { ContractOrder } from "@src/components/investor/tradingForms/offering-actions-types";
import { swapContractABI } from "@src/web3/generated";
import { String0x } from "@src/web3/helpersChain";
import { shareContractDecimals, toNormalNumber } from "@src/web3/util";
import { getWagmiConfig } from "@src/web3/wagmi";
import { readContract } from "wagmi/actions";
import { ShareOrder, ShareTransferEvent } from "@/types";
import { ShareTransferEventType } from "@/types";

// =========== SHARED ================

function getAdjustedPrice(
  price: string | bigint,
  tokenDecimals: number,
): number {
  return price ? toNormalNumber(BigInt(price), tokenDecimals) : 0;
}

// =========== TRANSFER EVENTS ================
function getRecentTransferPrice(
  transferEvents: ShareTransferEvent[],
  paymentTokenDecimals: number,
): number {
  if (!transferEvents) {
    return NaN;
  }
  const transferEventsSortedDesc = transferEvents.sort((
    a: ShareTransferEvent,
    b: ShareTransferEvent,
  ) => a.created_at > b.created_at ? -1 : a.created_at < b.created_at ? 1 : 0);
  const mostRecentTransferEvent = transferEventsSortedDesc[0];
  return mostRecentTransferEvent?.price
    ? getAdjustedPrice(mostRecentTransferEvent.price, paymentTokenDecimals)
    : NaN;
}

// =========== ORDERS FROM CONTRACT ================
export async function getOrderArrayFromContract(
  orders: ShareOrder[],
  swapContractAddress: String0x,
  paymentTokenDecimals: number,
): Promise<ContractOrder[]> {
  const orderArray: ContractOrder[] = await Promise.all(
    orders?.map(async (order) => {
      const data = order &&
        (await readContract(getWagmiConfig(), {
          address: swapContractAddress as String0x,
          abi: swapContractABI,
          functionName: "orders",
          args: [BigInt(order.contract_index)],
        }));
      const amount = data && toNormalNumber(data[2], shareContractDecimals);
      const price = getAdjustedPrice(
        data[3],
        paymentTokenDecimals -
          shareContractDecimals,
      );
      const initiator = data && data[0];
      const partition = data && data[1];
      const orderId = order?.id;
      const contractIndex = order?.contract_index;
      const filledAmount = data &&
        toNormalNumber(data[4], shareContractDecimals);
      const filler = data && (data[5] as String0x);
      const isCancelled = data && data[7].isCancelled;
      const isAccepted = data && data[7].orderAccepted;
      const isApproved = data && data[7].isApproved;
      const isFilled = !!amount && !!filledAmount && amount === filledAmount;
      return {
        orderId,
        contractIndex,
        price,
        initiator,
        partition,
        isCancelled,
        isFilled,
        isAccepted,
        isApproved,
        filler,
      };
    }),
  );
  return orderArray;
}

function getOrdersByPriceAscending(contractOrderList: ContractOrder[]) {
  if (!contractOrderList) {
    return [];
  }
  const priceableOrders = contractOrderList.filter((order) =>
    !order.isCancelled && order.isApproved &&
    order.filler !== "0x0000000000000000000000000000000000000000"
  );
  return priceableOrders.sort((a: ContractOrder, b: ContractOrder) =>
    a.price < b.price ? -1 : a.price > b.price ? 1 : 0
  );
}

export const getCurrentOrderPrice = (
  contractOrderList: ContractOrder[],
  startingPrice: number | null,
) => {
  if (!startingPrice) {
    return NaN;
  }
  return getOrdersByPriceAscending(contractOrderList)[0]?.price ?? NaN;
};

export function getCurrentPrice({
  priceStart,
  transferEvents,
  contractOrders,
  paymentTokenDecimals,
}: {
  paymentTokenDecimals: number | undefined | null;
  priceStart: number | undefined | null;
  transferEvents: ShareTransferEvent[];
  contractOrders: ContractOrder[];
}): number {
  if (!priceStart) {
    return NaN;
  }
  if (!paymentTokenDecimals || !transferEvents || !contractOrders) {
    return priceStart;
  }
  try {
    const lowestOrderPrice =
      getOrdersByPriceAscending(contractOrders)[0]?.price ?? NaN;
    const currentTransferPrice = getRecentTransferPrice(
      transferEvents,
      paymentTokenDecimals,
    );
    return lowestOrderPrice < currentTransferPrice
      ? lowestOrderPrice
      : currentTransferPrice ?? lowestOrderPrice;
  } catch (error: any) {
    throw `getCurrentOrdersAndPrice: ${error.message}`;
  }
}

export const liveOrders = (
  contractOrderList: ContractOrder[] | undefined,
): ContractOrder[] | [] => {
  if (!contractOrderList) {
    return [];
  }
  const liveOrders = contractOrderList?.filter((order) =>
    !order.isCancelled && !order.isFilled
  );
  const activeOrders = liveOrders?.filter(
    (order) =>
      order.isAccepted ||
      order.filler !== "0x0000000000000000000000000000000000000000" ||
      order.isApproved,
  );
  return activeOrders ?? [];
};

export const getDisapprovedTransferEvents = (
  transferEvents: ShareTransferEvent[] | undefined,
  order: ShareOrder,
  userWalletAddress: String0x | undefined,
) =>
  transferEvents?.filter((transferEvent) => {
    const { order_index, recipient_address, sender_address, type } =
      transferEvent;
    if (
      order_index === order.contract_index &&
      recipient_address === userWalletAddress &&
      type === ShareTransferEventType.DISAPPROVAL
    ) {
      return transferEvent;
    }
  });

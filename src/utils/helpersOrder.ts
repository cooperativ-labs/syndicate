import { ContractOrder } from "@src/components/investor/tradingForms/offering-actions-types";
import { swapContractABI } from "@src/web3/generated";
import { String0x } from "@src/web3/helpersChain";
import { shareContractDecimals, toNormalNumber } from "@src/web3/util";
import { getWagmiConfig } from "@src/web3/wagmi";
import { readContract } from "wagmi/actions";

import { ShareOrder, ShareTransferEvent } from "@/types";
import { ShareTransferEventType } from "@/types";
export function getOrdersByPrice(contractOrderList: ContractOrder[]) {
  const arrayForSort = contractOrderList && [...contractOrderList];
  return arrayForSort?.sort((a: ContractOrder, b: ContractOrder) =>
    a.price < b.price ? -1 : a.price > b.price ? 1 : 0
  );
}

export function getLowestOrderPrice(
  contractOrderList: ContractOrder[],
  priceStart: number | null,
) {
  if (!priceStart) {
    return NaN;
  }
  const ordersByPrice = getOrdersByPrice(contractOrderList);
  return ordersByPrice?.length > 0 ? ordersByPrice[0].price : priceStart;
}

export const getCurrentOrderPrice = (
  contractOrderList: ContractOrder[],
  startingPrice: number | null,
) => {
  if (!startingPrice) {
    return NaN;
  }
  return getLowestOrderPrice(contractOrderList, startingPrice);
};

export async function getOrderArrayFromContract(
  orders: ShareOrder[],
  swapContractAddress: String0x,
  paymentTokenDecimals: number,
): Promise<ContractOrder[]> {
  const orderArray = orders?.map(async (order) => {
    const data = order &&
      (await readContract(getWagmiConfig(), {
        address: swapContractAddress as String0x,
        abi: swapContractABI,
        functionName: "orders",
        args: [BigInt(order.contract_index)],
      }));
    const adjustTokenDecimalsForShareContract = paymentTokenDecimals -
      shareContractDecimals;
    const initiator = data && data[0];
    const price = data
      ? toNormalNumber(data[3], adjustTokenDecimalsForShareContract)
      : 0;
    const amount = data && toNormalNumber(data[2], shareContractDecimals);
    const partition = data && data[1];
    const orderId = order?.id;
    const contractIndex = order?.contract_index;
    const filledAmount = data && toNormalNumber(data[4], shareContractDecimals);
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
  });
  return Promise.all(orderArray);
}

export const confirmNoLiveOrders = (
  contractOrderList: ContractOrder[],
): boolean => {
  const liveOrders = contractOrderList?.filter((order) =>
    !order.isCancelled && !order.isFilled
  );
  const activeOrders = liveOrders?.find(
    (order) =>
      order.isAccepted ||
      order.filler !== "0x0000000000000000000000000000000000000000" ||
      order.isApproved,
  );
  return !activeOrders;
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

import { swapContractABI } from "@src/web3/generated";
import { String0x } from "@src/web3/helpersChain";
import { shareContractDecimals, toNormalNumber } from "@src/web3/util";
import { readContract } from "wagmi/actions";
import { Address, ShareOrder } from "@/types";
import { getWagmiConfig } from "@src/web3/wagmi";
import { ShareTransferEventType, TransferEventOptions } from "./enumConverters";

export type ContractOrder = {
  orderId: string | undefined;
  contractIndex: number | undefined;
  price: number;
  initiator: String0x | null;
  partition: String0x | null;
  isCancelled: boolean | null;
  isFilled: boolean | null;
  isAccepted: boolean | null;
  isApproved: boolean | null;
  filler: String0x | null;
};

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
    const contractIndex = order?.contractIndex;
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

export const confirmNoLiveOrders = (contractOrderList: ContractOrder[]) => {
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
  transferEvents: TransferEvent[] | undefined,
  order: ContractOrder,
  userWalletAddress: String0x | undefined,
) =>
  transferEvents?.filter((transferEvent) => {
    const { contract_index, recipient_address, sender_address, type } =
      transferEvent;
    if (
      contract_index === order.contract_index &&
      recipient_address === userWalletAddress &&
      type === TransferEventOptions.DISAPPROVAL
    ) {
      return transferEvent;
    }
  });

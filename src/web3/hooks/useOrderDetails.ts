import { useContractRead, useContractReads } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';
import { getCurrencyById } from '@src/utils/enumConverters';

export type OrderDetailsType = {
  initiator: String0x;
  partition: String0x;
  amount: number;
  price: number;
  filledAmount: number;
  filler: String0x;
  isApproved: boolean;
  isDisapproved: boolean;
  isCancelled: boolean;
  isAccepted: boolean;
  isShareIssuance: boolean;
  isAskOrder: boolean;
  isErc20Payment: boolean;
  isLoading: boolean;
};

export const useOrderDetails = (
  swapContractAddress: String0x,
  orderId: number,
  paymentToken: String0x
): OrderDetailsType | undefined => {
  const { data, isLoading, isError, error } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'getOrderDetails',
    args: [BigInt(orderId)],
  });

  const initiator = data?.initiator;
  const partition = data?.partition;
  const paymentTokenDecimals = getCurrencyById(paymentToken)?.decimals;
  const amount = toNormalNumber(data?.amount, 18);
  const price = toNormalNumber(data?.price, paymentTokenDecimals);
  const filledAmount = toNormalNumber(data?.filledAmount, 18);
  const filler = data?.filler;
  const isApproved = data?.status.isApproved;
  const isDisapproved = data?.status.isDisapproved;
  const isCancelled = data?.status.isCancelled;
  const isAccepted = data?.status.orderAccepted;

  const isShareIssuance = data?.orderType.isShareIssuance;
  const isAskOrder = data?.orderType.isAskOrder;
  const isErc20Payment = data?.orderType.isErc20Payment;

  return {
    initiator,
    partition,
    amount,
    price,
    filledAmount,
    filler,
    isApproved,
    isDisapproved,
    isCancelled,
    isAccepted,
    isShareIssuance,
    isAskOrder,
    isErc20Payment,
    isLoading,
  };
};

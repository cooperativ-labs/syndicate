import { useContractRead } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';
import { getCurrencyById } from '@src/utils/enumConverters';

export type OrderDetailsType = {
  initiator: String0x | '';
  partition: String0x | '';
  amount: number;
  price: number;
  filledAmount: number;
  filler: String0x | '';
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
    functionName: 'orders',
    args: [BigInt(orderId)],
  });

  const initiator = data && data[0];
  const partition = data && data[1];
  const paymentTokenDecimals = getCurrencyById(paymentToken)?.decimals;
  const amount = data && toNormalNumber(data[2], 18);
  const price = data && toNormalNumber(data[3], paymentTokenDecimals);
  const filledAmount = data && toNormalNumber(data[4], 18);
  const filler = data && data[5];
  const isApproved = data && data[7].isApproved;
  const isDisapproved = data && data[7].isDisapproved;
  const isCancelled = data && data[7].isCancelled;
  const isAccepted = data && data[7].orderAccepted;

  const isShareIssuance = data && data[6].isShareIssuance;
  const isAskOrder = data && data[6].isAskOrder;
  const isErc20Payment = data && data[6].isErc20Payment;

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

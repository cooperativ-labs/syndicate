import { useContractRead } from 'wagmi';
import { shareContractDecimals, toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';

export type OrderDetailsType = {
  initiator: String0x | '' | undefined;
  partition: String0x | '' | undefined;
  amount: number | undefined;
  price: number | undefined;
  filledAmount: number | undefined;
  filler: String0x | '' | undefined;
  isApproved: boolean | undefined;
  isDisapproved: boolean | undefined;
  isCancelled: boolean | undefined;
  isAccepted: boolean | undefined;
  isShareIssuance: boolean | undefined;
  isAskOrder: boolean | undefined;
  isErc20Payment: boolean | undefined;
  isLoading: boolean | undefined;
  refetchOrderDetails: () => void;
};

export const useOrderDetails = (
  swapContractAddress: String0x | undefined,
  contractIndex: number,
  paymentTokenDecimals: number | undefined
): OrderDetailsType => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchOrderDetails,
  } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'orders',
    args: [BigInt(contractIndex)],
  });

  const adjustTokenDecimalsForShareContract = paymentTokenDecimals
    ? paymentTokenDecimals - shareContractDecimals
    : undefined;
  const initiator = data && data[0];
  const partition = data && data[1];
  const amount = data && toNormalNumber(data[2], shareContractDecimals);
  const price =
    data && adjustTokenDecimalsForShareContract && toNormalNumber(data[3], adjustTokenDecimalsForShareContract);
  const filledAmount = data && toNormalNumber(data[4], shareContractDecimals);
  const filler = data && (data[5] as String0x);
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
    refetchOrderDetails,
  };
};

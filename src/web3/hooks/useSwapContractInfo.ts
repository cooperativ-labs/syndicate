import { useContractReads, useContractRead, erc20ABI } from 'wagmi';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';

export type SwapContractInfoType = {
  shareTokenAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  swapApprovalsEnabled: boolean | undefined;
  txnApprovalsEnabled: boolean | undefined;
  nextOrderId: number | undefined;
  swapContractVersion: string | undefined;
  isLoading: boolean | undefined;
  issueReachingSwapContract: boolean;
  refetchSwapContract: () => void;
};

export const useSwapContractInfo = (swapContractAddress: String0x): SwapContractInfoType => {
  const baseContractInfo = {
    address: swapContractAddress,
    abi: swapContractABI,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSwapContract,
  } = useContractReads({
    contracts: [
      { ...baseContractInfo, functionName: 'shareToken' },
      { ...baseContractInfo, functionName: 'paymentToken' },
      { ...baseContractInfo, functionName: 'swapApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'txnApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'nextOrderId' },
      { ...baseContractInfo, functionName: 'contractVersion' },
    ],
  });

  const shareTokenAddress = data ? (data[0].result as String0x) : undefined;
  const paymentTokenAddress = data ? (data[1].result as String0x) : undefined;
  const swapApprovalsEnabled = data ? (data[2].result as boolean) : undefined;
  const txnApprovalsEnabled = data ? (data[3].result as boolean) : undefined;
  const nextOrderId = data ? Number(data[4].result) : undefined;
  const swapContractVersion = data ? (data[5].result as string) : undefined;
  const issueReachingSwapContract = !!swapContractAddress && !swapContractVersion;

  const { data: paymentTokenDecimals } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'decimals',
  });

  return {
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    swapContractVersion,
    isLoading,
    issueReachingSwapContract,
    refetchSwapContract,
  };
};

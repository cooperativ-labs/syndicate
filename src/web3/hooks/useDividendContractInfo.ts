import { useContractReads } from 'wagmi';
import { String0x } from '../helpersChain';
import { dividendContractABI } from '../generated';

export type DividendContractInfoType = {
  shareTokenAddress: String0x | undefined;
  reclaimTime: number | undefined;
  dividendContractVersion: string | undefined;
  isLoading: boolean;
  refetchSwapContract: () => void;
};

export const useDividendContractInfo = (dividendContactAddress: String0x): DividendContractInfoType | undefined => {
  const baseContractInfo = {
    address: dividendContactAddress,
    abi: dividendContractABI,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSwapContract,
  } = useContractReads({
    contracts: [
      { ...baseContractInfo, functionName: 'sharesToken' },
      { ...baseContractInfo, functionName: 'reclaim_time' },
      { ...baseContractInfo, functionName: 'contractVersion' },
    ],
  });

  const shareTokenAddress = data ? (data[0].result as String0x) : undefined;
  const reclaimTime = data ? Number(data[1].result) : undefined;
  const dividendContractVersion = data ? (data[2].result as string) : undefined;

  return {
    shareTokenAddress,
    reclaimTime,
    dividendContractVersion,
    isLoading,
    refetchSwapContract,
  };
};

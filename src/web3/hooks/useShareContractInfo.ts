import { useContractReads } from 'wagmi';
import { shareContractDecimals, toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { shareContractABI } from '../generated';

export type ShareContractInfoType = {
  contractOwner: string | undefined;
  isManager: boolean | undefined;
  isWhitelisted: boolean | undefined;
  myShares: number | undefined;
  sharesOutstanding: number | undefined;
  allDocuments: any | undefined;
  firstPartition: String0x | undefined;
  shareContractVersion: string | undefined;
  isLoading: boolean | undefined;
  refetchShareContract: () => void;
};

export const useShareContractInfo = (
  shareContractId: String0x,
  userWalletAddress: String0x | undefined
): ShareContractInfoType => {
  const baseContractInfo = {
    address: shareContractId,
    abi: shareContractABI,
  };

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchShareContract,
  } = useContractReads({
    contracts: [
      { ...baseContractInfo, functionName: 'owner' },
      {
        ...baseContractInfo,
        functionName: 'isManager',
        args: [userWalletAddress as `0x${string}}`],
      },
      {
        ...baseContractInfo,
        functionName: 'isWhitelisted',
        args: [userWalletAddress as `0x${string}}`],
      },
      {
        ...baseContractInfo,
        functionName: 'balanceOf',
        args: [userWalletAddress as `0x${string}}`],
      },
      { ...baseContractInfo, functionName: 'totalSupply' },
      { ...baseContractInfo, functionName: 'getAllDocuments' },
      { ...baseContractInfo, functionName: 'partitionList', args: [BigInt(0)] },
      { ...baseContractInfo, functionName: 'contractVersion' },
    ],
  });

  const contractOwner = data ? data[0].result : undefined;
  const isManager = data ? data[1].result : undefined;
  const isWhitelisted = data ? data[2].result : undefined;
  const myShares = data ? toNormalNumber(data[3].result, shareContractDecimals) : undefined;
  const sharesOutstanding = data ? toNormalNumber(data[4].result, shareContractDecimals) : undefined;
  const allDocuments = data ? data[5].result : undefined;
  const firstPartition = data ? (data[6].result as String0x) : undefined;
  const shareContractVersion = data ? data[7].result : undefined;

  return {
    contractOwner,
    isManager,
    isWhitelisted,
    myShares,
    sharesOutstanding,
    allDocuments,
    firstPartition,
    shareContractVersion,
    isLoading,
    refetchShareContract,
  };
};

import { useContractReads } from 'wagmi';
import { shareContractDecimals, toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { shareContractABI } from '../generated';

export type ShareContractInfoType = {
  contractOwner: string | undefined;
  isManager: boolean | undefined;
  isWhitelisted: boolean | undefined;
  myShareQty: number | undefined;
  sharesOutstanding: number | undefined;
  smartContractDocuments: any | undefined;
  firstPartition: String0x | undefined;
  shareContractVersion: string | undefined;
  isLoading: boolean | undefined;
  issueReaching1410: boolean;
  refetchShareContract: () => void;
};

export const useShareContractInfo = (
  shareContractAddress: String0x,
  userWalletAddress: String0x | undefined
): ShareContractInfoType => {
  const baseContractInfo = {
    address: shareContractAddress,
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

  const contractOwner = data ? (data[0].result as String0x) : undefined;
  const isManager = data ? (data[1].result as boolean) : undefined;
  const isWhitelisted = data ? (data[2].result as boolean) : undefined;
  const myShareQty = data ? toNormalNumber(data[3].result as bigint, shareContractDecimals) : 0;
  const sharesOutstanding = data ? toNormalNumber(data[4].result as bigint, shareContractDecimals) : undefined;
  const smartContractDocuments = data ? data[5].result : undefined;
  const firstPartition = data ? (data[6].result as String0x) : undefined;
  const shareContractVersion = data ? (data[7].result as string) : undefined;
  const issueReaching1410 = !!shareContractABI && !shareContractVersion;

  return {
    contractOwner,
    isManager,
    isWhitelisted,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    firstPartition,
    shareContractVersion,
    isLoading,
    issueReaching1410,
    refetchShareContract,
  };
};

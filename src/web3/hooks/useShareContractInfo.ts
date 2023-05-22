import { useContractReads } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { shareContractABI } from '../generated';

export type ShareContractInfoType = {
  contractOwner: string;
  isManager: boolean;
  isWhitelisted: boolean;
  myShares: number;
  sharesOutstanding: number;
  allDocuments: any;
  decimals: number;
  partitions: String0x[];
  isLoading: boolean;
};

export const useShareContractInfo = (
  shareContractId: String0x,
  userWalletAddress: string
): ShareContractInfoType | undefined => {
  if (!shareContractId) {
    console.warn('No contract ID provided');
  }
  const baseContractInfo = {
    address: shareContractId,
    abi: shareContractABI,
  };

  if (!userWalletAddress) {
    throw new Error('No user wallet address provided');
  }

  const { data, isLoading, isError, error } = useContractReads({
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
    ],
  });

  const decimals = data ? 18 : undefined;
  const contractOwner = data ? data[0].result : undefined;
  const isManager = data ? data[1].result : undefined;
  const isWhitelisted = data ? data[2].result : undefined;
  const myShares = data ? toNormalNumber(data[3].result, decimals) : undefined;
  const sharesOutstanding = data ? toNormalNumber(data[4].result, decimals) : undefined;
  const allDocuments = data ? data[5].result : undefined;
  const fundsDistributed = data ? 20000 : undefined;
  const numDistributions = data ? 4 : undefined;
  const partitions = data
    ? ['0xd300972c270941fe75b0929dadadff16cd5462ba2093bf53e8f76bc345ecf955' as String0x]
    : undefined;
  const myBacBalance = data ? 234000 : undefined;

  return {
    contractOwner,
    isManager,
    isWhitelisted,
    myShares,
    sharesOutstanding,
    allDocuments,
    decimals,
    partitions,
    isLoading,
  };
};

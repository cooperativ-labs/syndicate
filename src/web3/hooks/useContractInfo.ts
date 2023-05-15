import { useContractRead, useContractReads } from 'wagmi';
import ABI from '../ABI';
import { toNormalNumber } from '../util';
import { BigNumber } from 'ethers';

export type ContractInfoType = {
  contractOwner: string;
  isManager: boolean;
  isWhitelisted: boolean;
  myShares: number;
  sharesOutstanding: number;
  allDocuments: any;
  fundsDistributed: number;
  numDistributions: number;
  bacId: string;
  myBacBalance: number;
  contractHashes: readonly [string, `0x${string}`, BigNumber] & {};
  decimals: number;
  isLoading: boolean;
};

export const useContractInfo = (
  contractId: `0x${string}}`,
  userWalletAddress: string
): ContractInfoType | undefined => {
  const baseContractInfo = {
    address: contractId,
    abi: ABI,
  };

  if (!contractId) {
    throw new Error('No contract ID provided');
  }
  if (!userWalletAddress) {
    throw new Error('No user wallet address provided');
  }

  const { data, isLoading, isError } = useContractReads({
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

  const decimals = 18;
  const contractOwner = data ? data[0] : undefined;
  const isManager = data ? data[1] : undefined;
  const isWhitelisted = data ? data[2] : undefined;
  const myShares = data ? toNormalNumber(data[3], decimals) : undefined;
  const sharesOutstanding = data ? toNormalNumber(data[4], decimals) : undefined;
  const allDocuments = data ? data[5] : undefined;
  const fundsDistributed = data ? 20000 : undefined;
  const numDistributions = data ? 4 : undefined;
  const bacId = data ? '0x66458Bb9BF8e09eA40cf916BCb370727455F6040' : undefined;
  // const contractBacBalance = data ? data[8] : undefined;
  const myBacBalance = data ? 234000 : undefined;

  const contractHashes = undefined;

  // if (allDocuments) {
  //  const { data: documentData } = useContractRead({
  //   ...baseContractInfo,
  //   functionName: 'getDocument',
  //   args: [allDocuments[0]],
  // });
  //  setHashes
  // }

  return {
    contractOwner,
    isManager,
    isWhitelisted,
    myShares,
    sharesOutstanding,
    allDocuments,
    fundsDistributed,
    numDistributions,
    bacId,
    myBacBalance,
    contractHashes,
    decimals,
    isLoading,
  };
};

import { useContractReads, useContractEvent, useContractRead, erc20ABI } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';
import { getCurrencyById } from '@src/utils/enumConverters';
import { Dispatch, SetStateAction, useState } from 'react';

export type SwapContractInfoType = {
  shareTokenAddress: String0x;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  swapApprovalsEnabled: boolean;
  txnApprovalsEnabled: boolean;
  nextOrderId: number;
  swapContractVersion: string;
  isLoading: boolean;
  refetchSwapContract: () => void;
};

export const useSwapContractInfo = (swapContractId: String0x): SwapContractInfoType | undefined => {
  const baseContractInfo = {
    address: swapContractId,
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

  useContractEvent({
    ...baseContractInfo,
    eventName: 'ProceedsWithdrawn',
    listener(log) {
      console.log(log);
    },
  });

  const shareTokenAddress = data ? data[0].result : undefined;
  const paymentTokenAddress = data ? data[1].result : undefined;
  const swapApprovalsEnabled = data ? data[2].result : undefined;
  const txnApprovalsEnabled = data ? data[3].result : undefined;
  const nextOrderId = data ? Number(data[4].result) : undefined;
  const swapContractVersion = data ? data[5].result : undefined;

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
    refetchSwapContract,
  };
};

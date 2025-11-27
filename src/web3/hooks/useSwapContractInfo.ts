import { erc20Abi } from 'viem';
import { useReadContract, useReadContracts } from 'wagmi';

import { swapContractABI } from '../generated';
import { String0x } from '../helpersChain';
import { CurrencyCodeType } from '@/types';
import { getCurrencyOption } from '@src/utils/enumConverters';

export type SwapContractInfoType = {
  shareTokenAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  listingApprovalsRequired: boolean;
  txnApprovalsRequired: boolean;
  nextOrderId: number | undefined;
  swapContractVersion: string | undefined;
  isLoading: boolean | undefined;
  issueReachingSwapContract: boolean;
  refetchSwapContract: () => void;
};

export const useSwapContractInfo = (
  swapContractAddress: String0x,
  investment_currency: CurrencyCodeType | undefined | null
): SwapContractInfoType => {
  const baseContractInfo = {
    address: swapContractAddress,
    abi: swapContractABI
  };

  const paymentToken = investment_currency ? getCurrencyOption(investment_currency) : undefined;
  const defaultPaymentTokenAddress = paymentToken?.address as String0x;
  const defaultPaymentTokenDecimals = paymentToken ? paymentToken.decimals : 18;

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchSwapContract
  } = useReadContracts({
    contracts: [
      { ...baseContractInfo, functionName: 'shareToken' },
      { ...baseContractInfo, functionName: 'paymentToken' },
      { ...baseContractInfo, functionName: 'swapApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'txnApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'nextOrderId' },
      { ...baseContractInfo, functionName: 'contractVersion' }
    ]
  });

  const shareTokenAddress = data ? (data[0].result as String0x) : undefined;
  const paymentTokenAddress = data ? (data[1].result as String0x) : defaultPaymentTokenAddress;
  const listingApprovalsRequired = data ? (data[2].result as boolean) : undefined;
  const txnApprovalsRequired = data ? (data[3].result as boolean) : undefined;
  const nextOrderId = data ? Number(data[4].result) : undefined;
  const swapContractVersion = data ? (data[5].result as string) : undefined;
  const issueReachingSwapContract = !!swapContractAddress && !swapContractVersion;

  const { data: paymentTokenDecimals } = useReadContract({
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: 'decimals'
  });

  return {
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals: paymentTokenDecimals ?? defaultPaymentTokenDecimals,
    listingApprovalsRequired: listingApprovalsRequired ?? false,
    txnApprovalsRequired: txnApprovalsRequired ?? false,
    nextOrderId,
    swapContractVersion,
    isLoading,
    issueReachingSwapContract,
    refetchSwapContract
  };
};

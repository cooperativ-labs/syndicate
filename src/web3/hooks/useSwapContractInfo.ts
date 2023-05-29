import { useContractReads } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';
import { getCurrencyById } from '@src/utils/enumConverters';

export type SwapContractInfoType = {
  shareToken: String0x;
  paymentToken: String0x;
  swapApprovalsEnabled: boolean;
  txnApprovalsEnabled: boolean;
  nextOrderId: number;
  isLoading: boolean;
};

export const useSwapContractInfo = (swapContractId: String0x): SwapContractInfoType | undefined => {
  const baseContractInfo = {
    address: swapContractId,
    abi: swapContractABI,
  };

  const { data, isLoading, isError, error } = useContractReads({
    contracts: [
      { ...baseContractInfo, functionName: 'shareToken' },
      { ...baseContractInfo, functionName: 'paymentToken' },
      { ...baseContractInfo, functionName: 'swapApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'txnApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'nextOrderId' },
    ],
  });

  const shareToken = data ? data[0].result : undefined;
  const paymentToken = data ? data[1].result : undefined;
  const paymentTokenDecimals = getCurrencyById(paymentToken)?.decimals;
  const swapApprovalsEnabled = data ? data[2].result : undefined;
  const txnApprovalsEnabled = data ? data[3].result : undefined;
  const nextOrderId = data ? Number(data[4].result) : undefined;

  return {
    shareToken,
    paymentToken,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    isLoading,
  };
};

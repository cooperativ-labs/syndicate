import { useContractReads } from 'wagmi';
import { toNormalNumber } from '../util';
import { String0x } from '../helpersChain';
import { swapContractABI } from '../generated';
import { getCurrencyById } from '@src/utils/enumConverters';

export type SwapContractInfoType = {
  shareToken: String0x;
  paymentToken: String0x;
  balanceERC20: number;
  balanceETH: number;
  swapApprovalsEnabled: boolean;
  txnApprovalsEnabled: boolean;
  nextOrderId: number;
  isLoading: boolean;
};

export const useSwapContractInfo = (swapContractId: String0x): SwapContractInfoType | undefined => {
  if (!swapContractId) {
    console.warn('No contract ID provided');
  }
  const baseContractInfo = {
    address: swapContractId,
    abi: swapContractABI,
  };

  const { data, isLoading, isError, error } = useContractReads({
    contracts: [
      { ...baseContractInfo, functionName: 'shareToken' },
      { ...baseContractInfo, functionName: 'paymentToken' },
      { ...baseContractInfo, functionName: 'getBalanceERC20' },
      { ...baseContractInfo, functionName: 'getBalanceETH' },
      { ...baseContractInfo, functionName: 'swapApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'txnApprovalsEnabled' },
      { ...baseContractInfo, functionName: 'nextOrderId' },
    ],
  });

  const shareToken = data ? data[0].result : undefined;
  const paymentToken = data ? data[1].result : undefined;
  const paymentTokenDecimals = getCurrencyById(paymentToken)?.decimals;
  const balanceERC20 = data ? toNormalNumber(data[2].result, paymentTokenDecimals) : undefined;
  const balanceETH = data ? toNormalNumber(data[2].result, 18) : undefined;
  const swapApprovalsEnabled = data ? data[4].result : undefined;
  const txnApprovalsEnabled = data ? data[5].result : undefined;
  const nextOrderId = data ? Number(data[6].result) : undefined;

  return {
    shareToken,
    paymentToken,
    balanceERC20,
    balanceETH,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    isLoading,
  };
};

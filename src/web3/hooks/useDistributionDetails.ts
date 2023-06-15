import { useContractRead } from 'wagmi';
import { String0x } from '../helpersChain';
import { dividendContractABI } from '../generated';
import { shareContractDecimals, toNormalNumber } from '../util';
import { getCurrencyById } from '@src/utils/enumConverters';

export type DistributionDetailsType = {
  dividendPartition: String0x | undefined;
  blockTimestamp: BigInt | undefined;
  exDividendDate: Date | undefined;
  recordDate: Date | undefined;
  payoutDate: Date | undefined;
  dividendAmount: number | undefined;
  // totalSupplyOfShares: number | undefined
  payoutTokenAddress: String0x | undefined;
  isErc20Payout: boolean | undefined;
  amountRemaining: number | undefined;
  error: any | undefined;
  isLoading: boolean | undefined;
  refetchDistributionDetails: () => void;
};

export const useDistributionDetails = (
  dividendContactAddress: String0x,
  contractIndex: number
): DistributionDetailsType => {
  const {
    data,
    error,
    isLoading,
    refetch: refetchDistributionDetails,
  } = useContractRead({
    address: dividendContactAddress,
    abi: dividendContractABI,
    functionName: 'dividends',
    args: [BigInt(contractIndex)],
  });

  const dividendPartition = data ? data[0] : undefined;
  const blockTimestamp = data ? data[1] : undefined;
  const exDividendDate = data ? new Date(Number(data[2]) * 1000) : undefined;
  const recordDate = data ? new Date(Number(data[3]) * 1000) : undefined;
  const payoutDate = data ? new Date(Number(data[4]) * 1000) : undefined;
  const payoutTokenAddress = data ? data[7] : undefined;
  const dividendAmount = data ? toNormalNumber(data[5], getCurrencyById(payoutTokenAddress)?.decimals) : undefined;
  const totalSupplyOfShares = data ? toNormalNumber(data[6], shareContractDecimals) : undefined;
  const isErc20Payout = data ? data[8] : undefined;
  const amountRemaining = data ? toNormalNumber(data[9], getCurrencyById(payoutTokenAddress)?.decimals) : undefined;

  return {
    dividendPartition,
    blockTimestamp,
    exDividendDate,
    recordDate,
    payoutDate,
    dividendAmount,
    // totalSupplyOfShares,
    payoutTokenAddress,
    isErc20Payout,
    amountRemaining,
    error,
    isLoading,
    refetchDistributionDetails,
  };
};

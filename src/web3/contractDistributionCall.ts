import { Dispatch, SetStateAction } from 'react';
import { String0x, StandardChainErrorHandling } from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';

import { waitForTransaction, writeContract, prepareWriteContract, getPublicClient } from 'wagmi/actions';

import { dividendContractABI } from './generated';
import toast from 'react-hot-toast';
import { toContractNumber } from './util';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getCurrencyById } from '@src/utils/enumConverters';

type SubmitDistributionProps = {
  distributionContractAddress: String0x | undefined;
  amount: number | undefined;
  distributionTokenDecimals: number | undefined;
  distributionTokenAddress: String0x | undefined;
  partition: String0x;
  offeringId: string;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  addDistribution: (
    options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>>
  ) => Promise<any>;
};

export const submitDistribution = async ({
  distributionContractAddress,
  amount,
  distributionTokenDecimals,
  distributionTokenAddress,
  partition,
  offeringId,
  setButtonStep,
  addDistribution,
}: SubmitDistributionProps) => {
  const call = async () => {
    const publicClient = getPublicClient();
    const block = await publicClient.getBlock();
    if (!block) {
      toast.error('Unable to get block number');
      return;
    }
    const blockNumber = block.number as bigint;
    const TimestampWithBuffer = block.timestamp + BigInt(40);
    const exDividendDate = TimestampWithBuffer;
    const recordDate = TimestampWithBuffer;
    const payoutDate = TimestampWithBuffer;
    const amountInDecimal =
      amount && distributionTokenDecimals ? toContractNumber(amount, distributionTokenDecimals) : BigInt(0);
    const payoutToken = distributionTokenAddress ? distributionTokenAddress : '0x0000000';
    const payoutTokenSymbol = getCurrencyById(distributionTokenAddress)?.symbol;
    try {
      const { request, result } = await prepareWriteContract({
        address: distributionContractAddress as String0x,
        abi: dividendContractABI,
        functionName: 'depositDividend',
        args: [blockNumber, exDividendDate, recordDate, payoutDate, amountInDecimal, payoutToken, partition],
      });
      const { hash } = await writeContract(request);
      const transaction = await waitForTransaction({
        hash: hash,
      });
      const contractIndex = Number(result);
      await addDistribution({
        variables: {
          offeringId: offeringId,
          transactionHash: transaction.transactionHash,
          contractIndex: contractIndex,
        },
      });
      setButtonStep('confirmed');
      toast.success(`${numberWithCommas(amount)} ${payoutTokenSymbol} has been distributed`);
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  call();
};

type ClaimDividendProps = {
  distributionContractAddress: String0x;
  distributionContractIndex: number;
  setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
};

export const claimDistribution = async ({
  distributionContractAddress,
  distributionContractIndex,
  setButtonStep,
}: ClaimDividendProps) => {
  setButtonStep('step1');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'claimDividend',
        args: [BigInt(distributionContractIndex)],
      });
      const { hash } = await writeContract(request);
      await waitForTransaction({
        hash: hash,
      });
      setButtonStep('confirmed');
    } catch (e) {
      StandardChainErrorHandling(e, setButtonStep);
    }
  };
  call();
};

import { Dispatch, SetStateAction } from 'react';
import { String0x, StandardChainErrorHandling } from './helpersChain';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';

import { waitForTransaction, writeContract, prepareWriteContract, getPublicClient } from 'wagmi/actions';

import { dividendContractABI } from './generated';
import toast from 'react-hot-toast';
import { toContractNumber } from './util';

type SubmitDistributionProps = {
  distributionContractAddress: String0x;
  amount: number;
  distributionTokenDecimals: number;
  distributionTokenAddress: String0x;
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
  setButtonStep('submitting');
  const call = async () => {
    const publicClient = getPublicClient();
    const block = await publicClient.getBlock();
    const blockTimestamp = block.timestamp;
    const blockTime = blockTimestamp;
    const exDividendDate = blockTime;
    const recordDate = blockTime;
    const payoutDate = blockTimestamp + BigInt(50);
    const amountInDecimal = toContractNumber(amount, distributionTokenDecimals);
    const payoutToken = distributionTokenAddress;

    try {
      const { request, result } = await prepareWriteContract({
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'depositDividend',
        args: [blockTime, exDividendDate, recordDate, payoutDate, amountInDecimal, payoutToken, partition],
      });
      const { hash } = await writeContract(request);
      const transaction = await waitForTransaction({
        hash: hash,
      });
      const contractIndex = Number(result);
      console.log({ contractIndex });
      await addDistribution({
        variables: {
          offeringId: offeringId,
          transactionHash: transaction.transactionHash,
          contractIndex: contractIndex,
        },
      });
      setButtonStep('confirmed');
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
  setButtonStep('submitting');
  const call = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: distributionContractAddress,
        abi: dividendContractABI,
        functionName: 'claimDividend',
        args: [distributionContractIndex],
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

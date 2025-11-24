import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { addDistribution } from '@src/utils/actions/orderActions';
// import { isMetaMask } from '@src/web3/wagmi';
import { submitDistribution } from '@src/web3/contractDistributionCall';
import { setAllowance } from '@src/web3/contractSwapCalls';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import React, { FC, useEffect, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { erc20Abi } from 'viem';
import { useConnection, useReadContract } from 'wagmi';
import { z } from 'zod';

import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

type SubmitDistributionProps = {
  distributionContractAddress: String0x | undefined;
  distributionTokenDecimals: number | undefined;
  distributionTokenAddress: String0x | undefined;
  partitions: String0x[];
  offeringId: string;
  refetchContracts: () => void;
};
const distributionSchema = z.object({
  amount: z.coerce
    .number({ error: 'Please indicate how many shares you want to send' })
    .min(1, 'Please indicate how many shares you want to send'),
  partition: z.string().min(1, 'Select class')
});

type DistributionFormValues = z.infer<typeof distributionSchema>;

const SubmitDistribution: FC<SubmitDistributionProps> = ({
  distributionContractAddress,
  distributionTokenDecimals,
  distributionTokenAddress,
  partitions,
  offeringId,
  refetchContracts
}) => {
  const { address: userWalletAddress, connector } = useConnection();

  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const { data: rawAllowance } = useReadContract({
    address: distributionTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, distributionContractAddress as String0x]
  });

  const handleSubmitDistribution = async ({ amount, partition }: DistributionFormValues) => {
    const allowance =
      rawAllowance && toNormalNumber(rawAllowance as bigint, distributionTokenDecimals);
    const allowanceRequiredForPurchase = amount;
    const isAllowanceSufficient = allowance ? allowance >= allowanceRequiredForPurchase : false;

    const callSubmitDistribution = async () => {
      await submitDistribution({
        distributionContractAddress,
        amount,
        distributionTokenDecimals,
        distributionTokenAddress,
        partition: partition as String0x,
        offeringId: offeringId,
        setButtonStep,
        addDistribution
      });
    };

    if (!isAllowanceSufficient) {
      setButtonStep('step1');
      await setAllowance({
        paymentTokenAddress: distributionTokenAddress,
        paymentTokenDecimals: distributionTokenDecimals,
        spenderAddress: distributionContractAddress,
        amount: allowanceRequiredForPurchase,
        setButtonStep
      });
      setButtonStep('step2');
      await callSubmitDistribution();
    } else if (isAllowanceSufficient) {
      setButtonStep('step2');
      await callSubmitDistribution();
    }
    refetchContracts();
  };
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<DistributionFormValues>({
    resolver: zodResolver(distributionSchema) as Resolver<DistributionFormValues>,
    defaultValues: {
      amount: undefined as unknown as number,
      partition: partitions[0] ?? ''
    }
  });

  useEffect(() => {
    reset({
      amount: undefined as unknown as number,
      partition: partitions[0] ?? ''
    });
  }, [partitions, reset]);

  return (
    <>
      <WalletActionModal open={buttonStep === 'step1' || buttonStep === 'step2'}>
        <WalletActionIndicator
          step={buttonStep}
          step1Text='Permitting the contract to spend your tokens'
          step1SubText='This will permit the contract to create a distribution'
          step2Text='Submitting distribution'
          step2SubText='This will submit the distribution to the contract'
        />
      </WalletActionModal>

      <form
        className='flex flex-col gap relative'
        onSubmit={handleSubmit(handleSubmitDistribution)}
      >
        <Field className='pt-3 bg-opacity-0'>
          <FieldLabel htmlFor='distribution-amount'>Amount to distribute</FieldLabel>
          <FieldContent>
            <Input
              id='distribution-amount'
              type='number'
              placeholder='2000'
              aria-invalid={Boolean(errors.amount)}
              {...register('amount')}
            />
            <FieldError errors={errors.amount ? [errors.amount] : undefined} />
          </FieldContent>
        </Field>
        <Field className='mt-3'>
          <FieldLabel htmlFor='distribution-partition'>Share class</FieldLabel>
          <FieldContent>
            <select
              id='distribution-partition'
              className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              aria-invalid={Boolean(errors.partition)}
              {...register('partition')}
            >
              <option value=''>Select class</option>
              {partitions.map((partition, i) => (
                <option key={partition ?? i} value={partition}>
                  {stringFromBytes32(partition)}
                </option>
              ))}
            </select>
            <FieldError errors={errors.partition ? [errors.partition] : undefined} />
          </FieldContent>
        </Field>
        <div className='mt-4' />
        <LoadingButtonChain
          type='submit'
          disabled={isSubmitting || buttonStep === 'step1'}
          state={buttonStep}
          idleText={`Distribute funds to shareholders`}
          step1Text='Submitting...'
          confirmedText='Confirmed!'
          failedText='Transaction failed'
          rejectedText='You rejected the transaction. Click here to try again.'
        />
      </form>
    </>
  );
};

export default SubmitDistribution;

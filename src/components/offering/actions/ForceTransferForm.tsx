import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import { LoadingButton } from '@src/components/ui/loading-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { forceTransfer } from '@src/web3/contractShareCalls';
import { shareContractABI } from '@src/web3/generated';
import { addressWithoutEns, String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { getWagmiConfig } from '@src/web3/wagmi';
import React from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { useAsync } from 'react-use';
import { useAccount, useContractRead } from 'wagmi';
import { readContract } from 'wagmi/actions';
import { z } from 'zod';

import { OfferingParticipant } from '@/types';

import SetOperatorButton from './SetOperatorButton';

type ForceTransferFormProps = {
  shareContractAddress: String0x;
  partitions: String0x[];
  offeringParticipants: OfferingParticipant[] | undefined | null;
  target: String0x;
  refetchContracts: () => void;
};

const ForceTransferForm = ({
  shareContractAddress,
  partitions,
  offeringParticipants,
  target,
  refetchContracts
}: ForceTransferFormProps) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonState, setButtonState] = React.useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const [partition, setPartition] = React.useState<String0x>(partitions[0]);
  const [targetBalance, setTargetBalance] = React.useState<number>(0);

  const recipientOptions = offeringParticipants?.filter((participant: OfferingParticipant) => {
    return participant?.wallet_address !== target;
  });

  const { data: isOperator, refetch } = useContractRead({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'isOperator',
    args: [userWalletAddress as String0x]
  });

  useAsync(async () => {
    const data = await readContract(getWagmiConfig(), {
      address: shareContractAddress,
      abi: shareContractABI,
      functionName: 'balanceOfByPartition',
      args: [partition, target]
    });
    const targetBalance = data ? toNormalNumber(data, shareContractDecimals) : 0;
    setTargetBalance(targetBalance);
  }, [partition, shareContractAddress, target]);

  const schema = z.object({
    partition: z.string().min(1, 'Required'),
    amount: z.coerce
      .number({ message: 'Invalid amount' })
      .positive({ message: 'Amount must be positive' })
      .max(targetBalance, { message: 'Amount cannot exceed target balance' }),
    recipient: z.string().min(1, { message: 'Required' })
  });

  const { control, register, handleSubmit, formState, watch } = useForm<{
    partition: string;
    amount: number;
    recipient: string;
  }>({
    resolver: zodResolver(schema) as Resolver<{
      partition: string | String0x;
      amount: number;
      recipient: string;
    }>,
    defaultValues: {
      partition: partitions[0] || '',
      amount: undefined as unknown as number,
      recipient: ''
    }
  });

  const watchedPartition = watch('partition');
  const watchedRecipient = watch('recipient');

  React.useEffect(() => {
    if (watchedPartition) {
      setPartition(watchedPartition as String0x);
    }
  }, [watchedPartition]);

  return (
    <form
      onSubmit={handleSubmit(async values => {
        setButtonState('loading');
        await forceTransfer({
          shareContractAddress,
          partition: values.partition as String0x,
          amount: Number(values.amount),
          target,
          recipient: values.recipient as String0x,
          setButtonStep: (state: any) => {
            if (state === 'idle' || state === 'confirmed') {
              setButtonState('success');
            } else if (state === 'failed' || state === 'rejected') {
              setButtonState('error');
            } else if (state === 'step1' || state === 'step2' || state === 'step3') {
              setButtonState('loading');
            }
          },

          refetchContracts
        });
      })}
    >
      <div className={'mt-3'}>
        <Label>Share class</Label>
        <Controller
          control={control}
          name='partition'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Select class' />
              </SelectTrigger>
              <SelectContent>
                {partitions.map((p, i) => (
                  <SelectItem key={i} value={p}>
                    {stringFromBytes32(p)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {formState.errors.partition && (
          <div className='text-sm text-red-500 mt-1'>{formState.errors.partition.message}</div>
        )}
      </div>

      <div className={'mt-3'}>
        <Label>{`Amount to transfer (${targetBalance} available)`}</Label>
        <Input type='number' placeholder='5' aria-label='Amount' {...register('amount')} />
        {formState.errors.amount && (
          <div className='text-sm text-red-500 mt-1'>{formState.errors.amount.message}</div>
        )}
      </div>

      <div className={'mt-3'}>
        <Label>Receives Shares</Label>
        <Controller
          control={control}
          name='recipient'
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder='Select recipient' />
              </SelectTrigger>
              <SelectContent>
                {recipientOptions?.map((participant, i) => {
                  const presentableAddress = addressWithoutEns({
                    address: participant?.wallet_address,
                    userName: participant?.name ?? ''
                  });
                  return (
                    <SelectItem key={i} value={participant?.wallet_address as String0x}>
                      {presentableAddress}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
        {formState.errors.recipient && (
          <div className='text-sm text-red-500 mt-1'>{formState.errors.recipient.message}</div>
        )}
      </div>

      {!isOperator ? (
        <SetOperatorButton shareContractAddress={shareContractAddress} refetch={refetch} />
      ) : (
        <LoadingButton
          variant='destructive'
          buttonState={buttonState}
          setButtonState={setButtonState}
          text={
            watchedRecipient
              ? `Force Transfer to ${addressWithoutEns({ address: watchedRecipient as String0x })}`
              : 'Force Transfer'
          }
          loadingText='Transferring...'
          successText='Shares transferred!'
          errorText='Transaction failed'
          reset
          className='mt-2 w-full'
          type='submit'
        />
      )}
    </form>
  );
};

export default ForceTransferForm;

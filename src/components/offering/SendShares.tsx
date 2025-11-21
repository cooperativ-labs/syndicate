import { zodResolver } from '@hookform/resolvers/zod';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { addContractPartition } from '@src/utils/actions/cryptoActions';
import { addTransferEvent } from '@src/utils/actions/orderActions';
import { bacOptions, fiatOptions, getCurrencyByCode } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { sendShares } from '@src/web3/contractShareCalls';
import { shareContractABI } from '@src/web3/generated';
import { addressWithoutEns, String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAccount, useChainId, useReadContract } from 'wagmi';
import { z } from 'zod';

import { CurrencyCode, CurrencyCodeType, OfferingParticipant } from '@/types';

import { SendSharesProps } from '../investor/tradingForms/offering-actions-types';

import SetOperatorButton from './actions/SetOperatorButton';

const SendShares: FC<SendSharesProps> = ({
  sharesIssued,
  sharesOutstanding,
  shareContractAddress,
  shareContractId,
  participants,
  partitions,
  myShareQty,
  investmentCurrency,
  currentSalePrice,
  refetchMainContracts
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const { data: isOperator, refetch } = useReadContract({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'isOperator',
    args: [userWalletAddress as String0x]
  });

  const sharesRemaining = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });
  const purchaseCurrencyOptions = [
    bacOptions.filter(bac => bac.chainId === chainId),
    fiatOptions
  ].flat();

  const sendSharesSchema = z
    .object({
      isIssuance: z.string(),
      numShares: z
        .string()
        .min(1, 'Please indicate how many shares you want to send')
        .refine(
          val => {
            const num = parseInt(val, 10);
            return !isNaN(num) && num > 0;
          },
          { message: 'Please enter a valid number of shares' }
        ),
      price: z.number().min(0.01, 'Please set a price'),
      currencyCode: z
        .string()
        .optional()
        .refine(val => !val || Object.values(CurrencyCode).includes(val as CurrencyCodeType), {
          message: 'Please select a valid currency'
        }),
      recipient: z.string().min(1, 'Please indicate who you want to send shares to'),
      partition: z.string(),
      newPartition: z.string().optional()
    })
    .superRefine((data, ctx) => {
      const numShares = parseInt(data.numShares, 10);
      const isIssuance = data.isIssuance === 'yes';
      const maxShares = isIssuance ? sharesRemaining : myShareQty || 0;
      if (numShares > maxShares) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `You only have ${maxShares} remaining shares to send.`,
          path: ['numShares']
        });
      }
    })
    .refine(
      data => {
        if (!data.partition && !data.newPartition) {
          return false;
        }
        return true;
      },
      {
        message: 'Please specify a class of shares',
        path: ['partition']
      }
    )
    .refine(
      data => {
        if (data.partition === '0xNew' && !data.newPartition) {
          return false;
        }
        return true;
      },
      {
        message: 'Please specify a class of shares',
        path: ['newPartition']
      }
    );

  type SendSharesFormData = z.infer<typeof sendSharesSchema>;

  const form = useForm<SendSharesFormData>({
    resolver: zodResolver(sendSharesSchema),
    defaultValues: {
      isIssuance: 'yes',
      numShares: '',
      price: currentSalePrice || 0,
      currencyCode: investmentCurrency || undefined,
      recipient: '' as String0x,
      partition: partitions[0] || ('' as String0x),
      newPartition: ''
    }
  });

  const watchedIsIssuance = form.watch('isIssuance');
  const watchedNumShares = form.watch('numShares');
  const watchedRecipient = form.watch('recipient');
  const watchedPartition = form.watch('partition');

  const formButtonText = () => {
    const recipient = addressWithoutEns({ address: watchedRecipient });
    if (recipient && sharesIssued && watchedNumShares) {
      const numShares = parseInt(watchedNumShares, 10);
      return `Send ${numShares} out of ${sharesIssued} (${((numShares / sharesIssued) * 100).toFixed(1)}%) shares to ${recipient}`;
    }
    return 'Send shares';
  };

  const onSubmit = async (values: SendSharesFormData) => {
    const isIssuance = values.isIssuance === 'yes';
    if (isIssuance && !values.currencyCode) {
      toast.error('Please select a currency');
      return;
    }
    const currencyCode = (
      isIssuance ? values.currencyCode : investmentCurrency
    ) as CurrencyCodeType;
    const paymentTokenDecimals = getCurrencyByCode(currencyCode)?.decimals;
    try {
      await sendShares({
        shareContractAddress,
        paymentTokenDecimals,
        shareContractId,
        numShares: parseInt(values.numShares, 10),
        price: values.price,
        currencyCode,
        recipient: values.recipient as String0x,
        sender: userWalletAddress as String0x,
        partition: values.partition,
        newPartition: values.newPartition || '',
        isIssuance,
        addIssuance: addTransferEvent,
        setButtonStep,
        addPartition: addContractPartition,
        refetchMainContracts
      });
    } catch (e: any) {
      toast.error(`Error sending shares: ${e.message}`);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap relative">
      <FieldGroup>
        <FieldSet>
          {myShareQty ? (
            <Controller
              control={form.control}
              name="isIssuance"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Send type</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                      <SelectValue placeholder="Select send type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Issue new shares</SelectItem>
                      <SelectItem value="no">Transfer held shares</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.isIssuance
                        ? [form.formState.errors.isIssuance]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          ) : null}

          <Controller
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <Field>
                <FieldLabel>Investor&apos;s wallet address</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {participants?.map((participant, i) => {
                      const presentableAddress =
                        participant &&
                        addressWithoutEns({
                          address: participant.wallet_address,
                          userName: participant.name ?? ''
                        });
                      return (
                        <SelectItem key={i} value={participant?.wallet_address || ''}>
                          {presentableAddress}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FieldError
                  errors={
                    form.formState.errors.recipient ? [form.formState.errors.recipient] : undefined
                  }
                />
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="partition"
            render={({ field }) => (
              <Field>
                <FieldLabel>Share class</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {partitions.map((partition, i) => {
                      return (
                        <SelectItem key={i} value={partition}>
                          {stringFromBytes32(partition)}
                        </SelectItem>
                      );
                    })}
                    <SelectItem value="0xNew">+ Add new class</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError
                  errors={
                    form.formState.errors.partition ? [form.formState.errors.partition] : undefined
                  }
                />
              </Field>
            )}
          />

          {watchedPartition === '0xNew' && (
            <Controller
              control={form.control}
              name="newPartition"
              render={({ field }) => (
                <Field>
                  <FieldLabel>New class name</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Class A"
                    {...field}
                    className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
                  />
                  <FieldError
                    errors={
                      form.formState.errors.newPartition
                        ? [form.formState.errors.newPartition]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          )}

          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <Field>
                <FieldLabel>Price per share</FieldLabel>
                <Input
                  type="number"
                  placeholder="100"
                  {...field}
                  value={field.value || ''}
                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                  className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
                />
                <FieldError
                  errors={form.formState.errors.price ? [form.formState.errors.price] : undefined}
                />
              </Field>
            )}
          />

          {watchedIsIssuance === 'yes' && (
            <Controller
              control={form.control}
              name="currencyCode"
              render={({ field }) => (
                <Field>
                  <FieldLabel>Currency</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                      <SelectValue placeholder="Currency used for purchase" />
                    </SelectTrigger>
                    <SelectContent>
                      {purchaseCurrencyOptions.map((option, i) => {
                        return (
                          <SelectItem key={i} value={option.value}>
                            {option.symbol}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FieldError
                    errors={
                      form.formState.errors.currencyCode
                        ? [form.formState.errors.currencyCode]
                        : undefined
                    }
                  />
                </Field>
              )}
            />
          )}

          <Controller
            control={form.control}
            name="numShares"
            render={({ field }) => (
              <Field>
                <FieldLabel>
                  Number of shares to send (
                  {watchedIsIssuance === 'yes'
                    ? numberWithCommas(sharesRemaining)
                    : numberWithCommas(myShareQty || 0)}{' '}
                  available)
                </FieldLabel>
                <Input
                  type="number"
                  placeholder="40"
                  {...field}
                  className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
                />
                <FieldError
                  errors={
                    form.formState.errors.numShares ? [form.formState.errors.numShares] : undefined
                  }
                />
              </Field>
            )}
          />

          <hr className="bg-grey-600 my-3 mb-4" />
          {!isOperator && watchedIsIssuance === 'no' ? (
            <SetOperatorButton shareContractAddress={shareContractAddress} refetch={refetch} />
          ) : (
            <LoadingButtonChain
              type="submit"
              disabled={form.formState.isSubmitting || buttonStep === 'step1'}
              state={buttonStep}
              idleText={formButtonText()}
              step1Text="Sending shares..."
              confirmedText="Sent!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          )}
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default SendShares;

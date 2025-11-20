import { zodResolver } from '@hookform/resolvers/zod';
import NonInput, { defaultFieldDiv } from '@src/components/form-components/NonInput';
import { Field, FieldContent, FieldError, FieldLabel } from '@src/components/ui/field';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { Input } from '@src/components/ui/input';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { addContractPartition, AddContractPartitionParams } from '@src/utils/actions/cryptoActions';
import { createOrder, CreateOrderParams, CreateOrderResult } from '@src/utils/actions/orderActions';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAccount } from 'wagmi';

import { PostInitialSaleProps } from './offering-actions-types';

type WithAdditionalProps = PostInitialSaleProps & {
  sharesIssued: number | null;
  priceStart: number | null;
  offeringId: string;
  shareContractId: string;
  swapContractAddress: String0x;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
  refetchAllContracts: () => void;
};

const optionalPositiveInt = z
  .preprocess(value => {
    if (value === '' || value === null || typeof value === 'undefined') {
      return undefined;
    }
    return value;
  }, z.coerce.number().int().positive())
  .optional();

const postInitialSaleSchema = z
  .object({
    numShares: z.coerce.number().int().min(1, 'Please indicate how many shares you want to send'),
    price: z.coerce.number().positive('Price is required'),
    minUnits: optionalPositiveInt,
    maxUnits: optionalPositiveInt,
    partition: z.string().min(1, 'Please select a partition'),
    newPartition: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.maxUnits && data.numShares && data.maxUnits > data.numShares) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Maximum must be less then the total shares listed for sale',
        path: ['maxUnits']
      });
    }
    if (data.maxUnits && data.minUnits && data.maxUnits < data.minUnits) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Maximum must be greater than minimum',
        path: ['maxUnits']
      });
    }
    if (data.minUnits && data.maxUnits && data.minUnits > data.maxUnits) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Minimum must be less than maximum',
        path: ['minUnits']
      });
    }
    if (data.partition === '0xNew' && !data.newPartition) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please enter a new partition',
        path: ['newPartition']
      });
    }
  });

type PostInitialSaleFormValues = z.infer<typeof postInitialSaleSchema>;

const PostInitialSale: FC<WithAdditionalProps> = ({
  sharesIssued,
  sharesOutstanding,
  offeringId,
  priceStart,
  swapContractAddress,
  shareContractId,
  paymentTokenAddress,
  paymentTokenDecimals,
  partitions,
  setModal,
  refetchAllContracts,
  refetchOfferingInfo
}) => {
  const { address: userWalletAddress } = useAccount();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const handleCreateOrder = async (params: CreateOrderParams): Promise<CreateOrderResult> => {
    const result = await createOrder(params);
    return result;
  };

  const handleAddPartition = async (params: AddContractPartitionParams) => {
    const result = await addContractPartition(params);
    return result;
  };

  const sharesRemaining = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });

  const offerCalculator = (numUnits: number, price: number) => numUnits * price;

  const saleAmountString = (numUnits?: number, price?: number | null) => {
    if (!price || !numUnits) return '0';
    return numberWithCommas(offerCalculator(numUnits, price));
  };

  const defaultValues = useMemo(
    () => ({
      numShares: undefined as unknown as number,
      price: (priceStart ?? undefined) as unknown as number,
      minUnits: undefined as unknown as number,
      maxUnits: undefined as unknown as number,
      partition: partitions[0] ?? '',
      newPartition: ''
    }),
    [partitions, priceStart]
  );

  const validationSchema = useMemo(
    () =>
      postInitialSaleSchema.superRefine((data, ctx) => {
        if (sharesRemaining && data.numShares > sharesRemaining) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `You only have ${sharesRemaining} remaining shares to send.`,
            path: ['numShares']
          });
        }
      }),
    [sharesRemaining]
  );

  const resolver = useMemo(
    () => zodResolver(validationSchema) as Resolver<PostInitialSaleFormValues>,
    [validationSchema]
  );

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PostInitialSaleFormValues>({
    resolver,
    defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const partitionValue = watch('partition');
  const watchedNumShares = watch('numShares');
  const watchedPrice = watch('price');

  const formButtonText = () => {
    if (!sharesIssued) {
      return 'Offer shares';
    }
    if (!watchedNumShares || Number.isNaN(watchedNumShares)) {
      return 'Offer shares';
    }
    return `Offer ${watchedNumShares} out of ${sharesIssued} (${(
      (watchedNumShares / sharesIssued) *
      100
    ).toFixed(2)}%) for sale`;
  };

  const onSubmit = async (values: PostInitialSaleFormValues) => {
    const isContractOwner = true;
    const isAsk = true;
    const isIssuance = true;
    const isErc20Payment = true;
    if (!values.numShares || !values.price || !userWalletAddress) {
      return;
    }
    await submitSwap({
      userWalletAddress,
      numShares: values.numShares,
      price: values.price,
      partition: values.partition as String0x,
      newPartition: values.newPartition,
      minUnits: values.minUnits,
      maxUnits: values.maxUnits,
      visible: false,
      swapContractAddress: swapContractAddress,
      shareContractId: shareContractId,
      paymentTokenDecimals: paymentTokenDecimals as number,
      offeringId: offeringId,
      isContractOwner: isContractOwner,
      isAsk: isAsk,
      isIssuance: isIssuance,
      isErc20Payment: isErc20Payment,
      setButtonStep: setButtonStep,
      createOrder: handleCreateOrder,
      addPartition: handleAddPartition,
      refetchAllContracts,
      refetchOfferingInfo
    });
    setModal('shareSaleList');
  };

  return (
    <form className="flex flex-col gap relative" onSubmit={handleSubmit(onSubmit)}>
      <Field className="mt-3">
        <FieldLabel htmlFor="partition">Share class</FieldLabel>
        <FieldContent>
          <select
            id="partition"
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
            aria-invalid={Boolean(errors.partition)}
            {...register('partition')}
          >
            <option value="">Select class</option>
            {partitions.map((partition, i) => (
              <option key={`${partition}-${i}`} value={partition}>
                {stringFromBytes32(partition)}
              </option>
            ))}
            <option value="0xNew">+ Add new class</option>
          </select>
          <FieldError errors={errors.partition ? [errors.partition] : undefined} />
        </FieldContent>
      </Field>

      {partitionValue === '0xNew' && (
        <Field className={defaultFieldDiv}>
          <FieldLabel htmlFor="newPartition">New class name</FieldLabel>
          <FieldContent>
            <Input
              id="newPartition"
              placeholder="Class A"
              aria-invalid={Boolean(errors.newPartition)}
              {...register('newPartition')}
            />
            <FieldError errors={errors.newPartition ? [errors.newPartition] : undefined} />
          </FieldContent>
        </Field>
      )}

      <Field className={defaultFieldDiv}>
        <FieldLabel htmlFor="numShares">{`Shares to list for sale (${sharesRemaining} available )`}</FieldLabel>
        <FieldContent>
          <Input
            id="numShares"
            type="number"
            placeholder="800"
            aria-invalid={Boolean(errors.numShares)}
            {...register('numShares')}
          />
          <FieldError errors={errors.numShares ? [errors.numShares] : undefined} />
        </FieldContent>
      </Field>
      <div className="md:grid grid-cols-2 gap-3">
        <Field className={defaultFieldDiv}>
          <FieldLabel htmlFor="price">{`Price (${getCurrencyById(paymentTokenAddress)?.symbol})`}</FieldLabel>
          <FieldContent>
            <Input
              id="price"
              type="number"
              placeholder="1300"
              aria-invalid={Boolean(errors.price)}
              {...register('price')}
            />
            <FieldError errors={errors.price ? [errors.price] : undefined} />
          </FieldContent>
        </Field>
        <NonInput className={`${defaultFieldDiv} col-span-1 pl-1`} labelText="Total sale:">
          <>
            {watchedNumShares &&
              watchedPrice &&
              `${saleAmountString(watchedNumShares, watchedPrice)} ${
                paymentTokenAddress && getCurrencyById(paymentTokenAddress)?.symbol
              }`}
          </>
        </NonInput>
        <Field className={`${defaultFieldDiv} col-span-1`}>
          <FieldLabel htmlFor="minUnits">Minimum purchase in units</FieldLabel>
          <FieldContent>
            <Input
              id="minUnits"
              type="number"
              placeholder="e.g. 10"
              aria-invalid={Boolean(errors.minUnits)}
              {...register('minUnits')}
            />
            <FieldError errors={errors.minUnits ? [errors.minUnits] : undefined} />
          </FieldContent>
        </Field>
        <Field className={`${defaultFieldDiv} col-span-1`}>
          <FieldLabel htmlFor="maxUnits">Maximum purchase in units</FieldLabel>
          <FieldContent>
            <Input
              id="maxUnits"
              type="number"
              placeholder="e.g. 120"
              aria-invalid={Boolean(errors.maxUnits)}
              {...register('maxUnits')}
            />
            <FieldError errors={errors.maxUnits ? [errors.maxUnits] : undefined} />
          </FieldContent>
        </Field>
      </div>

      <hr className="bg-grey-600 my-3 mb-4" />
      {!userWalletAddress ? (
        <ChooseConnectorButton buttonText={'Connect Wallet'} />
      ) : (
        <LoadingButtonChain
          type="submit"
          disabled={isSubmitting || buttonStep === 'step1'}
          state={buttonStep}
          idleText={formButtonText()}
          step1Text="Creating sale..."
          confirmedText="Confirmed!"
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      )}
    </form>
  );
};

export default PostInitialSale;

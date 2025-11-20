import { zodResolver } from '@hookform/resolvers/zod';

import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import PresentLegalText from '@src/components/legal/PresentLegalText';
import { Button } from '@src/components/ui/button';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import { cn } from '@src/lib/utils';

import { createOrder } from '@src/utils/actions/orderActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { submitSwap } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, Resolver, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAccount, useChainId } from 'wagmi';

import { Document, OfferingFull } from '@/types';

import NonInput from '../../form-components/NonInput';
import { Field, FieldContent, FieldError, FieldLabel } from '../../ui/field';
import { Input } from '../../ui/input';
import { Checkbox } from '../../ui/checkbox';

import { PostBidAskFormProps } from './offering-actions-types';

type WithAdditionalProps = PostBidAskFormProps & {
  walletAddress: string;
  swapContractAddress: String0x;
  offeringMin: number | null;
  documents: Document[] | undefined;
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

const bidAskBaseSchema = z.object({
  numUnits: z.coerce.number().int().min(1, 'You must choose a number of shares.'),
  price: z.coerce.number().positive('Price per share is required'),
  approvalRequired: z.boolean(),
  minUnits: optionalPositiveInt,
  maxUnits: optionalPositiveInt,
  partition: z.string().min(1, 'Partition is required'),
  toc: z.boolean()
});

type BidAskFormValues = z.infer<typeof bidAskBaseSchema>;

const buildBidAskSchema = ({
  isContractOwner,
  isAsk,
  myShareQty,
  sharesUnissued
}: {
  isContractOwner: boolean;
  isAsk: boolean;
  myShareQty: number | null | undefined;
  sharesUnissued: number | null | undefined;
}) =>
  bidAskBaseSchema.superRefine((data, ctx) => {
    if (isContractOwner) {
      if (data.maxUnits && data.numUnits && data.maxUnits > data.numUnits) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Maximum must be less then the total shares listed for sale',
          path: ['maxUnits']
        });
      }
      if (data.maxUnits && data.minUnits && (data.maxUnits < 1 || data.maxUnits < data.minUnits)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Maximum must be greater than minimum',
          path: ['maxUnits']
        });
      }
      if (
        data.minUnits &&
        (data.minUnits < 1 || (data.maxUnits && data.minUnits > data.maxUnits))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Minimum must be less than maximum',
          path: ['minUnits']
        });
      }
    } else {
      if (!data.approvalRequired) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'You must confirm that offerer approval is required.',
          path: ['approvalRequired']
        });
      }
      if (!data.toc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "You must accept this offering's Terms & Conditions",
          path: ['toc']
        });
      }
    }

    if (isAsk && myShareQty && data.numUnits > myShareQty) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `You cannot sell more than ${myShareQty} shares.`,
        path: ['numUnits']
      });
    }

    if (!isAsk && sharesUnissued && data.numUnits > sharesUnissued) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `You cannot buy more than ${sharesUnissued} shares.`,
        path: ['numUnits']
      });
    }
  });

const PostBidAskForm: FC<WithAdditionalProps> = ({
  offering,
  walletAddress,
  swapContractAddress,
  swapApprovalsEnabled,
  partitions,
  paymentTokenDecimals,
  myShareQty,
  isContractOwner,
  sharesOutstanding,
  currentSalePrice,
  documents,
  setModal,
  refetchAllContracts,
  refetchOfferingInfo
}) => {
  if (!paymentTokenDecimals) {
    throw new Error('Payment token decimals are required (PostBidAskForm)');
  }
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const [isAsk, setIsAsk] = useState<boolean>(true);
  const {
    name,
    num_units: sharesIssued,
    investment_currency: investmentCurrency,
    offeringSmartContracts
  } = offering;

  if (!offeringSmartContracts?.shareContract?.id) {
    throw new Error('Share contract is required (PostBidAskForm)');
  }
  const shareContractId = offeringSmartContracts.shareContract.id;

  const showSharesAvailable = `(${myShareQty} available)`;
  const sharesUnissued = getAmountRemaining({ x: sharesIssued, minus: sharesOutstanding });

  const offerCalculator = (numUnits: number, price: number) => numUnits * price;

  const saleAmountString = (numUnits?: number, price?: number) => {
    if (!price || !numUnits) return '';
    return numberWithCommas(offerCalculator(numUnits, price), 2);
  };

  const validationContextRef = useRef({
    isContractOwner,
    isAsk,
    myShareQty,
    sharesUnissued
  });
  validationContextRef.current = { isContractOwner, isAsk, myShareQty, sharesUnissued };

  const formDefaults = useMemo(
    () => ({
      numUnits: undefined as unknown as number,
      price: (currentSalePrice ?? undefined) as unknown as number,
      approvalRequired: false,
      minUnits: undefined as unknown as number,
      maxUnits: undefined as unknown as number,
      partition: partitions[0],
      toc: false
    }),
    [currentSalePrice, partitions]
  );

  const resolver: Resolver<BidAskFormValues> = async (values, context, options) => {
    const schema = buildBidAskSchema(validationContextRef.current);
    const resolve = zodResolver(schema) as Resolver<BidAskFormValues>;
    return resolve(values, context, options);
  };

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BidAskFormValues>({
    resolver,
    defaultValues: formDefaults
  });

  useEffect(() => {
    reset(formDefaults);
  }, [formDefaults, reset]);

  const watchedNumUnits = watch('numUnits');
  const watchedPrice = watch('price');

  const onSubmit = async (values: BidAskFormValues) => {
    const isIssuance = false;
    const isErc20Payment = true;
    if (!values.numUnits || !values.price || !userWalletAddress) {
      return;
    }
    await submitSwap({
      userWalletAddress,
      shareContractId: shareContractId.toString(),
      numShares: values.numUnits,
      price: values.price,
      partition: values.partition as String0x,
      minUnits: values.minUnits,
      maxUnits: values.maxUnits,
      swapContractAddress: swapContractAddress,
      visible: !swapApprovalsEnabled,
      toc: values.toc,
      paymentTokenDecimals: paymentTokenDecimals as number,
      offeringId: offering.id.toString(),
      isContractOwner: isContractOwner,
      isAsk: isAsk,
      isIssuance: isIssuance,
      isErc20Payment: isErc20Payment,
      setButtonStep: setButtonStep,
      createOrder: createOrder,
      refetchAllContracts,
      refetchOfferingInfo
    });
    setModal('shareSaleList');
  };

  const defaultFieldDiv = 'pt-2 my-2 bg-opacity-0';

  return (
    <>
      <Button
        type="button"
        className="w-full p-2 border-2 rounded-md"
        onClick={() => setIsAsk(!isAsk)}
      >
        {`Switch to ${isAsk ? 'Bid' : 'Ask'}`}
      </Button>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 mb-2">
          <FieldLabel>{`${isAsk ? 'Selling' : 'Buying'} wallet:`}</FieldLabel>
          <FormattedCryptoAddress
            chainId={chainId}
            address={walletAddress}
            className="font-semibold"
          />
        </div>
        <hr className="my-6" />
        {!isContractOwner && myShareQty && myShareQty < 1 && isAsk ? (
          <div>You do not have any shares to sell </div>
        ) : (
          <>
            <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">{`${
              isAsk ? 'Sale' : 'Purchase'
            }`}</h2>
            <div className="md:grid grid-cols-3 gap-3">
              <Field className={cn(defaultFieldDiv, 'col-span-2')}>
                <FieldLabel htmlFor="numUnits">{`How many shares would you like to ${
                  isAsk ? `sell? ${showSharesAvailable}` : 'buy?'
                }`}</FieldLabel>
                <FieldContent>
                  <Input
                    id="numUnits"
                    type="number"
                    placeholder="e.g. 80"
                    aria-invalid={Boolean(errors.numUnits)}
                    {...register('numUnits')}
                  />
                  <FieldError errors={errors.numUnits ? [errors.numUnits] : undefined} />
                </FieldContent>
              </Field>
              <Field className={cn(defaultFieldDiv, 'col-span-2')}>
                <FieldLabel htmlFor="price">{`At what price per share? (${
                  investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                })`}</FieldLabel>
                <FieldContent>
                  <Input
                    id="price"
                    type="number"
                    placeholder="e.g. 2000"
                    aria-invalid={Boolean(errors.price)}
                    {...register('price')}
                  />
                  <FieldError errors={errors.price ? [errors.price] : undefined} />
                </FieldContent>
              </Field>
              <NonInput
                className={`${defaultFieldDiv} col-span-1 pl-1`}
                labelText={`Total ${isAsk ? 'Sale' : 'Purchase'}:`}
              >
                <>
                  {watchedNumUnits &&
                    watchedPrice &&
                    `${saleAmountString(watchedNumUnits, watchedPrice)} ${
                      investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                    }`}
                </>
              </NonInput>
            </div>
            <hr className="my-6 mt-8" />
            {isContractOwner && (
              <div>
                <div className="grid md:grid-cols-2 gap-3 my-6">
                  <Field className={`${defaultFieldDiv} col-span-1`}>
                    <FieldLabel htmlFor="minUnits">Minimum purchase in shares</FieldLabel>
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
                    <FieldLabel htmlFor="maxUnits">Maximum purchase in shares</FieldLabel>
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
                <hr className="my-6 mt-8" />
              </div>
            )}

            {!isContractOwner && (
              <>
                <div className="mb-3">
                  <Field>
                    <FieldContent>
                      <Controller
                        control={control}
                        name="toc"
                        render={({ field }) => (
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="toc"
                              checked={field.value}
                              onCheckedChange={checked => field.onChange(Boolean(checked))}
                              aria-invalid={Boolean(errors.toc)}
                            />
                            <button
                              className="text-sm text-gray-700 hover:underline text-left"
                              aria-label="review application"
                              onClick={e => {
                                e.preventDefault();
                                setTocOpen(!tocOpen);
                              }}
                            >
                              <div className="flex text-left">
                                {`I accept this offering's Terms and Conditions`}
                                <div className="ml-2">
                                  {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </div>
                              </div>
                            </button>
                          </div>
                        )}
                      />
                      <FieldError errors={errors.toc ? [errors.toc] : undefined} />
                    </FieldContent>
                  </Field>
                </div>
                {tocOpen && documents && (
                  <div className="my-2 p-4 rounded-md bg-slate-100">
                    <PresentLegalText text={documents[0]?.text} />
                    <div className="flex">
                      <Button
                        variant="outline"
                        className="mt-5"
                        onClick={e => {
                          e.preventDefault();
                          DownloadFile(
                            documents[0]?.text as string,
                            `${name} - Terms & Conditions.md`
                          );
                        }}
                      >
                        Download Terms & Conditions
                      </Button>
                      <Button
                        variant="outline"
                        className="md:ml-3 mt-5"
                        onClick={e => {
                          e.preventDefault();
                          setTocOpen(false);
                        }}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                )}
                <div className="mb-5">
                  <Field>
                    <FieldContent>
                      <Controller
                        control={control}
                        name="approvalRequired"
                        render={({ field }) => (
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id="approvalRequired"
                              checked={field.value}
                              onCheckedChange={checked => field.onChange(Boolean(checked))}
                              aria-invalid={Boolean(errors.approvalRequired)}
                            />
                            <label htmlFor="approvalRequired" className="text-sm text-gray-700">
                              {`I understand that this ${isAsk ? 'sale' : 'purchase'} requires approval from ${offering.legalEntity.legal_name}.`}
                            </label>
                          </div>
                        )}
                      />
                      <FieldError
                        errors={errors.approvalRequired ? [errors.approvalRequired] : undefined}
                      />
                    </FieldContent>
                  </Field>
                </div>
              </>
            )}

            <LoadingButtonChain
              type="submit"
              disabled={isSubmitting || buttonStep === 'step1'}
              state={buttonStep}
              idleText={`${
                isContractOwner
                  ? `${isAsk ? 'Sell' : 'Propose to purchase'}`
                  : `Propose ${isAsk ? 'sale' : 'purchase'} of`
              } ${watchedNumUnits ?? ''} shares ${
                watchedNumUnits && watchedPrice
                  ? `for ${saleAmountString(watchedNumUnits, watchedPrice)} ${
                      investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                    } `
                  : ''
              }`}
              step1Text="Creating sale..."
              confirmedText="Confirmed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </>
        )}
      </form>
    </>
  );
};

export default PostBidAskForm;

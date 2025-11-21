import { zodResolver } from '@hookform/resolvers/zod';

import PresentLegalText from '@src/components/legal/PresentLegalText';
import { Button } from '@src/components/ui/button';
import { Checkbox } from '@src/components/ui/checkbox';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import WalletActionIndicator from '@src/containers/wallet/WalletActionIndicator';
import WalletActionModal from '@src/containers/wallet/WalletActionModal';
import { cn } from '@src/lib/utils';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { floatWithCommas, numberWithCommas } from '@src/utils/helpersMoney';
// import { isMetaMask } from '@src/web3/wagmi';
import axios from 'axios';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { FC, useMemo, useState } from 'react';
import { useAsync } from 'react-use';
import { z } from 'zod';

import { CurrencyCodeType, Document, Offering, OfferingFull, ShareOrder } from '@/types';

import NonInput, { defaultFieldDiv } from '../../form-components/NonInput';

type SharePurchaseSaleRequestFormValues = {
  numUnitsPurchase: string;
  disclosures: boolean;
  toc: boolean;
};

const createSharePurchaseSaleRequestSchema = (shareQtyRemaining: number, order: ShareOrder) =>
  z.object({
    numUnitsPurchase: z
      .string()
      .min(1, 'You must choose a number of shares to purchase.')
      .superRefine((value, ctx) => {
        const parsedValue = Number.parseInt(value, 10);

        if (!Number.isFinite(parsedValue) || parsedValue <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Enter a valid whole number of shares.'
          });
          return;
        }

        if (parsedValue > shareQtyRemaining) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `There are only ${shareQtyRemaining} for sale.`
          });
        }

        if (order.min_units && parsedValue < order.min_units) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `You must purchase at least ${order.min_units} shares.`
          });
        }

        if (order.max_units && parsedValue > order.max_units) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `You cannot purchase more than ${order.max_units} shares`
          });
        }
      }),
    disclosures: z.boolean().refine(val => val, {
      message: "You must confirm that you have read this offering's disclosures"
    }),
    toc: z.boolean().refine(val => val, {
      message: "You must accept this offering's Terms & Conditions"
    })
  });

export type SharePurchaseSaleRequestProps = {
  offering: OfferingFull;
  order: ShareOrder;
  isAskOrder: boolean;
  price: number;
  txnApprovalsEnabled: boolean;
  shareQtyRemaining: number;
  myShareQty: number | undefined;
};

type AdditionalSharePurchaseSaleRequestProps = SharePurchaseSaleRequestProps & {
  myBacBalance: string | undefined;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => Promise<void>;
};

const SharePurchaseSaleRequest: FC<AdditionalSharePurchaseSaleRequestProps> = ({
  offering,
  isAskOrder,
  order,
  price,
  myBacBalance,
  txnApprovalsEnabled,
  shareQtyRemaining,
  myShareQty,
  callFillOrder
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disclosuresOpen, setDisclosuresOpen] = useState<boolean>(false);
  const [tocOpen, setTocOpen] = useState<boolean>(false);
  const investmentCurrency = offering.investment_currency as CurrencyCodeType;
  const standardSaleDisclosures = `/assets/order/disclosures.md`;
  const getStandardSaleDisclosuresText = async (): Promise<string> =>
    axios.get(standardSaleDisclosures).then(resp => resp.data);
  const { value: standardSaleDisclosuresText } = useAsync(getStandardSaleDisclosuresText, []);
  const documents: Document[] = [];

  const purchaseCalculator = (numUnits: number) => {
    return numUnits * price;
  };

  const purchaseString = (numUnitsPurchase: string | undefined) => {
    if (!numUnitsPurchase) return '0';
    return numberWithCommas(purchaseCalculator(parseInt(numUnitsPurchase, 10)), 2);
  };

  const handlePurchaseSaleRequest = async (amountToBuySell: number) => {
    await callFillOrder({ amount: amountToBuySell, setButtonStep });
  };

  const validationSchema = useMemo(
    () => createSharePurchaseSaleRequestSchema(shareQtyRemaining, order),
    [order, shareQtyRemaining]
  );

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<SharePurchaseSaleRequestFormValues>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      numUnitsPurchase: '',
      disclosures: false,
      toc: false
    }
  });

  const watchedNumUnitsPurchase = watch('numUnitsPurchase');

  const onSubmit: SubmitHandler<SharePurchaseSaleRequestFormValues> = async values => {
    const parsedValue = Number.parseInt(values.numUnitsPurchase, 10);
    if (!Number.isFinite(parsedValue)) return;
    await handlePurchaseSaleRequest(parsedValue);
  };

  const formButtonText = (numUnitsPurchase: string) => {
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const action = isAskOrder ? 'purchase' : 'sell';
    const mainText = txnApprovalsEnabled
      ? `Request to ${action}`
      : `${capitalizeFirstLetter(action)}`;

    return `${mainText} ${numUnitsPurchase ?? ''} shares ${
      numUnitsPurchase
        ? `for ${purchaseString(numUnitsPurchase)} ${getCurrencyOption(investmentCurrency)?.symbol} `
        : ''
    }`;
  };

  return (
    <>
      {!txnApprovalsEnabled && (
        <WalletActionModal open={buttonStep === 'step1' || buttonStep === 'step2'}>
          <WalletActionIndicator
            step={buttonStep}
            step1Text={isAskOrder ? 'Setting contract allowance' : 'Submitting Bid'}
            step1SubText={
              isAskOrder
                ? 'This will allow the contract to spend your tokens on your behalf'
                : 'Please confirm in our wallet'
            }
            step2Text={isAskOrder ? 'Executing purchase' : undefined}
            step2SubText={
              isAskOrder ? 'This will execute the trade and purchase the shares' : undefined
            }
          />
        </WalletActionModal>
      )}

      <form className="" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FieldGroup className="md:grid grid-cols-3 gap-3">
          <Field className={cn(defaultFieldDiv, 'col-span-2')}>
            <FieldLabel htmlFor="numUnitsPurchase" className="text-sm font-semibold text-blue-900">
              {`How many units would you like to ${isAskOrder ? 'purchase' : 'sell'}? (${
                isAskOrder ? shareQtyRemaining : myShareQty
              } available)`}
            </FieldLabel>
            <FieldContent>
              <Input
                id="numUnitsPurchase"
                type="number"
                placeholder="e.g. 80"
                inputMode="numeric"
                aria-invalid={errors.numUnitsPurchase ? 'true' : 'false'}
                {...register('numUnitsPurchase')}
              />
              <FieldError errors={[errors.numUnitsPurchase]} />
            </FieldContent>
          </Field>
          <NonInput
            className={`${defaultFieldDiv} col-span-1 pl-1`}
            labelText={`${isAskOrder ? 'Purchase' : 'Sale'} Price:`}
          >
            <>
              {watchedNumUnitsPurchase &&
                `${purchaseString(watchedNumUnitsPurchase)} ${
                  investmentCurrency && getCurrencyOption(investmentCurrency)?.symbol
                }`}
            </>
          </NonInput>
          <div className="col-span-2" />
          <div className="col-span-1 text-xs pl-2">{`Current balance: ${floatWithCommas(
            myBacBalance as string
          )}`}</div>
        </FieldGroup>
        <hr className="my-6" />
        {/* Disclosures */}
        <Controller
          name="disclosures"
          control={control}
          render={({ field }) => (
            <Field className="mb-3">
              <div className="rounded-md border-2 border-gray-200 p-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="disclosures"
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(Boolean(checked))}
                    className="mt-0.5"
                  />
                  <FieldLabel
                    htmlFor="disclosures"
                    className="cursor-pointer text-sm font-semibold text-blue-900 text-opacity-80"
                  >
                    {`I have read this offering's Risks & Considerations`}
                  </FieldLabel>
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-1 text-sm text-gray-700 hover:underline"
                    aria-label="review application"
                    onClick={() => {
                      setDisclosuresOpen(!disclosuresOpen);
                      setTocOpen(false);
                    }}
                  >
                    {disclosuresOpen ? 'Hide' : 'Review'}
                    {disclosuresOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
              <FieldError errors={[errors.disclosures]} />
            </Field>
          )}
        />
        {disclosuresOpen && (
          <div className="my-2 rounded-md bg-slate-100 p-4">
            <PresentLegalText text={standardSaleDisclosuresText} />
            <div className="flex">
              <Button
                variant="outline"
                className="mt-5"
                onClick={e => {
                  e.preventDefault();
                  DownloadFile(
                    standardSaleDisclosuresText as string,
                    `${offering.name} - Download Risks & Considerations.md`
                  );
                }}
              >
                Download Risks & Considerations
              </Button>
              <Button
                variant="outline"
                className="md:ml-3 mt-5"
                onClick={e => {
                  e.preventDefault();
                  setDisclosuresOpen(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        )}
        {/* TOC SECTION */}
        <Controller
          name="toc"
          control={control}
          render={({ field }) => (
            <Field className="mb-5">
              <div className="rounded-md border-2 border-gray-200 p-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="toc"
                    checked={field.value}
                    onCheckedChange={checked => field.onChange(Boolean(checked))}
                    className="mt-0.5"
                  />
                  <FieldLabel
                    htmlFor="toc"
                    className="cursor-pointer text-sm font-semibold text-blue-900 text-opacity-80"
                  >
                    {`I accept this offering's Terms and Conditions`}
                  </FieldLabel>
                  <button
                    type="button"
                    className="ml-auto flex items-center gap-1 text-sm text-gray-700 hover:underline"
                    aria-label="review application"
                    onClick={() => {
                      setTocOpen(!tocOpen);
                      setDisclosuresOpen(false);
                    }}
                  >
                    {tocOpen ? 'Hide' : 'Review'}
                    {tocOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>
              <FieldError errors={[errors.toc]} />
            </Field>
          )}
        />
        {tocOpen && documents.length > 0 && (
          <div className="my-2 rounded-md bg-slate-100 p-4">
            <PresentLegalText text={documents[0].text} />
            <div className="flex">
              <Button
                variant="outline"
                className="mt-5"
                onClick={e => {
                  e.preventDefault();
                  DownloadFile(
                    documents[0]?.text as string,
                    `${offering.name} - Terms & Conditions.md`
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
        <LoadingButtonChain
          type="submit"
          disabled={isSubmitting || buttonStep === 'step1'}
          state={buttonStep}
          idleText={formButtonText(watchedNumUnitsPurchase)}
          step1Text={txnApprovalsEnabled ? 'Submitting request' : 'Setting contract allowance...'}
          step2Text="Executing transaction..."
          confirmedText="Executed!"
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      </form>
    </>
  );
};

export default SharePurchaseSaleRequest;

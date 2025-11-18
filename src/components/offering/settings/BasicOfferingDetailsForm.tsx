import { zodResolver } from '@hookform/resolvers/zod';
import FormButton from '@src/components/buttons/FormButton';
import NonInput from '@src/components/form-components/NonInput';
import { Input } from '@src/components/ui/input';
import { Field, FieldError, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { updateOfferingDetails } from '@src/utils/actions/offeringProfileActions';
import {
  bacOptions,
  getCurrencyOption,
  investmentOfferingTypeOptions
} from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useChainId } from 'wagmi';
import { z } from 'zod';

import { CurrencyCode, CurrencyCodeType, OfferingType, OfferingTypes } from '@/types';

import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';

type BasicOfferingDetailsFormProps = {
  offeringId: string;
  operatingCurrency: CurrencyCodeType | undefined;
};

const schema = z.object({
  initialPrice: z.string().min(1, 'You must set a price'),
  investmentCurrencyCode: z
    .string()
    .min(1, 'Please select distribution currency')
    .refine(val => Object.values(CurrencyCode).includes(val as CurrencyCodeType), {
      message: 'Please select a valid currency'
    }),
  numUnits: z.string().min(1, 'You must set a number of units'),
  offeringType: z
    .string()
    .min(1, 'You must select an offering type')
    .refine(val => Object.values(OfferingType).includes(val as OfferingTypes), {
      message: 'Please select a valid offering type'
    })
});

type FormData = z.infer<typeof schema>;

const BasicOfferingDetailsForm: FC<BasicOfferingDetailsFormProps> = ({
  offeringId,
  operatingCurrency
}) => {
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');
  const chainId = useChainId();
  const chainBacs = bacOptions.filter(bac => bac.chainId === chainId);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialPrice: '',
      investmentCurrencyCode: '',
      numUnits: ''
    }
  });

  const watchedNumUnits = watch('numUnits');
  const watchedInvestmentCurrencyCode = watch('investmentCurrencyCode');
  const watchedInitialPrice = watch('initialPrice');

  const onSubmit = async (data: FormData) => {
    setButtonState('loading');
    try {
      await updateOfferingDetails({
        offeringId: offeringId,
        offeringType: data.offeringType as OfferingTypes,
        numUnits: parseInt(data.numUnits, 10),
        investmentCurrencyCode: data.investmentCurrencyCode as CurrencyCodeType,
        distributionCurrencyCode: data.investmentCurrencyCode as CurrencyCodeType,
        priceStart: parseInt(data.initialPrice, 10),
        maxRaise: parseInt(data.numUnits, 10) * parseInt(data.initialPrice, 10)
      });
      setButtonState('success');
    } catch (error) {
      setButtonState('error');
    }
  };

  return (
    <form>
      <FieldGroup>
        <FieldSet className="md:grid md:grid-cols-2 gap-3">
          <Field>
            <FieldLabel>Offering type *</FieldLabel>
            <Controller
              control={control}
              name="offeringType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                    <SelectValue placeholder="Select offering type" />
                  </SelectTrigger>
                  <SelectContent>
                    {investmentOfferingTypeOptions.map(
                      (option: { value: OfferingTypes; name: string }, i: number) => (
                        <SelectItem key={i} value={option.value}>
                          {option.name}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={errors.offeringType ? [errors.offeringType] : undefined} />
          </Field>

          <Field>
            <FieldLabel>Distributions will be paid in *</FieldLabel>
            <Controller
              control={control}
              name="investmentCurrencyCode"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                    <SelectValue placeholder="Select distribution currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {chainBacs.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError
              errors={errors.investmentCurrencyCode ? [errors.investmentCurrencyCode] : undefined}
            />
          </Field>

          <Field>
            <FieldLabel>
              {`Initial unit price (${getCurrencyOption(operatingCurrency)?.symbol})`} *
            </FieldLabel>
            <Input
              id="initialPrice"
              type="number"
              placeholder="e.g. 1300"
              {...register('initialPrice')}
              className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
            />
            <FieldError errors={errors.initialPrice ? [errors.initialPrice] : undefined} />
          </Field>
          <Field>
            <FieldLabel>Total number of shares *</FieldLabel>
            <Input
              id="numUnits"
              type="number"
              placeholder="e.g. 1000"
              {...register('numUnits')}
              className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
            />
            <FieldError errors={errors.numUnits ? [errors.numUnits] : undefined} />
          </Field>
        </FieldSet>
        <FieldSet>
          <NonInput className={`pt-3 col-span-1 pl-1`} labelText={'Total raise'}>
            <>
              {watchedNumUnits &&
                watchedInvestmentCurrencyCode &&
                watchedInitialPrice &&
                `${numberWithCommas(parseInt(watchedNumUnits, 10) * parseInt(watchedInitialPrice, 10))} ${
                  getCurrencyOption(watchedInvestmentCurrencyCode as CurrencyCodeType)?.symbol
                }`}
            </>
          </NonInput>

          <LoadingButton
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            size="lg"
            buttonState={buttonState}
            setButtonState={setButtonState}
            text="Save"
            loadingText="Saving"
            successText="Saved"
            errorText="Oops. Something went wrong"
            reset
          />
        </FieldSet>
      </FieldGroup>
    </form>
  );
};

export default BasicOfferingDetailsForm;

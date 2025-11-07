import { zodResolver } from '@hookform/resolvers/zod';
import FormButton from '@src/components/buttons/FormButton';
import NonInput from '@src/components/form-components/NonInput';
import { Input } from '@src/components/ui/input';
import { Label } from '@src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { updateOfferingDetails } from '@src/utils/actions/offeringActions';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useChainId } from 'wagmi';
import { z } from 'zod';

import { CurrencyCode, CurrencyCodeType, OfferingType } from '@/types';

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
  numUnits: z.string().min(1, 'You must set a number of units')
});

type FormData = z.infer<typeof schema>;

const BasicOfferingDetailsForm: FC<BasicOfferingDetailsFormProps> = ({
  offeringId,
  operatingCurrency
}) => {
  const [alerted, setAlerted] = useState<boolean>(false);

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
    setAlerted(false);

    await updateOfferingDetails({
      offeringId: offeringId,
      offeringType: OfferingType.REAL_ESTATE,
      numUnits: parseInt(data.numUnits, 10),
      investmentCurrencyCode: data.investmentCurrencyCode as CurrencyCodeType,
      distributionCurrencyCode: data.investmentCurrencyCode as CurrencyCodeType,
      priceStart: parseInt(data.initialPrice, 10),
      maxRaise: parseInt(data.numUnits, 10) * parseInt(data.initialPrice, 10)
    });
  };

  return (
    <div className="bg-gray-100 pt-8 p-4 md:p-8 min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 ">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="pt-3 bg-opacity-0">
          <Label
            htmlFor="investmentCurrencyCode"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Distributions will be paid in *
          </Label>
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
          {errors.investmentCurrencyCode && (
            <div className="text-sm text-red-500 mt-1">{errors.investmentCurrencyCode.message}</div>
          )}
        </div>
        <div className="md:grid grid-cols-2 gap-3">
          <div className="pt-3 bg-opacity-0">
            <Label
              htmlFor="initialPrice"
              className="text-sm text-blue-900 font-semibold text-opacity-80"
            >
              {`Initial unit price (${getCurrencyOption(operatingCurrency)?.symbol})`} *
            </Label>
            <Input
              id="initialPrice"
              type="number"
              placeholder="e.g. 1300"
              {...register('initialPrice')}
              className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
            />
            {errors.initialPrice && (
              <div className="text-sm text-red-500 mt-1">{errors.initialPrice.message}</div>
            )}
          </div>
          <div className="pt-3 bg-opacity-0 col-span-1">
            <Label
              htmlFor="numUnits"
              className="text-sm text-blue-900 font-semibold text-opacity-80"
            >
              Total number of shares *
            </Label>
            <Input
              id="numUnits"
              type="number"
              placeholder="e.g. 1000"
              {...register('numUnits')}
              className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
            />
            {errors.numUnits && (
              <div className="text-sm text-red-500 mt-1">{errors.numUnits.message}</div>
            )}
          </div>
        </div>

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

        <FormButton
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4"
        >
          SAVE
        </FormButton>
      </form>
    </div>
  );
};

export default BasicOfferingDetailsForm;

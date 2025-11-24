import { zodResolver } from '@hookform/resolvers/zod';
import NonInput from '@src/components/form-components/NonInput';
import { Button } from '@src/components/ui/button';
import { Calendar } from '@src/components/ui/calendar';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { Textarea } from '@src/components/ui/textarea';
import { updateOfferingFinancial } from '@src/utils/actions/offeringProfileActions';
import {
  distributionPeriodOptions,
  getCurrencyOption,
  OfferingStage,
  StageOptions
} from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ChevronDownIcon } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CurrencyCodeType, DistributionPeriodTypes, OfferingFull } from '@/types';
const defaultFieldDiv = 'pt-3 bg-opacity-0';

type OfferingFinancialSettingsProps = {
  offering: OfferingFull;
};

const schema = z
  .object({
    stage: z.string().optional(),
    minRaise: z.number().nullable().optional(),
    minUnitsPerInvestor: z.number().nullable().optional(),
    maxUnitsPerInvestor: z.number().nullable().optional(),
    maxInvestors: z.number().nullable().optional(),
    minInvestors: z.number().nullable().optional(),
    raiseStart: z.date().nullable().optional(),
    raisePeriod: z.number().nullable().optional(),
    additionalInfo: z.string().optional(),
    distributionPeriod: z.string().optional(),
    distributionFrequency: z.number().nullable().optional(),
    distributionCurrency: z.string().optional(),
    distributionDescription: z.string().optional(),
    adminExpense: z.number().nullable().optional(),
    projectedIrr: z.number().nullable().optional(),
    projectedIrrMax: z.number().nullable().optional(),
    preferredReturn: z.number().nullable().optional(),
    cocReturn: z.number().nullable().optional(),
    projectedAppreciation: z.number().nullable().optional(),
    capRate: z.number().nullable().optional(),
    targetEquityMultiple: z.number().nullable().optional(),
    targetEquityMultipleMax: z.number().nullable().optional()
  })
  .refine(
    data => {
      if (data.minRaise && data.minRaise > 0) {
        // maxRaise will be calculated from price_start * num_units
        return true; // We'll validate this in the component
      }
      return true;
    },
    {
      message: 'Minimum raise must be less than maximum raise.',
      path: ['minRaise']
    }
  );

type FormData = z.infer<typeof schema>;

const OfferingFinancialSettings: FC<OfferingFinancialSettingsProps> = ({ offering }) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');

  const {
    id,
    stage,
    investment_currency,
    price_start,
    num_units,
    min_raise,
    min_units_per_investor,
    max_units_per_investor,
    max_investors,
    min_investors,
    raise_start,
    raise_period,
    additional_info,
    distribution_period,
    distribution_frequency,
    distribution_description,
    admin_expense,
    projected_irr,
    projected_irr_max,
    preferred_return,
    coc_return,
    projected_appreciation,
    cap_rate,
    target_equity_multiple,
    target_equity_multiple_max,
    legalEntity
  } = offering;

  const operatingCurrency = legalEntity?.operating_currency;

  const maxRaise = price_start && num_units ? price_start * num_units : 0;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      stage: stage ?? '',
      minRaise: min_raise ?? null,
      minUnitsPerInvestor: min_units_per_investor ?? null,
      maxUnitsPerInvestor: max_units_per_investor ?? null,
      maxInvestors: max_investors ?? null,
      minInvestors: min_investors ?? null,
      raiseStart: raise_start ? new Date(raise_start) : null,
      raisePeriod: raise_period ?? null,
      additionalInfo: additional_info ?? '',
      distributionPeriod: distribution_period ?? '',
      distributionFrequency: distribution_frequency ?? null,
      distributionCurrency: investment_currency ?? '',
      distributionDescription: distribution_description ?? '',
      adminExpense: admin_expense ?? null,
      projectedIrr: projected_irr ? projected_irr / 100 : null,
      projectedIrrMax: projected_irr_max ? projected_irr_max / 100 : null,
      preferredReturn: preferred_return ? preferred_return / 100 : null,
      cocReturn: coc_return ? coc_return / 100 : null,
      projectedAppreciation: projected_appreciation ? projected_appreciation / 100 : null,
      capRate: cap_rate ? cap_rate / 100 : null,
      targetEquityMultiple: target_equity_multiple ? target_equity_multiple / 100 : null,
      targetEquityMultipleMax: target_equity_multiple_max ? target_equity_multiple_max / 100 : null
    }
  });

  const watchedMinRaise = watch('minRaise');

  const onSubmit = async (data: FormData) => {
    setButtonStep('step1');

    // Validate minRaise
    if (data.minRaise && data.minRaise > maxRaise) {
      return;
    }

    try {
      await updateOfferingFinancial({
        offeringId: offering.id.toString(),
        stage: data.stage as OfferingStage | undefined,
        minRaise: data.minRaise ?? undefined,
        minUnitsPerInvestor: data.minUnitsPerInvestor ?? undefined,
        maxUnitsPerInvestor: data.maxUnitsPerInvestor ?? undefined,
        maxInvestors: data.maxInvestors ?? undefined,
        minInvestors: data.minInvestors ?? undefined,
        raiseStart: data.raiseStart ? data.raiseStart.toISOString() : undefined,
        raisePeriod: data.raisePeriod ?? undefined,
        additionalInfo: data.additionalInfo ?? undefined,
        distributionPeriod: data.distributionPeriod as DistributionPeriodTypes | undefined,
        distributionFrequency: data.distributionFrequency ?? undefined,
        distributionCurrency: data.distributionCurrency as CurrencyCodeType | undefined,
        distributionDescription: data.distributionDescription ?? undefined,
        adminExpense: data.adminExpense ?? undefined,
        projectedIrr: data.projectedIrr ? data.projectedIrr * 100 : undefined,
        projectedIrrMax: data.projectedIrrMax ? data.projectedIrrMax * 100 : undefined,
        preferredReturn: data.preferredReturn ? data.preferredReturn * 100 : undefined,
        targetEquityMultiple: data.targetEquityMultiple
          ? data.targetEquityMultiple * 100
          : undefined,
        targetEquityMultipleMax: data.targetEquityMultipleMax
          ? data.targetEquityMultipleMax * 100
          : undefined,
        cocReturn: data.cocReturn ? data.cocReturn * 100 : undefined,
        projectedAppreciation: data.projectedAppreciation
          ? data.projectedAppreciation * 100
          : undefined,
        capRate: data.capRate ? data.capRate * 100 : undefined
      });
      setButtonStep('confirmed');
    } catch (e) {
      setButtonStep('failed');
      alert(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col relative'>
      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel htmlFor='stage'>Offering stage</FieldLabel>
            <Controller
              control={control}
              name='stage'
              render={({ field }) => (
                <Select value={field.value ?? ''} onValueChange={field.onChange}>
                  <SelectTrigger className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'>
                    <SelectValue placeholder='Select stage' />
                  </SelectTrigger>
                  <SelectContent>
                    {StageOptions.map((option, i) => (
                      <SelectItem key={i} value={option.value}>
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
          <div className='md:grid grid-cols-2 gap-3'>
            <Field>
              <FieldLabel htmlFor='minRaise'>
                {`Minimum raise (${investment_currency && getCurrencyOption(investment_currency)?.symbol})`}
              </FieldLabel>
              <Input
                id='minRaise'
                type='number'
                placeholder='e.g. 2000000'
                {...register('minRaise', {
                  valueAsNumber: true,
                  validate: value => {
                    if (value && value > maxRaise) {
                      return 'Minimum raise must be less than maximum raise.';
                    }
                    return true;
                  }
                })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
              {errors.minRaise && (
                <div className='text-sm text-red-500 mt-1'>{errors.minRaise.message}</div>
              )}
            </Field>

            <NonInput
              className='col-span-1 pl-1'
              labelText={`Maximum raise (${investment_currency && getCurrencyOption(investment_currency)?.symbol})`}
            >
              {price_start ? (
                num_units &&
                `${numberWithCommas(maxRaise)} ${
                  investment_currency && getCurrencyOption(investment_currency)?.symbol
                }`
              ) : (
                <span className='text-sm text-gray-500'>Calculated from first share price</span>
              )}
            </NonInput>

            <Field>
              <FieldLabel htmlFor='minUnitsPerInvestor'>Minimum shares per investor</FieldLabel>
              <Input
                id='minUnitsPerInvestor'
                type='number'
                placeholder='e.g. 10'
                {...register('minUnitsPerInvestor', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='maxUnitsPerInvestor'>Maximum shares per investor</FieldLabel>
              <Input
                id='maxUnitsPerInvestor'
                type='number'
                placeholder='e.g. 99'
                {...register('maxUnitsPerInvestor', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              {' '}
              <FieldLabel htmlFor='maxUnitsPerInvestor'>Maximum shares per investor</FieldLabel>
              <Input
                id='maxUnitsPerInvestor'
                type='number'
                placeholder='e.g. 99'
                {...register('maxUnitsPerInvestor', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='minInvestors'>Minimum number of investors</FieldLabel>
              <Input
                id='minInvestors'
                type='number'
                placeholder='e.g. 120'
                {...register('minInvestors', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='maxInvestors'>Maximum number of investors</FieldLabel>
              <Input
                id='maxInvestors'
                type='number'
                placeholder='e.g. 99'
                {...register('maxInvestors', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>

            <Field className='col-span-1'>
              <FieldLabel htmlFor='raiseStart'>Fundraising start date</FieldLabel>
              <Controller
                control={control}
                name='raiseStart'
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        id='date'
                        className='w-48 justify-between font-normal'
                      >
                        {field.value ? field.value.toLocaleDateString() : 'Select date'}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='overflow-hidden p-0' align='start'>
                      <Calendar
                        mode='single'
                        className='w-full'
                        selected={field.value ?? undefined}
                        captionLayout='dropdown'
                        onSelect={date => {
                          field.onChange(date);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='raisePeriod'>Fundraising period in days</FieldLabel>
              <Input
                id='raisePeriod'
                type='number'
                placeholder='e.g. 120'
                {...register('raisePeriod', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='distributionFrequency'>Distributions every</FieldLabel>
              <Input
                id='distributionFrequency'
                type='number'
                {...register('distributionFrequency', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='distributionPeriod'>Period *</FieldLabel>
              <Controller
                control={control}
                name='distributionPeriod'
                render={({ field }) => (
                  <Select value={field.value ?? ''} onValueChange={field.onChange}>
                    <SelectTrigger className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'>
                      <SelectValue placeholder='Select period' />
                    </SelectTrigger>
                    <SelectContent>
                      {distributionPeriodOptions.map((type, i) => (
                        <SelectItem key={i} value={type.value}>
                          {`${type.name}s`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='projectedIrr'>Projected IRR (%)</FieldLabel>
              <Input
                id='projectedIrr'
                type='number'
                {...register('projectedIrr', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='projectedIrrMax'>Max Projected IRR (% - Optional)</FieldLabel>
              <Input
                id='projectedIrrMax'
                type='number'
                {...register('projectedIrrMax', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='targetEquityMultiple'>Target equity multiple (x)</FieldLabel>
              <Input
                id='targetEquityMultiple'
                type='number'
                {...register('targetEquityMultiple', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='targetEquityMultipleMax'>
                Target equity multiple Max (x - Optional)
              </FieldLabel>
              <Input
                id='targetEquityMultipleMax'
                type='number'
                {...register('targetEquityMultipleMax', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='preferredReturn'>Preferred Return (%)</FieldLabel>
              <Input
                id='preferredReturn'
                type='number'
                {...register('preferredReturn', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='cocReturn'>CoC return (%)</FieldLabel>
              <Input
                id='cocReturn'
                type='number'
                {...register('cocReturn', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='projectedAppreciation'>Projected appreciation (%)</FieldLabel>
              <Input
                id='projectedAppreciation'
                type='number'
                {...register('projectedAppreciation', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
            <Field>
              <FieldLabel htmlFor='capRate'>Cap rate (%)</FieldLabel>
              <Input
                id='capRate'
                type='number'
                {...register('capRate', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>

            <Field>
              <FieldLabel htmlFor='adminExpense'>
                {`Administrative Expenses (${getCurrencyOption(operatingCurrency)?.symbol})`}
              </FieldLabel>
              <Input
                id='adminExpense'
                type='number'
                {...register('adminExpense', { valueAsNumber: true })}
                className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor='additionalInfo'>Additional Information</FieldLabel>
            <Textarea
              id='additionalInfo'
              placeholder='e.g. Resale Horizon: 4-10 years.'
              {...register('additionalInfo')}
              className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
            />
          </Field>
        </FieldSet>
        <LoadingButtonChain
          size='lg'
          type='submit'
          disabled={isSubmitting || buttonStep === 'step1'}
          state={buttonStep}
          idleText={`Update ${offering.name}`}
          step1Text='Saving'
          confirmedText={`${offering.name} updated!`}
          failedText='Oops. Something went wrong'
        />
      </FieldGroup>
    </form>
  );
};

export default OfferingFinancialSettings;

import 'react-datepicker/dist/react-datepicker.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
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
import { Textarea } from '@src/components/ui/textarea';
import { updateOfferingFinancial } from '@src/utils/actions/offeringActions';
import {
  distributionPeriodOptions,
  getCurrencyOption,
  OfferingStage,
  StageOptions
} from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import React, { FC, useState } from 'react';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { CurrencyCodeType, OfferingFull } from '@/types';

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
  const [alerted, setAlerted] = useState<boolean>(false);

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
    setAlerted(false);

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
        distributionPeriod: data.distributionPeriod as string | undefined,
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

  const MyContainer = ({
    className,
    children
  }: {
    className: string;
    children: React.ReactNode[];
  }) => {
    return (
      <div style={{ color: '#fff' }}>
        <CalendarContainer className={className}>
          <div style={{ position: 'relative' }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col relative">
      <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Offering Financials</h2>
      <div className={defaultFieldDiv}>
        <Label htmlFor="stage" className="text-sm text-blue-900 font-semibold text-opacity-80">
          Offering stage
        </Label>
        <Controller
          control={control}
          name="stage"
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                <SelectValue placeholder="Select stage" />
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
      </div>
      <div className="md:grid grid-cols-2 gap-3">
        <div className={defaultFieldDiv}>
          <Label htmlFor="minRaise" className="text-sm text-blue-900 font-semibold text-opacity-80">
            {`Minimum raise (${investment_currency && getCurrencyOption(investment_currency)?.symbol})`}
          </Label>
          <Input
            id="minRaise"
            type="number"
            placeholder="e.g. 2000000"
            {...register('minRaise', {
              valueAsNumber: true,
              validate: value => {
                if (value && value > maxRaise) {
                  return 'Minimum raise must be less than maximum raise.';
                }
                return true;
              }
            })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
          {errors.minRaise && (
            <div className="text-sm text-red-500 mt-1">{errors.minRaise.message}</div>
          )}
        </div>

        <NonInput
          className={`${defaultFieldDiv} col-span-1 pl-1`}
          labelText={`Maximum raise (${investment_currency && getCurrencyOption(investment_currency)?.symbol})`}
        >
          <>
            {price_start &&
              num_units &&
              `${numberWithCommas(maxRaise)} ${
                investment_currency && getCurrencyOption(investment_currency)?.symbol
              }`}
          </>
        </NonInput>
      </div>
      <div className="md:grid grid-cols-2 gap-3">
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="minUnitsPerInvestor"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Minimum shares per investor
          </Label>
          <Input
            id="minUnitsPerInvestor"
            type="number"
            placeholder="e.g. 10"
            {...register('minUnitsPerInvestor', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="maxUnitsPerInvestor"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Maximum shares per investor
          </Label>
          <Input
            id="maxUnitsPerInvestor"
            type="number"
            placeholder="e.g. 99"
            {...register('maxUnitsPerInvestor', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="md:grid grid-cols-2 gap-3">
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="minInvestors"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Minimum number of investors
          </Label>
          <Input
            id="minInvestors"
            type="number"
            placeholder="e.g. 120"
            {...register('minInvestors', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="maxInvestors"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Maximum number of investors
          </Label>
          <Input
            id="maxInvestors"
            type="number"
            placeholder="e.g. 99"
            {...register('maxInvestors', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="md:grid grid-cols-2">
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="raiseStart"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Fundraising start date
          </Label>
          <Controller
            control={control}
            name="raiseStart"
            render={({ field }) => (
              <DatePicker
                selected={field.value ?? null}
                onChange={(date: Date | null) => field.onChange(date)}
                calendarContainer={MyContainer}
                className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none w-full"
              />
            )}
          />
        </div>
        <div className={`${defaultFieldDiv} col-span-1`}>
          <Label
            htmlFor="raisePeriod"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Fundraising period in days
          </Label>
          <Input
            id="raisePeriod"
            type="number"
            placeholder="e.g. 120"
            {...register('raisePeriod', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="md:grid grid-cols-2 gap-3">
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="distributionFrequency"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Distributions every
          </Label>
          <Input
            id="distributionFrequency"
            type="number"
            {...register('distributionFrequency', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>

        <div className={defaultFieldDiv}>
          <Label
            htmlFor="distributionPeriod"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Period *
          </Label>
          <Controller
            control={control}
            name="distributionPeriod"
            render={({ field }) => (
              <Select value={field.value ?? ''} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                  <SelectValue placeholder="Select period" />
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
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="projectedIrr"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Projected IRR (%)
          </Label>
          <Input
            id="projectedIrr"
            type="number"
            {...register('projectedIrr', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="projectedIrrMax"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Max Projected IRR (% - Optional)
          </Label>
          <Input
            id="projectedIrrMax"
            type="number"
            {...register('projectedIrrMax', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="targetEquityMultiple"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Target equity multiple (x)
          </Label>
          <Input
            id="targetEquityMultiple"
            type="number"
            {...register('targetEquityMultiple', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="targetEquityMultipleMax"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Target equity multiple Max (x - Optional)
          </Label>
          <Input
            id="targetEquityMultipleMax"
            type="number"
            {...register('targetEquityMultipleMax', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="preferredReturn"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Preferred Return (%)
          </Label>
          <Input
            id="preferredReturn"
            type="number"
            {...register('preferredReturn', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="cocReturn"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            CoC return (%)
          </Label>
          <Input
            id="cocReturn"
            type="number"
            {...register('cocReturn', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label
            htmlFor="projectedAppreciation"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Projected appreciation (%)
          </Label>
          <Input
            id="projectedAppreciation"
            type="number"
            {...register('projectedAppreciation', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
        <div className={defaultFieldDiv}>
          <Label htmlFor="capRate" className="text-sm text-blue-900 font-semibold text-opacity-80">
            Cap rate (%)
          </Label>
          <Input
            id="capRate"
            type="number"
            {...register('capRate', { valueAsNumber: true })}
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
        </div>
      </div>
      <div className={defaultFieldDiv}>
        <Label
          htmlFor="adminExpense"
          className="text-sm text-blue-900 font-semibold text-opacity-80"
        >
          {`Administrative Expenses (${getCurrencyOption(operatingCurrency)?.symbol})`}
        </Label>
        <Input
          id="adminExpense"
          type="number"
          {...register('adminExpense', { valueAsNumber: true })}
          className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
        />
      </div>

      <div className={defaultFieldDiv}>
        <Label
          htmlFor="additionalInfo"
          className="text-sm text-blue-900 font-semibold text-opacity-80"
        >
          Additional Information
        </Label>
        <Textarea
          id="additionalInfo"
          placeholder="e.g. Resale Horizon: 4-10 years."
          {...register('additionalInfo')}
          className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
        />
      </div>

      <FormButton
        type="submit"
        disabled={isSubmitting || buttonStep === 'step1'}
        className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
      >
        <LoadingButtonText
          state={buttonStep}
          idleText={`Update ${offering.name}`}
          step1Text="Saving"
          confirmedText={`${offering.name} updated!`}
          failedText="Oops. Something went wrong"
        />
      </FormButton>
    </form>
  );
};

export default OfferingFinancialSettings;

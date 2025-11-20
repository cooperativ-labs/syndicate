import { zodResolver } from '@hookform/resolvers/zod';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RealEstateProperty } from '@/types';

import { Field, FieldContent, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';

export type UpdatePropertyFinancialsType = {
  property: RealEstateProperty;
  updateProperty: (data: any) => void;
  setModal: (addressModel: boolean) => void;
};

const financialSchema = z.object({
  assetValue: z.string().optional(),
  assetValueNote: z.string().optional(),
  downPayment: z.string().optional(),
  lenderFees: z.string().optional(),
  closingCosts: z.string().optional(),
  loanAmount: z.string().optional()
});

type FinancialFormValues = z.infer<typeof financialSchema>;

const UpdatePropertyFinancials: FC<UpdatePropertyFinancialsType> = ({
  property,
  updateProperty,
  setModal
}) => {
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const entityOperatingCurrency = property.owner?.operatingCurrency;
  const { handleSubmit, register } = useForm<FinancialFormValues>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      assetValue: property.assetValue?.toString() ?? '',
      assetValueNote: property.assetValueNote ?? '',
      downPayment: property.downPayment?.toString() ?? '',
      lenderFees: property.lenderFees?.toString() ?? '',
      closingCosts: property.closingCosts?.toString() ?? '',
      loanAmount: property.loan?.toString() ?? ''
    }
  });

  const onSubmit = async (values: FinancialFormValues) => {
    setButtonState('loading');
    try {
      await updateProperty({
        variables: {
          currentDate: currentDate,
          rePropertyId: property.id,
          propertyType: property.propertyType,
          investmentStatus: property.investmentStatus,
          assetValue: values.assetValue,
          assetValueNote: values.assetValueNote,
          downPayment: values.downPayment,
          lenderFees: values.lenderFees,
          closingCosts: values.closingCosts,
          loanAmount: values.loanAmount
        }
      });
      setButtonState('success');
      setModal(false);
    } catch (error) {
      setButtonState('error');
    }
  };

  const currencyLabel = (field: string) =>
    `${field} (${getCurrencyOption(entityOperatingCurrency)?.symbol ?? ''})`;

  return (
    <form className="flex flex-col gap relative" onSubmit={handleSubmit(onSubmit)}>
      <hr className="my-6" />
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="assetValue">{currencyLabel('Asset value')}</FieldLabel>
        <FieldContent>
          <Input id="assetValue" type="number" {...register('assetValue')} />
        </FieldContent>
      </Field>
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="assetValueNote">Note about how this value is calculated</FieldLabel>
        <FieldContent>
          <Input id="assetValueNote" {...register('assetValueNote')} />
        </FieldContent>
      </Field>
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="loanAmount">{currencyLabel('Loan amount')}</FieldLabel>
        <FieldContent>
          <Input id="loanAmount" type="number" {...register('loanAmount')} />
        </FieldContent>
      </Field>
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="downPayment">{currencyLabel('Down payment')}</FieldLabel>
        <FieldContent>
          <Input id="downPayment" type="number" {...register('downPayment')} />
        </FieldContent>
      </Field>
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="lenderFees">{currencyLabel("Lender's fees")}</FieldLabel>
        <FieldContent>
          <Input id="lenderFees" type="number" {...register('lenderFees')} />
        </FieldContent>
      </Field>
      <Field className="pt-3 bg-opacity-0">
        <FieldLabel htmlFor="closingCosts">{currencyLabel('Closing costs')}</FieldLabel>
        <FieldContent>
          <Input id="closingCosts" type="number" {...register('closingCosts')} />
        </FieldContent>
      </Field>
      <LoadingButton
        type="submit"
        buttonState={buttonState}
        setButtonState={setButtonState}
        text={`Update ${property.address?.line1}`}
        loadingText="Updating property..."
        successText="Property updated!"
        errorText="Failed to update property"
        reset
        className="mt-8"
      />
    </form>
  );
};

export default UpdatePropertyFinancials;

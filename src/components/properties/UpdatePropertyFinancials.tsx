import { useOffering } from '@contexts/OfferingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateRePropertyFinancials } from '@src/utils/actions/rePropertyActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { RealEstatePropertyWithAddress } from '@/types';

import { Field, FieldContent, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';

export type UpdatePropertyFinancialsType = {
  property: RealEstatePropertyWithAddress;
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

const UpdatePropertyFinancials: FC<UpdatePropertyFinancialsType> = ({ property, setModal }) => {
  const { legalEntity } = useOffering();
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  // @TODO: This is a temporary fix, currency should come from property entity
  const entityOperatingCurrency = legalEntity?.operating_currency;
  const { handleSubmit, register } = useForm<FinancialFormValues>({
    resolver: zodResolver(financialSchema),
    defaultValues: {
      assetValue: property.asset_value?.toString() ?? '',
      assetValueNote: property.asset_value_note ?? '',
      downPayment: property.down_payment?.toString() ?? '',
      lenderFees: property.lender_fees?.toString() ?? '',
      closingCosts: property.closing_costs?.toString() ?? '',
      loanAmount: property.loan?.toString() ?? ''
    }
  });

  const onSubmit = async (values: FinancialFormValues) => {
    setButtonState('loading');
    try {
      await UpdateRePropertyFinancials({
        rePropertyId: property.id,
        assetValue: values.assetValue ? parseInt(values.assetValue) : null,
        assetValueNote: values.assetValueNote,
        downPayment: values.downPayment ? parseInt(values.downPayment) : null,
        lenderFees: values.lenderFees ? parseInt(values.lenderFees) : null,
        closingCosts: values.closingCosts ? parseInt(values.closingCosts) : null,
        loanAmount: values.loanAmount ? parseInt(values.loanAmount) : null,
        revalidationPath: {
          path: `/manager/[organizationId]/entities/${property.owner_id}`,
          type: 'page'
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

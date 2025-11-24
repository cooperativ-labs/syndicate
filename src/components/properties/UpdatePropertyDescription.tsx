import { useOffering } from '@contexts/OfferingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateRePropertyDescription } from '@src/utils/actions/rePropertyActions';
import {
  assetStatusOptions,
  getCurrencyOption,
  propertyTypeOptions
} from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  InvestmentStatusType,
  RealEstatePropertyTypes,
  RealEstatePropertyWithAddress
} from '@/types';

import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { LoadingButton } from '../ui/loading-button';
import { Textarea } from '../ui/textarea';

export type UpdatePropertyDescriptionType = {
  property: RealEstatePropertyWithAddress;
  setModal: (addressModel: boolean) => void;
};

const descriptionSchema = z.object({
  propertyType: z.string().min(1, 'Type of property is required'),
  investmentStatus: z.string().min(1, 'Status of property is required'),
  amenitiesDescription: z.string().min(1, "Describe this property's amenities"),
  description: z.string().min(1, 'Describe this property generally'),
  downPayment: z.string().optional(),
  lenderFees: z.string().optional(),
  closingCosts: z.string().optional()
});

type DescriptionFormValues = z.infer<typeof descriptionSchema>;

const UpdatePropertyDescription: FC<UpdatePropertyDescriptionType> = ({ property, setModal }) => {
  const { legalEntity } = useOffering();
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  // @TODO: This is a temporary fix, currency should come from property entity
  const entityOperatingCurrency = legalEntity?.operating_currency;
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<DescriptionFormValues>({
    resolver: zodResolver(descriptionSchema),
    defaultValues: {
      propertyType: property.property_type as RealEstatePropertyTypes,
      investmentStatus: property.investment_status as InvestmentStatusType,
      amenitiesDescription: property.amenities_description ?? '',
      description: property.description ?? ''
    }
  });

  const onSubmit = async (values: DescriptionFormValues) => {
    setButtonState('loading');
    if (!values.propertyType || !values.investmentStatus) {
      setButtonState('error');
      toast.error('Please select a property type and investment status');
      return;
    }
    try {
      await updateRePropertyDescription({
        rePropertyId: property.id,
        propertyType: values.propertyType as RealEstatePropertyTypes,
        investmentStatus: values.investmentStatus as InvestmentStatusType,
        amenitiesDescription: values.amenitiesDescription,
        description: values.description
      });
      setButtonState('success');
      setModal(false);
    } catch (error) {
      setButtonState('error');
    }
  };

  const currencySuffix = ` (${getCurrencyOption(entityOperatingCurrency)?.symbol ?? ''})`;

  return (
    <form className='flex flex-col gap relative' onSubmit={handleSubmit(onSubmit)}>
      <hr className='my-6' />
      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='investmentStatus'>Status of property</FieldLabel>
        <FieldContent>
          <select
            id='investmentStatus'
            className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
            aria-invalid={Boolean(errors.investmentStatus)}
            {...register('investmentStatus')}
          >
            <option value=''>Select a status</option>
            {assetStatusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <FieldError errors={errors.investmentStatus ? [errors.investmentStatus] : undefined} />
        </FieldContent>
      </Field>

      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='propertyType'>Type of property</FieldLabel>
        <FieldContent>
          <select
            id='propertyType'
            className='text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
            aria-invalid={Boolean(errors.propertyType)}
            {...register('propertyType')}
          >
            <option value=''>Select an entity</option>
            {propertyTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <FieldError errors={errors.propertyType ? [errors.propertyType] : undefined} />
        </FieldContent>
      </Field>

      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='description'>Describe this property generally</FieldLabel>
        <FieldContent>
          <Textarea
            id='description'
            placeholder='e.g. Super sweet home with super sweet views'
            aria-invalid={Boolean(errors.description)}
            {...register('description')}
          />
          <FieldError errors={errors.description ? [errors.description] : undefined} />
        </FieldContent>
      </Field>

      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='amenitiesDescription'>Describe this property's amenities</FieldLabel>
        <FieldContent>
          <Textarea
            id='amenitiesDescription'
            placeholder='e.g. swimming pool, 3 parking spaces, central air-conditioning'
            aria-invalid={Boolean(errors.amenitiesDescription)}
            {...register('amenitiesDescription')}
          />
          <FieldError
            errors={errors.amenitiesDescription ? [errors.amenitiesDescription] : undefined}
          />
        </FieldContent>
      </Field>

      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='downPayment'>{`Down payment${currencySuffix}`}</FieldLabel>
        <FieldContent>
          <Input id='downPayment' type='number' {...register('downPayment')} />
        </FieldContent>
      </Field>
      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='lenderFees'>{`Lender's fees${currencySuffix}`}</FieldLabel>
        <FieldContent>
          <Input id='lenderFees' type='number' {...register('lenderFees')} />
        </FieldContent>
      </Field>
      <Field className='pt-3 bg-opacity-0'>
        <FieldLabel htmlFor='closingCosts'>{`Closing costs${currencySuffix}`}</FieldLabel>
        <FieldContent>
          <Input id='closingCosts' type='number' {...register('closingCosts')} />
        </FieldContent>
      </Field>
      <LoadingButton
        type='submit'
        buttonState={buttonState}
        setButtonState={setButtonState}
        text={`Update ${property.address?.line1}`}
        loadingText='Updating property...'
        successText='Property updated!'
        errorText='Failed to update property'
        reset
        className='mt-8'
      />
    </form>
  );
};

export default UpdatePropertyDescription;

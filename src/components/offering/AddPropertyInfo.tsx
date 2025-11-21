'use client';

import { useOffering } from '@contexts/OfferingContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Marker } from '@react-google-maps/api';
import AddressAutoComplete, { AddressType } from '@src/components/ui/address-autocomplete';
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet
} from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { addPropertyAddress, addRePropertyInfo } from '@src/utils/actions/rePropertyActions';
import {
  assetStatusOptions,
  getCurrencyOption,
  propertyTypeOptions
} from '@src/utils/enumConverters';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { InvestmentStatusType, RealEstatePropertyTypes } from '@/types';

import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';

const numberFieldSchema = z
  .any()
  .transform(val => {
    if (val === '' || val === null || val === undefined) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  })
  .pipe(z.number().min(0, 'Please set a positive amount').nullable())
  .optional();

const formSchema = z.object({
  investmentStatus: z.string().min(1, 'Please select a status'),
  propertyType: z.string().min(1, 'Please select a property type'),
  description: z.string().optional(),
  amenitiesDescription: z.string().optional(),
  downPayment: numberFieldSchema,
  lenderFees: numberFieldSchema,
  closingCosts: numberFieldSchema
});

const AddPropertyInfo: FC = () => {
  const router = useRouter();
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');

  const { offering } = useOffering();
  const entityId = offering.legalEntity.id;
  const entityOperatingCurrency = offering.investment_currency;
  const [address, setAddress] = useState<AddressType>({
    address1: '',
    address2: '',
    address3: '',
    formattedAddress: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    lat: 0,
    lng: 0
  });
  const [searchInput, setSearchInput] = useState('');

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentStatus: '',
      propertyType: '',
      description: '',
      amenitiesDescription: '',
      downPayment: null,
      lenderFees: null,
      closingCosts: null
    }
  });

  const onSubmit = async () => {
    const values = getValues();
    if (!address.city || !address.region) {
      toast.error('Please select a valid address');
      return;
    }

    setButtonState('loading');
    try {
      const propertyId = await addRePropertyInfo({
        entityId: entityId.toString(),
        propertyType: values.propertyType as RealEstatePropertyTypes,
        investmentStatus: values.investmentStatus as InvestmentStatusType,
        amenitiesDescription: values.amenitiesDescription,
        description: values.description,
        downPayment: values.downPayment,
        lenderFees: values.lenderFees,
        closingCosts: values.closingCosts,
        revalidationPath: {
          path: `/manager/[organizationId]/entities/${entityId}`,
          type: 'page'
        }
      });
      if (!propertyId) {
        toast.error('Error adding property');
        setButtonState('default');
        return;
      }
      await addPropertyAddress({
        ownerId: entityId.toString(),
        propertyId,
        addressLine1: address.address1,
        addressLine2: address.address2,
        city: address.city,
        stateProvince: address.region,
        postalCode: address.postalCode,
        country: address.country,
        lat: address.lat,
        lng: address.lng,
        addressLabel: 'Property Address',
        revalidationPath: {
          path: `/manager/[organizationId]/entities/${entityId}`,
          type: 'page'
        }
      });

      toast.success('Property added successfully');
      setButtonState('default');
      router.back();
    } catch (error: any) {
      setButtonState('default');
      toast.error(`Error adding property: ${error.message}`);
    }
  };

  return (
    <form className="space-y-6 w-full">
      <FieldGroup>
        <FieldLegend>Add a real estate property</FieldLegend>

        <FieldSeparator />
        <FieldSet>
          <Field>
            <FieldLabel>Status of property</FieldLabel>
            <FieldContent>
              <Controller
                control={control}
                name="investmentStatus"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {assetStatusOptions.map((type, i) => (
                        <SelectItem key={i} value={type.value}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContent>
            <FieldError errors={[errors.investmentStatus]} />
          </Field>

          <Field>
            <FieldLabel>Type of property</FieldLabel>
            <FieldContent>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypeOptions.map((type, i) => (
                        <SelectItem key={i} value={type.value}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </FieldContent>
            <FieldError errors={[errors.propertyType]} />
          </Field>

          <Field>
            <FieldLabel>Describe this property generally</FieldLabel>
            <FieldContent>
              <Input
                placeholder="e.g. Super sweet home with super sweet views"
                {...register('description')}
              />
            </FieldContent>
            <FieldError errors={[errors.description]} />
          </Field>

          <Field>
            <FieldLabel>Describe this property's amenities</FieldLabel>
            <FieldContent>
              <Input
                placeholder="e.g. swimming pool, 3 parking spaces"
                {...register('amenitiesDescription')}
              />
            </FieldContent>
            <FieldError errors={[errors.amenitiesDescription]} />
          </Field>

          <Field>
            <FieldLabel>
              Down payment ({getCurrencyOption(entityOperatingCurrency)?.symbol})
            </FieldLabel>
            <FieldContent>
              <Input type="number" {...register('downPayment')} />
            </FieldContent>
            <FieldError errors={[errors.downPayment]} />
          </Field>

          <Field>
            <FieldLabel>
              Lender's fees ({getCurrencyOption(entityOperatingCurrency)?.symbol})
            </FieldLabel>
            <FieldContent>
              <Input type="number" {...register('lenderFees')} />
            </FieldContent>
            <FieldError errors={[errors.lenderFees]} />
          </Field>

          <Field>
            <FieldLabel>
              Closing costs ({getCurrencyOption(entityOperatingCurrency)?.symbol})
            </FieldLabel>
            <FieldContent>
              <Input type="number" {...register('closingCosts')} />
            </FieldContent>
            <FieldError errors={[errors.closingCosts]} />
          </Field>

          <div>
            <hr className="my-6" />
            <h3 className="text-md md:mt-8 text-blue-900 font-semibold mb-4">{`This property's address`}</h3>
            <AddressAutoComplete
              address={address}
              setAddress={setAddress}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              dialogTitle="Select Address"
            />
            {/* {address.lat !== 0 && (
              <div className="mt-4">
                <GoogleMap
                  mapContainerStyle={{ height: '300px', width: '100%' }}
                  center={{ lat: address.lat, lng: address.lng }}
                  zoom={14}
                >
                  <Marker position={{ lat: address.lat, lng: address.lng }} />
                </GoogleMap>
              </div>
            )} */}
          </div>
        </FieldSet>
        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          text={`Create ${address.address1 ? address.address1 : address.city ? `${address.city}, ${address.region}` : 'Property'}`}
          loadingText="Creating Property..."
          buttonState={buttonState}
        />
      </FieldGroup>
    </form>
  );
};

export default AddPropertyInfo;

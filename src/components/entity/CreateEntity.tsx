'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { addLegalEntity } from '@src/utils/actions/entityActions';
import {
  currencyOptionsExcludeCredits,
  entityTypeOptions,
  LegalEntityType
} from '@src/utils/enumConverters';
import { Country, IState, State } from 'country-state-city';
import React, { FC, useState } from 'react';
import { Controller, Form, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { CurrencyCode } from '@/types';

import AddressAutoComplete, { AddressType } from '../ui/address-autocomplete';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { LoadingButton } from '../ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';

export type CreateEntityType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
};

type FormData = {
  legalName: string;
  entityPurpose?: string;
  operatingCurrency: keyof typeof CurrencyCode;
  jurCountry: string;
  jurProvince?: string;
  type: LegalEntityType;
  addressAutocomplete: string;
};

const schema = z.object({
  legalName: z.string().min(1, 'Please include a full legal name'),
  entityPurpose: z.string().optional(),
  operatingCurrency: z.nativeEnum(CurrencyCode),
  jurCountry: z.string().min(1, 'Please select a country'),
  jurProvince: z.string().optional(),
  type: z.nativeEnum(LegalEntityType),
  addressAutocomplete: z.string()
});

const CreateEntity: FC<CreateEntityType> = ({ defaultLogo, actionOnCompletion }) => {
  const { chosenOrganizationId } = useOrganizations();
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');

  const [inputAddress, setInputAddress] = useState<AddressType>({
    address1: '',
    address2: '',
    formattedAddress: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
    lat: 0,
    lng: 0
  });
  const [searchInput, setSearchInput] = useState('');
  const [states, setStates] = useState<IState[]>([]);

  const countries = Country.getAllCountries();

  const setDefaultLogo = defaultLogo
    ? defaultLogo
    : '/assets/images/logos/company-placeholder.jpeg';

  // if (error) {
  //   console.error(error);
  //   toast.error(`Oops. Looks like something went wrong: ${error.message}`);
  // }
  // if (data) {
  //   toast.success('Entity created successfully');
  //   actionOnCompletion?.() ?? router.push(`/${organization.id}/entities`);
  // }

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      legalName: '',
      entityPurpose: '',
      operatingCurrency: CurrencyCode.USD as keyof typeof CurrencyCode,
      jurCountry: '',
      jurProvince: '',
      type: undefined as LegalEntityType | undefined,
      addressAutocomplete: ''
    }
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = form;

  const watchedJurCountry = watch('jurCountry');

  // Update states when country changes
  React.useEffect(() => {
    if (watchedJurCountry) {
      setStates(State.getStatesOfCountry(watchedJurCountry));
    }
  }, [watchedJurCountry]);

  const watchedLegalName = watch('legalName');

  const firstAddressLine = inputAddress.address1;
  const secondAddressLine = inputAddress.address2;
  const city = inputAddress.city;
  const state = inputAddress.region;
  const postalCode = inputAddress.postalCode;
  const country = inputAddress.country;
  const lat = inputAddress.lat;
  const lng = inputAddress.lng;

  const onSubmit = async (values: FormData) => {
    // Validate address

    if (!firstAddressLine) {
      setError('addressAutocomplete', {
        type: 'manual',
        message: 'Address must include street number and street name'
      });
      return;
    }
    if (!state) {
      setError('addressAutocomplete', {
        type: 'manual',
        message: 'Address must include a state'
      });
      return;
    }
    clearErrors('addressAutocomplete');

    setButtonState('loading');
    try {
      await addLegalEntity({
        organizationId: chosenOrganizationId ?? '',
        displayName: values.legalName,
        legalName: values.legalName,
        entityPurpose: values.entityPurpose,
        addressLabel: 'Primary Operating Address',
        addressLine1: firstAddressLine,
        addressLine2: secondAddressLine,
        city: city,
        stateProvince: state,
        postalCode: postalCode,
        country: country,
        lat: lat,
        lng: lng,
        operatingCurrency: values.operatingCurrency,
        jurCountry: values.jurCountry,
        jurProvince: values.jurProvince ?? '',
        type: values.type
      });
      setButtonState('success');
      actionOnCompletion?.();
    } catch (error: any) {
      setButtonState('error');
      toast.error(error.message);
    }
  };

  const hasStates = states && states.length > 0;

  return (
    <Form {...form}>
      <form className="flex flex-col gap relative">
        {/* Type of entity */}
        <div className="pt-3 bg-opacity-0">
          <Label className="text-sm text-blue-900 font-semibold text-opacity-80">
            Type of entity *
          </Label>
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                  <SelectValue placeholder="Select entity type" />
                </SelectTrigger>
                <SelectContent>
                  {entityTypeOptions.map((type, i) => (
                    <SelectItem key={i} value={type.value}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <div className="text-sm text-red-500 mt-1">{errors.type.message}</div>}
        </div>

        {/* Legal name */}
        <div className="pt-3 bg-opacity-0">
          <Label
            htmlFor="legalName"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Organization's legal name *
          </Label>
          <Input
            id="legalName"
            {...register('legalName')}
            type="text"
            placeholder="Alphabet Inc."
            className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none"
          />
          {errors.legalName && (
            <div className="text-sm text-red-500 mt-1">{errors.legalName.message}</div>
          )}
        </div>

        {/* Operating currency */}
        <div className="pt-3 bg-opacity-0">
          <Label className="text-sm text-blue-900 font-semibold text-opacity-80">
            Operating currency *
          </Label>
          <Controller
            control={control}
            name="operatingCurrency"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {currencyOptionsExcludeCredits.map((option, i) => (
                    <SelectItem key={i} value={option.value}>
                      {option.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.operatingCurrency && (
            <div className="text-sm text-red-500 mt-1">{errors.operatingCurrency.message}</div>
          )}
        </div>

        {/* Jurisdiction */}
        <div className="pt-3 bg-opacity-0">
          <Label className="text-sm text-blue-900 font-semibold text-opacity-80">
            Jurisdiction *
          </Label>
          <Controller
            control={control}
            name="jurCountry"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent position="item-aligned">
                  {countries.map((country, i) => (
                    <SelectItem key={i} value={country.isoCode}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.jurCountry && (
            <div className="text-sm text-red-500 mt-1">{errors.jurCountry.message}</div>
          )}
          {hasStates && (
            <Controller
              control={control}
              name="jurProvince"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none mt-2">
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    {states.map((state, i) => (
                      <SelectItem key={i} value={state.isoCode}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          )}
        </div>

        {/* Purpose */}
        <div className="pt-3 bg-opacity-0">
          <Label
            htmlFor="entityPurpose"
            className="text-sm text-blue-900 font-semibold text-opacity-80"
          >
            Purpose of this entity
          </Label>
          <Textarea
            id="entityPurpose"
            {...register('entityPurpose')}
            placeholder="Short description of the purpose of this entity."
            className="h-24"
          />
        </div>

        <hr className="my-6" />
        <div className="text-cLightBlue font-bold text-lg mb-4">Operating address</div>
        <AddressAutoComplete
          address={inputAddress}
          setAddress={setInputAddress}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          dialogTitle="Confirm Address"
        />
        {errors.addressAutocomplete && (
          <div className="text-sm text-red-500 mt-1">{errors.addressAutocomplete.message}</div>
        )}

        <LoadingButton
          buttonState={buttonState}
          onClick={handleSubmit(onSubmit)}
          setButtonState={setButtonState}
          text={`Create ${watchedLegalName || 'Entity'}`}
          loadingText="Creating entity..."
          successText="Entity created!"
          errorText="Failed to create entity"
          reset
          className="mt-8"
        />
      </form>
    </Form>
  );
};

export default CreateEntity;

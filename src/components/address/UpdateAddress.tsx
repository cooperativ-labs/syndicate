'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { Address } from '@/types';
import AddressAutoComplete, { AddressType } from '@src/components/ui/address-autocomplete';
import { Button } from '@src/components/ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import React, { FC, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export type UpdateAddressType = {
  address: Address | undefined;
  addressId: string | undefined;
  addressLine1: string | undefined;
  updateAddress: (data: any) => Promise<void> | void;
  setModal: (addressModel: boolean) => void;
};

const emptyAddress: AddressType = {
  address1: '',
  address2: '',
  formattedAddress: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
  lat: 0,
  lng: 0
};

const toAddressType = (address?: Address): AddressType => {
  if (!address) {
    return emptyAddress;
  }

  return {
    address1: address.line1 ?? '',
    address2: address.line2 ?? '',
    formattedAddress: address.line1 ? `${address.line1}, ${address.city ?? ''}` : '',
    city: address.city ?? '',
    region: address.state_province ?? '',
    postalCode: address.postal_code ?? '',
    country: address.country ?? '',
    lat: address.lat ?? 0,
    lng: address.lng ?? 0
  };
};

type UpdateAddressForm = {
  addressLabel: string;
};

const UpdateAddress: FC<UpdateAddressType> = ({
  address,
  addressId,
  addressLine1,
  updateAddress,
  setModal
}) => {
  const [selectedAddress, setSelectedAddress] = useState<AddressType>(() => toAddressType(address));
  const [searchInput, setSearchInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateAddressForm>({
    defaultValues: {
      addressLabel: address?.label ?? ''
    }
  });

  const latLang = useMemo(
    () => ({ lat: selectedAddress.lat, lng: selectedAddress.lng }),
    [selectedAddress.lat, selectedAddress.lng]
  );

  const hasCoordinates = latLang.lat !== 0 && latLang.lng !== 0;

  const onSubmit = async (values: UpdateAddressForm) => {
    if (
      !selectedAddress.address1 ||
      !selectedAddress.city ||
      !selectedAddress.region ||
      !selectedAddress.postalCode ||
      !selectedAddress.country
    ) {
      toast.error('Please select a valid address.');
      return;
    }

    try {
      await updateAddress({
        entityId: addressId,
        addressLabel: values.addressLabel,
        addressLine1: selectedAddress.address1,
        addressLine2: selectedAddress.address2,
        city: selectedAddress.city,
        stateProvince: selectedAddress.region,
        postalCode: selectedAddress.postalCode,
        country: selectedAddress.country,
        lat: selectedAddress.lat,
        lng: selectedAddress.lng,
        currentDate: currentDate
      });
      setModal(false);
    } catch (error) {
      console.error('Failed to update address', error);
      toast.error('Unable to update address. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
      <Field>
        <FieldLabel>Address label</FieldLabel>
        <FieldContent>
          <Input
            {...register('addressLabel', { required: 'Please include a label.' })}
            placeholder="e.g. HQ"
          />
          {errors.addressLabel && <FieldError errors={[{ message: errors.addressLabel.message }]} />}
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel>Full address</FieldLabel>
        <FieldContent>
          <AddressAutoComplete
            address={selectedAddress}
            setAddress={setSelectedAddress}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            dialogTitle="Update Address"
          />
        </FieldContent>
      </Field>

      {hasCoordinates && (
        <div className="mt-4">
          <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
            <Marker position={latLang} />
          </GoogleMap>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Updating...' : `Update ${addressLine1 ?? 'address'}`}
      </Button>
    </form>
  );
};

export default UpdateAddress;

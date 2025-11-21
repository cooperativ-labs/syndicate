'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleMap, Marker } from '@react-google-maps/api';
import AddressAutoComplete, { AddressType } from '@src/components/ui/address-autocomplete';
import { Button } from '@src/components/ui/button';
import { Field, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { addAddress } from '@src/utils/actions/addressActions';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { LegalEntityWithSubsidiaries } from '@/types';

export type CreateAddressType = {
  entity: LegalEntityWithSubsidiaries;
  actionOnCompletion: () => void;
};

const formSchema = z.object({
  addressLabel: z.string().min(1, 'Please include a label.')
});

type FormValues = z.infer<typeof formSchema>;

const CreateAddress: FC<CreateAddressType> = ({ entity, actionOnCompletion }) => {
  const [inputAddress, setInputAddress] = useState<AddressType>({
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
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressLabel: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (
      !inputAddress.address1 ||
      !inputAddress.city ||
      !inputAddress.region ||
      !inputAddress.postalCode ||
      !inputAddress.country
    ) {
      toast.error('Please include a valid address.');
      return;
    }

    try {
      await addAddress({
        legal_entity_id: entity.id,
        label: values.addressLabel,
        line1: inputAddress.address1,
        line2: inputAddress.address2,
        city: inputAddress.city,
        state_province: inputAddress.region,
        postal_code: inputAddress.postalCode,
        country: inputAddress.country,
        lat: inputAddress.lat,
        lng: inputAddress.lng,
        revalidationPath: {
          path: `/manager/[organizationId]/entities/${entity.id}`,
          type: 'page'
        }
      });

      actionOnCompletion();
    } catch (error) {
      console.error('Error creating address:', error);
      toast.error('Failed to create address');
    }
  };

  const latLang = { lat: inputAddress.lat, lng: inputAddress.lng };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 relative">
      <div>
        <Field className="mb-4">
          <FieldLabel>Address label</FieldLabel>
          <Input
            {...register('addressLabel')}
            placeholder="e.g. Home address"
            className={errors.addressLabel ? 'border-destructive' : ''}
          />
          {errors.addressLabel && (
            <p className="text-sm text-destructive mt-1">{errors.addressLabel.message}</p>
          )}
        </Field>

        <Field>
          <FieldLabel>Full address</FieldLabel>
          <AddressAutoComplete
            address={inputAddress}
            setAddress={setInputAddress}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            dialogTitle="Confirm Address"
          />
        </Field>

        {inputAddress.lat !== 0 && (
          <div className="mt-4">
            <GoogleMap
              mapContainerStyle={{ height: '300px', width: '100%' }}
              center={latLang}
              zoom={14}
            >
              <Marker position={latLang} />
            </GoogleMap>
          </div>
        )}
      </div>
      <hr className="mt-6" />
      <Button type="submit" disabled={isSubmitting}>
        Create Address
      </Button>
    </form>
  );
};

export default CreateAddress;

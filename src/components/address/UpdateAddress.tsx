import { GoogleMap, Marker } from '@react-google-maps/api';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

import { Address } from '@/types';

import { Button } from '../ui/button';
import AddressAutocomplete from '../ui/address-autocomplete';

export type UpdateAddressType = {
  address: Address | undefined;
  addressId: string | undefined;
  addressLine1: string | undefined;
  updateAddress: (data: any) => void;
  setModal: (addressModel: boolean) => void;
};

const UpdateAddress: FC<UpdateAddressType> = ({
  address,
  addressId,
  addressLine1,
  updateAddress,
  setModal
}) => {
  const [latLang, setLatLang] = useState({ lat: 0, lng: 0 });
  const [autocompleteResults, setAutocompleteResults] = useState<google.maps.GeocoderResult[]>([]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();

  const { firstAddressLine, secondAddressLine, city, state, postalCode, country } =
    normalizeGeoAddress(autocompleteResults);

  return (
    <Formik
      initialValues={{
        addressLabel: address?.label,
        addressLine1: address?.line1,
        addressLine2: address?.line2,
        addressLine3: address?.line3,
        city: address?.city,
        stateProvince: address?.state_province,
        postalCode: address?.postal_code,
        country: address?.country
      }}
      validate={values => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.addressLine1) {
          errors.addressLine1 = 'Please include a street address.';
        }
        if (!values.city) {
          errors.city = 'Please include a city.';
        }
        if (!values.postalCode) {
          errors.postalCode = 'Please include a postal code.';
        }
        if (!values.country) {
          errors.country = 'Please include a country address';
        }
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        updateAddress({
          entityId: addressId,
          addressLabel: values.addressLabel,
          addressLine1: firstAddressLine,
          addressLine2: secondAddressLine,
          city: city,
          stateProvince: state,
          postalCode: postalCode,
          country: country,
          lat: latLang.lat,
          lng: latLang.lng,
          currentDate: currentDate
        });
        setModal(false);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <AddressAutocomplete
            address={address as AddressType}
            setAddress={setAddress as (address: Address) => void}
            searchInput={inputAddress?.value || ''}
            setSearchInput={(searchInput: string) => setInputAddress({ value: searchInput })}
            dialogTitle="Update Address"
          />
          {latLang.lat && (
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

          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Update ${addressLine1}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAddress;

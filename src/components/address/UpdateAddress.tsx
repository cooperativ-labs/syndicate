import CustomAddressAutocomplete, { CreateFirstAddressLine } from '../form-components/CustomAddressAutocomplete';
import MajorActionButton from '../buttons/MajorActionButton';
import React, { FC, useEffect, useState } from 'react';
import { Address } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';

export type UpdateAddressType = {
  address: Address;
  addressId: string;
  addressLine1: string;
  updateAddress: (data: any) => void;
  setModal: (addressModel: boolean) => void;
};

const UpdateAddress: FC<UpdateAddressType> = ({ address, addressId, addressLine1, updateAddress, setModal }) => {
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();
  const placeId = inputAddress && inputAddress.value.place_id;
  useEffect(() => {
    geocodeByPlaceId(placeId)
      .then((results) => {
        setAutocompleteResults(results);
        const lat = results[0]?.geometry.location.lat();
        const lng = results[0]?.geometry.location.lng();
        setLatLang({ lat: lat, lng: lng });
      })
      .catch((error) => {
        return error;
      });
  }, [placeId]);

  const subpremise = autocompleteResults[0]?.address_components.find((x) => x.types.includes('subpremise'))?.long_name;
  const street_number = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('street_number')
  )?.long_name;
  const street_name = autocompleteResults[0]?.address_components.find((x) => x.types.includes('route'))?.long_name;
  const city = autocompleteResults[0]?.address_components.find((x) => x.types.includes('locality'))?.long_name;
  const sublocality = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('sublocality')
  )?.long_name;
  const state = autocompleteResults[0]?.address_components.find((x) =>
    x.types.includes('administrative_area_level_1')
  )?.long_name;
  const zip = autocompleteResults[0]?.address_components.find((x) => x.types.includes('postal_code'))?.long_name;
  const country = autocompleteResults[0]?.address_components.find((x) => x.types.includes('country'))?.long_name;

  return (
    <Formik
      initialValues={{
        addressLabel: address.label,
        addressLine1: address.line1,
        addressLine2: address.line2,
        addressLine3: address.line3,
        city: address.city,
        stateProvince: address.stateProvince,
        postalCode: address.postalCode,
        country: address.country,
      }}
      validate={(values) => {
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
          variables: {
            entityId: addressId,
            addressLabel: values.addressLabel,
            addressLine1: CreateFirstAddressLine(street_number, street_name),
            addressLine2: subpremise,
            city: city ?? sublocality,
            stateProvince: state,
            postalCode: zip,
            country: country,
            lat: latLang.lat,
            lng: latLang.lng,
            currentDate: currentDate,
          },
        });
        setModal(false);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <CustomAddressAutocomplete name="addressAutocomplete" value={inputAddress} setValue={setInputAddress} />
          {latLang.lat && (
            <div className="mt-4">
              <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
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

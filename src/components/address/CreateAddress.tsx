'use client';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { ADD_ENTITY_ADDRESS } from '@src/utils/graphQueries/entity';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC, useEffect, useState } from 'react';

import MajorActionButton from '../buttons/MajorActionButton';
import Input, { addressFieldDiv } from '../form-components/Inputs';

export type CreateAddressType = {
  entity: LegalEntity;
  actionOnCompletion: () => void;
};

const CreateAddress: FC<CreateAddressType> = ({ entity, actionOnCompletion }) => {
  return <></>;
  const onSubmit = (label: string) => {
    addAddress({
      variables: {
        entityId: entity.id,
        addressLabel: label,
        addressLine1: firstAddressLine,
        addressLine2: secondAddressLine,
        city: city,
        stateProvince: state,
        postalCode: postalCode,
        country: country,
        lat: latLang.lat,
        lng: latLang.lng,
        currentDate: currentDate
      }
    });
  };

  return (
    <Formik
      initialValues={{
        addressLabel: '',
        addressAutocomplete: ''
      }}
      validate={values => {
        const errors: any = {}; /** @TODO : Shape */
        if (!firstAddressLine || !city || !state || !postalCode || !country) {
          errors.addressAutocomplete = 'Please include an address.';
        }
        if (!values.addressLabel) {
          errors.addressLabel = 'Please include a label.';
        }
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        onSubmit(values.addressLabel);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <div>
            <Input
              className={addressFieldDiv}
              required
              labelText="Address label"
              name="addressLabel"
              type="text"
              placeholder="e.g. Home address"
            />

            <CustomAddressAutocomplete
              name="addressAutocomplete"
              labelText="Full address"
              required
              value={inputAddress}
              setValue={setInputAddress}
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
          </div>
          <hr className="mt-6" />
          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Create ${values.addressLabel}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateAddress;

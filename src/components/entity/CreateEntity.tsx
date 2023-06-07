import React, { FC, useEffect, useState } from 'react';

import { ADD_ENTITY } from '@src/utils/dGraphQueries/entity';
import { Form, Formik } from 'formik';

import CustomAddressAutocomplete, { normalizeGeoAddress } from '../form-components/CustomAddressAutocomplete';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import JurisdictionSelect from '../form-components/JurisdictionSelect';
import MajorActionButton from '../buttons/MajorActionButton';
import Select from '../form-components/Select';
import { CurrencyCode, Organization } from 'types';
import { currencyOptionsExcludeCredits, getEntityTypeOptions } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMutation } from '@apollo/client';

export type CreateEntityType = {
  organization: Organization;
  defaultLogo?: string;
  actionOnCompletion: () => void;
};

const CreateEntity: FC<CreateEntityType> = ({ organization, defaultLogo, actionOnCompletion }) => {
  const [addLegalEntity, { data, error }] = useMutation(ADD_ENTITY);
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();

  const setDefaultLogo = defaultLogo ? defaultLogo : '/assets/images/logos/company-placeholder.jpeg';

  if (error) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
  }
  if (data) {
    actionOnCompletion();
  }

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
  }, [placeId, setAutocompleteResults, setLatLang]);

  if (!organization) {
    return <></>;
  }

  const entityOptions = [...organization.legalEntities].reverse();

  const { firstAddressLine, secondAddressLine, city, state, postalCode, country } =
    normalizeGeoAddress(autocompleteResults);

  return (
    <Formik
      initialValues={{
        website: '',
        legalName: '',
        entityPurpose: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        operatingCurrency: CurrencyCode.Usd,
        jurCountry: '',
        jurProvince: '',
        type: undefined,
        addressAutocomplete: '',
      }}
      validate={(values) => {
        // if (values.nonHuman === 'false') {
        //   values.type = LegalEntityType.Individual;
        // }
        const errors: any = {}; /** @TODO : Shape */
        if (!values.legalName) {
          errors.legalName = 'Please include a full legal name';
        }
        if (!values.type) {
          errors.type = 'Please select a type of entity';
        }
        if (!firstAddressLine) {
          errors.addressAutocomplete = 'Address must include street number and street name';
        }
        if (!city) {
          errors.addressAutocomplete = 'Address must include a city';
        }
        if (!state) {
          errors.addressAutocomplete = 'Address must include a state';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);

        addLegalEntity({
          variables: {
            organizationId: organization.id,
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
            lat: latLang.lat,
            lng: latLang.lng,
            operatingCurrency: values.operatingCurrency,
            jurCountry: values.jurCountry,
            jurProvince: values.jurProvince,
            type: values.type,
            currentDate: currentDate,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form className="flex flex-col gap relative">
          <Select className={defaultFieldDiv} required labelText="Type of entity" name="type">
            <option value="">Select entity type</option>
            {getEntityTypeOptions(true).map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.name}
                </option>
              );
            })}
          </Select>
          <Input
            className={defaultFieldDiv}
            required
            labelText="Organization's legal name"
            name="legalName"
            type="text"
            placeholder="Alphabet Inc."
          />

          {/* <Input className={defaultFieldDiv} labelText="Logo" name="logo" type="text" /> */}
          <Select className={defaultFieldDiv} required name="operatingCurrency" labelText="Operating currency">
            <option value="">Select currency</option>;
            {currencyOptionsExcludeCredits.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.symbol}
                </option>
              );
            })}
          </Select>
          <JurisdictionSelect className={defaultFieldDiv} labelText={'Jurisdiction'} values={values} />

          <Input
            className={defaultFieldDiv}
            labelText="Purpose of this entity"
            name="entityPurpose"
            textArea
            fieldHeight="h-24"
            type="text"
            placeholder="Short description of the purpose of this entity."
          />

          <hr className="my-6" />
          <div className="text-cLightBlue font-bold text-lg mb-4">Operating address</div>
          <CustomAddressAutocomplete
            name="addressAutocomplete"
            required
            value={inputAddress}
            setValue={setInputAddress}
          />
          {/* {latLang.lat && (
            <div className="mt-4">
              <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
                <Marker position={latLang} />
              </GoogleMap>
            </div>
          )} */}

          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Create ${values.legalName}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEntity;

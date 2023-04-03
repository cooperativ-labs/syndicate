import React, { FC, useContext, useEffect, useState } from 'react';

import { ADD_ENTITY } from '@src/utils/dGraphQueries/entity';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';

import CustomAddressAutocomplete, { CreateFirstAddressLine } from '../form-components/CustomAddressAutocomplete';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import Select from '../form-components/Select';
import { CurrencyCode } from 'types';
import { currencyOptionsExcludeCredits, getEntityTypeOptions } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMutation, useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

export type CreateEntityType = {
  defaultLogo?: string;
  actionOnCompletion: () => void;
};

const CreateEntity: FC<CreateEntityType> = ({ defaultLogo, actionOnCompletion }) => {
  const { uuid } = useContext(UserAccountContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];
  const [addOrganization, { data, error }] = useMutation(ADD_ENTITY);
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();

  const setDefaultLogo = defaultLogo ? defaultLogo : '/assets/images/logos/company-placeholder.jpeg';

  if (!user) {
    return <></>;
  }
  const entityOptions = [...user.legalEntities].reverse();

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
      .catch((error) => console.log(error));
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
        // nonHuman: 'true',
        logo: '',
        website: '',
        fullName: '',
        supLegalText: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: '',
        operatingCurrency: CurrencyCode.Usd,
        jurisdiction: '',
        type: undefined,
        userTitle: '',
        addressAutocomplete: '',
      }}
      validate={(values) => {
        // if (values.nonHuman === 'false') {
        //   values.type = LegalEntityType.Individual;
        // }
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include a full legal name';
        }
        if (!values.type) {
          errors.type = 'Please select a type of entity';
        }
        if (!street_number || !street_name) {
          errors.addressAutocomplete = 'Please include street number and street name';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        addOrganization({
          variables: {
            userId: user.id,
            displayName: values.fullName,
            image: values.logo ?? setDefaultLogo,
            website: values.website,
            fullName: values.fullName,
            supLegalText: values.supLegalText,
            addressLabel: 'Primary Operating Address',
            addressLine1: CreateFirstAddressLine(street_number, street_name),
            addressLine2: subpremise,
            city: city ?? sublocality,
            stateProvince: state,
            postalCode: zip,
            country: country,
            lat: latLang.lat,
            lng: latLang.lng,
            operatingCurrency: values.operatingCurrency,
            jurisdiction: values.jurisdiction,
            type: values.type,
            userTitle: values.userTitle,
            currentDate: currentDate,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
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
            name="fullName"
            type="text"
            placeholder="Alphabet Inc."
          />
          <Input
            className={defaultFieldDiv}
            required
            labelText="Your title"
            name="userTitle"
            type="text"
            placeholder="e.g. President"
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
          <Input
            className={defaultFieldDiv}
            required
            labelText="State of registration"
            name="jurisdiction"
            type="text"
            placeholder="e.g. Delaware"
          />

          <Input
            className={defaultFieldDiv}
            labelText="Supplementary Legal Text (optional)"
            name="supLegalText"
            textArea
            fieldHeight="h-48"
            type="text"
            placeholder="e.g. The following individual and businesses own this business..."
          />

          <hr className="my-6" />
          <div className="text-cLightBlue font-bold text-lg mb-4">Operating address</div>
          <CustomAddressAutocomplete
            name="addressAutocomplete"
            required
            value={inputAddress}
            setValue={setInputAddress}
          />
          {latLang.lat && (
            <div className="mt-4">
              <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
                <Marker position={latLang} />
              </GoogleMap>
            </div>
          )}

          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Create ${values.fullName}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateEntity;

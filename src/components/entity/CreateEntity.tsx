import { useMutation } from '@apollo/client/react';
import { CurrencyCode, LegalEntity, Organization } from '@gql/graphql';
import { currencyOptionsExcludeCredits, getEntityTypeOptions } from '@src/utils/enumConverters';
import { ADD_ENTITY } from '@src/utils/graphQueries/entity';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { getEntityOptionsList } from '@src/utils/helpersUserAndEntity';
import { Form, Formik, useFormikContext } from 'formik';
import React, { FC, useEffect, useState } from 'react';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import toast from 'react-hot-toast';

import AddressAutoComplete, { AddressType } from '../ui/address-autocomplete';
import { LoadingButton } from '../ui/loading-button';
import CustomAddressAutocomplete, {
  normalizeGeoAddress
} from '../form-components/CustomAddressAutocomplete';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import JurisdictionSelect from '../form-components/JurisdictionSelect';
import Select from '../form-components/Select';

export type CreateEntityType = {
  organization: Organization;
  defaultLogo?: string;
  actionOnCompletion: () => void;
};

const CreateEntity: FC<CreateEntityType> = ({ organization, defaultLogo, actionOnCompletion }) => {
  const [addLegalEntity, { data, error }] = useMutation(ADD_ENTITY);
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

  const setDefaultLogo = defaultLogo
    ? defaultLogo
    : '/assets/images/logos/company-placeholder.jpeg';

  if (error) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
  }
  if (data) {
    actionOnCompletion();
  }

  // const placeId = inputAddress && inputAddress.value.place_id;

  // useEffect(() => {
  //   geocodeByPlaceId(placeId)
  //     .then(results => {
  //       setAutocompleteResults(results);
  //       const lat = results[0]?.geometry.location.lat();
  //       const lng = results[0]?.geometry.location.lng();
  //       setLatLang({ lat: lat, lng: lng });
  //     })
  //     .catch(error => {
  //       return error;
  //     });
  // }, [placeId, setAutocompleteResults, setLatLang]);

  if (!organization) {
    return <></>;
  }

  // const { firstAddressLine, secondAddressLine, city, state, postalCode, country } =
  //   normalizeGeoAddress(autocompleteResults);

  const firstAddressLine = inputAddress.address1;
  const secondAddressLine = inputAddress.address2;
  const city = inputAddress.city;
  const state = inputAddress.region;
  const postalCode = inputAddress.postalCode;
  const country = inputAddress.country;
  const lat = inputAddress.lat;
  const lng = inputAddress.lng;

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
        addressAutocomplete: ''
      }}
      validate={values => {
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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setButtonState('loading');
        try {
          await addLegalEntity({
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
              lat: lat,
              lng: lng,
              operatingCurrency: values.operatingCurrency,
              jurCountry: values.jurCountry,
              jurProvince: values.jurProvince,
              type: values.type,
              currentDate: currentDate
            }
          });
          setButtonState('success');
          actionOnCompletion();
        } catch (error: any) {
          setButtonState('error');
          toast.error(error.message);
        }
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
          <Select
            className={defaultFieldDiv}
            required
            name="operatingCurrency"
            labelText="Operating currency"
          >
            <option value="">Select currency</option>;
            {currencyOptionsExcludeCredits.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.symbol}
                </option>
              );
            })}
          </Select>
          <JurisdictionSelect
            className={defaultFieldDiv}
            labelText={'Jurisdiction'}
            values={values}
          />

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
          <AddressAutoComplete
            address={inputAddress}
            setAddress={setInputAddress}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            dialogTitle="Enter Address"
          />

          {/* <CustomAddressAutocomplete
            name="addressAutocomplete"
            required
            value={inputAddress}
            setValue={setInputAddress}
          /> */}
          {/* {latLang.lat && (
            <div className="mt-4">
              <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
                <Marker position={latLang} />
              </GoogleMap>
            </div>
          )} */}

          <LoadingButton
            type="submit"
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Create ${values.legalName}`}
            loadingText="Creating entity..."
            successText="Entity created!"
            errorText="Failed to create entity"
            reset
            className="mt-8"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateEntity;

import CustomAddressAutocomplete, { CreateFirstAddressLine } from '../form-components/CustomAddressAutocomplete';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import React, { FC, useEffect, useState } from 'react';
import Select from '../form-components/Select';
import { ADD_ENTITY } from '@src/utils/dGraphQueries/entity';
import { CurrencyCode, LegalEntity, LegalEntityType, User } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { fiatOptions } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

type CompleteIndividualEntityProps = {
  userInfo: LegalEntity;
  user: User;
};
const CompleteIndividualEntity: FC<CompleteIndividualEntityProps> = ({ userInfo, user }) => {
  const [createEntity, { data, error, loading }] = useMutation(ADD_ENTITY);
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();
  const [alerted, setAlerted] = useState<boolean>(false);
  const router = useRouter();

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  if (data) {
    setAlerted(true);
    router.reload();
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

  const onSubmit = async (values) => {
    try {
      await createEntity({
        variables: {
          currentDate: currentDate,
          userId: user.id,
          fullName: values.fullName,
          displayName: values.displayName,
          type: LegalEntityType.Individual,
          image: userInfo?.profileImage ?? user?.image ?? '/assets/images/user-images/placeholder.png',
          addressLabel: 'Main Address',
          addressLine1: CreateFirstAddressLine(street_number, street_name),
          addressLine2: subpremise,
          city: city ?? sublocality,
          stateProvince: state,
          postalCode: zip,
          country: country,
          lat: latLang.lat,
          lng: latLang.lng,
          jurisdiction: values.jurisdiction,
          operatingCurrency: values.currency,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: user?.name ?? '',
        displayName: '',
        jurisdiction: '',
        currency: CurrencyCode.Usd,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include your full name';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await onSubmit(values);
          setSubmitting(false);
        } catch (err) {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 relative">
          <div className="grid md:grid-cols-2 md:gap-4">
            <Input
              className={defaultFieldDiv}
              required
              labelText="Full legal name"
              name="fullName"
              type="text"
              placeholder="e.g. Moritz Zimmermann"
            />
            <Input
              className={defaultFieldDiv}
              required
              labelText="Jurisdiction (where you pay income tax)"
              name="jurisdiction"
              type="text"
              placeholder="e.g. Delaware"
            />
          </div>

          <CustomAddressAutocomplete
            name="addressAutocomplete"
            labelText="Full address"
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
          <Select className={defaultFieldDiv} required labelText="Operating currency" name="currency">
            <option value="">Select currency</option>
            {fiatOptions.map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.symbol}
                </option>
              );
            })}
          </Select>
          <MajorActionButton type="submit" disabled={isSubmitting}>
            Add personal information
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CompleteIndividualEntity;

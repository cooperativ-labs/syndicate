import CustomAddressAutocomplete, { normalizeGeoAddress } from '../form-components/CustomAddressAutocomplete';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';
import Select from '../form-components/Select';
import { ADD_RE_PROPERTY_INFO } from '@src/utils/dGraphQueries/reProperty';
import { assetStatusOptions, getCurrencyOption, propertyTypeOptions } from '@src/utils/enumConverters';
import { Currency, CurrencyCode } from 'types';
import { currentDate } from '@utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useMutation } from '@apollo/client';

type AddPropertyInfoProps = {
  entityId: string;
  entityOperatingCurrency: Currency;
};
const AddPropertyInfo: FC<AddPropertyInfoProps> = ({ entityId, entityOperatingCurrency }) => {
  const [AddRePropertyInfo, { data, error }] = useMutation(ADD_RE_PROPERTY_INFO);
  const [latLang, setLatLang] = useState({ lat: null, lng: null });
  const [autocompleteResults, setAutocompleteResults] = useState([null]);
  const [inputAddress, setInputAddress] = useState<{ value: any }>();
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  if (data) {
    router.back();
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

  const { firstAddressLine, secondAddressLine, city, state, postalCode, country } =
    normalizeGeoAddress(autocompleteResults);

  return (
    <Formik
      initialValues={{
        propertyType: '',
        investmentStatus: '',
        amenitiesDescription: '',
        description: '',
        downPayment: null,
        lenderFees: null,
        closingCosts: null,
        jurisdiction: '',
        addressAutocomplete: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (values.downPayment && parseInt(values.downPayment, 10) < 0) {
          errors.downPayment = 'Please set a positive amount';
        }
        if (values.lenderFees && parseInt(values.lenderFees, 10) < 0) {
          errors.lenderFees = 'Please set a positive amount';
        }

        if (values.closingCosts && parseInt(values.closingCosts, 10) < 0) {
          errors.closingCosts = 'Please set a positive amount';
        }
        if (!city || !state) {
          errors.addressAutocomplete = 'Please select a valid address';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        AddRePropertyInfo({
          variables: {
            currentDate: currentDate,
            entityId: entityId,
            propertyType: values.propertyType,
            investmentStatus: values.investmentStatus,
            amenitiesDescription: values.amenitiesDescription,
            description: values.description,
            downPayment: values.downPayment,
            lenderFees: values.lenderFees,
            closingCosts: values.closingCosts,
            addressLine1: firstAddressLine,
            addressLine2: secondAddressLine,
            city: city,
            stateProvince: state,
            postalCode: postalCode,
            country: country,
            lat: latLang.lat,
            lng: latLang.lng,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Add a real estate property</h2>
          <hr className="my-6" />
          <Select required className={defaultFieldDiv} labelText="Status of property" name="investmentStatus">
            <option value="">Select a status</option>
            {assetStatusOptions.map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.name}
                </option>
              );
            })}
          </Select>

          <Select required className={defaultFieldDiv} labelText="Type of property" name="propertyType">
            <option value="">Select an property type</option>
            {propertyTypeOptions.map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.name}
                </option>
              );
            })}
          </Select>
          <Input
            className={defaultFieldDiv}
            textArea
            labelText="Describe this property generally"
            name="description"
            placeholder="e.g. Super sweet home with super sweet views"
          />

          <Input
            className={defaultFieldDiv}
            textArea
            labelText="Describe this property's amenities"
            name="amenitiesDescription"
            placeholder="e.g. swimming pool, 3 parking spaces, central air-conditioning"
          />

          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Down payment (${getCurrencyOption(entityOperatingCurrency).symbol})`}
            name="downPayment"
          />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Lender's fees (${getCurrencyOption(entityOperatingCurrency).symbol})`}
            name="lenderFees"
          />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Closing costs (${getCurrencyOption(entityOperatingCurrency).symbol})`}
            name="closingCosts"
          />
          <div>
            <hr className="my-6" />
            <h3 className="text-md md:mt-8 text-blue-900 font-semibold mb-4">{`This property's address`}</h3>
            <CustomAddressAutocomplete name="addressAutocomplete" value={inputAddress} setValue={setInputAddress} />
            {latLang.lat && (
              <div className="mt-4">
                <GoogleMap mapContainerStyle={{ height: '300px', width: '100%' }} center={latLang} zoom={14}>
                  <Marker position={latLang} />
                </GoogleMap>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            {`Create ${firstAddressLine ? firstAddressLine : `${city}, ${state}`}`}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddPropertyInfo;

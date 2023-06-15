import cn from 'classnames';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { defaultFieldLabelClass } from './Inputs';
import { ErrorMessage } from 'formik';

type CustomAddressAutocompleteProps = {
  name: string;
  labelText?: string;
  fieldLabelClass?: string;
  className?: string;
  value: any;
  required?: boolean;
  setValue: Dispatch<SetStateAction<{ value: any } | undefined>>;
};

export const createFirstAddressLine = (streetNumber: string | undefined, streetName: string | undefined) => {
  if (!!streetNumber && !!streetName) {
    return `${streetNumber} ${streetName}`;
  } else if (streetName) {
    return `${streetName}`;
  } else {
    return;
  }
};

export const normalizeGeoAddress = (
  autocompleteResults: google.maps.GeocoderResult[]
): {
  firstAddressLine: string | undefined;
  secondAddressLine: any;
  city: any;
  state: any;
  postalCode: any;
  country: any;
} => {
  const subpremise = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('subpremise')
  )?.long_name;
  const street_number = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('street_number')
  )?.long_name;
  const street_name = autocompleteResults[0]?.address_components.find((x: any) => x.types.includes('route'))?.long_name;
  const baseCity = autocompleteResults[0]?.address_components.find((x: any) => x.types.includes('locality'))?.long_name;
  const postalTown = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('postal_town')
  )?.long_name;
  const sublocality = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('sublocality')
  )?.long_name;
  const state = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('administrative_area_level_1')
  )?.long_name;
  const postalCode = autocompleteResults[0]?.address_components.find((x: any) =>
    x.types.includes('postal_code')
  )?.long_name;
  const country = autocompleteResults[0]?.address_components.find((x: any) => x.types.includes('country'))?.long_name;

  const firstAddressLine = createFirstAddressLine(street_number, street_name);
  const secondAddressLine = subpremise;
  const city = baseCity ?? postalTown ?? sublocality;

  return {
    firstAddressLine,
    secondAddressLine,
    city,
    state,
    postalCode,
    country,
  };
};

const CustomAddressAutocomplete: FC<CustomAddressAutocompleteProps> = ({
  className,
  name,
  labelText,
  value,
  required,
  fieldLabelClass,
  setValue,
}) => {
  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {labelText && (
        <label htmlFor={name} className={cn(fieldLabelClass ? fieldLabelClass : [defaultFieldLabelClass, 'mt-2 mb-1'])}>
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        selectProps={{
          value,
          onChange: setValue,
          placeholder: '123 Easy st...',
          styles: {
            input: (provided) => ({
              ...provided,
              // color: 'blue',
              // paddingLeft: 80,
              // fontSize: 16,
              // border: '0px',
              borderRadius: 5,
              backgroundColor: '#ff',
              boxShadow: 'none',
            }),

            control: (baseStyles, state) => ({
              ...baseStyles,
              height: 50,
              // borderRadius: 10,
              // boxShadow: '12px 12px 24px #d9d9d9, -12px -12px 24px #ffffff',
              // borderColor: state.isFocused ? 'grey' : 'red',
            }),
          },
        }}
        autocompletionRequest={{
          bounds: [
            { lat: 50, lng: 50 },
            { lat: 100, lng: 100 },
          ],
          componentRestrictions: {
            country: ['us', 'ca', 'uk', 'de', 'ky', 'vg'],
          },
          types: ['address'],
        }}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default CustomAddressAutocomplete;

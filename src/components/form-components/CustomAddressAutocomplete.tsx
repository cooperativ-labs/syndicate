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
  setValue: Dispatch<SetStateAction<{ value: any }>>;
};

export const CreateFirstAddressLine = (streetNumber: string, streetName: string) => {
  if (!!streetNumber && !!streetName) {
    return `${streetNumber} ${streetName}`;
  } else if (streetName) {
    return `${streetName}`;
  } else {
    return;
  }
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
  const getConfig = () => {
    switch (process.env.NEXT_PUBLIC_DEPLOY_STAGE) {
      case 'production':
        return process.env.NEXT_PUBLIC_MAPS_API_KEY;
      case 'staging':
        return process.env.NEXT_PUBLIC_STAGING_MAPS_API_KEY;
      default:
        return process.env.NEXT_PUBLIC_STAGING_MAPS_API_KEY;
    }
  };

  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {labelText && (
        <label htmlFor={name} className={cn(fieldLabelClass ? fieldLabelClass : [defaultFieldLabelClass, 'mt-2 mb-1'])}>
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <GooglePlacesAutocomplete
        apiKey={getConfig()}
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
            country: ['us', 'ca', 'uk', 'de'],
          },
        }}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default CustomAddressAutocomplete;

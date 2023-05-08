import cn from 'classnames';
import React, { FC, use, useState } from 'react';
import { Country, State } from 'country-state-city';
import { ErrorMessage, Field } from 'formik';

type JurisdictionSelectProps = {
  id?: any;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  labelText?: string;
  className?: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  values: {
    jurCountry: string;
    jurProvince?: string;
    [key: string]: any;
  };
};

// NOTE - These field values are always 'jurCountry' and 'jurProvince' - they are not dynamic

const JurisdictionSelect: FC<JurisdictionSelectProps> = ({
  labelText,
  id,
  required,
  multiple,
  className,
  fieldClass,
  disabled,
  fieldLabelClass,
  values,
}) => {
  const countries = Country.getAllCountries();
  const [states, setStates] = useState(undefined);
  const hasStates = states && states.length > 0;

  return (
    <div className={cn(className, 'flex flex-col')}>
      {labelText && (
        <label
          htmlFor="jurCountry"
          className={cn(fieldLabelClass ? fieldLabelClass : 'text-sm text-blue-900 font-semibold text-opacity-80 ')}
        >
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Field
        as="select"
        id={id}
        disabled={disabled}
        name={'jurCountry'}
        multiple={multiple}
        required={required}
        onChange={(e) => {
          setStates(State.getStatesOfCountry(e.target.value));
          values.jurCountry = e.target.value;
        }}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
        )}
      >
        <option>Select a country</option>
        {countries.map((country, i) => (
          <option key={i} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name={'jurCountry'} component="div" className="text-sm text-red-500" />
      {hasStates && (
        <Field
          as="select"
          id={id}
          disabled={disabled}
          name={'jurProvince'}
          multiple={multiple}
          required={required}
          className={cn(
            fieldClass
              ? fieldClass
              : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none'
          )}
        >
          <option>Select a state</option>
          {states.map((state, i) => (
            <option key={i} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </Field>
      )}
      <ErrorMessage name={'jurProvince'} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default JurisdictionSelect;

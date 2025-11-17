import { cn } from '@src/lib/utils';
import { Country, IState, State } from 'country-state-city';
import React, { ChangeEvent, FC, use, useEffect, useMemo, useState } from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';

import { Field, FieldError } from '../ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type JurisdictionSelectProps = {
  id?: any;
  required?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  labelText?: string;
  className?: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<{
    jurCountry: string;
    jurProvince: string;
    name?: string | null | undefined;
    externalId?: string | undefined;
  }>;
  values: {
    jurCountry: string | undefined;
    jurProvince?: string | undefined;
  };
};

// NOTE - These field values are always 'jurCountry' and 'jurProvince' - they are not dynamic

const JurisdictionSelect: FC<JurisdictionSelectProps> = ({
  labelText,
  required,
  className,
  disabled,
  fieldLabelClass,
  values,
  setValue,
  errors
}) => {
  const [states, setStates] = useState<IState[]>([]);
  const hasStates = states && states.length > 0;
  const countries = useMemo(() => Country.getAllCountries(), []);

  useEffect(() => {
    if (values.jurCountry && values.jurProvince) {
      setStates(State.getStatesOfCountry(values.jurCountry));
    }
  }, [values.jurCountry, values.jurProvince]);

  return (
    <div className={cn(className, 'flex gap-2')}>
      {labelText && (
        <label
          htmlFor="jurCountry"
          className={cn(
            fieldLabelClass
              ? fieldLabelClass
              : 'text-sm text-blue-900 font-semibold text-opacity-80 '
          )}
        >
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Field>
        <Select
          disabled={disabled}
          value={values.jurCountry}
          onValueChange={value => {
            setStates(State.getStatesOfCountry(value));
            setValue('jurCountry', value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent position="item-aligned">
            {countries.map((country, i) => (
              <SelectItem key={i} value={country.isoCode}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <FieldError errors={errors.jurCountry ? [errors.jurCountry] : undefined} />
      </Field>
      {hasStates && (
        <Field>
          <Select
            disabled={disabled}
            value={values.jurProvince}
            onValueChange={value => {
              setValue('jurProvince', value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent position="item-aligned">
              {states.map((state, i) => (
                <SelectItem key={i} value={state.isoCode}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={errors.jurProvince ? [errors.jurProvince] : undefined} />
        </Field>
      )}
    </div>
  );
};

export default JurisdictionSelect;

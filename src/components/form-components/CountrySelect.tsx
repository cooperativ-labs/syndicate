import Button from '../buttons/Button';
import React, { FC } from 'react';
import Select from './Select';
import { Address, LegalEntity } from 'types';
import { Country } from 'country-state-city';
import { defaultFieldDiv } from './Inputs';

type CountrySelectProps = {
  className: string;
  labelText: string;
  name: string;
};

const CountrySelect: FC<CountrySelectProps> = ({ labelText, name, className }) => {
  const countries = Country.getAllCountries();
  return (
    <Select required className={className} labelText={labelText} name={name}>
      <option value="">Select a country</option>
      {countries.map((countries, i) => {
        return (
          <option key={i} value={countries.isoCode}>
            {countries.name}
          </option>
        );
      })}
    </Select>
  );
};

export default CountrySelect;

import React, { FC } from 'react';
import { Address } from 'types';

type AddressProps = {
  address: Address;
  className?: string;
  withLabel?: boolean;
  withCountry?: boolean;
};
export const AddressDisplay: FC<AddressProps> = ({ address, withLabel, withCountry, className }) => {
  const { label, line1, line2, line3, city, postalCode, stateProvince, country } = address;
  if (address) {
    return (
      <div className={className}>
        {withLabel && label && <div className="font-bold">{label}:</div>}
        <div>
          {line1 && line1}
          {line2 && `, ${line2}`}
        </div>
        <div></div>
        <div>
          {city}
          {stateProvince && `, ${stateProvince}`} {postalCode && postalCode}
        </div>

        {withCountry && <div>{country}</div>}
      </div>
    );
  }
  return;
};
export default AddressDisplay;

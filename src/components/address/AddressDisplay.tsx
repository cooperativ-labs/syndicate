import React, { FC } from 'react';
import { Address, Maybe } from 'types';

type AddressProps = {
  address: Maybe<Address> | undefined;
  className?: string;
  withLabel?: boolean;
  withCountry?: boolean;
};
export const AddressDisplay: FC<AddressProps> = ({ address, withLabel, withCountry, className }) => {
  const { label, line1, line2, city, postalCode, stateProvince, country } = address as Address;
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
  return null;
};
export default AddressDisplay;

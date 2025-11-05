import { Address } from '@/types';
import React, { FC } from 'react';

type AddressProps = {
  address: Address | undefined;
  className?: string;
  withLabel?: boolean;
  withCountry?: boolean;
};
export const AddressDisplay: FC<AddressProps> = ({
  address,
  withLabel,
  withCountry,
  className
}) => {
  if (address) {
    const { label, line1, line2, city, postal_code, state_province, country } = address;
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
          {state_province && `, ${state_province}`} {postal_code && postal_code}
        </div>

        {withCountry && <div>{country}</div>}
      </div>
    );
  }
  return null;
};
export default AddressDisplay;

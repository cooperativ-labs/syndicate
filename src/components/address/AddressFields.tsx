import Input, { addressFieldDiv } from '../form-components/Inputs';
import React, { FC } from 'react';

type AddressFieldsProps = {
  excludeAddressLabel?: boolean;
  fieldNameModifier?: string;
};

const AddressFields: FC<AddressFieldsProps> = ({ excludeAddressLabel, fieldNameModifier }) => {
  const modifier = fieldNameModifier ? fieldNameModifier : '';
  return (
    <>
      {!excludeAddressLabel && (
        <Input
          className={addressFieldDiv}
          required
          labelText="Address label"
          name={`${modifier}addressLabel`}
          type="text"
          placeholder="e.g. Home address"
        />
      )}
      <Input
        className={addressFieldDiv}
        required
        labelText="Address line 1"
        name={`${modifier}addressLine1`}
        type="text"
        placeholder="e.g. 155 Easy Ave."
      />
      <Input
        className={addressFieldDiv}
        labelText="Address line 2"
        name={`${modifier}addressLine2`}
        type="text"
        placeholder=""
      />
      <Input
        className={addressFieldDiv}
        labelText="Address line 3"
        name={`${modifier}addressLine3`}
        type="text"
        placeholder=""
      />
      <div className="grid md:grid-cols-8 gap-3">
        <div className="col-span-3">
          <Input
            className={addressFieldDiv}
            required
            labelText="City"
            name={`${modifier}city`}
            type="text"
            placeholder="e.g. Providence"
          />
        </div>
        <div className="col-span-3">
          <Input
            className={addressFieldDiv}
            labelText="State or Province"
            name={`${modifier}stateProvince`}
            type="text"
            placeholder="e.g. Rhode Island"
          />
        </div>
        <div className="col-span-2">
          <Input
            className={addressFieldDiv}
            required
            labelText="Postal Code"
            name={`${modifier}postalCode`}
            type="text"
            placeholder="e.g. 02903"
          />
        </div>
      </div>

      <Input
        className={addressFieldDiv}
        required
        labelText="Country"
        name={`${modifier}country`}
        type="text"
        placeholder="e.g. United States"
      />
    </>
  );
};

export default AddressFields;

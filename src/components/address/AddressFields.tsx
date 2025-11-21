import React, { FC } from 'react';

import { Field, FieldContent, FieldGroup, FieldLabel, FieldSet } from '../ui/field';
import { Input } from '../ui/input';

type AddressFieldsProps = {
  excludeAddressLabel?: boolean;
  fieldNameModifier?: string;
};

const AddressFields: FC<AddressFieldsProps> = ({ excludeAddressLabel, fieldNameModifier }) => {
  const modifier = fieldNameModifier ? fieldNameModifier : '';
  return (
    <FieldGroup>
      <FieldSet>
        {!excludeAddressLabel && (
          <Field>
            <FieldContent>
              <FieldLabel>Address label</FieldLabel>
              <Input
                required
                name={`${modifier}addressLabel`}
                type="text"
                placeholder="e.g. Home address"
              />
            </FieldContent>
          </Field>
        )}
        <Field>
          <FieldContent>
            <FieldLabel>Address line 1</FieldLabel>
            <Input
              required
              name={`${modifier}addressLine1`}
              type="text"
              placeholder="e.g. 155 Easy Ave."
            />
          </FieldContent>
        </Field>
        <Field>
          <FieldContent>
            <FieldLabel>Address line 2</FieldLabel>
            <Input name={`${modifier}addressLine2`} type="text" placeholder="" />
          </FieldContent>
        </Field>
        <Field>
          <FieldContent>
            <Input name={`${modifier}addressLine3`} type="text" placeholder="" />
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel>Country</FieldLabel>
            <Input
              required
              name={`${modifier}country`}
              type="text"
              placeholder="e.g. United States"
            />
          </FieldContent>
        </Field>
      </FieldSet>
    </FieldGroup>
  );
};

export default AddressFields;

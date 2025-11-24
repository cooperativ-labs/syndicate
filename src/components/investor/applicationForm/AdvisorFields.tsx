import AddressFields from '@src/components/address/AddressFields';
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import React, { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { InvestorFormInputsType } from './InvestorApplicationForm';

type AdvisorFieldsProps = {
  register: UseFormRegister<InvestorFormInputsType>;
  errors: FieldErrors<InvestorFormInputsType>;
};

const AdvisorFields: FC<AdvisorFieldsProps> = ({ register, errors }) => {
  return (
    <FieldGroup>
      <Field>
        <FieldContent>
          <FieldLabel>Full Name</FieldLabel>
          <Input type='text' placeholder='' required {...register('advisorFullName')} />
          <FieldError errors={errors.advisorFullName ? [errors.advisorFullName] : undefined} />
        </FieldContent>
      </Field>
      <Field>
        <FieldContent>
          <FieldLabel>Email</FieldLabel>
          <Input type='text' placeholder='' required {...register('advisorEmail')} />
          <FieldError errors={errors.advisorEmail ? [errors.advisorEmail] : undefined} />
        </FieldContent>
      </Field>
      <Field>
        <FieldContent>
          <FieldLabel>Phone</FieldLabel>
          <Input type='text' placeholder='' required {...register('advisorPhone')} />
          <FieldError errors={errors.advisorPhone ? [errors.advisorPhone] : undefined} />
        </FieldContent>
      </Field>
      <AddressFields fieldNameModifier='advisor_' excludeAddressLabel />
    </FieldGroup>
  );
};

export default AdvisorFields;

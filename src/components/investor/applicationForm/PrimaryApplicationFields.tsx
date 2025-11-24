'use client';

import { useFormContext, useWatch } from 'react-hook-form';

import { SelectField, TextField } from './FormControls';
import type { InvestorFormInputsType } from './InvestorApplicationForm';

const purchaseMethodOptions = [
  { label: 'Company', value: 'Company' },
  { label: 'Trust', value: 'Trust' },
  {
    label: 'Traditional individual retirement account',
    value: 'Traditional individual retirement account'
  },
  { label: 'Roth IRA', value: 'Roth IRA' },
  { label: 'Pensions or profit-sharing trust', value: 'Pensions or profit-sharing trust' },
  { label: 'Custodian for Minor', value: 'Custodian for Minor' },
  { label: 'Employee Benefit Plan', value: 'Employee Benefit Plan' },
  { label: 'Kheogh Plan', value: 'Kheogh Plan' },
  { label: 'SEP retirement account', value: 'SEP retirement account' }
];

const PrimaryApplicationFields = () => {
  const form = useFormContext<InvestorFormInputsType>();
  const isNonHuman = useWatch({ control: form.control, name: 'isCompany' });

  if (isNonHuman) {
    return (
      <>
        <SelectField
          name='purchaseMethod'
          label='How are these units being purchased?'
          placeholder='Select purchase method'
          required
          options={purchaseMethodOptions}
        />
        <TextField
          name='purchaserEntityManager'
          label='Name of purchasing entity manager'
          placeholder='e.g. Moritz Zimmerman'
          required
        />
        <TextField
          name='purchaserEntityManagerTitle'
          label='Title of manager'
          placeholder='e.g. President'
          required
        />
      </>
    );
  }

  return (
    <TextField
      name='purchaserTaxState'
      label='In which state, if any, do you pay income tax?'
      placeholder='e.g. Florida'
      required
    />
  );
};

export default PrimaryApplicationFields;

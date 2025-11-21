'use client';

import { FieldDescription, FieldSeparator } from '@src/components/ui/field';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { CheckboxField, SelectField, TextareaField, TextField } from './FormControls';
import type { InvestorFormInputsType } from './InvestorApplicationForm';

type AdditionalApplicationFieldsProps = {
  offeringEntityName: string;
};

const accreditationOptions = [
  { label: 'Bank, insurance, or investment company', value: 'bank' },
  { label: 'Employee benefit plan', value: 'employee-benefit-plan' },
  {
    label: 'Charitable organization with assets over $5,000,000',
    value: 'charitable-organization'
  },
  {
    label: 'Business where all equity owners are accredited investors',
    value: 'all-equity-owners-accredited'
  },
  { label: 'Trust with assets over $5,000,000 not formed for this investment', value: 'trust-5m' },
  { label: 'Other (explain below)', value: 'other' }
];

const frequencyOptions = [
  { label: 'Often', value: 'often' },
  { label: 'Occasionally', value: 'occasionally' },
  { label: 'Seldom', value: 'seldom' },
  { label: 'Never', value: 'never' }
];

const AdditionalApplicationFields: React.FC<AdditionalApplicationFieldsProps> = ({
  offeringEntityName
}) => {
  const form = useFormContext<InvestorFormInputsType>();
  const isCompany = useWatch({ control: form.control, name: 'isCompany' });
  const purchaserAccredited = useWatch({ control: form.control, name: 'purchaserAccredited' });
  const purchaserAccreditedType = useWatch({
    control: form.control,
    name: 'purchaserAccreditedType'
  });
  const purchaserSophisticated = useWatch({
    control: form.control,
    name: 'purchaserSophisticated'
  });
  const purchaserSophisticatedSelf = useWatch({
    control: form.control,
    name: 'purchaserSophisticatedSelf'
  });
  const workingWithAdvisor = useWatch({ control: form.control, name: 'workingWithAdvisor' });
  const purchaserIsWithOfferingCompany = useWatch({
    control: form.control,
    name: 'purchaserIsWithOfferingCompany'
  });

  return (
    <>
      <h2 className="text-2xl md:mt-8 text-blue-900 font-semibold">
        Information for investor approval
      </h2>
      {!isCompany && (
        <>
          <TextField
            name="purchaserAge"
            label="Your current age"
            placeholder="e.g. 35"
            type="number"
            required
          />
          <TextareaField
            name="purchaserPrincipleResidence"
            label="List the states where you have maintained a principal residence during the past two years and the dates during which you resided there."
          />
          <TextareaField
            name="purchaserResidenceHistory"
            label="If you maintain a house or apartment in any other state, please disclose which state."
          />
        </>
      )}

      <div className="mt-6 text-lg font-semibold">Check all of the following that apply:</div>
      <CheckboxField name="purchaserAccredited" label="You are an accredited investor." />

      {isCompany ? (
        <>
          {purchaserAccredited && (
            <>
              <SelectField
                name="purchaserAccreditedType"
                label="What definition of accredited investor applies to you?"
                placeholder="Select definition"
                required
                options={accreditationOptions}
              />
              {purchaserAccreditedType === 'other' && (
                <TextareaField name="purchaserAccreditedTypeOther" label="Please explain" />
              )}
            </>
          )}
        </>
      ) : (
        <>
          {purchaserAccredited && (
            <FieldDescription className="mt-2">
              Please let us know which of the following apply.
            </FieldDescription>
          )}
          <CheckboxField
            name="purchaserNetWorth"
            label="Your net worth is in excess of $1,000,000."
            disabled={!purchaserAccredited}
          />
          <CheckboxField
            name="purchaserIncome"
            label="Your income last year exceeded $200k (single) or $300k (joint)."
            disabled={!purchaserAccredited}
          />
        </>
      )}

      {!isCompany && (
        <>
          <CheckboxField name="purchaserSophisticated" label="You are a sophisticated investor." />
          {purchaserSophisticated && (
            <div className="ml-5 mb-5 space-y-4">
              <CheckboxField
                name="purchaserSophisticatedSelf"
                label="You have the required knowledge of financial matters, as defined by the SEC."
              />
              {purchaserSophisticatedSelf && (
                <TextareaField
                  name="purchaserExperienceFinancial"
                  label="Briefly describe the principal positions held during the last 10 years (or since graduation) that demonstrate experience in financial and business matters."
                  required
                />
              )}
              <CheckboxField
                name="workingWithAdvisor"
                label="You are working with a professional advisor."
                description="Please complete the advisor section below."
              />
              <FieldSeparator />
            </div>
          )}
          <CheckboxField
            name="purchaserIsWithOfferingCompany"
            label={`You are a director, officer, or partner of ${offeringEntityName}.`}
            trueValue="yes"
            falseValue=""
          />
        </>
      )}

      <CheckboxField name="purchaserNonUs" label="The purchaser is NOT a US person or entity." />

      <TextareaField
        name="purchaserPriorRelationship"
        label="Describe any relationship, whether personal or business, you have with the Company or any of its members, principals, or directors."
        required={Boolean(purchaserIsWithOfferingCompany)}
      />
      <TextareaField
        name="purchaserExperienceOther"
        label="Please include any additional information that may assist the Company in determining whether you can evaluate the risks and merits of this investment."
      />

      <SelectField
        name="purchaserExperienceSecurities"
        label="Indicate the frequency of your investment in non-marketable securities."
        placeholder="Select frequency"
        required
        options={frequencyOptions}
      />
      <SelectField
        name="purchaserExperienceLLCs"
        label="Indicate the frequency of your investment in limited liability companies or limited partnerships."
        placeholder="Select frequency"
        required
        options={frequencyOptions}
      />
    </>
  );
};

export default AdditionalApplicationFields;

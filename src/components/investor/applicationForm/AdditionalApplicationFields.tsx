import Checkbox from '../../form-components/Checkbox';
import Input, { defaultFieldDiv } from '../../form-components/Inputs';
import React, { FC } from 'react';
import Select from '../../form-components/Select';

type AdditionalApplicationFieldsProps = {
  values: any;
  offeringEntityName: string;
};

const AdditionalApplicationFields: FC<AdditionalApplicationFieldsProps> = ({ values, offeringEntityName }) => {
  return (
    <>
      <h2 className="text-2xl md:mt-8 text-blue-900 font-semibold">{`Information for investor approval`}</h2>
      {/* INDIVIDUALS PERSONAL INFO */}
      {!values.isCompany && (
        <>
          <Input
            className={defaultFieldDiv}
            labelText={`Your current age`}
            name="purchaserAge"
            type="number"
            placeholder="e.g. 35"
            required
          />
          <Input
            className={defaultFieldDiv}
            labelText={`List all the states where you have maintained a principal residence during the past two years and the dates during which the purchaser resided there.`}
            name="purchaserPrincipleResidence"
            placeholder="e.g. "
            textArea
          />
          <Input
            className={defaultFieldDiv}
            labelText={`Please disclose if you maintain a house or apartment in any other state and if so disclose which state.`}
            name="purchaserResidenceHistory"
            placeholder="e.g. "
            textArea
          />
        </>
      )}
      {/* INVESTOR QUALIFICATION*/}
      <div className="mt-5 text-lg">Check all of the following that apply:</div>
      <Checkbox
        labelText="You are an accredited investor."
        className=""
        fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
        name="purchaserAccredited"
        checked={values.purchaserAccredited}
        sideLabel
      />
      {values.isCompany ? (
        <div>
          <Select
            required
            className={defaultFieldDiv}
            labelText="What definition of accredited investor applies to you?"
            name="purchaserAccreditedType"
          >
            <option value="">Please select</option>
            <option value="a bank, insurance, or investment company.">Bank, insurance, or investment company.</option>
            <option value="an Employee benefit plan.">Employee benefit plan.</option>
            <option value="a charitable organization with excess of $5,000,000 in funds.">
              Charitable organization with excess of $5,000,000 in funds.
            </option>
            <option value="a business where all equity owners classify as accredited investors.">
              A business where all equity owners classify as accredited investors.
            </option>
            <option value="a trust with assets in excess of $5,000,000 not created to acquire this investment.">
              A trust with assets in excess of $5,000,000 not created to acquire this investment.
            </option>
            <option value="a">other (explain below)</option>
          </Select>
          {values.purchaserAccreditedType === 'a' && (
            <Input
              labelText={`Please explain`}
              className={defaultFieldDiv}
              name="purchaserAccreditedTypeOther"
              textArea
            />
          )}
        </div>
      ) : (
        <div>
          <Checkbox
            labelText="Your net worth in excess of 1 million USD."
            className=""
            fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
            name="purchaserNetWorth"
            checked={values.purchaserNetWorth}
            sideLabel
          />
          <Checkbox
            labelText="Your income last year in excess of $200k single or $300k joint."
            className=""
            fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
            name="purchaserIncome"
            checked={values.purchaserIncome}
            sideLabel
          />
        </div>
      )}
      {!values.isCompany && (
        <>
          <Checkbox
            labelText="You are a sophisticated investor."
            className=""
            fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
            name="purchaserSophisticated"
            checked={values.purchaserSophisticated}
            sideLabel
          />
          {values.purchaserSophisticated && (
            <div className="ml-5 mb-5">
              <Checkbox
                labelText="You have the required knowledge of financial matters, as defined by the SEC."
                className=""
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                name="purchaserSophisticatedSelf"
                checked={values.purchaserSophisticatedSelf && values.purchaserSophisticated}
                sideLabel
              />
              {values.purchaserSophisticatedSelf && (
                <Input
                  className={`${defaultFieldDiv} mb-3`}
                  labelText={`Briefly describe the principal positions held during the last 10 years or since graduation that
                demonstrate related experience in financial and business matters.`}
                  name="purchaserExperienceFinancial"
                  textArea
                  required
                />
              )}
              <Checkbox
                labelText="You are working with a Professional Advisor."
                className=""
                fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
                name="workingWithAdvisor"
                checked={values.workingWithAdvisor && values.purchaserSophisticated}
                sideLabel
              />
              {values.workingWithAdvisor && 'Please complete advisor section below.'}

              <hr className="my-4" />
            </div>
          )}
          <Checkbox
            labelText={`You are a director, officer, or partner of ${offeringEntityName}.`}
            className=""
            fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
            name="purchaserIsWithOfferingCompany"
            checked={values.purchaserNonUS}
            sideLabel
          />
        </>
      )}
      <Checkbox
        labelText="The purchaser is NOT a US-Person or Entity."
        className=""
        fieldClass="text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 mt-3 focus:outline-non"
        name="purchaserNonUs"
        checked={values.purchaserNonUS}
        sideLabel
      />
      <Input
        labelText={`Describe any relationship, whether personal or business, you have with the Company or any of its
              members or principals or directors.`}
        required={values.purchaserIsWithOfferingCompany}
        className={defaultFieldDiv}
        name="purchaserPriorRelationship"
        placeholder="e.g. "
        textArea
      />{' '}
      <Input
        labelText={`Please include any additional information that may assist the Company in determining whether you are
            able to evaluate the risks and merits of this investment.`}
        className={defaultFieldDiv}
        name="purchaserExperienceOther"
        placeholder="e.g. "
        textArea
      />
      <div className="m-4"></div>
      <Select
        labelText="Indicate the frequency of your investment in non-marketable securities."
        required
        className={defaultFieldDiv}
        name="purchaserExperienceSecurities"
      >
        <option value="">Please select</option>
        <option value="often">Often</option>
        <option value="occasionally">Occasionally</option>
        <option value="seldom">Seldom</option>
        <option value="never">Never</option>
      </Select>
      <Select
        labelText="Indicate the frequency of your investment in limited liability companies or limited partnerships."
        required
        className={defaultFieldDiv}
        name="purchaserExperienceLLCs"
      >
        <option value="">Please select</option>
        <option value="often">Often</option>
        <option value="occasionally">Occasionally</option>
        <option value="seldom">Seldom</option>
        <option value="never">Never</option>
      </Select>
    </>
  );
};

export default AdditionalApplicationFields;

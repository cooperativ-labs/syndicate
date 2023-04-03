import Checkbox from '@src/components/form-components/Checkbox';
import Datepicker from '@src/components/form-components/Datepicker';
import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React, { FC, useState } from 'react';
import Select from '@src/components/form-components/Select';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { distributionPeriodOptions, getCurrencyOption, StageOptions } from '@src/utils/enumConverters';
import { Form, Formik } from 'formik';
import { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { Offering } from 'types';
import { UPDATE_OFFERING_FINANCIAL } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

type OfferingFinancialSettingsProps = {
  offering: Offering;
};

const OfferingFinancialSettings: FC<OfferingFinancialSettingsProps> = ({ offering }) => {
  const [updateOffering, { data, error }] = useMutation(UPDATE_OFFERING_FINANCIAL);
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const [alerted, setAlerted] = useState<boolean>(false);

  const { details } = offering;
  const {
    id,
    stage,
    investmentCurrency,
    priceStart,
    numUnits,
    minRaise,
    minUnitsPerInvestor,
    maxUnitsPerInvestor,
    maxInvestors,
    minInvestors,
    raiseStart,
    raisePeriod,
    additionalInfo,
    distributionPeriod,
    distributionFrequency,
    distributionCurrency,
    distributionDescription,
    adminExpense,
    projectedIrr,
    projectedIrrMax,
    preferredReturn,
    cocReturn,
    projectedAppreciation,
    capRate,
    targetEquityMultiple,
    targetEquityMultipleMax,
  } = details;

  const operatingCurrency = offering.offeringEntity.operatingCurrency;

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    setAlerted(true);
  }

  const maxRaise = priceStart * numUnits;
  return (
    <Formik
      initialValues={{
        stage: stage,
        minRaise: minRaise,
        minUnitsPerInvestor: minUnitsPerInvestor,
        maxUnitsPerInvestor: maxUnitsPerInvestor,
        maxInvestors: maxInvestors,
        minInvestors: minInvestors,
        raiseStart: raiseStart,
        raisePeriod: raisePeriod,
        additionalInfo: additionalInfo,
        distributionPeriod: distributionPeriod,
        distributionFrequency: distributionFrequency,
        distributionCurrency: distributionCurrency,
        distributionDescription: distributionDescription,
        adminExpense: adminExpense,
        projectedIrr: projectedIrr / 100,
        projectedIrrMax: projectedIrrMax / 100,
        preferredReturn: preferredReturn / 100,
        cocReturn: cocReturn / 100,
        projectedAppreciation: projectedAppreciation / 100,
        capRate: capRate / 100,
        targetEquityMultiple: targetEquityMultiple / 100,
        targetEquityMultipleMax: targetEquityMultipleMax / 100,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (values.minRaise > maxRaise) {
          errors.minRaise = 'Minimum raise must be less than maximum raise.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setButtonStep('submitting');
        setAlerted(false);
        setSubmitting(true);
        try {
          updateOffering({
            variables: {
              offeringDetailsId: id,
              stage: values.stage,
              minRaise: values.minRaise,
              minUnitsPerInvestor: values.minUnitsPerInvestor,
              maxUnitsPerInvestor: values.maxUnitsPerInvestor,
              maxInvestors: values.maxInvestors,
              minInvestors: values.minInvestors,
              raiseStart: values.raiseStart,
              raisePeriod: values.raisePeriod,
              additionalInfo: values.additionalInfo,
              distributionPeriod: values.distributionPeriod,
              distributionFrequency: values.distributionFrequency,
              distributionCurrency: values.distributionCurrency,
              distributionDescription: values.distributionDescription,
              adminExpense: values.adminExpense,
              projectedIrr: values.projectedIrr * 100,
              projectedIrrMax: values.projectedIrrMax * 100,
              preferredReturn: values.preferredReturn * 100,
              targetEquityMultiple: values.targetEquityMultiple * 100,
              targetEquityMultipleMax: values.targetEquityMultipleMax * 100,
              cocReturn: values.cocReturn * 100,
              projectedAppreciation: values.projectedAppreciation * 100,
              capRate: values.capRate * 100,
            },
          });
          setButtonStep('confirmed');
        } catch (e) {
          setButtonStep('failed');
          alert(e);
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Offering Financials</h2>
          <Select className={defaultFieldDiv} name="stage" labelText="Offering stage">
            <option value="">Select stage</option>;
            {StageOptions.map((option, i) => {
              return (
                <option key={i} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={defaultFieldDiv}
              labelText={`Minimum raise (${investmentCurrency && getCurrencyOption(investmentCurrency).symbol})`}
              name="minRaise"
              type="number"
              placeholder="e.g. 2000000"
            />

            <NonInput
              className={`${defaultFieldDiv} col-span-1 pl-1`}
              labelText={`Maximum raise (${investmentCurrency && getCurrencyOption(investmentCurrency).symbol})`}
            >
              <>
                {priceStart &&
                  numUnits &&
                  `${numberWithCommas(maxRaise)} ${investmentCurrency && getCurrencyOption(investmentCurrency).symbol}`}
              </>
            </NonInput>
          </div>
          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Minimum shares per investor"
              name="minUnitsPerInvestor"
              type="number"
              placeholder="e.g. 10"
            />
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Maximum shares per investor"
              name="maxUnitsPerInvestor"
              type="number"
              placeholder="e.g. 99"
            />
          </div>

          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Minimum number of investors"
              name="minInvestors"
              type="number"
              placeholder="e.g. 120"
            />
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Maximum number of investors"
              name="maxInvestors"
              type="number"
              placeholder="e.g. 99"
            />
          </div>

          <div className="md:grid grid-cols-2">
            <Datepicker
              name="raiseStart"
              labelText="Fundraising start date"
              className={`${defaultFieldDiv} col-span-1`}
            />
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Fundraising period in days"
              name="raisePeriod"
              type="number"
              placeholder="e.g. 120"
            />
          </div>

          <div className="md:grid grid-cols-2 gap-3">
            <Input
              className={defaultFieldDiv}
              labelText="Distributions every"
              name="distributionFrequency"
              type="number"
            />

            <Select required className={defaultFieldDiv} labelText="Period" name="distributionPeriod">
              {distributionPeriodOptions.map((type, i) => {
                return (
                  <option key={i} value={type.value}>
                    {`${type.name}s`}
                  </option>
                );
              })}
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input className={defaultFieldDiv} labelText={`Projected IRR (%)`} name="projectedIrr" type="number" />
            <Input
              className={defaultFieldDiv}
              labelText={`Max Projected IRR (% - Optional)`}
              name="projectedIrrMax"
              type="number"
            />
            <Input
              className={defaultFieldDiv}
              labelText={`Target equity multiple (x)`}
              name="targetEquityMultiple"
              type="number"
            />
            <Input
              className={defaultFieldDiv}
              labelText={`Target equity multiple Max (x - Optional)`}
              name="targetEquityMultipleMax"
              type="number"
            />{' '}
            <Input
              className={defaultFieldDiv}
              labelText={`Preferred Return (%)`}
              name="preferredReturn"
              type="number"
            />
            <Input className={defaultFieldDiv} labelText={`CoC return (%)`} name="cocReturn" type="number" />
            <Input
              className={defaultFieldDiv}
              labelText={`Projected appreciation (%)`}
              name="projectedAppreciation"
              type="number"
            />
            <Input className={defaultFieldDiv} labelText={`Cap rate (%)`} name="capRate" type="number" />
          </div>
          <Input
            className={defaultFieldDiv}
            labelText={`Administrative Expenses (${getCurrencyOption(operatingCurrency).symbol})`}
            name="adminExpense"
            type="number"
          />

          <Input
            className={defaultFieldDiv}
            labelText="Additional Information"
            name="additionalInfo"
            placeholder="e.g. Resale Horizon: 4-10 years."
            textArea
          />

          <FormButton
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4 w-full"
          >
            <LoadingButtonText
              state={buttonStep}
              idleText={`Update ${offering.name}`}
              submittingText="Saving"
              confirmedText={`${offering.name} updated!`}
              failedText="Oops. Something went wrong"
            />
          </FormButton>
        </Form>
      )}
    </Formik>
  );
};

export default OfferingFinancialSettings;

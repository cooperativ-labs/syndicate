import FormButton from '@src/components/buttons/FormButton';
import Input, { defaultFieldDiv } from '@src/components/form-components/Inputs';
import NonInput from '@src/components/form-components/NonInput';
import React, { FC, use, useState } from 'react';
import Select from '@src/components/form-components/Select';
import { ADD_OFFERING_DETAILS } from '@src/utils/dGraphQueries/offering';
import { bacOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { Currency, CurrencyCode, Maybe, OfferingDetailsType } from 'types';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { useChainId } from 'wagmi';
import { useMutation } from '@apollo/client';

type BasicOfferingDetailsFormProps = {
  offeringId: string;
  operatingCurrency: Maybe<Currency> | undefined;
};

const BasicOfferingDetailsForm: FC<BasicOfferingDetailsFormProps> = ({ offeringId, operatingCurrency }) => {
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addOfferingDetails, { data, error }] = useMutation(ADD_OFFERING_DETAILS);
  const chainId = useChainId();
  const chainBacs = bacOptions.filter((bac) => bac.chainId === chainId);
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  return (
    <div className="bg-gray-100 pt-8 p-4 md:p-8 min-h-max mb-6 md:mb-10 md:rounded-lg bg-opacity-100 ">
      <Formik
        initialValues={{
          initialPrice: '',
          investmentCurrencyCode: '' as CurrencyCode,
          numUnits: '',
          minUnitsPerInvestor: '',
          maxUnitsPerInvestor: '',
        }}
        validate={(values) => {
          const errors: any = {}; /** @TODO : Shape */
          if (!values.numUnits || values.numUnits === '') {
            errors.numUnits = 'You must set a number of units';
          }

          if (!values.initialPrice || values.initialPrice === '') {
            errors.initialPrice = 'You must set a price';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setAlerted(false);
          setSubmitting(true);

          await addOfferingDetails({
            variables: {
              currentDate: currentDate,
              offeringId: offeringId,
              offeringDetailsType: OfferingDetailsType.RealEstate,
              numUnits: values.numUnits,
              minUnitsPerInvestor: values.minUnitsPerInvestor,
              maxUnitsPerInvestor: values.maxUnitsPerInvestor,
              investmentCurrencyCode: values.investmentCurrencyCode,
              distributionCurrencyCode: values.investmentCurrencyCode,
              priceStart: parseInt(values.initialPrice, 10),
              maxRaise: parseInt(values.numUnits, 10) * parseInt(values.initialPrice, 10),
            },
          });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values }) => (
          <Form className="flex flex-col">
            <Select
              className={defaultFieldDiv}
              required
              name="investmentCurrencyCode"
              labelText="Distributions will be paid in"
            >
              <option value="">Select distribution currency</option>;
              {chainBacs.map((option, i) => {
                return (
                  <option key={i} value={option.value}>
                    {option.symbol}
                  </option>
                );
              })}
            </Select>
            <div className="md:grid grid-cols-2 gap-3">
              <Input
                className={defaultFieldDiv}
                labelText={`Initial unit price (${getCurrencyOption(operatingCurrency)?.symbol})`}
                name="initialPrice"
                type="number"
                placeholder="e.g. 1300"
                required
              />
              <Input
                className={`${defaultFieldDiv} col-span-1`}
                labelText="Total number of shares"
                name="numUnits"
                type="number"
                placeholder="e.g. 1000"
                required
              />
            </div>
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Minimum number of shares per investor"
              name="minUnitsPerInvestor"
              type="number"
              placeholder="e.g. 10"
              required
            />
            <Input
              className={`${defaultFieldDiv} col-span-1`}
              labelText="Maximum number of shares per investor"
              name="maxUnitsPerInvestor"
              type="number"
              placeholder="e.g. 120"
              required
            />

            <NonInput className={`pt-3 col-span-1 pl-1`} labelText={'Total raise'}>
              <>
                {values.numUnits &&
                  values.investmentCurrencyCode &&
                  values.initialPrice &&
                  `${numberWithCommas(parseInt(values.numUnits, 10) * parseInt(values.initialPrice, 10))} ${
                    getCurrencyOption({ code: values.investmentCurrencyCode })?.symbol
                  }`}
              </>
            </NonInput>

            <FormButton
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-8 rounded p-4"
            >
              SAVE
            </FormButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicOfferingDetailsForm;

import { RealEstateProperty } from '@gql/graphql';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';

import { LoadingButton } from '../ui/loading-button';
import Input, { defaultFieldDiv } from '../form-components/Inputs';

export type UpdatePropertyFinancialsType = {
  property: RealEstateProperty;
  updateProperty: (data: any) => void;
  setModal: (addressModel: boolean) => void;
};

const UpdatePropertyFinancials: FC<UpdatePropertyFinancialsType> = ({
  property,
  updateProperty,
  setModal
}) => {
  const [buttonState, setButtonState] = useState<'default' | 'disabled' | 'loading' | 'success' | 'error'>('default');
  const entityOperatingCurrency = property.owner?.operatingCurrency;
  return (
    <Formik
      initialValues={{
        assetValue: property.assetValue,
        assetValueNote: property.assetValueNote,
        downPayment: property.downPayment,
        lenderFees: property.lenderFees,
        closingCosts: property.closingCosts,
        loanAmount: property.loan
      }}
      validate={values => {
        const errors: any = {}; /** @TODO : Shape */
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setButtonState('loading');
        try {
          await updateProperty({
            variables: {
              currentDate: currentDate,
              rePropertyId: property.id,
              propertyType: property.propertyType,
              investmentStatus: property.investmentStatus,
              assetValue: values.assetValue,
              assetValueNote: values.assetValueNote,
              downPayment: values.downPayment,
              lenderFees: values.lenderFees,
              closingCosts: values.closingCosts,
              loanAmount: values.loanAmount
            }
          });
          setButtonState('success');
          setModal(false);
        } catch (error) {
          setButtonState('error');
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <hr className="my-6" />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Asset value (${getCurrencyOption(entityOperatingCurrency)?.symbol})`}
            name="assetValue"
          />
          <Input
            className={defaultFieldDiv}
            labelText={`Note about how this value is calculated`}
            name="assetValueNote"
          />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Loan amount (${getCurrencyOption(entityOperatingCurrency)?.symbol})`}
            name="loanAmount"
          />

          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Down payment (${getCurrencyOption(entityOperatingCurrency)?.symbol})`}
            name="downPayment"
          />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Lender's fees (${getCurrencyOption(entityOperatingCurrency)?.symbol})`}
            name="lenderFees"
          />
          <Input
            className={defaultFieldDiv}
            type="number"
            labelText={`Closing costs (${getCurrencyOption(entityOperatingCurrency)?.symbol})`}
            name="closingCosts"
          />
          <LoadingButton
            type="submit"
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Update ${property.address?.line1}`}
            loadingText="Updating property..."
            successText="Property updated!"
            errorText="Failed to update property"
            reset
            className="mt-8"
          />
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePropertyFinancials;

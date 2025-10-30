import { RealEstateProperty } from '@gql/graphql';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC } from 'react';

import MajorActionButton from '../buttons/MajorActionButton';
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
        updateProperty({
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
        setModal(false);
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
          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Update ${property.address?.line1}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default UpdatePropertyFinancials;

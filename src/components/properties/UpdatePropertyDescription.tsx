import {
  assetStatusOptions,
  getCurrencyOption,
  propertyTypeOptions
} from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import React, { FC, useState } from 'react';

import { Address, RealEstateProperty } from '@/types';

import Input, { defaultFieldDiv } from '../form-components/Inputs';
import Select from '../form-components/Select';
import { LoadingButton } from '../ui/loading-button';

export type UpdatePropertyDescriptionType = {
  property: RealEstateProperty;
  updateProperty: (data: any) => void;
  setModal: (addressModel: boolean) => void;
};

const UpdatePropertyDescription: FC<UpdatePropertyDescriptionType> = ({
  property,
  updateProperty,
  setModal
}) => {
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const entityOperatingCurrency = property.owner?.operatingCurrency;
  return (
    <Formik
      initialValues={{
        propertyType: property.propertyType,
        investmentStatus: property.investmentStatus,
        amenitiesDescription: property.amenitiesDescription,
        description: property.description,
        downPayment: property.downPayment,
        lenderFees: property.lenderFees,
        closingCosts: property.closingCosts
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
              propertyType: values.propertyType,
              investmentStatus: values.investmentStatus,
              amenitiesDescription: values.amenitiesDescription,
              description: values.description,
              downPayment: values.downPayment,
              lenderFees: values.lenderFees,
              closingCosts: values.closingCosts
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
          <Select
            required
            className={defaultFieldDiv}
            labelText="Status of property"
            name="investmentStatus"
          >
            <option value="">Select a status</option>
            {assetStatusOptions.map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.name}
                </option>
              );
            })}
          </Select>

          <Select
            required
            className={defaultFieldDiv}
            labelText="Type of property"
            name="propertyType"
          >
            <option value="">Select an entity</option>
            {propertyTypeOptions.map((type, i) => {
              return (
                <option key={i} value={type.value}>
                  {type.name}
                </option>
              );
            })}
          </Select>
          <Input
            className={defaultFieldDiv}
            textArea
            required
            labelText="Describe this property generally"
            name="description"
            placeholder="e.g. Super sweet home with super sweet views"
          />

          <Input
            className={defaultFieldDiv}
            textArea
            required
            labelText="Describe this property's amenities"
            name="amenitiesDescription"
            placeholder="e.g. swimming pool, 3 parking spaces, central air-conditioning"
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

export default UpdatePropertyDescription;

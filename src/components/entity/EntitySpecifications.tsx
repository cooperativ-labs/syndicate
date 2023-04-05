import Button from '../buttons/Button';
import Input from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import ClickToEditItem from '../form-components/ClickToEditItem';
import cn from 'classnames';
import Select from '../form-components/Select';
import { CurrencyCode, LegalEntity } from 'types';
import { currencyOptionsExcludeCredits, getCurrencyOption } from '@src/utils/enumConverters';

export type EditSelectionType =
  | 'displayName'
  | 'fullName'
  | 'jurisdiction'
  | 'currency'
  | 'taxId'
  | 'description'
  | 'none';

export const changeForm = (
  itemType: EditSelectionType,
  entity: LegalEntity,

  setEditOn: (editOn: EditSelectionType) => void,
  handleChange: (values: {
    fullName: string;
    jurisdiction?: string;
    operatingCurrency: CurrencyCode;
    taxId?: string;
    description?: string;
  }) => void
) => {
  const { displayName, fullName, jurisdiction, operatingCurrency, taxId, description } = entity;
  return (
    <Formik
      initialValues={{
        displayName: displayName,
        fullName: fullName,
        jurisdiction: jurisdiction,
        operatingCurrency: operatingCurrency.code,
        taxId: taxId,
        description: description,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include the legal name of this syndication.';
        }
        if (!values.jurisdiction) {
          errors.jurisdiction = 'Please include the legal name of this syndication.';
        }
        if (!values.operatingCurrency) {
          errors.operatingCurrency = 'Please include the legal name of this syndication.';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleChange(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form
          className={cn(
            itemType !== 'description' && 'md:grid',
            'flex flex-col  grid-cols-5 w-full items-center gap-2 my-4'
          )}
        >
          <div className="w-full md:col-span-3">
            {itemType === 'displayName' && <Input className={' bg-opacity-0'} required name="displayName" />}
            {itemType === 'fullName' && <Input className={' bg-opacity-0'} required name="fullName" />}

            {itemType === 'jurisdiction' && <Input className={' bg-opacity-0'} required name="jurisdiction" />}
            {itemType === 'currency' && (
              <Select className={' bg-opacity-0'} required name="operatingCurrency">
                {currencyOptionsExcludeCredits.map((option, i) => {
                  return (
                    <option key={i} value={option.value}>
                      {option.symbol}
                    </option>
                  );
                })}
              </Select>
            )}
            {itemType === 'taxId' && <Input className={' bg-opacity-0'} required name="taxId" placeholder="Tax ID" />}
            {itemType === 'description' && (
              <Input className={' bg-opacity-0 w-full'} required name="description" textArea />
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className=" bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase h-11 rounded w-full"
          >
            Save
          </Button>
          <Button
            className="border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase h-11 rounded w-full"
            onClick={(e) => {
              e.preventDefault();
              setEditOn('none');
            }}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};

type EntitySpecificationsProps = {
  entity: LegalEntity;
  isEntityOwner: boolean;
  updateLegalEntity: (any) => void;
};

const EntitySpecifications: FC<EntitySpecificationsProps> = ({ entity, isEntityOwner, updateLegalEntity }) => {
  const [editOn, setEditOn] = useState<EditSelectionType>('none');
  const { id, fullName, displayName, jurisdiction, operatingCurrency, taxId, description } = entity;

  const handleChange = async (values: {
    fullName: string;
    jurisdiction: string;
    operatingCurrency: CurrencyCode;
    taxId: string;
    description: string;
  }) => {
    const { fullName, jurisdiction, operatingCurrency, taxId, description } = values;
    try {
      updateLegalEntity({
        variables: {
          currentDate: currentDate,
          entityId: id,
          displayName: displayName,
          fullName: fullName,
          jurisdiction: jurisdiction,
          operatingCurrency: operatingCurrency,
          taxId: taxId,
          description: description,
        },
      });
      setEditOn('none');
    } catch (e) {
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  return (
    <>
      <ClickToEditItem
        label="Legal name"
        currenValue={fullName}
        form={changeForm('fullName', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="fullName"
        isEntityOwner={isEntityOwner}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Jurisdiction"
        currenValue={jurisdiction}
        form={changeForm('jurisdiction', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="jurisdiction"
        isEntityOwner={isEntityOwner}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Currency"
        currenValue={getCurrencyOption(operatingCurrency).symbol}
        form={changeForm('currency', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="currency"
        isEntityOwner={isEntityOwner}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Tax ID"
        currenValue={taxId}
        form={changeForm('taxId', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="taxId"
        isEntityOwner={isEntityOwner}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Description"
        currenValue={description}
        form={changeForm('description', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="description"
        isEntityOwner={isEntityOwner}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default EntitySpecifications;

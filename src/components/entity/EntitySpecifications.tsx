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
import { EditOrganizationSelectionType } from '../organization/OrganizationSpecifications';

export type EditEntitySelectionType =
  | 'displayName'
  | 'legalName'
  | 'jurisdiction'
  | 'currency'
  | 'taxId'
  | 'supplementaryLegalText'
  | 'none';

export const changeForm = (
  itemType: EditEntitySelectionType,
  entity: LegalEntity,

  setEditOn: (editOn: EditEntitySelectionType) => void,
  handleChange: (values: {
    legalName: string;
    jurisdiction?: string;
    operatingCurrency: CurrencyCode;
    taxId?: string;
    supplementaryLegalText?: string;
  }) => void
) => {
  const { displayName, legalName, jurisdiction, operatingCurrency, taxId, supplementaryLegalText } = entity;
  return (
    <Formik
      initialValues={{
        displayName: displayName,
        legalName: legalName,
        jurisdiction: jurisdiction,
        operatingCurrency: operatingCurrency.code,
        taxId: taxId,
        supplementaryLegalText: supplementaryLegalText,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.legalName) {
          errors.legalName = 'Please include the legal name of this syndication.';
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
            itemType !== 'supplementaryLegalText' && 'md:grid',
            'flex flex-col  grid-cols-5 w-full items-center gap-2 my-4'
          )}
        >
          <div className="w-full md:col-span-3">
            {itemType === 'displayName' && <Input className={' bg-opacity-0'} required name="displayName" />}
            {itemType === 'legalName' && <Input className={' bg-opacity-0'} required name="legalName" />}

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
            {itemType === 'supplementaryLegalText' && (
              <Input className={' bg-opacity-0 w-full'} required name="supplementaryLegalText" textArea />
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
  isManager: boolean;
  updateLegalEntity: (any) => void;
};

const EntitySpecifications: FC<EntitySpecificationsProps> = ({ entity, isManager, updateLegalEntity }) => {
  const [editOn, setEditOn] = useState<EditEntitySelectionType | EditOrganizationSelectionType>('none');
  const { id, legalName, displayName, jurisdiction, operatingCurrency, taxId, supplementaryLegalText } = entity;

  const handleChange = async (values: {
    legalName: string;
    displayName: string;
    jurisdiction: string;
    operatingCurrency: CurrencyCode;
    taxId: string;
    supplementaryLegalText: string;
  }) => {
    const { legalName, displayName, jurisdiction, operatingCurrency, taxId, supplementaryLegalText } = values;
    try {
      updateLegalEntity({
        variables: {
          currentDate: currentDate,
          entityId: id,
          displayName: displayName,
          legalName: legalName,
          jurisdiction: jurisdiction,
          operatingCurrency: operatingCurrency,
          taxId: taxId,
          supplementaryLegalText: supplementaryLegalText,
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
        currenValue={legalName}
        form={changeForm('legalName', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="legalName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="d/b/a"
        currenValue={displayName}
        form={changeForm('displayName', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="displayName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Jurisdiction"
        currenValue={jurisdiction}
        form={changeForm('jurisdiction', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="jurisdiction"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Currency"
        currenValue={getCurrencyOption(operatingCurrency).symbol}
        form={changeForm('currency', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="currency"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Tax ID"
        currenValue={taxId}
        form={changeForm('taxId', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="taxId"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Supplementary Legal Text"
        currenValue={supplementaryLegalText}
        form={changeForm('supplementaryLegalText', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="supplementaryLegalText"
        isManager={isManager}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default EntitySpecifications;

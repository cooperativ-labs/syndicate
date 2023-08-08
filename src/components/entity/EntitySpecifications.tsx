import Button from '../buttons/Button';
import Input from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import ClickToEditItem from '../form-components/ClickToEditItem';
import cn from 'classnames';
import JurisdictionSelect from '../form-components/JurisdictionSelect';
import Select from '../form-components/Select';
import { CurrencyCode, LegalEntity, Maybe } from 'types';
import { currencyOptionsExcludeCredits, getCurrencyOption } from '@src/utils/enumConverters';
import { EditOrganizationSelectionType } from '../organization/OrganizationSpecifications';
import { renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { State } from 'country-state-city';

export type EditEntitySelectionType =
  | 'displayName'
  | 'legalName'
  | 'jurisdiction'
  | 'currency'
  | 'taxId'
  | 'purpose'
  | 'none';

export type ChangeFormProps = {
  displayName: Maybe<string> | undefined;
  legalName: Maybe<string> | undefined;
  jurCountry?: string | undefined;
  jurProvince?: Maybe<string> | undefined;
  operatingCurrencyCode: Maybe<CurrencyCode> | undefined;
  taxId?: Maybe<string> | undefined;
  purpose?: Maybe<string> | undefined;
};

export const changeForm = (
  itemType: EditEntitySelectionType,
  entity: LegalEntity,
  setEditOn: (editOn: EditEntitySelectionType) => void,
  handleChange: (values: ChangeFormProps) => void
) => {
  const { displayName, legalName, jurisdiction, operatingCurrency, taxId, purpose } = entity;
  return (
    <Formik
      initialValues={{
        displayName: displayName,
        legalName: legalName,
        jurCountry: jurisdiction?.country,
        jurProvince: jurisdiction?.province,
        operatingCurrencyCode: operatingCurrency,
        taxId: taxId,
        purpose: purpose,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.legalName) {
          errors.legalName = 'Please include the legal name of this syndication.';
        }
        if (!values.jurCountry) {
          errors.jurCountry = 'Please include the legal name of this syndication.';
        }
        if (!values.operatingCurrencyCode) {
          errors.operatingCurrencyCode = 'Please include the legal name of this syndication.';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        handleChange(values);
        setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form
          className={cn(
            itemType !== 'purpose' && 'md:grid',
            'flex flex-col  grid-cols-5 w-full items-center gap-2 my-4'
          )}
        >
          <div className="w-full md:col-span-3">
            {itemType === 'displayName' && <Input className={' bg-opacity-0'} required name="displayName" />}
            {itemType === 'legalName' && <Input className={' bg-opacity-0'} required name="legalName" />}

            {itemType === 'jurisdiction' && <JurisdictionSelect values={values} />}
            {itemType === 'currency' && (
              <Select className={' bg-opacity-0'} required name="operatingCurrencyCode">
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
            {itemType === 'purpose' && <Input className={' bg-opacity-0 w-full'} required name="purpose" textArea />}
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
  isManager: boolean | undefined;
  updateLegalEntity: (arg0: {
    variables: {
      currentDate: string;
      entityId: string;
      displayName: Maybe<string> | undefined;
      legalName: Maybe<string> | undefined;
      jurCountry: Maybe<string> | undefined;
      jurProvince?: Maybe<string> | undefined;
      operatingCurrencyCode: Maybe<CurrencyCode> | undefined;
      taxId: Maybe<string> | undefined;

      purpose: Maybe<string> | undefined;
    };
  }) => void;
};

const EntitySpecifications: FC<EntitySpecificationsProps> = ({ entity, isManager, updateLegalEntity }) => {
  const [editOn, setEditOn] = useState<EditEntitySelectionType | EditOrganizationSelectionType | string>('none');
  const { id, legalName, displayName, operatingCurrency, taxId, purpose } = entity;

  const handleChange = async (values: ChangeFormProps) => {
    const { legalName, displayName, operatingCurrencyCode, taxId, purpose } = values;
    try {
      updateLegalEntity({
        variables: {
          currentDate: currentDate,
          entityId: id,
          displayName: displayName,
          legalName: legalName,
          jurCountry: values.jurCountry,
          jurProvince: State.getStatesOfCountry(values.jurCountry).length > 0 ? values.jurProvince : '',
          operatingCurrencyCode: operatingCurrencyCode,
          taxId: taxId,
          purpose: purpose,
        },
      });
      setEditOn('none');
    } catch (e: any) {
      alert(`Oops. Looks like something went wrong: ${e.message}`);
    }
  };

  return (
    <>
      <ClickToEditItem
        label="Legal name"
        currentValue={legalName}
        form={changeForm('legalName', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="legalName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="d/b/a"
        currentValue={displayName}
        form={changeForm('displayName', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="displayName"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Jurisdiction"
        currentValue={renderJurisdiction(entity.jurisdiction)}
        form={changeForm('jurisdiction', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="jurisdiction"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Currency"
        currentValue={getCurrencyOption(operatingCurrency)?.symbol}
        form={changeForm('currency', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="currency"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Tax ID"
        currentValue={taxId}
        form={changeForm('taxId', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="taxId"
        isManager={isManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Entity purpose"
        currentValue={purpose}
        form={changeForm('purpose', entity, setEditOn, handleChange)}
        editOn={editOn}
        itemType="purpose"
        isManager={isManager}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default EntitySpecifications;

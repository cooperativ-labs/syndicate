import Button from '../buttons/Button';
import Input from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';

import ClickToEditItem from '../form-components/ClickToEditItem';
import cn from 'classnames';

import { CurrencyCode, Organization } from 'types';
import { EditEntitySelectionType } from '../entity/EntitySpecifications';

export type EditOrganizationSelectionType =
  | 'name'
  | 'country'
  | 'description'
  | 'website'
  | 'shortDescription'
  | 'none';

export const changeForm = (
  itemType: EditOrganizationSelectionType,
  organization: Organization,

  setEditOn: (editOn: EditOrganizationSelectionType) => void,
  handleChange: (values: { name: string; description?: string; country: string; shortDescription?: string }) => void
) => {
  const { name, shortDescription, description, country } = organization;
  return (
    <Formik
      initialValues={{
        country: country,
        name: name,
        description: description,
        shortDescription: shortDescription,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please include the name of this organization.';
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
            itemType !== 'shortDescription' && 'md:grid',
            'flex flex-col  grid-cols-5 w-full items-center gap-2 my-4'
          )}
        >
          <div className="w-full md:col-span-3">
            {itemType === 'country' && <Input className={' bg-opacity-0'} required name="country" />}
            {itemType === 'name' && <Input className={' bg-opacity-0'} required name="name" />}
            {itemType === 'description' && <Input className={' bg-opacity-0'} required textArea name="description" />}
            {itemType === 'shortDescription' && (
              <Input className={' bg-opacity-0 w-full'} required name="shortDescription" textArea />
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

type OrganizationSpecificationsProps = {
  organization: Organization;
  isOrganizationManager: boolean;
  updateOrganization: (any) => void;
};

const OrganizationSpecifications: FC<OrganizationSpecificationsProps> = ({
  organization,
  isOrganizationManager,
  updateOrganization,
}) => {
  const [editOn, setEditOn] = useState<EditOrganizationSelectionType | EditEntitySelectionType>('none');
  const { id, name, country, description, shortDescription } = organization;

  const handleChange = async (values: {
    name: string;
    country: string;
    description: string;
    operatingCurrency: CurrencyCode;
    taxId: string;
    shortDescription: string;
  }) => {
    const { name, country, description, operatingCurrency, taxId, shortDescription } = values;
    try {
      updateOrganization({
        variables: {
          currentDate: currentDate,
          organizationId: id,
          country: country,
          name: name,
          description: description,
          operatingCurrency: operatingCurrency,
          taxId: taxId,
          shortDescription: shortDescription,
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
        label="Name"
        currenValue={name}
        form={changeForm('name', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="name"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Country"
        currenValue={country}
        form={changeForm('country', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="country"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
      <ClickToEditItem
        label="Description"
        currenValue={description}
        form={changeForm('description', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="description"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />

      <ClickToEditItem
        label="Short Description (160 characters max)"
        currenValue={shortDescription}
        form={changeForm('shortDescription', organization, setEditOn, handleChange)}
        editOn={editOn}
        itemType="shortDescription"
        isManager={isOrganizationManager}
        setEditOn={setEditOn}
      />
    </>
  );
};
export default OrganizationSpecifications;

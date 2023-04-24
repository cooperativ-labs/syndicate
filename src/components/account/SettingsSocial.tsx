import Input from '../form-components/Inputs';
import React, { FC } from 'react';
import Select from '../form-components/Select';
import { ADD_ORGANIZATION_SOCIAL_ACCOUNTS } from '@src/utils/dGraphQueries/organization';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LegalEntity, Organization } from 'types';
import { socialAccountOptions } from '@src/utils/enumConverters';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type SettingsSocialProps = {
  organization: Organization;
};
const SettingsUserSocial: FC<SettingsSocialProps> = ({ organization }) => {
  const [addSocials, { error }] = useMutation(ADD_ORGANIZATION_SOCIAL_ACCOUNTS);

  if (error) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
  }

  return (
    <Formik
      initialValues={{
        url: '',
        type: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.url) {
          errors.url = 'Please include a url';
        }
        if (!values.type) {
          errors.type = 'Please select a platform';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        addSocials({
          variables: {
            currentDate: currentDate,
            organizationId: organization.id,
            url: values.url,
            type: values.type,
          },
        });
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid grid-cols-5 gap-3 relative">
          <Select className={`${fieldDiv} col-span-2`} labelText="Platform" name="type">
            <option value="">Select a platform</option>
            {socialAccountOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              );
            })}
          </Select>
          <Input className={`${fieldDiv} col-span-2`} type="text" labelText="URL" name="url" placeholder="url" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsUserSocial;

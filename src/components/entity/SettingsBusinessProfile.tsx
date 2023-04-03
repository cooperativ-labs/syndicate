import Input from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LegalEntity } from 'types';
import { UPDATE_PERSONAL_INFORMATION } from '@src/utils/dGraphQueries/entity';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type SettingsBusinessProfileProps = {
  entity: LegalEntity;
};

const SettingsBusinessProfile: FC<SettingsBusinessProfileProps> = ({ entity }) => {
  const [updateLegalEntity, { data, error }] = useMutation(UPDATE_PERSONAL_INFORMATION);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateLegalEntity.legalEntity[0].fullName} was successfully updated!`);
    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        fullName: entity.fullName,
        displayName: entity.displayName,
        description: entity.description,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.fullName) {
          errors.fullName = 'Please include your full name.';
        } else if (!/^[a-z ,.'-]+$/i.test(values.fullName)) {
          errors.fullName = 'Please only use valid characters';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.expertise)) {
          errors.expertise = 'Please only use letters, numbers, spaces, and commas.';
        }
        // @ts-ignore - we turn these into strings, then turn them back into arrays before submission
        if (/[^a-z A-Z 0-9,.'-]/.test(values?.interests)) {
          errors.interests = 'Please only use letters, numbers, spaces, and commas.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setAlerted(false);
        setSubmitting(true);
        updateLegalEntity({
          variables: {
            currentDate: currentDate,
            entityId: entity.id,
            fullName: values.fullName,
            displayName: values.displayName,
            description: values.description,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col relative">
          <Input className={fieldDiv} labelText="Display name" name="displayName" type="text" placeholder="Google" />
          <Input
            className={fieldDiv}
            required
            labelText="Legal name"
            name="fullName"
            type="text"
            placeholder="e.g. Alphabet Inc."
          />
          <Input className={fieldDiv} fieldHeight="h-24" textArea labelText="Description" name="description" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsBusinessProfile;

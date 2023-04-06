import Input from '../form-components/Inputs';
import React, { FC, useEffect, useState } from 'react';
import router from 'next/router';
import { ADD_ENTITY_EMAIL } from '@src/utils/dGraphQueries/entity';
import { Form, Formik } from 'formik';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type SettingsAddEmailProps = {
  completionUrl: string;
};

const SettingsAddEmail: FC<SettingsAddEmailProps> = ({ completionUrl }) => {
  return (
    <Formik
      initialValues={{
        address: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.address) {
          errors.address = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.address)) {
          errors.address = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        // await handleAddEmailAddress(values.address, completionUrl);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Address"
              name="address"
              required
              placeholder="e.g moritz@bonuslife.com"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
          >
            Add Email
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsAddEmail;

import Input from '../form-components/Inputs';
import React, { FC } from 'react';

import axios from 'axios';
import { emailConfirmationContent } from '@src/services/postmark';
import { Form, Formik } from 'formik';
import { sha256 } from 'js-sha256';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type SettingsAddEmailProps = {
  completionUrl: string;
};

const handleAddEmailAddress = async (address: string, completionUrl: string) => {
  window.localStorage.setItem('email', address);
  const secret = sha256(address);
  const confirmationLink = `${completionUrl}?token=${encodeURIComponent(secret)}`;

  const to = address;
  const subject = 'Welcome to Cooperativ.io';
  const { html, text } = emailConfirmationContent(confirmationLink);
  const htmlBody = html;
  const textBody = text;

  try {
    await axios.post('/api/send-email', { to, subject, htmlBody, textBody });
  } catch (error) {
    throw new Error(error);
  }
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
        await handleAddEmailAddress(values.address, completionUrl);
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

import Input from '../form-components/Inputs';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { Form, Formik } from 'formik';
import { loginButtonClass } from './CreateAccount';
import { setAccountInWithEmailLink } from 'firebaseConfig/firebaseConfig';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type LogInWithEmailFormProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const LogInWithEmailForm: FC<LogInWithEmailFormProps> = ({ setLoading }) => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.email) {
          errors.email = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setLoading(true);
        setAccountInWithEmailLink(values.email);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col">
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Email"
              name="email"
              required
              placeholder="e.g moritz@bonuslife.com"
            />
          </div>
          <button type="submit" disabled={isSubmitting} className={loginButtonClass}>
            {'Email me a magic login link'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LogInWithEmailForm;

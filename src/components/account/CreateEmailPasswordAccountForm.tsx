import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

import Input from '../form-components/Inputs';
import { createAccountWithPassword, signInWithPassword } from 'firebaseConfig/firebaseConfig';
import { Form, Formik } from 'formik';
import { loginButtonClass } from './CreateAccount';
import { useRouter } from 'next/router';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type EmailPasswordFormProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const EmailPasswordForm: FC<EmailPasswordFormProps> = ({ setLoading }) => {
  const router = useRouter();
  const [isCreate, setIsCreate] = useState<boolean>(true);

  const handlePasswordLogin = async (email, password) => {
    try {
      setLoading(true);
      await signInWithPassword(email, password);
      router.reload();
    } catch (e) {
      return e;
    }
  };

  const form = (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.email) {
          errors.email = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Please include a password.';
        } else if (!/^.{8,}.*[0-9].*[a-z].*[A-Z]$/i.test(values.password)) {
          errors.password = 'Invalid password';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        setLoading(true);
        isCreate
          ? await createAccountWithPassword(values.email, values.password)
          : await handlePasswordLogin(values.email, values.password);
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
          <div className="grid md:grid-cols-4 gap-4">
            <Input
              className={`${fieldDiv} w-full md:col-span-3`}
              labelText="Password"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <div>- at least 8 characters</div>
            <div>- at least one uppercase letter</div>
            <div>- at least one lowercase letter</div>
            <div>- at least one special character</div>
          </div>
          <button type="submit" disabled={isSubmitting} className={loginButtonClass}>
            {isCreate ? 'Create Account' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div>
      {form} <button onClick={() => setIsCreate(!isCreate)}> {!isCreate ? 'Sign up' : 'Log In'}</button>
    </div>
  );
};

export default EmailPasswordForm;

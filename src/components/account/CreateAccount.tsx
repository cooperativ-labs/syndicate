import * as Yup from 'yup';
import CooperativLogo from '../CooperativLogo';
import Link from 'next/link';
import React, { FC, ReactNode, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/free-brands-svg-icons';
import { signIn } from 'next-auth/react';

export const loginButtonClass =
  'flex my-5 items-center rounded-sm bg-white hover:bg-slate-700 border-2 border-gray-300 justify-center p-3 text-slate-700: hover:text-white font-medium w-full';

type SSOButtonProps = {
  icon: string;
  iconPrefix: IconPrefix;
  text: ReactNode;
  onClick: () => void;
};
const SSOButton: FC<SSOButtonProps> = ({ onClick, iconPrefix, icon, text }) => {
  return (
    <button className={loginButtonClass} onClick={() => onClick()}>
      <FontAwesomeIcon icon={[iconPrefix, icon as IconName]} className="mr-2" /> {text}
    </button>
  );
};

const CreateAccount: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  //===========================================================================

  const handleGoogleLogin = async () => {
    setLoading(true);
    signIn('google');
  };

  const handleMicrosoftLogin = async () => {
    setLoading(true);
    signIn('azure-ad-b2c');
  };

  const handleMagicLink = (email: string) => {
    setLoading(true);
    signIn('email', { email });
  };

  const MagicLinkLoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });
  const magicLinkForm = (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={MagicLinkLoginSchema}
      onSubmit={(values) => handleMagicLink(values.email)}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <div>
            <Field
              type="email"
              name="email"
              aria-label="login-email"
              placeholder="you@example.com"
              className={`w-full rounded-sm h-14 border-2 ${
                touched.email && errors.email ? 'border-red-400' : 'border-cLightBlue'
              } focus:no-outline focus:ring-2 focus:ring-blue-400`}
            />
            <ErrorMessage name="email" component="div" className="mt-1 text-sm font-semibold text-red-700" />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex my-5 items-center rounded-sm bg-cLightBlue  justify-center p-3 text-slate-50 font-medium w-full"
          >
            Continue with email
          </button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="mt-5 md:p-10 md:rounded-lg md:bg-white md:shadow-xl">
      <div className="flex justify-center mb-10">
        <CooperativLogo />
      </div>
      {loading ? (
        <div className="flex justify-center items-center ">
          <img
            src="/assets/images/loading-circle.jpeg"
            aria-label="loading"
            className="h-6 mr-1 animate-spin bg-white rounded-full"
          />
          <span>Loading your account</span>
        </div>
      ) : (
        <div className="mt-4">
          {magicLinkForm}
          <div className="flex items-center">
            <hr className="my-4 w-full border-gray-500" />
            <div className="m-4">or</div> <hr className="my-4 w-full border-gray-500" />
          </div>
          <SSOButton onClick={handleGoogleLogin} iconPrefix="fab" icon="google" text="Continue with Google" />
          <SSOButton onClick={handleMicrosoftLogin} iconPrefix="fab" icon="microsoft" text="Continue with Microsoft" />
        </div>
      )}
      <div className="flex text-sm text-cGold text-center mt-10 justify-center">
        <Link href="https://cooperativ.io/terms">
          <div className="w-max">Terms of Service</div>
        </Link>
        <div className="mx-4">|</div>
        <Link href="https://cooperativ.io/privacy">
          <div className="w-max">Privacy Policy</div>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;

import cn from 'classnames';
import Input from '@src/components/form-components/Inputs';
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';

type AccessCodeFormProps = {
  accessCode: string | undefined | null;
  handleCodeSubmission: (arg0: string) => void;
  mini?: boolean;
  isOfferingManager?: boolean;
};

const AccessCodeForm: FC<AccessCodeFormProps> = ({ mini, accessCode, handleCodeSubmission, isOfferingManager }) => {
  const fieldClasses = mini
    ? 'h-6 text-xs w-14 bg-opacity-0 px-2 rounded-md focus:border-blue-900 focus:outline-none'
    : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-300 rounded-l-md focus:border-blue-900 focus:outline-none';
  const buttonClasses = mini
    ? 'bg-cLightBlue hover:bg-cDarkBlue text-white text-xs font-medium  rounded-md p-1 px-2 flex justify-center items-center whitespace-nowrap'
    : 'bg-cLightBlue hover:bg-cDarkBlue text-white font-semibold rounded-r-full px-5 h-12 flex justify-center items-center ';

  const code = isOfferingManager && accessCode;

  return (
    <>
      {isOfferingManager && accessCode ? (
        <button className={buttonClasses} onClick={() => handleCodeSubmission('')}>
          Remove code
        </button>
      ) : (
        <Formik
          initialValues={{
            code: code ? code : '',
          }}
          validate={(values) => {
            const errors: any = {}; /** @TODO : Shape */
            if (!values.code) {
              errors.code = 'Please enter your four-digit code.';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            handleCodeSubmission(values.code);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={cn('flex items-center', mini ? 'gap-1 border-2  border-gray-400 rounded-lg' : ' gap-0')}>
              <Input
                className="bg-opacity-0"
                fieldClass={fieldClasses}
                name="code"
                type="name"
                placeholder={isOfferingManager ? '1234' : 'e.g. 1234'}
              />
              <button type="submit" disabled={isSubmitting} className={buttonClasses}>
                {mini ? 'Set access code' : <FontAwesomeIcon icon="chevron-right" className="mr-2 text-lg" />}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default AccessCodeForm;

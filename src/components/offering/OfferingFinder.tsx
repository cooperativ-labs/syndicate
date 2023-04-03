import Button from '../buttons/Button';
import Input from '../form-components/Inputs';
import React, { FC } from 'react';
import router from 'next/router';
import { Form, Formik } from 'formik';

const OfferingFinder: FC = () => {
  return (
    <Formik
      initialValues={{
        offeringId: '',
      }}
      validate={(values) => {}}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        router.push(`/app/offerings/${values.offeringId}`);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="w-full md:grid grid-cols-3 gap-2 items-center">
          <div className="col-span-2">
            <Input name="offeringId"></Input>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-cLightBlue hover:bg-blue-800 text-white font-bold text-sm uppercase mt-4 md:mt-0 rounded p-4 w-full "
          >
            Find Offering
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default OfferingFinder;

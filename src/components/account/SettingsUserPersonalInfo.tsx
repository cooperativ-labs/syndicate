import Checkbox from '../form-components/Checkbox';
import Input from '../form-components/Inputs';
import React, { FC, useState } from 'react';
import { currentDate, makeRemovalList, makeSubmissionList } from '@src/utils/dGraphQueries/gqlUtils';
import { Form, Formik } from 'formik';
import { LegalEntity, User } from 'types';
import { UPDATE_USER } from '@src/utils/dGraphQueries/user';
import { useMutation } from '@apollo/client';

const fieldDiv = 'pt-3 my-2 bg-opacity-0';

type SettingUserPersonalInfoProps = {
  user: User;
};

const SettingUserPersonalInfo: FC<SettingUserPersonalInfoProps> = ({ user }) => {
  const [updateUser, { data, error }] = useMutation(UPDATE_USER);

  const [alerted, setAlerted] = useState<boolean>(false);

  if (error) {
    alert('Oops. Looks like something went wrong');
  }
  if (data && !alerted) {
    alert(`${data.updateUser.user[0].name} was successfully updated!`);

    setAlerted(true);
  }

  return (
    <Formik
      initialValues={{
        name: user.name,
        image: user.image,
        email: user.email,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please include your full name.';
        } else if (!/^[a-z ,.'-]+$/i.test(values.name)) {
          errors.name = 'Please only use valid characters';
        }
        if (!values.email) {
          errors.email = 'Please include an email address.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setAlerted(false);
        setSubmitting(true);
        updateUser({
          variables: {
            currentDate: currentDate,
            userId: user.id,
            name: values.name,
            email: values.email,
            image: values.image,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col relative">
          <h2 className="text-xl md:mt-8 text-blue-900 font-semibold">Personal Information</h2>
          <Input className={fieldDiv} labelText="Display name" name="name" type="text" placeholder="Moritz" />
          <Input
            className={fieldDiv}
            required
            labelText="Full name"
            name="name"
            type="text"
            placeholder="e.g. Moritz Zimmermann"
          />
          <Input
            className={fieldDiv}
            labelText="Profile image"
            name="image"
            type="text"
            placeholder="e.g. https://source.com/your-picture"
          />
          <Input
            className={fieldDiv}
            required
            labelText="Email address"
            name="email"
            type="text"
            placeholder="e.g moritz@bonuslife.com"
          />
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

export default SettingUserPersonalInfo;

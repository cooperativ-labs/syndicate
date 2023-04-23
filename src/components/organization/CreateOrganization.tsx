import React, { FC, useState } from 'react';

import { ADD_ENTITY } from '@src/utils/dGraphQueries/entity';
import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';

import Input, { defaultFieldDiv } from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { useMutation, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { ADD_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import router from 'next/router';

export type CreateOrganizationType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
};

const CreateOrganization: FC<CreateOrganizationType> = ({ defaultLogo, actionOnCompletion }) => {
  const { data: session, status } = useSession();
  const { data: userData } = useQuery(GET_USER, { variables: { id: session.user.id } });
  const user = userData?.queryUser[0];
  const [addOrganization, { data, error }] = useMutation(ADD_ORGANIZATION);

  const setDefaultLogo = defaultLogo ? defaultLogo : '/assets/images/logos/company-placeholder.jpeg';

  if (error) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
  }
  if (data) {
    actionOnCompletion && actionOnCompletion();
    router.push(`/${data.addOrganization.organization[0].id}`);
  }

  if (!user) {
    return <></>;
  }

  return (
    <Formik
      initialValues={{
        name: '',
        website: '',
        shortDescription: '',
        country: '',
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please include a name';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        addOrganization({
          variables: {
            userId: user.id,
            logo: setDefaultLogo,
            website: values.website,
            name: values.name,
            shortDescription: values.shortDescription,
            country: values.country,
            currentDate: currentDate,
          },
        });
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <Input
            className={defaultFieldDiv}
            required
            labelText="Organization's name"
            name="name"
            type="text"
            placeholder="Alphabet Inc."
          />
          <Input
            className={defaultFieldDiv}
            labelText="Organization's website"
            name="website"
            type="text"
            placeholder="e.g. https://www.cooperativ.io"
          />

          {/* <Input className={defaultFieldDiv} labelText="Logo" name="logo" type="text" /> */}

          <Input
            className={defaultFieldDiv}
            labelText="Country of operation"
            name="country"
            type="text"
            placeholder="e.g. Cayman Islands"
          />

          <Input
            className={defaultFieldDiv}
            labelText="Short description of the organization"
            name="shortDescription"
            textArea
            type="text"
            placeholder="e.g. Creates and invests in companies that are changing the world."
          />

          <hr className="my-6" />

          <MajorActionButton type="submit" disabled={isSubmitting}>
            {`Create ${values.name}`}
          </MajorActionButton>
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrganization;

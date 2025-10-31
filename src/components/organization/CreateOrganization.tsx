'use client';

import { useMutation } from '@apollo/client/react';
import { ADD_ORGANIZATION, ADD_ORGANIZATION_USER } from '@src/utils/graphQueries/organization';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { FC, useContext, useEffect, useState } from 'react';

import { ApplicationStoreProps, store } from '@/contexts/store';
import { useUserContext } from '@contexts/UserContext';

import MajorActionButton from '../buttons/MajorActionButton';
import CountrySelect from '../form-components/CountrySelect';
import FileUpload from '../form-components/FileUpload';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import { OrganizationConnection, OrganizationInsertResponse } from '@gql/graphql';

export type CreateOrganizationType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
};

const CreateOrganization: FC<CreateOrganizationType> = ({ defaultLogo, actionOnCompletion }) => {
  const { user } = useUserContext();
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo ?? '');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;
  const router = useRouter();
  const [addOrganization, { data: organization, error: orgError }] = useMutation(ADD_ORGANIZATION);
  const [addOrganizationUser, { data: organizationUser, error: orgUserError }] =
    useMutation(ADD_ORGANIZATION_USER);
  if (!user) {
    return null;
  }

  const userId = user.id;

  return (
    <Formik
      initialValues={{
        name: '',
        website: '',
        shortDescription: '',
        country: ''
      }}
      validate={values => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please include a name';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
        try {
          await addOrganization({
            variables: {
              name: values.name,
              logo: logoUrl ? logoUrl : '/assets/images/logos/company-placeholder.jpeg',
              website: values.website,
              shortDescription: values.shortDescription,
              country: values.country
            }
          });

          const org = organization?.insertIntoorganizationCollection?.records[0];
          if (!org) {
            throw new Error('Organization not found');
          }

          const orgId = org.id;

          // Add organization_user relationship with the new organization ID
          await addOrganizationUser({
            variables: {
              userId: userId,
              organizationId: orgId,
              permission: ['ADMIN']
            }
          });

          window.sessionStorage.setItem('CHOSEN_ORGANIZATION', orgId);
          router.push(`/${orgId}/overview`);
          dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
          actionOnCompletion && actionOnCompletion();
        } catch (error: any) {
          alert(`Oops. Looks like something went wrong: ${error.message}`);
          dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="flex flex-col gap relative">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <Input
                className={defaultFieldDiv}
                required
                labelText="Organization's name"
                name="name"
                type="text"
                placeholder="Alphabet Inc."
              />{' '}
              <CountrySelect
                className={defaultFieldDiv}
                labelText="Country of operation"
                name="country"
              />
            </div>
            <div className="flex col-span-1 pt-5 justify-center">
              <FileUpload
                uploaderText="Add logo"
                urlToDatabase={setLogoUrl}
                accept={['jpg', 'jpeg', 'png', 'svg']}
                imagePreview={logoUrl}
                setImagePreview={setLogoUrl}
                className="flex p-3 bg-gray-100  h-40 items-center justify-center rounded-md border-2 border-dashed border-cLightBlue border-opacity-40"
                // baseUploadUrl={`/${organization.id}/`}
              />
            </div>
          </div>
          {/* <Input className={defaultFieldDiv} labelText="Logo" name="logo" type="text" /> */}
          <Input
            className={defaultFieldDiv}
            labelText="Organization's website"
            name="website"
            type="text"
            placeholder="e.g. https://www.cooperativ.io"
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

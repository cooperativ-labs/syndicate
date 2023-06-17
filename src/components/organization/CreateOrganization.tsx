import React, { FC, useContext, useState } from 'react';

import { Form, Formik } from 'formik';
import { GET_USER } from '@src/utils/dGraphQueries/user';

import CountrySelect from '../form-components/CountrySelect';
import FileUpload from '../form-components/FileUpload';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import MajorActionButton from '../buttons/MajorActionButton';
import router from 'next/router';
import { ADD_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { ApplicationStoreProps, store } from '@context/store';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/react';

export type CreateOrganizationType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
};

const CreateOrganization: FC<CreateOrganizationType> = ({ defaultLogo, actionOnCompletion }) => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const [addOrganization] = useMutation(ADD_ORGANIZATION);
  const [logoUrl, setLogoUrl] = useState<string>('');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;

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
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
        try {
          const result = await addOrganization({
            variables: {
              userId: userId,
              logo: logoUrl ? logoUrl : '/assets/images/logos/company-placeholder.jpeg',
              website: values.website,
              name: values.name,
              shortDescription: values.shortDescription,
              country: values.country,
              currentDate: currentDate,
            },
          });
          const orgId = result.data.addOrganization.organization[0].id;
          window.sessionStorage.setItem('CHOSEN_ORGANIZATION', orgId);
          router.push(`/${orgId}/overview`).then(() => {
            router.reload();
            dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
            actionOnCompletion && actionOnCompletion();
          });
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
              <CountrySelect className={defaultFieldDiv} labelText="Country of operation" name="country" />
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

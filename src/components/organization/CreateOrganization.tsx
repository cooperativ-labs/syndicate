'use client';

import { useUserContext } from '@contexts/UserContext';
import { formatSlug } from '@src/utils/graphQueries/gqlUtils';
import { createOrganizationWithAdmin } from '@src/utils/actions/organizationActions';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { FC, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ApplicationStoreProps, store } from '@/contexts/store';

import CountrySelect from '../form-components/CountrySelect';
import FileUpload from '../form-components/FileUpload';
import Input, { defaultFieldDiv } from '../form-components/Inputs';
import { LoadingButton } from '../ui/loading-button';

export type CreateOrganizationType = {
  defaultLogo?: string;
  actionOnCompletion?: () => void;
};

const CreateOrganization: FC<CreateOrganizationType> = ({ defaultLogo, actionOnCompletion }) => {
  const { user } = useUserContext();
  const [logoUrl, setLogoUrl] = useState<string>(defaultLogo ?? '');
  const [buttonState, setButtonState] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;
  const router = useRouter();

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
        setButtonState('loading');
        dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
        try {
          const orgData = await createOrganizationWithAdmin({
            userId,
            name: values.name,
            logo: logoUrl ? logoUrl : '/assets/images/logos/company-placeholder.jpeg',
            shortDescription: values.shortDescription,
            website: values.website,
            country: values.country,
            slug: formatSlug(values.name)
          });
          setButtonState('success');
          window.sessionStorage.setItem('CHOSEN_ORGANIZATION', orgData.organization_id);
          router.push(`/${orgData.organization_id}/overview`);
          dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
          actionOnCompletion && actionOnCompletion();
        } catch (error: any) {
          setButtonState('error');
          toast.error(`Oops. Looks like something went wrong: ${error.message}`);
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

          <LoadingButton
            type="submit"
            buttonState={buttonState}
            setButtonState={setButtonState}
            text={`Create ${values.name}`}
            loadingText="Creating organization..."
            successText="Organization created!"
            errorText="Failed to create organization"
            reset
            className="mt-8"
          />
        </Form>
      )}
    </Formik>
  );
};

export default CreateOrganization;

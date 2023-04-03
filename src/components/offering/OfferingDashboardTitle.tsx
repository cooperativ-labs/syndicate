import AccessCodeForm from './profile/AccessCodeForm';
import Button from '../buttons/Button';
import cn from 'classnames';
import Input from '../form-components/Inputs';
import ProfileVisibilityToggle from './settings/ProfileVisibilityToggle';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import { UPDATE_OFFERING_PROFILE } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';

type OfferingDashboardTitleProps = {
  profileVisibility: boolean;
  isOfferingOwner: boolean;
  offeringId: string;
  gpEntityId: string;
  accessCode: string;
  offeringName: string;
};

const OfferingDashboardTitle: FC<OfferingDashboardTitleProps> = ({
  offeringName,
  profileVisibility,
  isOfferingOwner,
  offeringId,
  accessCode,
  gpEntityId,
}) => {
  const [updateOffering, { data, error }] = useMutation(UPDATE_OFFERING_PROFILE);
  const [nameEditOn, setNameEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);

  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  const handleToggle = (profileVisibility: boolean) => {
    updateOffering({
      variables: {
        currentDate: currentDate,
        name: offeringName,
        offeringId: offeringId,
        isPublic: profileVisibility,
      },
    });
  };

  const handleNameChange = async (name: string) => {
    try {
      await updateOffering({
        variables: {
          currentDate: currentDate,
          name: name,
          offeringId: offeringId,
        },
      });
      setNameEditOn(false);
    } catch {
      alert(`Oops. Looks like something went wrong: ${error.message}`);
      setAlerted(true);
    }
  };

  const handleAccessCodeChange = async (accessCode: string) => {
    try {
      await updateOffering({
        variables: {
          currentDate: currentDate,
          name: offeringName,
          accessCode: accessCode,
          offeringId: offeringId,
        },
      });
    } catch {
      alert(`Oops. Looks like something went wrong: ${error.message}`);
      setAlerted(true);
    }
  };

  const nameChangeForm = (
    <Formik
      initialValues={{
        name: offeringName,
      }}
      validate={(values) => {
        const errors: any = {}; /** @TODO : Shape */
        if (!values.name) {
          errors.name = 'Please name this syndication.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setAlerted(false);
        setSubmitting(true);
        handleNameChange(values.name);

        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex items-center">
          <Input className={' bg-opacity-0'} required name="name" type="name" placeholder="Cosy Apartments" />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-2 bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase px-3 h-11 rounded w-full"
          >
            Save
          </Button>
          <Button
            className="ml-2 border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase px-3 h-11 rounded w-full"
            onClick={(e) => {
              e.preventDefault();
              setNameEditOn(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <div className="flex justify-between">
      {nameEditOn ? (
        nameChangeForm
      ) : (
        <h1
          className={cn(`text-2xl md:text-3xl font-bold text-gray-700 ${isOfferingOwner && 'hover:cursor-pointer'}`)}
          onClick={() => {
            isOfferingOwner ? setNameEditOn(true) : {};
          }}
        >
          {offeringName}
        </h1>
      )}
      <div className="flex p-2 items-center font-semibold text-gray-600 gap-2">
        {isOfferingOwner && profileVisibility && (
          <AccessCodeForm accessCode={accessCode} handleCodeSubmission={handleAccessCodeChange} mini isOfferingOwner />
        )}
        {isOfferingOwner && (
          <ProfileVisibilityToggle profileVisibility={profileVisibility} handleToggle={handleToggle} />
        )}
        {profileVisibility && (
          <a href={`/offerors/${gpEntityId}/${offeringId}`} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon="square-arrow-up-right" className="text-lg " />
          </a>
        )}
      </div>
    </div>
  );
};
export default OfferingDashboardTitle;

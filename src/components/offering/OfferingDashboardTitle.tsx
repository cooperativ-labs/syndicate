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
  isOfferingManager: boolean;
  offeringId: string;
  organizationId: string;
  accessCode: string;
  offeringName: string;
};

const OfferingDashboardTitle: FC<OfferingDashboardTitleProps> = ({
  offeringName,
  profileVisibility,
  isOfferingManager,
  offeringId,
  accessCode,
  organizationId,
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

  const [showVisibilitySettings, setShowVisibilitySettings] = useState<boolean>(false);
  const visibilitySettings = (
    <>
      {showVisibilitySettings ? (
        <>
          {isOfferingManager && profileVisibility && (
            <AccessCodeForm
              accessCode={accessCode}
              handleCodeSubmission={handleAccessCodeChange}
              mini
              isOfferingManager
            />
          )}
          {isOfferingManager && (
            <ProfileVisibilityToggle profileVisibility={profileVisibility} handleToggle={handleToggle} />
          )}
        </>
      ) : (
        <button
          className="bg-cLightBlue hover:bg-cDarkBlue text-white text-xs font-medium  rounded-md p-1 px-2 flex justify-center items-center whitespace-nowrap"
          onClick={() => setShowVisibilitySettings(true)}
        >
          Set profile visibility
        </button>
      )}
      {profileVisibility && (
        <a href={`/${organizationId}/${offeringId}`} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon="square-arrow-up-right" className="text-lg ml-2" />
        </a>
      )}
    </>
  );

  return (
    <div className="flex justify-between">
      {nameEditOn ? (
        nameChangeForm
      ) : (
        <h1
          className={cn(
            `text-2xl md:text-3xl font-bold text-gray-700 ${
              isOfferingManager && 'hover:cursor-pointer hover:underline'
            }`
          )}
          onClick={() => {
            isOfferingManager ? setNameEditOn(true) : {};
          }}
        >
          {offeringName}
        </h1>
      )}
      <div className="flex p-2 items-center font-semibold text-gray-600 gap-2">{visibilitySettings}</div>
    </div>
  );
};
export default OfferingDashboardTitle;

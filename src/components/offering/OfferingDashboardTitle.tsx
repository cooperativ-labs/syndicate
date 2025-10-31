import { useMutation } from '@apollo/client/react';
import { Maybe } from '@gql/graphql';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { UPDATE_OFFERING_PROFILE } from '@src/utils/graphQueries/offering';
import { getBaseUrl } from '@src/utils/helpersURL';
import { String0x } from '@src/web3/helpersChain';
import cn from 'classnames';
import { Form, Formik } from 'formik';
import { Check, Copy, SquareArrowOutUpRight } from 'lucide-react';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../buttons/Button';
import Input from '../form-components/Inputs';
import FormattedCryptoAddress from '../FormattedCryptoAddress';

import AccessCodeForm from './profile/AccessCodeForm';
import ProfileVisibilityToggle from './settings/ProfileVisibilityToggle';

type OfferingDashboardTitleProps = {
  profileVisibility: Maybe<boolean> | undefined;
  isOfferingManager: Maybe<boolean> | undefined;
  offeringId: string;
  organizationId: string | undefined;
  accessCode: Maybe<string> | undefined;
  offeringName: string;
  shareContractAddress: String0x;
  chainId: Maybe<number> | undefined;
};

const OfferingDashboardTitle: FC<OfferingDashboardTitleProps> = ({
  offeringName,
  profileVisibility,
  isOfferingManager,
  offeringId,
  accessCode,
  organizationId,
  shareContractAddress,
  chainId
}) => {
  const [updateOffering, { data, error }] = useMutation(UPDATE_OFFERING_PROFILE);
  const [nameEditOn, setNameEditOn] = useState<boolean>(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

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
        isPublic: profileVisibility
      }
    });
  };

  const handleNameChange = async (name: string) => {
    try {
      await updateOffering({
        variables: {
          currentDate: currentDate,
          name: name,
          offeringId: offeringId
        }
      });
      setNameEditOn(false);
    } catch (error: any) {
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
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
          offeringId: offeringId
        }
      });
    } catch (error: any) {
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
      setAlerted(true);
    }
  };

  const nameChangeForm = (
    <Formik
      initialValues={{
        name: offeringName
      }}
      validate={values => {
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
          <Input
            className={' bg-opacity-0'}
            required
            name="name"
            type="name"
            placeholder="Cosy Apartments"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="ml-2 bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase px-3 h-11 rounded w-full"
          >
            Save
          </Button>
          <Button
            className="ml-2 border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase px-3 h-11 rounded w-full"
            onClick={e => {
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
    <div className="absolute right-4 top-1 flex min-w-max">
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
            <div className="min-w-max">
              <ProfileVisibilityToggle
                profileVisibility={profileVisibility}
                handleToggle={handleToggle}
              />
            </div>
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
          <SquareArrowOutUpRight className="text-lg ml-2" />
        </a>
      )}
    </div>
  );

  return (
    <div className="flex justify-between">
      <div>
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

        <button
          className="text-sm text-gray-700 "
          onClick={e => {
            e.stopPropagation();
            navigator.clipboard.writeText(`${getBaseUrl()}/portal/${offeringId}`);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
        >
          Copy investor portal link {copied ? <Check /> : <Copy />}
        </button>
      </div>
      <div className="relative flex p-2 items-center font-semibold text-gray-600 gap-2">
        {visibilitySettings}
      </div>
    </div>
  );
};
export default OfferingDashboardTitle;

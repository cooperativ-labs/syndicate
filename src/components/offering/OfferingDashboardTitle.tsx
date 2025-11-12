import { cn } from '@src/lib/utils';
import { updateOfferingBasic } from '@src/utils/actions/offeringActions';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { getBaseUrl } from '@src/utils/helpersURL';
import { String0x } from '@src/web3/helpersChain';
import { Form, Formik } from 'formik';
import { Check, Copy, SquareArrowOutUpRight } from 'lucide-react';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';

import Input from '../form-components/Inputs';
import FormattedCryptoAddress from '../FormattedCryptoAddress';

import AccessCodeForm from './profile/AccessCodeForm';
import ProfileVisibilityToggle from './settings/ProfileVisibilityToggle';

type OfferingDashboardTitleProps = {
  profileVisibility: boolean | undefined;
  isOfferingManager: boolean | undefined;
  offeringId: string;
  organizationId: string;
  accessCode: string | undefined;
  offeringName: string;
  shareContractAddress: String0x;
  chainId: number | undefined;
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
  const [nameEditOn, setNameEditOn] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const handleToggle = async (profileVisibility: boolean) => {
    try {
      await updateOfferingBasic({
        offeringId: offeringId,
        isPublic: profileVisibility,
        name: offeringName,
        organizationId: organizationId,
        accessCode: accessCode ?? null
      });
    } catch (error: any) {
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
    }
  };

  const handleNameChange = async (name: string) => {
    try {
      await updateOfferingBasic({
        offeringId: offeringId,
        isPublic: profileVisibility ?? false,
        name: name,
        organizationId: organizationId,
        accessCode: accessCode ?? null
      });

      setNameEditOn(false);
    } catch (error: any) {
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
    }
  };

  const handleAccessCodeChange = async (accessCode: string) => {
    try {
      await updateOfferingBasic({
        offeringId: offeringId,
        isPublic: profileVisibility ?? false,
        name: offeringName,
        organizationId: organizationId,
        accessCode: accessCode ?? null
      });
    } catch (error: any) {
      toast.error(`Oops. Looks like something went wrong: ${error.message}`);
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
        <div className="flex items-center text-sm text-gray-700">
          Copy investor portal link
          <Button
            className="text-sm text-gray-700 border-0 shadow-none"
            variant="outline"
            size="sm"
            onClick={e => {
              e.stopPropagation();
              navigator.clipboard.writeText(`${getBaseUrl()}/portal/${offeringId}`);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 1000);
            }}
          >
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
      </div>
      <div className="relative flex p-2 items-center font-semibold text-gray-600 gap-2">
        {visibilitySettings}
      </div>
    </div>
  );
};
export default OfferingDashboardTitle;

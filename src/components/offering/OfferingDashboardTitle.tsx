import { cn } from '@src/lib/utils';
import { updateOfferingBasic } from '@src/utils/actions/offeringProfileActions';
import { getBaseUrl } from '@src/utils/helpersURL';
import { String0x } from '@src/web3/helpersChain';
import { Check, Copy, SquareArrowOutUpRight } from 'lucide-react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button } from '../ui/button';
import { Field, FieldContent, FieldError } from '../ui/field';
import { Input } from '../ui/input';

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
  organizationId
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

  const NameChangeForm = () => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting }
    } = useForm<{ name: string }>({
      defaultValues: {
        name: offeringName
      }
    });

    const onSubmit = async (values: { name: string }) => {
      await handleNameChange(values.name);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2">
        <Field className="flex-1">
          <FieldContent>
            <Input
              {...register('name', {
                required: 'Please name this syndication.'
              })}
              type="text"
              placeholder="Cosy Apartments"
              required
            />
            {errors.name && <FieldError errors={[{ message: errors.name.message }]} />}
          </FieldContent>
        </Field>
        <Button type="submit" disabled={isSubmitting}>
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={e => {
            e.preventDefault();
            setNameEditOn(false);
          }}
        >
          Cancel
        </Button>
      </form>
    );
  };

  const nameChangeForm = <NameChangeForm />;

  const [showVisibilitySettings, setShowVisibilitySettings] = useState<boolean>(false);
  const visibilitySettings = (
    <div className="absolute right-4 top-1 flex min-w-max items-center">
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
        <Button variant="outline" size="sm" onClick={() => setShowVisibilitySettings(true)}>
          Set profile visibility
        </Button>
      )}
      {profileVisibility && (
        <a href={`/portal/${organizationId}/${offeringId}`} target="_blank" rel="noreferrer">
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
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_SITE_URL}/portal/${offeringId}`
              );
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

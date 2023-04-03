import Button from '../buttons/Button';
import FormModal from '@src/containers/FormModal';
import React, { FC, useEffect, useState } from 'react';
import Select from './Select';
import SettingsAddEmail from '../account/SettingsAddEmail';
import { ADD_ENTITY_EMAIL } from '@src/utils/dGraphQueries/entity';
import { defaultFieldDiv } from './Inputs';
import { LegalEntity } from 'types';
import { useMutation } from '@apollo/client';

type EmailSelectorProps = {
  entity: LegalEntity;
  refetch?: () => void;
  withAdd?: boolean;
  addEmailCompletionUrl: string;
};
const EmailSelector: FC<EmailSelectorProps> = ({ entity, refetch, withAdd, addEmailCompletionUrl }) => {
  const [emailModal, setEmailModal] = useState(false);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addEntityEmail, { data, error }] = useMutation(ADD_ENTITY_EMAIL);
  const [localStorage, setLocalStorage] = useState(undefined);
  useEffect(() => {
    setLocalStorage(window.localStorage);
  }, [setLocalStorage]);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  if (data) {
    refetch();
    setEmailModal(false);
  }

  const emailForSignIn = localStorage?.getItem('emailForSignIn');
  const addEmailToDatabase = (email: string) => {
    try {
      addEntityEmail({
        variables: {
          entityId: entity.id,
          address: email,
          isPublic: true,
        },
      });

      window.localStorage.removeItem('emailForSignIn');
    } catch (err) {
      console.log(err);
    }
  };

  if (emailForSignIn) {
    addEmailToDatabase(emailForSignIn);
  }

  const submissionCompletion = () => {};

  return (
    <>
      <FormModal formOpen={emailModal} onClose={() => setEmailModal(false)} title={`Add an address to your account`}>
        <SettingsAddEmail completionUrl={addEmailCompletionUrl} />
      </FormModal>
      <div className="md:grid grid-cols-5 gap-4">
        <div className="col-span-3 align-end ">
          <Select required className={defaultFieldDiv} labelText="Choose your email" name="emailAddress">
            {/* THIS NEEDS TO BE BASED ON THE INVESTING ENTITY, NOT THE USER */}
            <option value="">Select an email</option>
            {entity.emailAddresses.map((email, i) => {
              return (
                <option key={i} value={email.address}>
                  {email.address}
                </option>
              );
            })}
          </Select>
        </div>

        {withAdd && (
          <div className="flex flex-col col-span-2 justify-end">
            <Button
              className="p-1 px-3 border-2 border-gray-400 rounded-lg my-5"
              onClick={(e) => {
                e.preventDefault();
                setEmailModal(true);
              }}
            >
              Add New Email
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailSelector;

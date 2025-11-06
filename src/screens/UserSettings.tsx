'use client';
import { useUserContext } from '@contexts/UserContext';
import SettingsUserPersonalInfo from '@src/components/account/SettingsUserPersonalInfo';
import Loading from '@src/components/loading/Loading';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import React, { FC, useState } from 'react';

const UserSettings: FC = () => {
  const [alerted, setAlerted] = useState<boolean>(false);

  const { user } = useUserContext();

  if (!user) {
    return <Loading />;
  }

  // const [addEntityEmail, { data, error }] = useMutation(ADD_ENTITY_EMAIL);

  if (!user) {
    return <Loading />;
  }

  // if (error && !alerted) {
  //   alert('Oops. Looks like something went wrong');
  //   setAlerted(true);
  // }

  // const emailForSignIn = localStorage?.getItem('emailForSignIn');
  // const addEmailToDatabase = (email) => {
  //   try {
  //     addEntityEmail({
  //       variables: {
  //         entityId: userInfo.id,
  //         address: email,
  //         isPublic: true,
  //       },
  //     });

  //     window.localStorage.removeItem('emailForSignIn');
  //   } catch (err) {
  //     return err;
  //   }
  // };

  // if (emailForSignIn) {
  //   addEmailToDatabase(emailForSignIn);
  // }

  if (!user) {
    return <Loading />;
  }

  return (
    <div data-test="component-landing" className="flex flex-col w-full h-full mt-4">
      <div>
        <LimitedWidthSection center>
          <SettingsUserPersonalInfo user={user} />
        </LimitedWidthSection>
        {/* <LimitedWidthSection center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Wallet Addresses</h2>
          <WalletAddressList walletAddresses={userInfo.walletAddresses} withEdit />
        </LimitedWidthSection>
        <LimitedWidthSection center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Email Addresses </h2>
          <EmailAddressList emailAddresses={userInfo.emailAddresses} withEdit />
          <SettingsAddEmail completionUrl="/account" />
        </LimitedWidthSection>
        <LimitedWidthSection center>
          <h2 className="text-xl text-blue-900 font-semibold mb-4">Social Accounts</h2>
          <LinkedAccountsList linkedAccounts={userInfo.linkedAccounts} />
          <SettingsSocial entity={userInfo} />
        </LimitedWidthSection> */}
      </div>
    </div>
  );
};

export default UserSettings;

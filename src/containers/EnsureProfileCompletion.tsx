import CompleteIndividualEntity from '@src/components/account/CompleteIndividualEntity';
import React, { FC } from 'react';
import { getUserPersonalEntity } from '@src/utils/helpersUserAndEntity';
import { User } from 'types';

type EnsureProfileCompletionProps = {
  children: React.ReactNode;
  explainerText?: string;
  user: User;
};

const EnsureProfileCompletion: FC<EnsureProfileCompletionProps> = ({ children, explainerText, user }) => {
  const userInfo = getUserPersonalEntity(user);
  return (
    <>
      {userInfo.addresses[0] ? (
        <>{children}</>
      ) : (
        <>
          <div className="text-cLightBlue font-bold text-lg">{explainerText}</div>
          <CompleteIndividualEntity userInfo={userInfo} />
        </>
      )}
    </>
  );
};

export default EnsureProfileCompletion;

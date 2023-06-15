import React, { FC } from 'react';
import { User } from 'types';

type EnsureProfileCompletionProps = {
  children: React.ReactNode;
  explainerText?: string;
  user: User;
};

const EnsureOrganization: FC<EnsureProfileCompletionProps> = ({ children, explainerText, user }) => {
  const organizations = user.organizations;
  return (
    <>
      {organizations && organizations.length > 0 ? (
        <>{children}</>
      ) : (
        <>
          <div className="text-cLightBlue font-bold text-lg">{explainerText}</div>
          FORM
        </>
      )}
    </>
  );
};

export default EnsureOrganization;

import ManagerWrapper from '@src/containers/ManagerWrapper';
import OrganizationOverview from '@src/pages/OrganizationOverview';
import React, { FC } from 'react';

const OrganizationPage: FC = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationOverview />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationPage;

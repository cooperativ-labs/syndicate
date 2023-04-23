import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import OrganizationDashboard from '@src/pages/OrganizationDashboard';

const OrganizationPage: FC = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationDashboard />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationPage;

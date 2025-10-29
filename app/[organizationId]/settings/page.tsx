import ManagerWrapper from '@src/containers/ManagerWrapper';
import OrganizationSettings from '@src/screens/OrganizationSettings';
import React from 'react';

const OrganizationSettingsPage = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationSettings />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationSettingsPage;

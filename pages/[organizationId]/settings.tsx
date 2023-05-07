import ManagerWrapper from '@src/containers/ManagerWrapper';

import React, { FC } from 'react';

import OrganizationSettings from '@src/pages/OrganizationSettings';

const OrganizationSettingsPage: FC = () => {
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationSettings />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationSettingsPage;

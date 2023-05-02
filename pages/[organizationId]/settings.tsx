import ManagerWrapper from '@src/containers/ManagerWrapper';
import OrganizationDetails from '@src/pages/OrganizationDetails';
import { useRouter } from 'next/router';
import React, { FC, useEffect } from 'react';

const OrganizationSettings: FC = () => {

  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationDetails />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationSettings;

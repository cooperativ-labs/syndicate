import ManagerWrapper from '@src/containers/ManagerWrapper';
import Offerings from '@src/screens/Offerings';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const OfferingsLayout = async ({
  params,
  children
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) => {
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <ManagerWrapper>{children}</ManagerWrapper>
    </div>
  );
};

export default OfferingsLayout;

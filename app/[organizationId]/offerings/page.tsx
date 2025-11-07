import ManagerWrapper from '@src/containers/ManagerWrapper';
import Offerings from '@src/screens/Offerings';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const OfferingsPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId, '/offerings');
  if (!organization) {
    return <div>Organization not found</div>;
  }
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <ManagerWrapper>
        <Offerings organization={organization} />
      </ManagerWrapper>
    </div>
  );
};

export default OfferingsPage;

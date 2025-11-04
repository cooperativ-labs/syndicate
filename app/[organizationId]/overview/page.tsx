import ManagerWrapper from '@src/containers/ManagerWrapper';
import OrganizationOverview from '@src/screens/OrganizationOverview';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const OrganizationPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationOverview organization={organization} />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationPage;

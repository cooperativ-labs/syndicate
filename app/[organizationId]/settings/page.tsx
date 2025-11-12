import ManagerWrapper from '@src/containers/ManagerWrapper';
import OrganizationSettings from '@src/screens/OrganizationSettings';
import { getOrganization, getOrganizationUser } from '@src/utils/actions/organizationActions';
import React from 'react';

const OrganizationSettingsPage = async ({
  params
}: {
  params: Promise<{ organizationId: string }>;
}) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);
  const organizationUser = await getOrganizationUser(organizationId);
  console.log('organization', organization);
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <OrganizationSettings organization={organization} organizationUser={organizationUser} />
      </ManagerWrapper>
    </div>
  );
};

export default OrganizationSettingsPage;

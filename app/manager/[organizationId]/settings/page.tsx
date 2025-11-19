import WithAuthentication from '@src/containers/WithAuthentication';
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

  return (
    <div data-test="component-landing">
      <WithAuthentication>
        <OrganizationSettings organization={organization} organizationUser={organizationUser} />
      </WithAuthentication>
    </div>
  );
};

export default OrganizationSettingsPage;

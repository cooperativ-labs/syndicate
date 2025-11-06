import PortalWrapper from '@src/containers/PortalWrapper';
import PortalOfferingPage from '@src/screens/PortalOffering';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const PortalOfferingRoute = async ({
  params
}: {
  params: Promise<{ organizationId: string; offeringId: string }>;
}) => {
  const { organizationId, offeringId } = await params;
  const organization = await getOrganization(organizationId);
  const offering = await getOfferingById(offeringId);

  if (!organization || !offering) {
    return <div>Organization or offering not found</div>;
  }

  return (
    <PortalWrapper organization={organization}>
      <PortalOfferingPage offering={offering} />
    </PortalWrapper>
  );
};

export default PortalOfferingRoute;

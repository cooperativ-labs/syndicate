import PortalOfferingPage from '@src/screens/PortalOffering';
import { getOfferingDocumentsById } from '@src/utils/actions/documentActions';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';

const PortalOfferingRoute = async ({
  params
}: {
  params: Promise<{ organizationId: string; offeringId: string }>;
}) => {
  const { organizationId, offeringId } = await params;
  const organization = await getOrganization(organizationId, '/portal/[offeringId]');
  const offering = await getOfferingById(offeringId);

  if (!organization || !offering) {
    return <div>Organization or offering not found</div>;
  }

  const documents = await getOfferingDocumentsById(offeringId);

  return <PortalOfferingPage offering={offering} documents={documents ?? []} />;
};

export default PortalOfferingRoute;

import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';

export default async function OfferingPage({
  params
}: {
  params: Promise<{ offeringId: string; organizationId: string }>;
}) {
  const { offeringId, organizationId } = await params;
  const organization = await getOrganization(organizationId);
  const offering = await getOfferingById(offeringId);

  if (!organization || !offering) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>Sorry, this offering does not have a profile. </div>
      </div>
    );
  }

  return <OfferingProfile offering={offering} organization={organization} />;
}

import OfferingDetails from '@src/screens/OfferingDetails';
import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingById, getOfferingDocumentsById } from '@src/utils/actions/offeringActions';
import { getOrganization, getOrganizationUsers } from '@src/utils/actions/organizationActions';

export default async function OfferingPage({
  params
}: {
  params: Promise<{ offeringId: string; organizationId: string }>;
}) {
  const { offeringId, organizationId } = await params;

  const [organizationUsers, offering] = await Promise.all([
    getOrganizationUsers({ organizationId }),
    getOfferingById(offeringId)
  ]);
  const documents = await getOfferingDocumentsById(offering.id.toString());

  if (offering) {
    return (
      <OfferingDetails
        offering={offering}
        documents={documents}
        organizationUsers={organizationUsers}
      />
    );
    // return <OfferingProfile offering={offering} organization={organization} />;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>Sorry, this offering does not have a profile. </div>
    </div>
  );
}

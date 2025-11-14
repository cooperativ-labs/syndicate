import Offerings from '@src/screens/Offerings';
import { getOrganization } from '@src/utils/actions/organizationActions';

const OfferingsPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;

  const organization = await getOrganization(organizationId, '/offerings');
  if (!organization) {
    return <div>Organization not found</div>;
  }

  return <Offerings organization={organization} />;
};

export default OfferingsPage;

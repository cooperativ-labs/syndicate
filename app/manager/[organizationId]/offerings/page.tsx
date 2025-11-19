import Offerings from '@src/screens/Offerings';
import { getSimpleEntitiesByOrganizationId } from '@src/utils/actions/entityActions';
import { getOrganization } from '@src/utils/actions/organizationActions';
import { getOfferingsFromOrganization } from '@src/utils/helpersUserAndEntity';

const OfferingsPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;

  const [organization, legalEntities] = await Promise.all([
    getOrganization(organizationId),
    getSimpleEntitiesByOrganizationId(organizationId)
  ]);

  if (!organization) {
    return <div>Organization not found</div>;
  }
  const offerings = getOfferingsFromOrganization(organization);
  return <Offerings offerings={offerings} legalEntities={legalEntities} />;
};

export default OfferingsPage;

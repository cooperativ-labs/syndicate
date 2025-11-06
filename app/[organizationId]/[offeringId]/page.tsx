import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import Footer from '@src/Footer/Footer';
import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';

export default async function ClientOfferingPage({
  params
}: {
  params: Promise<{ offeringId: string; organizationId: string }>;
}) {
  const { offeringId, organizationId } = await params;
  const organization = await getOrganization(organizationId);
  const offering = await getOfferingById(offeringId);

  if (!organization || !offering.is_public) {
    return <div>Sorry, this offering does not have a profile. </div>;
  }

  return (
    <div data-test="component-project" className="bg-gray-50">
      <ProfilePrivateModal offeringId={offering.id.toString()} accessCode={offering.access_code} />
      <OfferingProfile offering={offering} organization={organization} />
      <Footer color="bg-gray-200" />
    </div>
  );
}

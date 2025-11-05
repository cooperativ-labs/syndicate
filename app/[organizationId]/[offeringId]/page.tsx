import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import Footer from '@src/Footer/Footer';
import OfferingProfile from '@src/screens/OfferingProfile';

import { getOfferingWithDocumentsById } from '@src/utils/actions/offeringActions';

export default async function ClientOfferingPage({
  params
}: {
  params: Promise<{ offeringId: string }>;
}) {
  const { offeringId } = await params;
  const offering = await getOfferingWithDocumentsById(offeringId);
  if (!offering || !offering.is_public) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>Sorry, this offering does not have a profile. </div>
      </div>
    );
  }

  const { id, access_code } = offering;

  return (
    <div data-test="component-project" className="bg-gray-50">
      <ProfilePrivateModal offeringId={id} accessCode={access_code} />
      <OfferingProfile offering={offering} />
      <Footer color="bg-gray-200" />
    </div>
  );
}

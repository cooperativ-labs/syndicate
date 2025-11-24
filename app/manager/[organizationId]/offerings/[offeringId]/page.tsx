import OfferingDetails from '@src/screens/OfferingDetails';
import { getOfferingDocumentsById } from '@src/utils/actions/documentActions';
import { getOfferingById } from '@src/utils/actions/offeringActions';

export default async function OfferingPage({
  params
}: {
  params: Promise<{ offeringId: string }>;
}) {
  const { offeringId } = await params;

  const offering = await getOfferingById(offeringId);
  const documents = await getOfferingDocumentsById(offeringId);

  if (offering) {
    return <OfferingDetails offering={offering} documents={documents} />;
  }

  return (
    <div className='flex items-center justify-center w-full h-screen'>
      <div>Sorry, this offering does not have a profile. </div>
    </div>
  );
}

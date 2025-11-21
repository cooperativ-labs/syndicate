import { OfferingContextProvider } from '@contexts/OfferingContext';
import OfferingDetails from '@src/screens/OfferingDetails';
import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingDocumentsById } from '@src/utils/actions/documentActions';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganizationUsers } from '@src/utils/actions/organizationActions';

export default async function OfferingPage({
  params,
  children
}: {
  params: Promise<{ offeringId: string; organizationId: string }>;
  children: React.ReactNode;
}) {
  const { offeringId, organizationId } = await params;

  const [organizationUsers, offering] = await Promise.all([
    getOrganizationUsers({ organizationId }),
    getOfferingById(offeringId)
  ]);

  return (
    <OfferingContextProvider offering={offering} organizationUsers={organizationUsers}>
      {children}
    </OfferingContextProvider>
  );
}

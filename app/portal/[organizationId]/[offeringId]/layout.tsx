import { OfferingContextProvider } from '@contexts/OfferingContext';
import { getOfferingDocumentsById } from '@src/utils/actions/documentActions';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganizationUsers } from '@src/utils/actions/organizationActions';

const PortalOfferingLayout = async ({
  params,
  children
}: {
  params: Promise<{ organizationId: string; offeringId: string }>;
  children: React.ReactNode;
}) => {
  const { organizationId, offeringId } = await params;
  const [organizationUsers, offering, documents] = await Promise.all([
    getOrganizationUsers({ organizationId }),
    getOfferingById(offeringId),
    getOfferingDocumentsById(offeringId)
  ]);

  return (
    <OfferingContextProvider
      offering={offering}
      organizationUsers={organizationUsers}
      documents={documents ?? []}
    >
      {children}
    </OfferingContextProvider>
  );
};

export default PortalOfferingLayout;

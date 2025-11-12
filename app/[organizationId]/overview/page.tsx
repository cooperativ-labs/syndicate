import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import OrganizationOverview from '@src/screens/OrganizationOverview';
import { getOrganization } from '@src/utils/actions/organizationActions';

const OrganizationPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId, '/overview');
  if (!organization) {
    return <OrganizationNotFound backHref={`/${organizationId}/portal`} />;
  }
  return (
    <div data-test="page-overview">
      <OrganizationOverview organization={organization} />
    </div>
  );
};

export default OrganizationPage;

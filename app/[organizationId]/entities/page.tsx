import EntityDashboard from '@src/screens/EntityDashboard';
import { getEntitiesByOrganizationId } from '@src/utils/actions/entityActions';

const EntitiesPage = async ({
  params
}: {
  params: Promise<{ organizationId: string }> | { organizationId: string };
}) => {
  const { organizationId } = await params;
  const entities = await getEntitiesByOrganizationId(organizationId);
  return (
    <div data-test="page-entities">
      <EntityDashboard entities={entities} />
    </div>
  );
};

export default EntitiesPage;

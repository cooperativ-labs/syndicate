import ManagerWrapper from '@src/containers/ManagerWrapper';
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
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <EntityDashboard entities={entities} />
      </ManagerWrapper>
    </div>
  );
};

export default EntitiesPage;

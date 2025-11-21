import { getEntitiesByOrganizationId } from '@src/utils/actions/entityActions';

import { EntityProvider } from '@/contexts/EntityContext';

const EntitiesLayout = async ({
  params,
  children
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) => {
  const { organizationId } = await params;
  const entities = await getEntitiesByOrganizationId(organizationId);
  return (
    <div data-test="layout-entities" className="flex flex-col w-full h-full mx-auto p-8">
      <EntityProvider entities={entities}>
        <div style={{ maxWidth: '1580px' }}> {children}</div>
      </EntityProvider>
    </div>
  );
};

export default EntitiesLayout;

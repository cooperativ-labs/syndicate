import CreateOffering from '@src/components/offering/CreateOffering';
import { getSimpleEntitiesByOrganizationId } from '@src/utils/actions/entityActions';
import React from 'react';

const CreateOfferingPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;

  const legalEntities = await getSimpleEntitiesByOrganizationId(organizationId);

  return (
    <div data-test='component-create-project-page' className='h-full flex'>
      <CreateOffering legalEntities={legalEntities} />
    </div>
  );
};

export default CreateOfferingPage;

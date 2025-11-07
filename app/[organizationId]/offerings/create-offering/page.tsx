import CreateOffering from '@src/components/offering/CreateOffering';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const CreateOfferingPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;

  const organization = await getOrganization(organizationId, '/offerings/create-offering');
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <CreateOffering organization={organization} />
      </ManagerWrapper>
    </div>
  );
};

export default CreateOfferingPage;

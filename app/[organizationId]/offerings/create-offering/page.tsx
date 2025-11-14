import CreateOffering from '@src/components/offering/CreateOffering';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React from 'react';

const CreateOfferingPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;

  const organization = await getOrganization(organizationId, '/offerings/create-offering');
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <CreateOffering organization={organization} />
    </div>
  );
};

export default CreateOfferingPage;

'use client';

import { useQuery } from '@apollo/client/react';
import CreateOffering from '@src/components/offering/CreateOffering';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { useParams } from 'next/navigation';
import React from 'react';

const CreateOfferingPage = () => {
  const params = useParams<{ organizationId: string }>();
  const orgId = params?.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
    skip: !orgId
  });
  const organization = organizationData?.getOrganization;

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <CreateOffering organization={organization} refetch={refetch} />
      </ManagerWrapper>
    </div>
  );
};

export default CreateOfferingPage;

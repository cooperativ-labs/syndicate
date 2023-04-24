import CreateOffering from '@src/components/offering/CreateOffering';
import FormCard from '@src/components/cards/FormCard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import router from 'next/router';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { useQuery } from '@apollo/client';

const CreateOfferingPage: FC = () => {
  const orgId = router.query.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
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

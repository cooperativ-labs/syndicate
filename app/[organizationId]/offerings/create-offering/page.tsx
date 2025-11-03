import { useQuery } from '@apollo/client/react';
import CreateOffering from '@src/components/offering/CreateOffering';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { createServerApolloClient } from '@src/lib/apolloServer';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { useParams } from 'next/navigation';
import React from 'react';
import type { GetOrganizationQuery, Organization } from '@gql/graphql';
import { getOrganization } from '@src/utils/helpersOrganization';

const CreateOfferingPage = async () => {
  const params = useParams<{ organizationId: string }>();
  const orgId = params?.organizationId;
  // const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, {
  //   variables: { id: orgId },
  //   skip: !orgId
  // });

  const organization = await getOrganization(orgId);
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <CreateOffering organization={organization} />
      </ManagerWrapper>
    </div>
  );
};

export default CreateOfferingPage;

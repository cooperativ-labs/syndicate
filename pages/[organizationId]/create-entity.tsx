import CreateEntity from '@src/components/entity/CreateEntity';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';

import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import router from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';

const CreateEntityPage: FC = () => {
  const orgId = router.query.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;

  if (!organization) {
    return <LoadingModal />;
  }

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LimitedWidthSection center>
          {organization ? (
            <>
              <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
              <hr className="my-6" />
              <CreateEntity actionOnCompletion={() => router.back()} organization={organization} />
            </>
          ) : (
            'You need to create an organization first'
          )}
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

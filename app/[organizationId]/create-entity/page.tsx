'use client';

import CreateEntity from '@src/components/entity/CreateEntity';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

const CreateEntityPage = () => {
  const params = useParams<{ organizationId: string }>();
  const router = useRouter();
  const orgId = params?.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
    skip: !orgId
  });
  const organization = organizationData?.getOrganization;

  if (!organization) {
    return <LoadingModal />;
  }

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LimitedWidthSection center>
          <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
          <hr className="my-6" />
          <CreateEntity actionOnCompletion={() => router.back()} organization={organization} />
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

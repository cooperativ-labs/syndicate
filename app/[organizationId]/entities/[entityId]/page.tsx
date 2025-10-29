'use client';

import EntityDetails from '@src/screens/EntityDetails';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import router from 'next/router';
import { GET_ENTITY } from '@src/utils/graphQueries/entity';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

const EntityPage = () => {
  const params = useParams<{ entityId: string }>();
  const entityId = params?.entityId;
  const { data: entityData } = useQuery(GET_ENTITY, {
    variables: { id: entityId },
    skip: !entityId
  });

  if (!entityData) {
    return <LoadingModal />;
  }

  const entity = entityData?.getLegalEntity;

  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <EntityDetails entity={entity} />
      </ManagerWrapper>
    </div>
  );
};

export default EntityPage;

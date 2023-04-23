import React from 'react';

import EntityDetails from '@src/pages/EntityDetails';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import router from 'next/router';
import { GET_ENTITY } from '@src/utils/dGraphQueries/entity';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

const EntityPage: NextPage = () => {
  const entityId = router.query.entityId;
  const { data: entityData } = useQuery(GET_ENTITY, { variables: { id: entityId } });

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

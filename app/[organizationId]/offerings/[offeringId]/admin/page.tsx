'use client';

import { useQuery } from '@apollo/client/react';
import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { useParams } from 'next/navigation';
import React from 'react';

const Admin = () => {
  const params = useParams<{ offeringId: string }>();
  const offeringId = params?.offeringId;
  const { data: offeringData } = useQuery(GET_OFFERING, { variables: { id: offeringId } });

  if (!offeringData) {
    return <LoadingModal />;
  }

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <FormCard center>
          <></>
        </FormCard>
      </ManagerWrapper>
    </div>
  );
};

export default Admin;

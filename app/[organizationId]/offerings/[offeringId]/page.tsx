'use client';

import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import OfferingDetails from '@src/screens/OfferingDetails';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { useQuery } from '@apollo/client/react';
import React from 'react';
import { useParams } from 'next/navigation';

const OfferingPage = () => {
  const params = useParams<{ offeringId: string }>();
  const offeringId = params?.offeringId;
  const { data: offeringData, refetch } = useQuery(GET_OFFERING, {
    variables: { id: offeringId },
    skip: !offeringId
  });

  if (!offeringData) {
    return <LoadingModal />;
  }

  const offering = offeringData?.getOffering;
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <OfferingDetails offering={offering} refetchOffering={refetch} />
      </ManagerWrapper>
    </div>
  );
};

export default OfferingPage;

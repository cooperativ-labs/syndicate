import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import router from 'next/router';

import OfferingDetails from '@src/pages/OfferingDetails';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { useQuery } from '@apollo/client';

const OfferingPage: FC = () => {
  const offeringId = router.query.offeringId;
  const { data: offeringData, refetch, error, loading } = useQuery(GET_OFFERING, { variables: { id: offeringId } });

  if (!offeringData) {
    return <LoadingModal />;
  }

  const offering = offeringData?.getOffering;
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <OfferingDetails offering={offering} refetch={refetch} />
      </ManagerWrapper>
    </div>
  );
};

export default OfferingPage;

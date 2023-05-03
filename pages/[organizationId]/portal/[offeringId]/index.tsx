import { useQuery } from '@apollo/client';
import LoadingModal from '@src/components/loading/ModalLoading';
import Container from '@src/containers/Layouts/Container';
import PortalWrapper from '@src/containers/PortalWrapper';
import PortalOffering from '@src/pages/PortalOffering';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import router from 'next/router';

import React, { FC } from 'react';
import { Offering } from 'types';

const PortalOfferingPage: FC = () => {
  const offeringId = router.query.offeringId;
  const { data: offeringData, refetch, error, loading } = useQuery(GET_OFFERING, { variables: { id: offeringId } });
  const offering: Offering = offeringData?.getOffering;

  if (!offering || loading) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }
  return (
    <div
      data-test="component-landing"
      className="bg-gradient-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <PortalWrapper>
        <PortalOffering offering={offering} refetch={refetch} />
      </PortalWrapper>
    </div>
  );
};

export default PortalOfferingPage;

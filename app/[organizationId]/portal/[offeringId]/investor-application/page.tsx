'use client';

import { useQuery } from '@apollo/client/react';
import InvestorApplicationForm from '@src/components/investor/applicationForm/InvestorApplicationForm';
import LoadingModal from '@src/components/loading/ModalLoading';
import Header from '@src/containers/Header';
import PortalWrapper from '@src/containers/PortalWrapper';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { useParams } from 'next/navigation';
import React from 'react';

const InvestorApplicationPage = () => {
  const params = useParams<{ offeringId: string }>();
  const offeringId = params?.offeringId;
  const { data } = useQuery(GET_OFFERING, { variables: { id: offeringId }, skip: !offeringId });

  if (!data) {
    return <LoadingModal />;
  }

  const offering = data?.getOffering;

  return (
    <div data-test="investor-application" className="w-screen h-full pb-10 md:pb-20">
      <PortalWrapper>
        <Header offering={offering} small />
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <div className="md:mx-6 w-full">
            <div className="grow h-full z-10">
              <div className="h-full px-2 py-2 md:mt-4">
                <div className="mx-auto min-h-full">
                  <InvestorApplicationForm offering={offering} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PortalWrapper>
    </div>
  );
};

export default InvestorApplicationPage;

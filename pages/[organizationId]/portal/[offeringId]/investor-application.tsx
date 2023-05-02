import Header from '@src/containers/Header';
import InvestorApplicationForm from '@src/components/investor/applicationForm/InvestorApplicationForm';
import InvestorWaitlistForm from '@src/components/investor/applicationForm/InvestorWaitlistForm';
import LoadingModal from '@src/components/loading/ModalLoading';
import PortalWrapper from '@src/containers/PortalWrapper';
import React, { FC } from 'react';
import router from 'next/router';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { useQuery } from '@apollo/client';

const InvestorApplicationPage: FC = () => {
  const offeringId = router.query.offeringId;
  const { data } = useQuery(GET_OFFERING, { variables: { id: offeringId } });

  if (!data) {
    return <LoadingModal />;
  }

  const offering = data?.getOffering;
  const organization = offering.offeringEntity.organization;

  return (
    <div data-test="investor-application" className="w-screen h-full pb-10 md:pb-20">
      <PortalWrapper>
        <Header offering={offering} small />
        <div className="flex z-30 md:z-10 min-h-full min-h-screen">
          <div className="md:mx-6 w-full">
            <div className="flex-grow h-full z-10">
              <div className="h-full px-2 py-2 md:mt-4">
                <div className="mx-auto min-h-full">
                  {offering.waitlistOn ? (
                    <InvestorWaitlistForm offering={offering} />
                  ) : (
                    <InvestorApplicationForm offering={offering} />
                  )}
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

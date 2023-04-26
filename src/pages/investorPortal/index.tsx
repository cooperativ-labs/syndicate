import DashboardCard from '@src/components/cards/DashboardCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC } from 'react';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/dGraphQueries/offering';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const InvestorPortal: FC = () => {
  const { address: userWalletAddress } = useAccount();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress },
  });
  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = participantData?.queryOfferingParticipant.map((offeringParticipant) => {
    return offeringParticipant.offering;
  });

  const offerings = organization && getOrgOfferingsFromEntity(organization);
  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div data-test="component-InvestorPortal" className="flex flex-col w-full h-full mx-auto px-4">
      <TwoColumnLayout twoThirdsLayout>
        <DashboardCard>
          <h2 className="text-xl  text-blue-900 font-semibold mb-4">Create an offering:</h2>
        </DashboardCard>
        <DashboardCard>something</DashboardCard>
        {hasOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your investments: </h2>
            <OfferingsList offerings={offerings} />
          </div>
        )}
      </TwoColumnLayout>
    </div>
  );
};

export default InvestorPortal;

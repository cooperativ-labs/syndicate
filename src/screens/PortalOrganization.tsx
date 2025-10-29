'use client';

import DashboardCard from '@src/components/cards/DashboardCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC } from 'react';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { GET_OFFERING_PARTICIPANT } from '@src/utils/graphQueries/offering';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { getOrgOfferingsFromEntity } from '@src/utils/helpersUserAndEntity';
import { OfferingParticipant } from '@gql/graphql';
import { useAccount } from 'wagmi';
import { useQuery } from '@apollo/client/react';
import { useParams } from 'next/navigation';

const PortalOrganization: FC = () => {
  const { address: userWalletAddress } = useAccount();
  const params = useParams<{ organizationId: string }>();
  const orgId = params?.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
    skip: !orgId
  });
  const organization = organizationData?.getOrganization;
  const { data: participantData } = useQuery(GET_OFFERING_PARTICIPANT, {
    variables: { walletAddress: userWalletAddress }
  });
  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = participantData?.queryOfferingParticipant.map(
    (offeringParticipant: OfferingParticipant) => {
      return offeringParticipant.offering;
    }
  );

  const offerings = organization && getOrgOfferingsFromEntity(organization);
  const hasOfferings = offerings?.length > 0;
  const isParticipant = participantOfferings?.length > 0;

  return (
    <div
      data-test="component-PortalOrganization"
      className="flex flex-col w-full h-full mx-auto px-4"
    >
      <TwoColumnLayout twoThirdsLayout>
        {hasOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your investments: </h2>
            <OfferingsList offerings={offerings} />
          </div>
        )}
        <></>
      </TwoColumnLayout>
    </div>
  );
};

export default PortalOrganization;

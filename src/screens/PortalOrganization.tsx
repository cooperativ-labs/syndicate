'use client';

import { OrganizationComplete } from '@/types';

import LoadingModal from '@src/components/loading/ModalLoading';
import OfferingsList from '@src/components/offering/OfferingsList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import React, { FC } from 'react';
import { useAccount } from 'wagmi';

const PortalOrganization: FC<{ organization: OrganizationComplete }> = ({ organization }) => {
  const { address: userWalletAddress } = useAccount();

  if (!organization) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  const participantOfferings = organization.legalEntities
    .flatMap(entity => entity.offerings)
    .filter(offering =>
      offering.offeringParticipants.some(
        participant => participant.walletAddress === userWalletAddress
      )
    );

  return (
    <div
      data-test="component-PortalOrganization"
      className="flex flex-col w-full h-full mx-auto px-4"
    >
      <TwoColumnLayout twoThirdsLayout>
        {participantOfferings && (
          <div>
            <h2 className="text-xl md:mt-8 mb-5 text-blue-900 font-semibold">Your investments: </h2>
            <OfferingsList offerings={participantOfferings} />
          </div>
        )}
        <></>
      </TwoColumnLayout>
    </div>
  );
};

export default PortalOrganization;

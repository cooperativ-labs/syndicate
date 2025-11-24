'use client';

import OfferingsList from '@src/components/offering/OfferingsList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import React, { FC } from 'react';
import { useConnection } from 'wagmi';

import { OfferingWithLegalEntity, OrganizationComplete } from '@/types';

const PortalOrganization: FC<{ organization: OrganizationComplete }> = ({ organization }) => {
  const { address: userWalletAddress } = useConnection();

  const organizationId = organization.id;
  const participantOfferings = organization.legalEntities
    .flatMap(entity => entity.offerings)
    .filter(offering =>
      offering.participants.some(participant => participant.walletAddress === userWalletAddress)
    ) as OfferingWithLegalEntity[];

  return (
    <div
      data-test='component-PortalOrganization'
      className='flex flex-col w-full h-full mx-auto px-4'
    >
      <TwoColumnLayout twoThirdsLayout>
        {participantOfferings && (
          <div>
            <h2 className='text-xl md:mt-8 mb-5 text-blue-900 font-semibold'>Your investments: </h2>
            <OfferingsList offerings={participantOfferings} organizationId={organizationId} />
          </div>
        )}
        <></>
      </TwoColumnLayout>
    </div>
  );
};

export default PortalOrganization;

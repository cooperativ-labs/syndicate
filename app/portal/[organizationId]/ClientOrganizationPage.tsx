'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import OrganizationProfile from '@src/screens/OrganizationProfile';
import PortalOrganization from '@src/screens/PortalOrganization';
import React from 'react';
import { useAccount } from 'wagmi';

import { OrganizationComplete } from '@/types';

const ClientOrganizationPage: React.FC = () => {
  const { chosenOrganization, chosenOrganizationId } = useOrganizations();
  const { address: userWalletAddress } = useAccount();

  const organization = chosenOrganization as OrganizationComplete;

  if (!chosenOrganization) {
    return <OrganizationNotFound backHref={`/${chosenOrganizationId}/portal`} />;
  }

  const orgParticipants = organization.legalEntities
    ?.map(entity =>
      entity?.offerings?.map(offering =>
        offering?.participants?.map(participant => participant?.walletAddress === userWalletAddress)
      )
    )
    .flat(2);

  const isParticipant = orgParticipants?.includes(true);

  return (
    <div data-test="component-project" className="bg-gray-50">
      {isParticipant ? (
        <PortalOrganization organization={organization} />
      ) : (
        <OrganizationProfile organization={organization} />
      )}
    </div>
  );
};

export default ClientOrganizationPage;

//

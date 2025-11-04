'use client';

import PortalWrapper from '@src/containers/PortalWrapper';
import Footer from '@src/Footer/Footer';
import OrganizationProfile from '@src/screens/OrganizationProfile';
import PortalOrganization from '@src/screens/PortalOrganization';
import { OrganizationWithLegalEntities } from '@/types';
import React from 'react';
import { useAccount } from 'wagmi';

type ClientOrganizationPageProps = {
  organization: OrganizationWithLegalEntities | null;
};

const ClientOrganizationPage: React.FC<ClientOrganizationPageProps> = ({ organization }) => {
  const { address: userWalletAddress } = useAccount();

  if (!organization) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>Sorry, this offeror does not have a public profile. </div>
      </div>
    );
  }

  const orgParticipants = organization.legalEntities
    ?.map(entity =>
      entity?.offerings?.map(offering =>
        offering?.offeringParticipants?.map(
          participant => participant?.walletAddress === userWalletAddress
        )
      )
    )
    .flat(2);

  const isParticipant = orgParticipants?.includes(true);

  return (
    <div data-test="component-project" className="bg-gray-50">
      {isParticipant ? (
        <PortalWrapper>
          <PortalOrganization />
        </PortalWrapper>
      ) : (
        <OrganizationProfile organization={organization} />
      )}
      <Footer color="bg-gray-200" />
    </div>
  );
};

export default ClientOrganizationPage;

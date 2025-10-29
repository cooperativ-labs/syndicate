"use client";

import Footer from '@src/Footer/Footer';
import OrganizationProfile from '@src/pages/OrganizationProfile';
import PortalOrganization from '@src/pages/PortalOrganization';
import PortalWrapper from '@src/containers/PortalWrapper';
import WalletChooserModal from '@src/containers/wallet/WalletChooserModal';
import React from 'react';
import { Organization } from 'oldTypes';
import { useAccount } from 'wagmi';

type ClientOrganizationPageProps = {
  organization: Organization | null;
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
    ?.map((entity) =>
      entity?.offerings?.map((offering) =>
        offering?.participants?.map((participant) => participant?.walletAddress === userWalletAddress)
      )
    )
    .flat(2);

  const isParticipant = orgParticipants?.includes(true);

  return (
    <div data-test="component-project" className="bg-gray-50">
      <WalletChooserModal />
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


'use client';
import AlertPopup from '@src/components/alerts/AlertPopup';
import { cn } from '@src/lib/utils';
import { getOrganization } from '@src/utils/actions/organizationActions';
import React, { FC } from 'react';
import { useAccount } from 'wagmi';

import { OrganizationComplete } from '@/types';

// import PortalSideBar from './sideBar/PortalSideBar';
import EnsureCompatibleNetwork from './wallet/EnsureCompatibleNetwork';
import NavBar from './NavigationBar';

const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';
// const BackgroundGradient = 'bg-white';

type PortalWrapperProps = {
  children: React.ReactNode;
  organization: OrganizationComplete;
};

const Portal: FC<PortalWrapperProps> = ({ children, organization }) => {
  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        {/* <PortalSideBar organizations={[organization]} />{' '} */}
      </div>
      <div className="w-full">
        <NavBar orgLogo={organization?.logo} orgName={organization.name} />

        <div className="grow z-10">
          <div className="mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

const PortalWrapper: FC<PortalWrapperProps> = async ({ children, organization }) => {
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        {/* <WalletChooserModal /> */}
        {/* {PageIsLoading && <LoadingModal />} */}
        <AlertPopup text="This is an alpha version. Please use with caution." />
        <EnsureCompatibleNetwork>
          <Portal organization={organization}>{children}</Portal>
        </EnsureCompatibleNetwork>
      </div>
    </div>
  );
};

export default PortalWrapper;

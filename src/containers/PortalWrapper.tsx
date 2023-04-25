import AlertPopup from '@src/components/alerts/AlertPopup';
import cn from 'classnames';
import LoadingModal from '@src/components/loading/ModalLoading';
// import PortalSideBar from './sideBar/PortalSideBar';
import NavBar from './NavigationBar';
import NewOrganizationModal from './NewOrganizationModal';
import React, { FC, useContext, useEffect, useState } from 'react';
import WalletChooserModal from './wallet/WalletChooserModal';
import WithAuthentication from './WithAuthentication';
import { ApplicationStoreProps, store } from '@context/store';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useApolloClient } from '@apollo/client';
import { useSession } from 'next-auth/react';

// const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

type PortalProps = {
  children: React.ReactNode;
};

const Portal: FC<PortalProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        {/* <PortalSideBar organizations={_organizations} />{' '} */}
      </div>
      <div className="w-full">
        <NavBar authenticatedUser />

        <div className="flex-grow z-10">
          <div className="mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
};

type PortalWrapperProps = {
  children: React.ReactNode;
};

const PortalWrapper: FC<PortalWrapperProps> = ({ children }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { PageIsLoading } = applicationStore;

  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <WalletChooserModal />

        {/* <WalletActionLockModel /> */}
        {PageIsLoading && <LoadingModal />}
        <AlertPopup text="This is an alpha version. Please use with caution." />
        <Portal>{children}</Portal>
      </div>
    </div>
  );
};

export default PortalWrapper;

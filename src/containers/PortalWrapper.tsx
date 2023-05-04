import AlertPopup from '@src/components/alerts/AlertPopup';
import cn from 'classnames';
import LoadingModal from '@src/components/loading/ModalLoading';
// import PortalSideBar from './sideBar/PortalSideBar';
import EnsureCompatibleNetwork from './wallet/EnsureCompatibleNetwork';
import NavBar from './NavigationBar';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import WalletChooserModal from './wallet/WalletChooserModal';
import { ApplicationStoreProps, store } from '@context/store';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { useQuery } from '@apollo/client';

const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';
// const BackgroundGradient = 'bg-white';

type PortalWrapperProps = {
  children: React.ReactNode;
};

const Portal: FC<PortalWrapperProps> = ({ children }) => {
  const orgId = router.query.organizationId;
  const { data, loading, error } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
  });
  const organization = data?.getOrganization;

  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        {/* <PortalSideBar organizations={_organizations} />{' '} */}
      </div>
      <div className="w-full">
        <NavBar orgLogo={organization?.logo} orgName={organization?.name} />

        <div className="flex-grow z-10">
          <div className="mx-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
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
        <EnsureCompatibleNetwork>
          <Portal>{children}</Portal>
        </EnsureCompatibleNetwork>
      </div>
    </div>
  );
};

export default PortalWrapper;

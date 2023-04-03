import AlertPopup from '@src/components/alerts/AlertPopup';
import cn from 'classnames';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerSideBar from './sideBar/ManagerSideBar';
import NavBar from './NavigationBar';
import NeedAccount from './ModalNeedAccount';
import React, { FC, useContext } from 'react';
import RightSideBar from './sideBar/RightSidebar';
import router from 'next/router';
import WalletChooserModal from './wallet/WalletChooserModal';
import { ApplicationStoreProps, store } from '@context/store';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

// const BackgroundGradient = 'bg-gradient-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

type ManagerProps = {
  children: React.ReactNode;
  homePage?: boolean;
};

const Manager: FC<ManagerProps> = ({ children, homePage }) => {
  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-full min-h-screen">
        <ManagerSideBar />
      </div>
      <div className="md:mx-6 w-full">
        <NavBar authenticatedUser />
        <div className="flex-grow h-full z-10">
          <div className="h-full px-2 py-2 md:mt-4">
            <div className="mx-auto min-h-full">{children}</div>
            {/* <div className={'mx-auto min-h-full p-10'} style={{ maxWidth: '1580px' }}>
              We would love to hear your questions and suggestions. Please email us at{' '}
              <span className="font-bold">feedback@cooperativ.io</span>.
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

type ManagerWrapperProps = {
  children: React.ReactNode;
  loadingComponent?: boolean;
  homePage?: boolean;
};

const ManagerNavigationFrame: FC<ManagerWrapperProps> = ({ children, loadingComponent }) => {
  const { uuid } = useContext(UserAccountContext);
  const { loading: userLoading, data: userData, error } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const userInfo = userData?.queryUser[0]?.legalEntities[0].legalEntity;

  if (loadingComponent || userLoading) {
    return <LoadingModal />;
  } else if (!userInfo?.fullName) {
    return <NeedAccount />;
  }

  return <Manager>{children}</Manager>;
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children, loadingComponent, homePage }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { PageIsLoading } = applicationStore;

  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'min-h-full w-screen min-h-screen')}>
        <WalletChooserModal />
        {/* <WalletActionLockModel /> */}
        {PageIsLoading && <LoadingModal />}
        <AlertPopup text="This is an alpha version. Please use with caution." />
        <ManagerNavigationFrame homePage={homePage} loadingComponent={loadingComponent}>
          {children}
        </ManagerNavigationFrame>
      </div>
    </div>
  );
};

export default ManagerWrapper;

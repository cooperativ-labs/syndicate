import AlertPopup from '@src/components/alerts/AlertPopup';
import ChainCompatibilityAlert from '@src/components/alerts/ChainCompatibilityAlert';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

import WalletActionLockModel from './wallet/WalletActionLockModel';
import NewOrganizationModal from './NewOrganizationModal';
import WithAuthentication from './WithAuthentication';
// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

import ManagerSideBar from './sideBar/ManagerSideBar';
import Manager from './Manager';
type ManagerWrapperProps = {
  children: React.ReactNode;
};

const ManagerWrapper: FC<ManagerWrapperProps> = async ({ children }) => {
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <ErrorBoundary>
          <WithAuthentication>
            <WalletActionLockModel />
            {/* {PageIsLoading && <LoadingModal />} */}
            <ChainCompatibilityAlert />
            <AlertPopup text="This is an alpha version. Please use with caution." />

            <NewOrganizationModal />
            <div className="flex">
              <div className="flex z-30 md:z-10 min-h-screen">
                <ManagerSideBar />{' '}
              </div>
              <Manager>{children}</Manager>
            </div>
          </WithAuthentication>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ManagerWrapper;

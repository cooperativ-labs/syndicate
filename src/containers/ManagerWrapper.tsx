import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import AlertPopup from '@src/components/alerts/AlertPopup';
import ChainCompatibilityAlert from '@src/components/alerts/ChainCompatibilityAlert';
import ErrorBoundary from '@src/components/ErrorBoundary';
import { cn } from '@src/lib/utils';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

import NewOrganizationModal from './NewOrganizationModal';
import WithAuthentication from './WithAuthentication';
import WalletActionLockModel from './wallet/WalletActionLockModel';
// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

import ManagerSideBar from './sideBar/ManagerSideBar';
import Manager from './Manager';
import { getPublicUrl } from '@src/utils/actions/storageActions';
type ManagerWrapperProps = {
  children: React.ReactNode;
};

const ManagerWrapper: FC<ManagerWrapperProps> = async ({ children }) => {
  const organizations = await getOrgsFromUser();

  const logoUrls = await Promise.all(
    organizations.map(organization =>
      getPublicUrl({
        bucket: 'organization-assets',
        path: organization.logo,
        source: 'ManagerWrapper'
      })
    )
  );
  const organizationsWithLogos = organizations.map((organization, index) => ({
    ...organization,
    logo: logoUrls[index].data
  }));
  const cookieStore = await cookies();
  const savedOrganizationId = cookieStore.get('CHOSEN_ORGANIZATION')?.value;
  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <ErrorBoundary>
          <WithAuthentication>
            <WalletActionLockModel />
            {/* {PageIsLoading && <LoadingModal />} */}
            <ChainCompatibilityAlert />
            <AlertPopup text="This is an alpha version. Please use with caution." />
            <OrganizationsProvider
              organizations={organizationsWithLogos}
              savedOrganizationId={savedOrganizationId || null}
            >
              <NewOrganizationModal />
              <div className="flex">
                <div className="flex z-30 md:z-10 min-h-screen">
                  <ManagerSideBar />{' '}
                </div>
                <Manager>{children}</Manager>
              </div>
            </OrganizationsProvider>
          </WithAuthentication>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default ManagerWrapper;

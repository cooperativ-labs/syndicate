import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import AlertPopup from '@src/components/alerts/AlertPopup';
import ChainCompatibilityAlert from '@src/components/alerts/ChainCompatibilityAlert';
import { cn } from '@src/lib/utils';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';
import { cookies } from 'next/headers';
import React, { FC } from 'react';

import Manager from './Manager';
import NewOrganizationModal from './NewOrganizationModal';
import WithAuthentication from './WithAuthentication';

// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

type ManagerWrapperProps = {
  children: React.ReactNode;
};

const ManagerWrapper: FC<ManagerWrapperProps> = async ({ children }) => {
  const organizations = await getOrgsFromUser();
  const cookieStore = await cookies();
  const savedOrganizationId = cookieStore.get('CHOSEN_ORGANIZATION')?.value;

  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <WithAuthentication>
          <NewOrganizationModal />
          {/* <WalletActionLockModel /> */}
          {/* {PageIsLoading && <LoadingModal />} */}
          <ChainCompatibilityAlert />
          <AlertPopup text="This is an alpha version. Please use with caution." />
          <OrganizationsProvider
            organizations={organizations}
            savedOrganizationId={savedOrganizationId || null}
          >
            <Manager>{children}</Manager>
          </OrganizationsProvider>
        </WithAuthentication>
      </div>
    </div>
  );
};

export default ManagerWrapper;

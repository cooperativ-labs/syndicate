import AlertPopup from '@src/components/alerts/AlertPopup';
import cn from 'classnames';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerSideBar from './sideBar/ManagerSideBar';
import NavBar from './NavigationBar';
import NewOrganizationModal from './NewOrganizationModal';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ApplicationStoreProps, store } from '@context/store';

import AlertBanner from '@src/components/alerts/AlertBanner';
import { useAccount, useDisconnect } from 'wagmi';
import { signOut } from '@src/utils/actions/userActions';
import { Organization } from '@gql/graphql';
import { getOrgsFromUser } from '@src/utils/helpersOrganization';
import { useSupabaseAuth } from '@context/SupabaseAuthContext';
import WithAuthentication from './WithAuthentication';

// const BackgroundGradient = 'bg-linear-to-b from-gray-100 to-blue-50';
const BackgroundGradient = 'bg-white';

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  const { user, loading, supabase } = useSupabaseAuth();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!loading && !user) {
      disconnect();
      signOut();
    }
  }, [disconnect, loading, user]);

  useEffect(() => {
    let isMounted = true;

    const loadOrganizations = async () => {
      if (!user) {
        if (isMounted) {
          setOrganizations([]);
        }
        return;
      }

      const orgs = await getOrgsFromUser(user);
      if (isMounted) {
        setOrganizations(orgs as Organization[]);
      }
    };

    loadOrganizations();

    return () => {
      isMounted = false;
    };
  }, [supabase, user]);

  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        <ManagerSideBar organizations={organizations} />{' '}
      </div>
      <div className="md:mx-6 w-full">
        <NavBar />
        <div className="grow z-10">
          <div className=" px-2 py-2 md:mt-4">
            <div className="mx-auto ">{children}</div>
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
};

const ManagerWrapper: FC<ManagerWrapperProps> = ({ children }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { PageIsLoading } = applicationStore;
  const { isConnected, chain } = useAccount();

  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <WithAuthentication>
          <NewOrganizationModal />
          {/* <WalletActionLockModel /> */}
          {PageIsLoading && <LoadingModal />}
          <AlertBanner
            show={!!isConnected && !chain}
            color="red-600"
            text={
              ' The blockchain you are using is not compatible with Cooperativ. Please switch to Sepolia for testing or Mainnet or Polygon for real transactions'
            }
          />
          <AlertPopup text="This is an alpha version. Please use with caution." />
          <Manager>{children}</Manager>
        </WithAuthentication>
      </div>
    </div>
  );
};

export default ManagerWrapper;

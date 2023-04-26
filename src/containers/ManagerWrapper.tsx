import AlertPopup from '@src/components/alerts/AlertPopup';
import cn from 'classnames';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerSideBar from './sideBar/ManagerSideBar';
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

type ManagerProps = {
  children: React.ReactNode;
};

const Manager: FC<ManagerProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const userId = session?.user.id;
  const apolloClient = useApolloClient();
  const [organizations, setOrganizations] = useState([]);
  // const applicationStore: ApplicationStoreProps = useContext(store);
  // const { ActiveOrg } = applicationStore;

  useEffect(() => {
    apolloClient
      .query({
        query: GET_USER,
        variables: { id: userId },
      })
      .then((response) => {
        setOrganizations(response.data.queryUser[0]?.organizations);
      });
  }, [userId, setOrganizations, apolloClient]);

  const _organizations = organizations?.map((org) => {
    return org.organization;
  });

  return (
    <div className="flex">
      <div className="flex z-30 md:z-10 min-h-screen">
        <ManagerSideBar organizations={_organizations} />{' '}
      </div>
      <div className="md:mx-6 w-full">
        <NavBar />
        <div className="flex-grow z-10">
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

  return (
    <div className="h-full">
      <div className={cn(BackgroundGradient, 'w-screen min-h-screen')}>
        <WalletChooserModal />
        <WithAuthentication>
          <NewOrganizationModal />
          {/* <WalletActionLockModel /> */}
          {PageIsLoading && <LoadingModal />}
          <AlertPopup text="This is an alpha version. Please use with caution." />
          <Manager>{children}</Manager>
        </WithAuthentication>
      </div>
    </div>
  );
};

export default ManagerWrapper;

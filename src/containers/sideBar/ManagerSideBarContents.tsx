import DisconnectButton from '@src/components/buttons/DisconnectButton';
import LogoutButton from '@src/components/buttons/LogoutButton';
import ManagerSidebarItem from '@src/components/buttons/ManagerSidebarItem';
import React, { FC, useContext } from 'react';
import { ReachContext } from '@src/SetReachContext';

type ManagerSideBarContentsProps = {};

const ManagerSideBarContents: FC<ManagerSideBarContentsProps> = () => {
  const { reFetchWallet } = useContext(ReachContext);
  return (
    <div className="flex flex-col mr-2">
      <ManagerSidebarItem link={`/app`} title="Dashboard" />
      <ManagerSidebarItem link={`/app/businesses`} title="Businesses" />
      <ManagerSidebarItem link={`/app/offerings`} title="Offerings" />
      {/* <ManagerSidebarItem link={`/app/investments`} title="Investments" /> */}
      {/* <ManagerSidebarItem link={`/app/marketplace`} title="Marketplace" /> */}

      <div className="md:hidden ml-4">
        <div className="flex flex-col my-4 gap-8">
          <DisconnectButton refetchWallet={reFetchWallet} />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ManagerSideBarContents;

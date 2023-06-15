import DisconnectButton from '@src/components/buttons/DisconnectButton';
import LogoutButton from '@src/components/buttons/LogoutButton';
import ManagerSidebarItem from '@src/components/buttons/ManagerSidebarItem';
import React, { FC } from 'react';

export type ManagerSideBarItemSelectionType = 'Overview' | 'Offerings' | 'Entities' | 'Settings' | 'None';

type ManagerSideBarContentsProps = {
  organizationId: string | null;
};

const ManagerSideBarContents: FC<ManagerSideBarContentsProps> = ({ organizationId }) => {
  return (
    <div className="flex flex-col mr-2">
      <ManagerSidebarItem link={`/${organizationId}/overview`} title="Overview" />
      <ManagerSidebarItem link={`/${organizationId}/offerings`} title="Offerings" />
      <ManagerSidebarItem link={`/${organizationId}/entities`} title="Entities" />
      <ManagerSidebarItem link={`/${organizationId}/settings`} title="Settings" />
      {/* <ManagerSidebarItem link={`/marketplace`} title="Marketplace" /> */}

      <div className="md:hidden ml-4">
        <div className="flex flex-col my-4 gap-8">
          <DisconnectButton />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ManagerSideBarContents;

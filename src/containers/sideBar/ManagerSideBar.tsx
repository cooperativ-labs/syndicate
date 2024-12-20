import Button from '@src/components/buttons/Button';
import cn from 'classnames';
import ManagerSideBarContents from './ManagerSideBarContents';
import OrganizationSwitcher from './OrganizationSwitcher';
import React, { FC, useContext, useEffect, useState } from 'react';
import router from 'next/router';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from 'react-use';

type ManagerSideBarProps = {
  organizations: any[];
};

const ManagerSideBar: FC<ManagerSideBarProps> = ({ organizations }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar, ManagerSidebarOpen } = applicationStore;
  const windowSize = useWindowSize();
  const orgId = router.query.organizationId as string;
  const OrganizationIdFromSessionStorage = sessionStorage.getItem('CHOSEN_ORGANIZATION');
  const setOrgId = OrganizationIdFromSessionStorage ?? orgId;

  const currentOrganizationName = orgId && organizations?.find((org) => org.id === orgId)?.name;

  useEffect(() => {
    if (ManagerSidebarOpen && windowSize.width < 768) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [ManagerSidebarOpen, windowSize]);

  const desktopSidebar = (
    <div className="flex grid-cols-6">
      {organizations?.length > 0 && (
        <div className="col-span-1">
          <OrganizationSwitcher organizations={organizations} />
        </div>
      )}

      {orgId && (
        <div className="hidden md:flex col-span-5  bg-gray-100 w-48 z-10 min-h-full">
          <div className="h-full bg-opacity-0 p-1 pr-2">
            <div className="mb-5 text-lg font-bold px-2 pr-4 md:mt-4 ">{currentOrganizationName}</div>
            <ManagerSideBarContents organizationId={setOrgId} />
          </div>
        </div>
      )}
    </div>
  );

  const mobileSidebar = (
    <div
      id="sidebar-curtain"
      className="w-screen h-screen absolute top-0 bottom-0 right-0 left-0 md:flex justify-center items-center z-40 bg-gray-500 bg-opacity-80 overflow-y-auto"
      onClick={(e: any) => {
        /** @TODO : fix typescript */
        if (e.target.id === 'sidebar-curtain') {
          dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' });
        }
      }}
    >
      <div className="fixed left-0 top-0 h-full  flex grid-cols-6">
        {organizations?.length > 0 && (
          <div className="col-span-1">
            <OrganizationSwitcher organizations={organizations} />
          </div>
        )}
        <div className={'w-64 z-50  p-3 bg-white shadow-xl'}>
          <div className="flex justify-between items-center mb-5">
            <div className="px-2 pr-4"></div>
            <div className={cn(ManagerSidebarOpen ? 'flex md:hidden' : 'hidden')}>
              <Button
                onClick={() => {
                  dispatchSidebar({ type: 'TOGGLE_MANAGER_SIDEBAR' });
                }}
              >
                <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
              </Button>
            </div>
          </div>
          <ManagerSideBarContents organizationId={OrganizationIdFromSessionStorage} />
        </div>
      </div>
    </div>
  );

  return <>{windowSize.width < 768 ? ManagerSidebarOpen && mobileSidebar : desktopSidebar}</>;
};

export default ManagerSideBar;

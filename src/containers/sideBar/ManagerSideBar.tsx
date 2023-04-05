import Button from '@src/components/buttons/Button';
import cn from 'classnames';
import Link from 'next/link';
import ManagerSideBarContents from './ManagerSideBarContents';
import React, { FC, useContext } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWindowSize } from 'react-use';

const ManagerSideBar: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchSidebar, ManagerSidebarOpen } = applicationStore;
  const windowSize = useWindowSize();

  return (
    <>
      <div className="hidden md:flex flex-col bg-gray-100 w-48 z-50 min-h-full">
        <div className="h-full bg-opacity-0 p-1 pr-2">
          <div className="mb-5 px-2 pr-4 md:mt-4 ">
            <Link href="/">
              <img
                src={
                  windowSize.width < 768
                    ? '/assets/images/branding/symbol_dark_blue.svg'
                    : '/assets/images/branding/full_dark_blue.svg'
                }
                alt="logo"
                width={windowSize.width < 768 ? '30' : '140'}
                className="mr-4"
              />
            </Link>
          </div>
          <ManagerSideBarContents />
        </div>
      </div>
      {ManagerSidebarOpen && (
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
          <div className={'md:hidden h-full w-64 z-50 fixed left-0 top-0 p-3 bg-white shadow-xl'}>
            <div className="flex justify-between items-center mb-5">
              <div className="px-2 pr-4">
                <Link href="/">
                  <img
                    src="/assets/images/branding/symbol_dark_blue.svg"
                    alt="logo"
                    width={windowSize.width < 768 ? '40' : '70'}
                    className="mr-4"
                  />
                </Link>
              </div>
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
            <ManagerSideBarContents />
          </div>
        </div>
      )}
    </>
  );
};

export default ManagerSideBar;

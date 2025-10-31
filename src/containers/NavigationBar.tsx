'use client';

import { useUserContext } from '@contexts/UserContext';
import Button from '@src/components/buttons/Button';
import DisconnectButton from '@src/components/buttons/DisconnectButton';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { FC, useContext } from 'react';
import { useAccount } from 'wagmi';

import { ApplicationStoreProps, store } from '@/contexts/store';

import ChooseConnectorButton from './wallet/ChooseConnectorButton';
import UserMenu from './UserMenu';

type NavBarProps = {
  transparent?: boolean;
  orgLogo?: string;
  orgName?: string;
};

export const NavBar: FC<NavBarProps> = ({ orgLogo, orgName }) => {
  const { user } = useUserContext();
  const router = useRouter();
  const isAuthenticated = !!user;
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const { address: userWalletAddress } = useAccount();
  return (
    <div className="flex py-2 px-2 pr-4 z-30  mx-auto justify-between">
      <div className=" justify-start flex items-center">
        {isAuthenticated && (
          <div className="flex md:hidden">
            <Button
              onClick={e => {
                e.preventDefault();
                dispatch({ type: 'TOGGLE_MANAGER_SIDEBAR' });
              }}
            >
              <ChevronLeftIcon className="w-4 h-4" size={24} />
            </Button>
            <div className="m-2" />
          </div>
        )}
        {orgLogo && (
          <div
            className={`flex border-gray-300 border-2  items-center rounded-full font-semibold text-xs text-gray-700`}
          >
            <img
              src={orgLogo}
              referrerPolicy="no-referrer"
              className="w-8 h-8 border-2 border-white rounded-full"
            />
          </div>
        )}
        {orgName && (
          <div className=" hidden md:flex text-sm uppercase font-semibold text-gray-700 ml-2">
            {orgName}
          </div>
        )}
        <button
          className="ml-2 border-2 rounded-full  px-4 max-w-max lg:hidden"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="w-4 h-4" size={24} />

          <span>back</span>
        </button>
        {/* <div className="flex">{!userWalletAddress && <ChooseConnectorButton buttonText={'Connect Wallet'} />}</div> */}
      </div>

      {userWalletAddress ? (
        <UserMenu />
      ) : (
        <div className="flex">
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <DisconnectButton />
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

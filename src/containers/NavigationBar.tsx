import Button from '@src/components/buttons/Button';
import ChooseConnectorButton from './wallet/ChooseConnectorButton';
import DisconnectButton from '@src/components/buttons/DisconnectButton';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import UserMenu from './UserMenu';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';

type NavBarProps = {
  transparent?: boolean;
  orgLogo?: string;
  entityName?: string;
};

export const NavBar: FC<NavBarProps> = ({ orgLogo, entityName }) => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const { address: userWalletAddress } = useAccount();
  return (
    <div className="flex py-2 px-2 pr-4 z-30  mx-auto justify-between">
      <div className=" justify-start flex items-center">
        {isAuthenticated && (
          <div className="flex md:hidden">
            <Button
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'TOGGLE_MANAGER_SIDEBAR' });
              }}
            >
              <FontAwesomeIcon icon={['fas', 'bars']} size="lg" />
            </Button>
            <div className="m-2" />
          </div>
        )}
        {orgLogo && (
          <div
            className={`flex border-gray-300 border-2  items-center rounded-full font-semibold text-xs text-gray-700`}
          >
            <img src={orgLogo} referrerPolicy="no-referrer" className="w-8 h-8 border-2 border-white rounded-full" />
          </div>
        )}
        {entityName && (
          <div className=" hidden md:flex text-sm uppercase font-semibold text-gray-700 ml-2">{entityName}</div>
        )}
        <button className="ml-2 border-2 rounded-full  px-4 max-w-max lg:hidden" onClick={() => router.back()}>
          <FontAwesomeIcon icon="chevron-left" /> back
        </button>
        <div className="flex">{!userWalletAddress && <ChooseConnectorButton buttonText={'Connect Wallet'} />}</div>
      </div>

      {userWalletAddress ? (
        <UserMenu />
      ) : (
        <div className="flex">
          {!userWalletAddress ? <ChooseConnectorButton buttonText={'Connect Wallet'} /> : <DisconnectButton />}
        </div>
      )}
    </div>
  );
};

export default NavBar;

import Button from '@src/components/buttons/Button';
import ChooseConnectorButton from './wallet/ChooseConnectorButton';
import DisconnectButton from '@src/components/buttons/DisconnectButton';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import UserMenu from './UserMenu';
import { ApplicationStoreProps, store } from '@context/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReachContext } from '@src/SetReachContext';
import { setChainId } from '@src/web3/connectors';

type NavBarProps = {
  transparent?: boolean;
  authenticatedUser?: boolean;
  entityLogo?: string;
  entityName?: string;
};

export const NavBar: FC<NavBarProps> = ({ authenticatedUser, entityLogo, entityName }) => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch } = applicationStore;
  const { userWalletAddress, reFetchWallet } = useContext(ReachContext);

  return (
    <div className="flex py-2 px-2 pr-4 z-30  mx-auto justify-between">
      <div className=" justify-start flex items-center">
        {authenticatedUser && (
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
        {entityLogo && (
          <div
            className={`flex border-gray-300 border-2  items-center rounded-full font-semibold text-xs text-gray-700`}
          >
            <img src={entityLogo} referrerPolicy="no-referrer" className="w-8 h-8 border-2 border-white rounded-full" />
          </div>
        )}
        {entityName && (
          <div className=" hidden md:flex text-sm uppercase font-semibold text-gray-700 ml-2">{entityName}</div>
        )}
        <button className="ml-2 border-2 rounded-full  px-4 max-w-max lg:hidden" onClick={() => router.back()}>
          <FontAwesomeIcon icon="chevron-left" /> back
        </button>
        <div className="flex">
          {authenticatedUser && !userWalletAddress && <ChooseConnectorButton buttonText={'Connect Wallet'} />}
        </div>
      </div>

      {authenticatedUser ? (
        <UserMenu authenticatedUser={authenticatedUser} />
      ) : (
        <div className="flex">
          {!userWalletAddress ? (
            <ChooseConnectorButton buttonText={'Connect Wallet'} />
          ) : (
            <DisconnectButton refetchWallet={reFetchWallet} />
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;

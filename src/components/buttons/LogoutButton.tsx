import Button from './Button';
import cn from 'classnames';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { ApplicationStoreProps, store } from '@context/store';
import { disconnectWallet } from '@src/web3/connectors';
import { signOut } from 'next-auth/react';

const LogoutButton: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;

  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

  function handleDisconnect() {
    dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
    disconnectWallet();
    signOut({ callbackUrl: '/' })
      .then(() => {
        router.reload();
      })
      .catch((error) => {
        dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
      });
  }
  return (
    <Button
      className={cn(outlinedClass, 'text-xs p-1 px-3 font-semibold rounded-full relative mr-2')}
      onClick={() => handleDisconnect()}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;

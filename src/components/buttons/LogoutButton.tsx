'use client';

import { cn } from '@src/lib/utils';
import { signOut } from '@src/utils/actions/userActions';
import React, { FC, useContext } from 'react';

import { ApplicationStoreProps, store } from '@/contexts/store';

import { Button } from '../ui/button';

const LogoutButton: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: dispatchPageIsLoading } = applicationStore;

  const outlinedClass = `text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white`;

  async function handleDisconnect() {
    dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_ON' });
    await signOut();
    dispatchPageIsLoading({ type: 'TOGGLE_LOADING_PAGE_OFF' });
  }
  return (
    <Button
      variant="outline"
      className={cn(outlinedClass, 'text-xs p-1 px-3 font-semibold rounded-full relative mr-2')}
      onClick={() => handleDisconnect()}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;

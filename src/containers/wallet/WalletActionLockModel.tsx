'use client';
import { Dialog, DialogContent, DialogTitle } from '@src/components/ui/dialog';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

import { useWalletContext } from '@/contexts/WalletContext';

import WalletActionLock from './WalletActionLock';

type WalletActionLockModelProps = {
  noModal?: boolean;
};

const WalletActionLockModel: FC<WalletActionLockModelProps> = ({ noModal }) => {
  const { walletActionLockModalOpen } = useWalletContext();

  return (
    <Dialog open={walletActionLockModalOpen}>
      <DialogTitle className='sr-only'>Wallet Action Lock</DialogTitle>
      <DialogContent
        data-test='component-payment-send'
        showCloseButton={false}
        className={cn(
          'mx-4 p-6 max-w-[500px] rounded-xl md:rounded-lg shadow-modal bg-white',
          noModal &&
            'fixed! top-32! md:top-0! md:relative! md:translate-x-0! md:translate-y-0! md:left-0!'
        )}
        style={{ overflow: 'smooth' }}
      >
        <WalletActionLock />
      </DialogContent>
    </Dialog>
  );
};

export default WalletActionLockModel;

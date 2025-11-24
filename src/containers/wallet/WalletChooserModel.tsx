'use client';

import { useWalletContext } from '@contexts/WalletContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@src/components/ui/dialog';
import { useEffect } from 'react';
import { useAccount } from 'wagmi';

import { WalletOptions } from './ChooseConnector';

export function WalletChooserModal() {
  const { modalOpen, setModalOpen } = useWalletContext();
  const { isConnected } = useAccount();

  // Close modal when wallet is connected
  useEffect(() => {
    if (isConnected && modalOpen) {
      setModalOpen(false);
    }
  }, [isConnected, modalOpen, setModalOpen]);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTitle className='sr-only'>Connect Your Wallet</DialogTitle>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>Choose a wallet to connect to your account</DialogDescription>
        </DialogHeader>
        <div className='mt-4 space-y-2'>
          <WalletOptions />
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { Dialog, DialogContent } from '@src/components/ui/dialog';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

type WalletActionModalProps = {
  children: React.ReactNode;
  open?: boolean;
  metaMaskWarning?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const WalletActionModal: FC<WalletActionModalProps> = ({
  children,
  open,
  metaMaskWarning,
  onOpenChange
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-test="component-create-entity-modal"
        className={cn('max-w-[500px]')}
        showCloseButton={false}
      >
        <div className="flex-col">
          <h1 className="text-xl font-bold mb-4">Deploy Status</h1>
          {metaMaskWarning && (
            <div className="p-3 border-2 border-orange-600 rounded-lg items-center mb-4">
              {`Note: MetaMask will ask you to set a "custom spending cap". Please click: `}
              <strong>{`use default`}</strong>.
            </div>
          )}
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default WalletActionModal;

import CreateAccount from '@src/components/account/CreateAccount';
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from '@src/components/ui/dialog';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

interface LoginModalProps {}
const LoginModal: FC<LoginModalProps> = () => {
  return (
    <Dialog open={true}>
      <DialogPortal>
        <DialogOverlay className='backdrop-blur-xl bg-black/60' />
        <DialogContent
          showCloseButton={false}
          className={cn(
            'fixed top-[50%] left-[50%] z-50 grid w-full max-w-[600px] translate-x-[-50%] translate-y-[-50%] gap-4  p-6 shadow-lg duration-200 sm:max-w-[500px]'
          )}
        >
          <div className='mt-5'>
            <CreateAccount />
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default LoginModal;

'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@src/components/ui/dialog';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

type FormModalProps = {
  formOpen: boolean;
  title?: string;
  subTitle?: string;
  onClose: () => void;
  children: React.ReactNode;
};

const FormModal: FC<FormModalProps> = ({ formOpen, title, subTitle, onClose, children }) => {
  return (
    <Dialog open={formOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        data-test='component-form-modal'
        className={cn('min-w-[600px] sm:max-w-[900px] w-full max-h-[90vh] overflow-y-auto')}
      >
        <DialogHeader>
          <DialogTitle className={cn(!title && 'sr-only')}>{title}</DialogTitle>
          {subTitle && title && <DialogDescription>{subTitle}</DialogDescription>}
          <hr className='my-4' />
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;

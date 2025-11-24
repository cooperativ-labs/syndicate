import { cn } from '@src/lib/utils';
import { X } from 'lucide-react';
import React, { FC } from 'react';

import { Button } from '../ui/button';

type CloseButtonProps = {
  className?: string;
  onClick: () => void;
};

const CloseButton: FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <Button
      id='close-button'
      variant='ghost'
      size='icon'
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      className={cn(className, 'hover:shadow-lg text-gray-800 w-10 h-10 rounded-full')}
    >
      <X size={16} />
    </Button>
  );
};

export default CloseButton;

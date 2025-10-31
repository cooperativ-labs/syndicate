import { X } from 'lucide-react';
import cn from 'classnames';
import React, { FC } from 'react';

type CloseButtonProps = {
  className?: string;
  onClick: () => void;
};

const CloseButton: FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <button
      id="close-button"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
      className={cn(className, 'hover:shadow-lg text-gray-800 w-10 h-10 rounded-full')}
    >
      <X size={16} />
    </button>
  );
};

export default CloseButton;

import { cn } from '@src/lib/utils';
import { Trash } from 'lucide-react';
import React, { FC } from 'react';
import { Button } from '../ui/button';

type DeleteButtonProps = {
  onDelete: () => void;
  iconColor?: string;
  bgColor?: string;
};

const DeleteButton: FC<DeleteButtonProps> = ({ iconColor, bgColor, onDelete }) => {
  return (
    <Button
      onClick={e => {
        e.preventDefault();
        onDelete();
      }}
      variant="destructive"
      className={cn(
        `bg-${bgColor}`,
        `text-${iconColor}`,
        'hover:shadow-lg w-10 h-10 m-2 rounded-full hover:text-white',
        'flex items-center justify-center'
      )}
    >
      <Trash size={16} />
    </Button>
  );
};

export default DeleteButton;

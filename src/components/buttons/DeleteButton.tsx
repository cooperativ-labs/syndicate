import cn from 'classnames';
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type DeleteButtonProps = {
  onDelete: () => void;
  iconColor?: string;
  bgColor?: string;
};

const DeleteButton: FC<DeleteButtonProps> = ({ iconColor, bgColor, onDelete }) => {
  return (
    <button
      id="delete-button"
      onClick={(e) => {
        e.preventDefault();
        onDelete();
      }}
      className={cn(`bg-${bgColor}`, `text-${iconColor}`, 'hover:shadow-lg w-10 h-10 m-2 rounded-full')}
    >
      <FontAwesomeIcon icon="trash" />
    </button>
  );
};

export default DeleteButton;

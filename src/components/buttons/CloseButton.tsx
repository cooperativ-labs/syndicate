import cn from 'classnames';
import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type CloseButtonProps = {
  className?: string;
  onClick: () => void;
};

const CloseButton: FC<CloseButtonProps> = ({ className, onClick }) => {
  return (
    <button
      id="close-button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={cn(className, 'hover:shadow-lg text-gray-800 w-10 h-10 rounded-full')}
    >
      <FontAwesomeIcon icon="times" />
    </button>
  );
};

export default CloseButton;

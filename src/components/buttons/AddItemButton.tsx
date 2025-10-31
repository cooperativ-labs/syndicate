import cn from 'classnames';
import React from 'react';

interface AddItemButtonProps {
  classNames?: string;
  text?: string;
  onClick: () => void;
}

const AddItemButton: React.FC<AddItemButtonProps> = ({ classNames, onClick, text }) => {
  return (
    <button
      className={cn(
        classNames,
        `flex items-center font-semibold justify-center bg-transparent border-2 border-current rounded-lg`
      )}
      onClick={onClick}
    >
      <span className="text-xl font-bold">+</span>
      {text && <span className="ml-2">{text}</span>}
    </button>
  );
};

export default AddItemButton;

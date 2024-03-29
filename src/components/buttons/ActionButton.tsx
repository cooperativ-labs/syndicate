import cn from 'classnames';
import Link from 'next/link';
import React, { FC, ReactNode } from 'react';
import { Url } from 'next/dist/shared/lib/router/router';

const buttonGradient =
  'bg-gradient-to-r from-cLightBlue to-cDarkBlue hover:from-cDarkBlue hover:to-cLightBlue shadow-lg hover:shadow-2xl focus:shadow-sm';

interface ActionButtonProps {
  className?: string;
  children: ReactNode;
  link?: Url;
  onClick?: () => {};
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ActionButton: FC<ActionButtonProps> = ({ link, onClick, className, type, disabled, children, ...rest }) => {
  return (
    <Link href={link ? link : ''}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        {...rest}
        className={cn(
          className,
          `${!disabled ? buttonGradient : 'bg-gray-300'} text-white font-bold uppercase my-8 rounded p-4 `
        )}
      >
        {children}
      </button>
    </Link>
  );
};

export default ActionButton;

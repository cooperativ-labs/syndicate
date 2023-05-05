import cn from 'classnames';
import React, { FC } from 'react';

export interface CardProps {
  children: React.ReactNode;
  style?: any;
  className?: string;
  center?: boolean;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ children, onClick, ...rest }) => {
  const { className, style, ...props } = rest;
  return (
    <div
      data-test="component-card"
      className={cn(className, onClick && 'hover:pointer-cursor')}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

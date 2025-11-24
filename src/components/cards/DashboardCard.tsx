import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

export type DashboardCardProps = {
  children: React.ReactNode;
  style?: any;
  className?: string;
  center?: boolean;
  width?: string;
  onClick?: () => void;
};

const DashboardCard: FC<DashboardCardProps> = ({ children, onClick, ...rest }) => {
  const { className, style, ...props } = rest;
  return (
    <div
      data-test='component-card'
      className={cn(`${className} bg-white shadow-box rounded-xl p-6`)}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default DashboardCard;

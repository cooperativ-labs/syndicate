import cn from 'classnames';
import React, { FC, ReactNode } from 'react';

type OfferingDetailDashboardItemProps = {
  title: string;
  children: ReactNode;
  note?: string;
  color?: string;
  className?: string;
};

const OfferingDetailDashboardItem: FC<OfferingDetailDashboardItemProps> = ({
  className,
  title,
  children,
  color,
  note,
}) => {
  return (
    <div className={cn(className ? className : 'flex flex-col justify-center')}>
      <div
        className={cn(color ? '' : 'text-green-600', 'flex  text-lg justify-center')}
        style={color ? { color: color } : undefined}
      >
        {children}
      </div>
      <div className="text-center text-sm text-gray-800">{title}</div>
      <div className="text-center text-xs">{note}</div>
    </div>
  );
};

export default OfferingDetailDashboardItem;

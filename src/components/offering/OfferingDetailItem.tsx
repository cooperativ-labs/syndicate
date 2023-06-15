import cn from 'classnames';
import React, { FC, ReactNode } from 'react';

type OfferingDetailItemProps = {
  title: string;
  children: ReactNode;
  brandColor?: string;
};

const OfferingDetailItem: FC<OfferingDetailItemProps> = ({ title, children, brandColor }) => {
  return (
    <div className="border-2 border-gray-200 p-2 rounded-md">
      <div
        className={cn(brandColor ? '' : 'text-green-600', 'flex justify-center text-lg  font bold text-center')}
        style={brandColor ? { color: brandColor } : undefined}
      >
        {children}
      </div>
      <div className="flex justify-center">{title}</div>
    </div>
  );
};

export default OfferingDetailItem;

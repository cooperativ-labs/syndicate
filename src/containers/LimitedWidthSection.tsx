import cn from 'classnames';
import React from 'react';

type LimitedWidthSectionProps = {
  children: React.ReactNode;
  small?: boolean;
  center?: boolean;
};

const LimitedWidthSection: React.FC<LimitedWidthSectionProps> = ({ children, center, small }) => {
  return <div className={cn(center && 'mx-auto', 'min-h-max max-w-2xl mb-6 md:mb-10  ')}>{children}</div>;
};
export default LimitedWidthSection;

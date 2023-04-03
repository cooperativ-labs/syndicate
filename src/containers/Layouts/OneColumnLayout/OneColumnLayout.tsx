import React, { ReactNode } from 'react';

export interface OneColumnLayoutProps {
  className?: string;
  children: ReactNode | ReactNode[];
}

const OneColumnLayout: React.FunctionComponent<OneColumnLayoutProps> = ({ className, children }) => {
  return (
    <div data-test="layout-one-column" className="w-full">
      {children}
    </div>
  );
};

export default OneColumnLayout;

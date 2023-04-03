import cn from 'classnames';
import React from 'react';

export interface TwoColumnLayoutProps {
  className?: string;
  children: React.ReactNode[];
  twoThirdsLayout?: boolean;
  gap?: string;
}

const TwoColumnLayout: React.FunctionComponent<TwoColumnLayoutProps> = ({
  className,
  children,
  twoThirdsLayout,
  gap,
}) => {
  const leftChildren = children.filter((child, index) => index % 2 === 0);
  const rightChildren = children.filter((child, index) => index % 2 !== 0);

  const mobileLayout = (
    <div className="flex md:hidden ">
      <div data-test="mobile-center-column" className="flex-grow">
        {children.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mb-4">
                {child}
              </div>
            );
          }
        })}
      </div>
    </div>
  );

  const desktopLayout = (
    <div className={cn(`gap-${gap}`, twoThirdsLayout ? 'lg:grid-cols-3' : 'lg:grid-cols-2', 'hidden md:grid ')}>
      <div className={cn(twoThirdsLayout ? 'lg:col-span-2' : 'lg:col-span-1', 'my-5')}>
        {leftChildren.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mr-2 md:mr-2 mb-8 lg:mr-4 lg:mb-16">
                {child}
              </div>
            );
          }
        })}
      </div>
      <div className="my-5">
        {rightChildren.map((child, index) => {
          if (child) {
            return (
              <div key={index} className="mr-2 mb-2 md:ml-2 md:mb-8 lg:ml-4 lg:mb-16 ">
                {child}
              </div>
            );
          }
        })}
      </div>
    </div>
  );

  return (
    <div data-test="layout-two-column" className={cn(className, 'pt-2 md:mt-4 w-full')}>
      <div>
        {mobileLayout}
        {desktopLayout}
      </div>
    </div>
  );
};

export default TwoColumnLayout;

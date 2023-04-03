import cn from 'classnames';
import React from 'react';
import { ReactNode } from 'react-markdown/lib/react-markdown';
export type ContainerProps = {
  children?: ReactNode | ReactNode[];
  constrain?: string;
  fullWidth?: boolean;
  className?: string;
};

const Container: React.FunctionComponent<ContainerProps> = ({
  className,
  children,
  constrain = '1280px',
  fullWidth,
}) => {
  return (
    <div
      data-test="atom-container"
      className={cn(className, 'w-full h-full flex items-center m-auto')}
      style={{ maxWidth: fullWidth ? '100%' : constrain }}
    >
      {children}
    </div>
  );
};

export default Container;

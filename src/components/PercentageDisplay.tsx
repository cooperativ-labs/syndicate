import React, { FC } from 'react';
import { Maybe } from 'types';

type PercentageDisplayProps = {
  percent?: number;
  secondPercent?: Maybe<number>;
  multiple?: number;
  secondMultiple?: Maybe<number> | undefined;
  className?: string;
};

const PercentageDisplay: FC<PercentageDisplayProps> = ({
  className,
  percent,
  secondPercent,
  multiple,
  secondMultiple,
}) => {
  return (
    <div className={className}>
      {percent && (
        <>
          {' '}
          {percent / 100}
          {secondPercent ? <span> - {secondPercent / 100}</span> : <></>}%
        </>
      )}
      {multiple && (
        <>
          {' '}
          {multiple / 100}
          {secondMultiple && <span> - {secondMultiple / 100}</span>}x{' '}
        </>
      )}
    </div>
  );
};

export default PercentageDisplay;

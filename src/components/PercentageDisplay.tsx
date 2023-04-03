import React, { FC } from 'react';

type PercentageDisplayProps = {
  percent?: number;
  secondPercent?: number;
  multiple?: number;
  secondMultiple?: number;
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

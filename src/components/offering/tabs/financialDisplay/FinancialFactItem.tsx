import React, { FC } from 'react';

import { getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { CurrencyCode } from 'types';

type FinancialFactItemProps = {
  label: string;
  currency?: CurrencyCode;
  amount?: number;
  percent?: number;
  secondPercent?: number;
  multiple?: number;
  secondMultiple?: number;
};

const FinancialFactItem: FC<FinancialFactItemProps> = ({
  label,
  amount,
  percent,
  secondPercent,
  multiple,
  secondMultiple,
  currency,
}) => {
  return (
    <>
      <div className="flex justify-between px-4 lg:px-8">
        <div className="font-bold">{label} </div>
        <div>
          {amount && numberWithCommas(amount)} {amount && currency && `(${getCurrencyOption(currency)?.symbol})`}
          {amount && percent && ` (`}
          {percent && `${percent}${secondPercent ? ` - ${secondPercent}` : ''}%`} {amount && percent && `)`}
          {multiple && (
            <>
              {multiple}
              {secondMultiple && <span> - {secondMultiple}</span>}x{' '}
            </>
          )}
        </div>
      </div>
      <hr className="my-6 last:hidden" />
    </>
  );
};

export default FinancialFactItem;

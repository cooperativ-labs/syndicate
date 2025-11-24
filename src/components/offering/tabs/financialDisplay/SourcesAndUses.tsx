import React, { FC } from 'react';

import { CurrencyCode, OfferingFull } from '@/types';

import FinancialFactItem from './FinancialFactItem';

type SourcesAndUsesDisplayProps = {
  offering: OfferingFull;
  operatingCurrency: keyof typeof CurrencyCode | undefined;
};

const SourcesAndUsesDisplay: FC<SourcesAndUsesDisplayProps> = ({ offering, operatingCurrency }) => {
  const { max_raise, min_raise, admin_expense } = offering;

  return (
    <div className='bg-white rounded-xl shadow-xl py-6 mb-8'>
      <h1 className='font-bold text-xl px-4 lg:px-8 mb-8'>Sources & Uses of Funds</h1>
      <div>
        <FinancialFactItem
          label='Gross offering proceeds (max)'
          amount={max_raise}
          currency={operatingCurrency}
        />
        <FinancialFactItem
          label='Gross offering proceeds (min)'
          amount={min_raise}
          currency={operatingCurrency}
        />
        {!!admin_expense && (
          <>
            <FinancialFactItem
              label='Legal/organizational expense'
              amount={admin_expense}
              percent={parseFloat((100 * (admin_expense / (max_raise || 0))).toFixed(1))}
              currency={operatingCurrency}
            />
            <FinancialFactItem
              label='Proceeds invested (max)'
              amount={max_raise ? max_raise - admin_expense : undefined}
              currency={operatingCurrency}
            />
            <FinancialFactItem
              label='Proceeds invested (min)'
              amount={min_raise ? min_raise - admin_expense : undefined}
              currency={operatingCurrency}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SourcesAndUsesDisplay;

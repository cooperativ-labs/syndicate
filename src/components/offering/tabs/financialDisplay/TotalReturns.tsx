import React, { FC } from 'react';

import { OfferingFull } from '@/types';

import FinancialFactItem from './FinancialFactItem';

type TotalReturnsProps = {
  offering: OfferingFull;
};

const TotalReturns: FC<TotalReturnsProps> = ({ offering }) => {
  const {
    projected_irr,
    projected_irr_max,
    preferred_return,
    target_equity_multiple,
    target_equity_multiple_max,
    coc_return,
    projected_appreciation,
    cap_rate
  } = offering;

  return (
    <div className='bg-white rounded-xl shadow-xl py-6 mb-8'>
      <h1 className='font-bold text-xl px-4 lg:px-8 mb-8'>Total Returns</h1>
      <div>
        {projected_irr ? (
          <FinancialFactItem
            label='Projected IRR'
            percent={projected_irr / 100}
            secondPercent={projected_irr_max ? projected_irr_max / 100 : undefined}
          />
        ) : (
          <></>
        )}
        {preferred_return ? (
          <FinancialFactItem label='Preferred Return' percent={preferred_return / 100} />
        ) : (
          <></>
        )}
        {target_equity_multiple ? (
          <FinancialFactItem
            label='Target Equity Multiple'
            multiple={target_equity_multiple / 100}
            secondMultiple={
              target_equity_multiple_max ? target_equity_multiple_max / 100 : undefined
            }
          />
        ) : (
          <></>
        )}
        {coc_return ? <FinancialFactItem label='CoC return' percent={coc_return / 100} /> : <></>}
        {cap_rate ? <FinancialFactItem label='Cap rate' percent={cap_rate / 100} /> : <></>}
        {projected_appreciation ? (
          <FinancialFactItem
            label='Projected appreciation'
            percent={projected_appreciation / 100}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default TotalReturns;

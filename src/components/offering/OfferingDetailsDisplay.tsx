import { String0x } from '@src/web3/helpersChain';
import React, { FC } from 'react';

import { OfferingFull } from '@/types';

import PercentageDisplay from '../PercentageDisplay';

import MoneyDisplay from './../MoneyDisplay';
import OfferingDetailDashboardItem from './OfferingDetailDashboardItem';

export type ContractViewDetails = {
  sharesOutstanding: number | undefined;
  myShareQty: number | undefined;
  paymentToken: String0x | undefined;
  totalDistributed: number | undefined;
};

export type OfferingDetailsDisplayProps = {
  offering: OfferingFull;
  currentSalePrice: number | undefined;
  isOfferingManager: boolean | undefined;
  contractViewDetails: ContractViewDetails;
  className?: string;
};

const OfferingDetailsDisplay: FC<OfferingDetailsDisplayProps> = ({
  offering,
  currentSalePrice,
  isOfferingManager,
  contractViewDetails,

  className
}) => {
  const { sharesOutstanding, myShareQty, paymentToken, totalDistributed } = contractViewDetails;

  const {
    num_units,
    projected_irr,
    projected_irr_max,
    preferred_return,
    projected_appreciation,
    coc_return,
    cap_rate,
    target_equity_multiple,
    target_equity_multiple_max,
    investment_currency
  } = offering;

  const totalValue = num_units && currentSalePrice ? num_units * currentSalePrice : undefined;
  return (
    <div className={className}>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3'>
        <OfferingDetailDashboardItem title='Deal size'>
          <MoneyDisplay
            amount={totalValue}
            paymentToken={paymentToken}
            currency={investment_currency}
          />
        </OfferingDetailDashboardItem>

        {/* <div className="flex justify-center">
        <div className="bg-gray-300 h-16 w-1" />
      </div> */}

        <OfferingDetailDashboardItem title='Share price'>
          <MoneyDisplay
            amount={currentSalePrice}
            paymentToken={paymentToken}
            currency={investment_currency}
          />
        </OfferingDetailDashboardItem>

        {isOfferingManager ? (
          <OfferingDetailDashboardItem title='Shares allocated'>
            <MoneyDisplay amount={sharesOutstanding} />
          </OfferingDetailDashboardItem>
        ) : (
          <OfferingDetailDashboardItem title='My shares'>
            <MoneyDisplay amount={myShareQty} />
          </OfferingDetailDashboardItem>
        )}

        {isOfferingManager ? (
          <OfferingDetailDashboardItem title='Funds Distributed'>
            <MoneyDisplay
              amount={totalDistributed}
              paymentToken={paymentToken}
              currency={investment_currency}
            />
          </OfferingDetailDashboardItem>
        ) : (
          <OfferingDetailDashboardItem title='Share value'>
            <MoneyDisplay
              amount={currentSalePrice && myShareQty ? currentSalePrice * myShareQty : undefined}
              paymentToken={paymentToken}
              currency={investment_currency}
            />
          </OfferingDetailDashboardItem>
        )}
      </div>
      {(projected_appreciation ||
        projected_irr ||
        preferred_return ||
        target_equity_multiple ||
        coc_return ||
        cap_rate) && <div className=' mt-10' />}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 '>
        {projected_appreciation ? (
          <OfferingDetailDashboardItem title='Projected Appreciation'>
            <PercentageDisplay className='text-gray-900' percent={projected_appreciation} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {projected_irr ? (
          <OfferingDetailDashboardItem title='Projected IRR'>
            <div>
              <PercentageDisplay
                className=' text-gray-900'
                percent={projected_irr}
                secondPercent={projected_irr_max}
              />
            </div>
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {preferred_return ? (
          <OfferingDetailDashboardItem
            title='Preferred Return'
            note='(Cumulative, Non-Compounding)'
          >
            <PercentageDisplay className='text-gray-900' percent={preferred_return} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}

        {target_equity_multiple ? (
          <OfferingDetailDashboardItem title='Target Equity Multiple'>
            <PercentageDisplay
              className='text-gray-900'
              multiple={target_equity_multiple}
              secondMultiple={target_equity_multiple_max}
            />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
        {coc_return ? (
          <OfferingDetailDashboardItem title='CoC Return'>
            <PercentageDisplay className='text-gray-900' percent={coc_return} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
        {cap_rate ? (
          <OfferingDetailDashboardItem title='Cap Rate'>
            <PercentageDisplay className='text-gray-900' percent={cap_rate} />
          </OfferingDetailDashboardItem>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OfferingDetailsDisplay;

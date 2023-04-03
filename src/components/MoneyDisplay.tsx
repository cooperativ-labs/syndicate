import cn from 'classnames';
import React, { FC } from 'react';
import { Currency, CurrencyCode } from 'types';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';

type MoneyDisplayProps = {
  amount: number;
  bacId?: string;
  currency?: Currency;
  className?: string;
};

const MoneyDisplay: FC<MoneyDisplayProps> = ({ amount, bacId, currency, className }) => {
  const isUsd =
    getCurrencyById(bacId).value === CurrencyCode.Usd || getCurrencyOption(currency)?.value === CurrencyCode.Usd;
  const normalizedCurrency = bacId ? getCurrencyById(bacId) : currency && getCurrencyOption(currency);

  const currencyLogo = normalizedCurrency?.logo;
  const currencySymbol = normalizedCurrency?.symbol;

  return (
    <div className={cn(className, 'flex items-center')}>
      {isUsd && '$'}
      {numberWithCommas(amount)}
      {!isUsd &&
        (currencyLogo ? (
          <img src={currencyLogo} className={'ml-1 h-4 border rounded-full'} />
        ) : (
          <span className="text-xs ">{currencySymbol} </span>
        ))}
    </div>
  );
};

export default MoneyDisplay;

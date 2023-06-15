import cn from 'classnames';
import React, { FC } from 'react';
import { Currency, CurrencyCode } from 'types';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';

type MoneyDisplayProps = {
  amount: number | undefined | null;
  paymentToken?: String0x;
  currency?: Currency;
  className?: string;
};

const MoneyDisplay: FC<MoneyDisplayProps> = ({ amount, paymentToken, currency, className }) => {
  const isUsd =
    getCurrencyById(paymentToken)?.value === CurrencyCode.Usd ||
    getCurrencyOption(currency)?.value === CurrencyCode.Usd;
  const normalizedCurrency = paymentToken ? getCurrencyById(paymentToken) : currency && getCurrencyOption(currency);

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

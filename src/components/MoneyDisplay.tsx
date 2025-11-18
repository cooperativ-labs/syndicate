import { cn } from '@src/lib/utils';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';
import React, { FC } from 'react';

import { CurrencyCode, CurrencyCodeType } from '@/types';

type MoneyDisplayProps = {
  amount: number | undefined | null;
  paymentToken?: String0x;
  currency?: CurrencyCodeType | undefined | null;
  className?: string;
};

const MoneyDisplay: FC<MoneyDisplayProps> = ({ amount, paymentToken, currency, className }) => {
  if (!currency) return null;
  const isUsd =
    getCurrencyById(paymentToken)?.value === CurrencyCode.USD ||
    getCurrencyOption(currency)?.value === CurrencyCode.USD;
  const normalizedCurrency = paymentToken
    ? getCurrencyById(paymentToken)
    : currency && getCurrencyOption(currency);

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

import { currencyOptions, getCurrencyOption } from '@src/utils/enumConverters';

import { CurrencyCode } from 'types';

export type Decimals = number;

export const toDecimalByToken = (amt: number, currency?: CurrencyCode): number => {
  const decimal = getCurrencyOption(currency)?.decimals;
  const multiplier = Math.pow(10, decimal);
  return amt * multiplier;
};

export const toNormalNumber = (n: bigint, nDecimals: Decimals): number => {
  return Number(n) / Math.pow(10, nDecimals);
};

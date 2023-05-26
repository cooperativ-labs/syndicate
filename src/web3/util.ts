import { currencyOptions, getCurrencyOption } from '@src/utils/enumConverters';

import { CurrencyCode } from 'types';
import { parseUnits } from 'viem';

export type Decimals = number;

export const toDecimalByToken = (amt: number, currency?: CurrencyCode): number => {
  const decimal = getCurrencyOption(currency)?.decimals;
  const multiplier = Math.pow(10, decimal);
  return amt * multiplier;
};

export const toNormalNumber = (n: bigint, nDecimals: Decimals): number => {
  return Number(n) / Math.pow(10, nDecimals);
};

export const toContractNumber = (n: number, nDecimals: Decimals): bigint => {
  const value = n.toString() as `${number}`;
  return BigInt(parseUnits(value, nDecimals));
};

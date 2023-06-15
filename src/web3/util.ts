import { getCurrencyOption } from '@src/utils/enumConverters';

import { Currency } from 'types';
import { parseUnits } from 'viem';

export const shareContractDecimals = 2;

export type Decimals = number;

export const toDecimalByToken = (amt: number, currency?: Currency): number => {
  const decimal = getCurrencyOption(currency)?.decimals;
  if (!decimal) {
    throw new Error('nDecimals is undefined');
  }
  const multiplier = Math.pow(10, decimal);
  return amt * multiplier;
};

export const toNormalNumber = (n: bigint | undefined, nDecimals: Decimals | undefined): number => {
  if (!nDecimals) {
    throw new Error('nDecimals is undefined');
  }
  return Number(n) / Math.pow(10, nDecimals);
};

export const toReverseContractNumber = (n: number, nDecimals: Decimals): bigint => {
  const value = n / Math.pow(10, nDecimals);
  return BigInt(value);
};

export const toContractNumber = (n: number, nDecimals: Decimals): bigint => {
  const value = n.toString() as `${number}`;
  return parseUnits(value, nDecimals);
};

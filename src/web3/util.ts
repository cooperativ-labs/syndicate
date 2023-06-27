import { getCurrencyOption } from '@src/utils/enumConverters';

import { Currency } from 'types';
import { parseUnits } from 'viem';

export const shareContractDecimals = 2;

export type Decimals = number;

export const toDecimalByToken = (amt: number, currency?: Currency): number => {
  const decimal = getCurrencyOption(currency)?.decimals;
  const multiplier = Math.pow(10, decimal as number);
  return amt * multiplier;
};

export const toNormalNumber = (n: bigint | undefined, nDecimals: Decimals | undefined): number => {
  return Number(n) / Math.pow(10, nDecimals as number);
};

export const toReverseContractNumber = (n: number, nDecimals: Decimals): bigint => {
  const value = n / Math.pow(10, nDecimals);
  return BigInt(value);
};

export const toContractNumber = (n: number, nDecimals: Decimals): bigint => {
  const value = n.toString() as `${number}`;
  return parseUnits(value, nDecimals);
};

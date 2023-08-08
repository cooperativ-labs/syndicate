import { getCurrencyOption } from '@src/utils/enumConverters';
import { CurrencyCode } from 'types';

export const shareContractDecimals = 2;

export type Decimals = number;

export const toDecimalByToken = (amt: number, currency?: CurrencyCode): number => {
  const decimal = getCurrencyOption(currency)?.decimals;
  const multiplier = Math.pow(10, decimal as number);
  return amt * multiplier;
};

export const toNormalNumber = (n: bigint | undefined, nDecimals: Decimals | undefined): number => {
  return Number(n) / Math.pow(10, nDecimals as number);
};

export const adjustUserEnteredDecimalsToMatchCurrency = (n: number, currencyDecimals: Decimals): bigint => {
  // If the user entered a number with decimals, we need to pad it with 0s to match the currency's decimals
  // rounds to the nearest integer if the user entered more decimals than the currency allows
  const decimalPlaces = n.toString().split('.')[1]?.length ?? 0;
  const padding = BigInt(Math.pow(10, currencyDecimals - decimalPlaces));
  if (n.toString().includes('.')) {
    const paddedUserEnteredDecimals = BigInt(Math.round(parseInt(n.toString().replace('.', ''), 10))) * padding;
    return paddedUserEnteredDecimals;
  } else {
    const paddedUserEnteredNoDecimals = BigInt(Math.round(n)) * padding;
    return paddedUserEnteredNoDecimals;
  }
};

export const toContractNumber = (n: number, nDecimals: Decimals): bigint => {
  return adjustUserEnteredDecimalsToMatchCurrency(n, nDecimals);
  // return parseUnits(`${value}`, nDecimals);
};

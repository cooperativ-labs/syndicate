import { currencyOptions, getCurrencyOption } from '@src/utils/enumConverters';
import { BigNumber } from 'ethers';
import { CurrencyCode } from 'types';

export type Decimals = number;
export type HumanNumber = BigNumber;
export type ContractInteger = BigNumber;

// export const bigNaN = BigNumber.from('nan');

export const toHumanNumber = (n: ContractInteger, nDecimals: Decimals): HumanNumber => {
  return n.div(BigNumber.from(10).pow(nDecimals));
};

export const toContractInteger = (n: HumanNumber, nDecimals: Decimals): ContractInteger => {
  return n.mul(BigNumber.from(10).pow(nDecimals));
};

export const toDecimalByToken = (amt: number, currency?: CurrencyCode) => {
  const decimal = getCurrencyOption(currency)?.decimals;
  const multiplier = Math.pow(10, decimal);
  return amt * multiplier;
};

export const toNormalNumber = (n: BigNumber, nDecimals: Decimals): number => {
  return parseInt(toHumanNumber(n, nDecimals)._hex);
};

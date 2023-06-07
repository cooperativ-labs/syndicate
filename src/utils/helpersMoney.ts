import { String0x } from '@src/web3/helpersChain';
import { readContract } from 'wagmi/actions';
import { Offering, OfferingSale } from 'types';
import { swap } from 'formik';
import { swapContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';

export function priceCalculator(maxRaise: number, units: number, display?: boolean) {
  const baseAmount = maxRaise / units;
  return display ? numberWithCommas(baseAmount) : parseInt((baseAmount * 100).toFixed(0), 10);
}

export function numberWithCommas(amount: number, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function floatWithCommas(amount: string) {
  return amount ? amount.replace(/\B(?=(\d{3})+(?!\d)(?=\.\d{0,}$))/g, ',') : '0.00';
}

export function getSalesByPrice(contractSaleList: ContractSale[]) {
  const arrayForSort = contractSaleList && [...contractSaleList];
  return arrayForSort?.sort((a: ContractSale, b: ContractSale) => (a.price < b.price ? -1 : a.price > b.price ? 1 : 0));
}

export function getLowestSalePrice(contractSaleList: ContractSale[], priceStart: number) {
  const salesByPrice = getSalesByPrice(contractSaleList);
  return salesByPrice?.length > 0 ? salesByPrice[0].price : priceStart;
}

export const getCurrentSalePrice = (contractSaleList: ContractSale[], startingPrice: number) => {
  return getLowestSalePrice(contractSaleList, startingPrice);
};

export type ContractSale = {
  saleId: string;
  orderId: number;
  price: number;
  initiator: String0x | '';
  partition: String0x | '';
};

export async function getSaleArrayFromContract(
  sales: OfferingSale[],
  swapContractAddress: String0x,
  paymentTokenDecimals: number
): Promise<ContractSale[]> {
  const salesArray = sales.map(async (sale) => {
    const data = await readContract({
      address: swapContractAddress,
      abi: swapContractABI,
      functionName: 'orders',
      args: [BigInt(sale.orderId)],
    });
    const adjustTokenDecimalsForShareContract = paymentTokenDecimals - shareContractDecimals;
    const initiator = data && data[0];
    const price = data && toNormalNumber(data[3], adjustTokenDecimalsForShareContract);
    const partition = data && data[1];
    const saleId = sale.id;
    const orderId = sale.orderId;
    return {
      saleId,
      orderId,
      price,
      initiator,
      partition,
    };
  });
  return Promise.all(salesArray);
}

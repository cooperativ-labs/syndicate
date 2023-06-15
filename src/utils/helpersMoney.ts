import { String0x } from '@src/web3/helpersChain';
import { readContract } from 'wagmi/actions';
import { Maybe, ShareOrder } from 'types';
import { swapContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';

export function priceCalculator(maxRaise: number, units: number, display?: boolean) {
  const baseAmount = maxRaise / units;
  return display ? numberWithCommas(baseAmount) : parseInt((baseAmount * 100).toFixed(0), 10);
}

export function numberWithCommas(amount: number | null | undefined, decimals = 0) {
  return amount ? amount.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0';
}

export function floatWithCommas(amount: string) {
  return amount ? amount.replace(/\B(?=(\d{3})+(?!\d)(?=\.\d{0,}$))/g, ',') : '0.00';
}

export type ContractOrder = {
  orderId: string | undefined;
  contractIndex: number | undefined;
  price: number;
  initiator: String0x | null;
  partition: String0x | null;
};

export function getOrdersByPrice(contractOrderList: ContractOrder[]) {
  const arrayForSort = contractOrderList && [...contractOrderList];
  return arrayForSort?.sort((a: ContractOrder, b: ContractOrder) =>
    a.price < b.price ? -1 : a.price > b.price ? 1 : 0
  );
}

export function getLowestOrderPrice(contractOrderList: ContractOrder[], priceStart: Maybe<number> | undefined) {
  const ordersByPrice = getOrdersByPrice(contractOrderList);
  return ordersByPrice?.length > 0 ? ordersByPrice[0].price : priceStart;
}

export const getCurrentOrderPrice = (contractOrderList: ContractOrder[], startingPrice: Maybe<number> | undefined) => {
  return getLowestOrderPrice(contractOrderList, startingPrice);
};

export async function getOrderArrayFromContract(
  orders: Maybe<ShareOrder>[],
  swapContractAddress: String0x,
  paymentTokenDecimals: number
): Promise<ContractOrder[]> {
  const orderArray = orders?.map(async (order) => {
    const data =
      order &&
      (await readContract({
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'orders',
        args: [BigInt(order.contractIndex)],
      }));
    const adjustTokenDecimalsForShareContract = paymentTokenDecimals - shareContractDecimals;
    const initiator = data && data[0];
    const price = data ? toNormalNumber(data[3], adjustTokenDecimalsForShareContract) : 0;
    const partition = data && data[1];
    const orderId = order?.id;
    const contractIndex = order?.contractIndex;
    return {
      orderId,
      contractIndex,
      price,
      initiator,
      partition,
    };
  });
  return Promise.all(orderArray);
}

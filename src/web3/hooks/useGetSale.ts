import { useContractRead } from 'wagmi';
import { toNormalNumber } from '../util';
import { SaleStatusType } from '@src/utils/enumConverters';
import { useState } from 'react';
import { shareContractABI } from '../generated';
import { String0x } from '../helpersChain';

export type SaleContentsType = {
  qty: number;
  qtySold: number;
  price: number;
  proceeds: number;
  saleDetails: any;
  status: SaleStatusType;
  btId: string;
  isLoading: boolean;
};
export const useGetSale = (shareContractId: String0x, initiator: string): SaleContentsType | undefined => {
  const [saleContents, setSaleContents] = useState<SaleContentsType>({
    qty: 0,
    qtySold: 0,
    price: 0,
    proceeds: 0,
    saleDetails: undefined,
    status: undefined,
    btId: undefined,
    isLoading: false,
  });

  const { data, isError, isLoading } = useContractRead({
    address: shareContractId,
    abi: shareContractABI,
    // functionName: 'getSale',
  });

  const decimals = 18;
  const qty = data ? toNormalNumber(data[0], decimals) : undefined;
  const qtySold = data ? toNormalNumber(data[0], decimals) : undefined;
  const price = data ? toNormalNumber(data[0], decimals) : undefined;
  const proceeds = data ? toNormalNumber(data[0], decimals) : undefined;
  const saleDetails = data[0];
  const status = data[0];
  const btId = data[0];

  setSaleContents({ qty, qtySold, price, proceeds, saleDetails, status, btId, isLoading });

  return {
    ...saleContents,
  };
};

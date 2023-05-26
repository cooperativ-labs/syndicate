import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { Currency, OfferingSale } from 'types';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type OfferingSummaryPanelProps = {
  seller: string;
  saleQty: number;
  soldQty: number;
  price: number;
  paymentTokenAddress: String0x;
  className?: string;
};

const OfferingSummaryPanel: FC<OfferingSummaryPanelProps> = ({
  seller,
  price,
  saleQty,
  soldQty,
  paymentTokenAddress,
  className,
}) => {
  const presentCurrency = getCurrencyById(paymentTokenAddress).symbol;
  const chainId = useChainId();
  return (
    <div className={className}>
      <div className="flex items-center">
        Seller: <FormattedCryptoAddress className="ml-1" chainId={chainId} address={seller} withCopy />
      </div>
      <div>Share price: {` ${numberWithCommas(price)} ${presentCurrency}`}</div>
      {!!saleQty && <div>Quantity for sale: {numberWithCommas(saleQty)}</div>}
    </div>
  );
};

export default OfferingSummaryPanel;

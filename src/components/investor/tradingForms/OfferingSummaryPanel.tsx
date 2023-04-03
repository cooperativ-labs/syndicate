import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { Currency, OfferingSale } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { setChainId } from '@src/web3/connectors';

type OfferingSummaryPanelProps = {
  seller: string;
  saleQty: number;
  soldQty: number;
  price: number;
  investmentCurrency: Currency;
  className?: string;
};

const OfferingSummaryPanel: FC<OfferingSummaryPanelProps> = ({
  seller,
  price,
  saleQty,
  soldQty,
  investmentCurrency,
  className,
}) => {
  const presentCurrency = getCurrencyOption(investmentCurrency).symbol;
  const chainId = setChainId;
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

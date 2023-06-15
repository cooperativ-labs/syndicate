import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { Currency, ShareOrder } from 'types';
import { getCurrencyById, getCurrencyOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type OfferingSummaryPanelProps = {
  seller: String0x | undefined | '';
  shareQtyRemaining: number | undefined;

  price: number | undefined;
  paymentTokenAddress: String0x | undefined;
  className?: string;
};

const OfferingSummaryPanel: FC<OfferingSummaryPanelProps> = ({
  seller,
  price,
  shareQtyRemaining,
  paymentTokenAddress,
  className,
}) => {
  const presentCurrency = getCurrencyById(paymentTokenAddress)?.symbol;
  const chainId = useChainId();
  return (
    <div className={className}>
      <div className="flex items-center">
        Seller: <FormattedCryptoAddress className="ml-1" chainId={chainId} address={seller} withCopy />
      </div>
      <div>Share price: {` ${numberWithCommas(price)} ${presentCurrency}`}</div>
      {!!shareQtyRemaining && <div>Remaining for sale: {numberWithCommas(shareQtyRemaining)}</div>}
    </div>
  );
};

export default OfferingSummaryPanel;

import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

type OfferingSummaryPanelProps = {
  isAskOrder: boolean | undefined;
  initiator: String0x | undefined | '';
  shareQtyRemaining: number | undefined;
  shareQtyOffered: number | undefined;
  partition: String0x | undefined | '';
  price: number | undefined;
  paymentTokenAddress: String0x | undefined;
  className?: string;
};

const OfferingSummaryPanel: FC<OfferingSummaryPanelProps> = ({
  isAskOrder,
  initiator,
  price,
  shareQtyRemaining,
  shareQtyOffered,
  paymentTokenAddress,
  className,
  partition,
}) => {
  const presentCurrency = getCurrencyById(paymentTokenAddress)?.symbol;
  return (
    <div className={className}>
      {/* <div className="flex items-center">
        {`${isAskOrder ? 'Seller' : 'Buyer'}`}{' '}
        <FormattedCryptoAddress className="ml-1" chainId={chainId} address={initiator} withCopy />
      </div> */}
      <span className="font-semibold text-xl">{` ${numberWithCommas(price)} ${presentCurrency}`}</span>
      <span className="text-sm"> per {partition && stringFromBytes32(partition as String0x)} share</span>

      <div className="mt-2">
        {numberWithCommas(isAskOrder ? shareQtyOffered : shareQtyRemaining)} of{' '}
        {numberWithCommas(isAskOrder ? shareQtyRemaining : shareQtyOffered)}{' '}
        {`remaining for ${isAskOrder ? 'sale' : 'purchase'}`}
      </div>
    </div>
  );
};

export default OfferingSummaryPanel;

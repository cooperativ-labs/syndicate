import React, { FC } from 'react';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

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
      <span className="font-semibold text-xl">{` ${numberWithCommas(price, 2)} ${presentCurrency}`}</span>
      <span className="text-sm"> per {partition && stringFromBytes32(partition as String0x)} share</span>

      <div className="mt-2">
        {numberWithCommas(shareQtyRemaining)} of {numberWithCommas(shareQtyOffered)} remaining
      </div>
    </div>
  );
};

export default OfferingSummaryPanel;

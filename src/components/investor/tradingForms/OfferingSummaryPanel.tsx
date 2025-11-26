import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import React, { FC } from 'react';

type OfferingSummaryPanelProps = {
  shareQtyRemaining: number | undefined;
  shareQtyOffered: number | undefined;
  partition: String0x | undefined | '';
  price: number | undefined;
  paymentTokenAddress: String0x | undefined;
  className?: string;
};

const OfferingSummaryPanel: FC<OfferingSummaryPanelProps> = ({
  price,
  shareQtyRemaining,
  shareQtyOffered,
  paymentTokenAddress,
  className,
  partition
}) => {
  const presentCurrency = getCurrencyById(paymentTokenAddress)?.symbol;
  return (
    <div className={className}>
      <span className='font-semibold text-xl'>{` ${numberWithCommas(price, 2)} ${presentCurrency}`}</span>
      <span className='ml-1 text-sm'>
        per {partition && stringFromBytes32(partition as String0x)} share
      </span>

      <div className='mt-2'>
        {numberWithCommas(shareQtyRemaining)} of {numberWithCommas(shareQtyOffered)} remaining
      </div>
    </div>
  );
};

export default OfferingSummaryPanel;

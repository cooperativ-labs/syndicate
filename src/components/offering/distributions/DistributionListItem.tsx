import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import FormButton from '@src/components/buttons/FormButton';
import React, { FC } from 'react';
import { Currency, CurrencyCode, OfferingDistribution } from 'types';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { setChainId } from '@src/web3/connectors';

type DistributionListItemProps = {
  distribution: OfferingDistribution;
  currency: Currency;
  hideTransactionId?: boolean;
};
const chainId = setChainId;
const DistributionListItem: FC<DistributionListItemProps> = ({ distribution, currency, hideTransactionId }) => {
  const { date, amount, transactionId } = distribution;

  return (
    <div className="relative bg-white shadow-md md:grid grid-cols-8 gap-3 items-center pl-3 p-1 rounded-lg ">
      <div className="col-span-2">
        <div className="font-bold text-base ">{getHumanDate(date)}</div>
      </div>
      {!hideTransactionId && (
        <div className="col-span-2 mt-3 md:mt-0">
          <div className="md:w-auto font-medium ">
            <FormattedCryptoAddress chainId={chainId} address={transactionId} lookupType="tx" />
          </div>
        </div>
      )}
      <div className="col-span-2 mt-3 md:mt-0">
        <div className="md:w-auto font-medium ">
          {amount} {getCurrencyOption(currency).symbol}
        </div>
      </div>
      <div className="col-span-2 flex mt-3 md:mt-0 justify-end">
        <FormButton>{`Claim ${numberWithCommas(amount, 2)}`}</FormButton>
      </div>
    </div>
  );
};

export default DistributionListItem;

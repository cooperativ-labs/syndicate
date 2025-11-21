import { getCurrencyOption, getDistributionPeriod } from '@src/utils/enumConverters';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import React, { FC } from 'react';

import { OfferingFull } from '@/types';

import OfferingDetailItem from '../OfferingDetailItem';

type OfferingDetailsPublicProps = {
  offering: OfferingFull;
  currentSharePrice: number;
  brandColor: string;
};

const OfferingDetailsPublic: FC<OfferingDetailsPublicProps> = ({
  offering,
  brandColor,
  currentSharePrice
}) => {
  const {
    type,
    investment_currency,
    max_raise,
    min_raise,
    num_units,
    max_investors,
    min_investors,
    raise_start,
    raise_period,
    additional_info,
    distribution_period,
    distribution_frequency,
    distribution_currency,
    distribution_description
  } = offering;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-3">
      <OfferingDetailItem brandColor={brandColor} title="Deal size">{` ${
        num_units && numberWithCommas(currentSharePrice * num_units)
      } ${getCurrencyOption(investment_currency)?.symbol}`}</OfferingDetailItem>

      <OfferingDetailItem
        brandColor={brandColor}
        title="Share price"
      >{` ${numberWithCommas(currentSharePrice)} ${
        getCurrencyOption(investment_currency)?.symbol
      }`}</OfferingDetailItem>

      {distribution_period && (
        <OfferingDetailItem
          brandColor={brandColor}
          title="Distribution period"
        >{`  Every ${distribution_frequency} ${getDistributionPeriod(distribution_period)}`}</OfferingDetailItem>
      )}
      {max_investors && (
        <OfferingDetailItem brandColor={brandColor} title="Maximum investors">
          {' '}
          {`${numberWithCommas(max_investors)}`}
        </OfferingDetailItem>
      )}
      {min_investors && (
        <OfferingDetailItem brandColor={brandColor} title="Minimum investors">{`${numberWithCommas(
          min_investors
        )}`}</OfferingDetailItem>
      )}
      {raise_start && (
        <OfferingDetailItem brandColor={brandColor} title="Offering Opens">{`${getHumanDate(
          raise_start
        )}`}</OfferingDetailItem>
      )}
    </div>
  );
};

export default OfferingDetailsPublic;

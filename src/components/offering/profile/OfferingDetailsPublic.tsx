import OfferingDetailItem from '../OfferingDetailItem';
import React, { FC } from 'react';
import { getCurrencyOption, getDistributionPeriod } from '@src/utils/enumConverters';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { OfferingDetails } from 'types';

type OfferingDetailsPublicProps = {
  offeringDetails: OfferingDetails;
  currentSharePrice: number;
  brandColor: string;
};

const OfferingDetailsPublic: FC<OfferingDetailsPublicProps> = ({ offeringDetails, brandColor, currentSharePrice }) => {
  const {
    type,
    investmentCurrency,
    maxRaise,
    minRaise,
    numUnits,
    maxInvestors,
    minInvestors,
    raiseStart,
    raisePeriod,
    additionalInfo,
    distributionPeriod,
    distributionFrequency,
    distributionCurrency,
    distributionDescription,
    adminExpense,
  } = offeringDetails;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-3">
      <OfferingDetailItem brandColor={brandColor} title="Deal size">{` ${
        numUnits && numberWithCommas(currentSharePrice * numUnits)
      } ${getCurrencyOption(investmentCurrency)?.symbol}`}</OfferingDetailItem>

      <OfferingDetailItem brandColor={brandColor} title="Share price">{` ${numberWithCommas(currentSharePrice)} ${
        getCurrencyOption(investmentCurrency)?.symbol
      }`}</OfferingDetailItem>

      {distributionPeriod && (
        <OfferingDetailItem
          brandColor={brandColor}
          title="Distribution period"
        >{`  Every ${distributionFrequency} ${getDistributionPeriod(distributionPeriod)}`}</OfferingDetailItem>
      )}
      {maxInvestors && (
        <OfferingDetailItem brandColor={brandColor} title="Maximum investors">
          {' '}
          {`${numberWithCommas(maxInvestors)}`}
        </OfferingDetailItem>
      )}
      {minInvestors && (
        <OfferingDetailItem brandColor={brandColor} title="Minimum investors">{`${numberWithCommas(
          minInvestors
        )}`}</OfferingDetailItem>
      )}
      {raiseStart && (
        <OfferingDetailItem brandColor={brandColor} title="Offering Opens">{`${getHumanDate(
          raiseStart
        )}`}</OfferingDetailItem>
      )}
    </div>
  );
};

export default OfferingDetailsPublic;

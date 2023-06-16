import { Maybe, Offering, OfferingDescriptionText, OfferingTabSection } from 'types';

export const getLatestDistribution = (offering: Offering | undefined) => {
  const distributions = offering?.distributions;
  const distributionsExist = distributions && distributions.length > 0;
  return distributionsExist && offering?.distributions?.slice(-1)[0];
};

export const getDescriptionsByTab = (
  offering: Offering,
  tab: OfferingTabSection | undefined
): ArrayLike<Maybe<OfferingDescriptionText>> => {
  if (!offering.profileDescriptions) return [];
  return offering.profileDescriptions.filter((description, i) => {
    return description?.section === tab;
  });
};

type SharesRemainingProps = {
  x: Maybe<number> | undefined | number;
  minus: Maybe<number> | undefined | number;
};
export const getAmountRemaining = ({ x, minus }: SharesRemainingProps) => {
  const thisNumber = x || 0;
  const minusThisNummber = minus || 0;
  return thisNumber - minusThisNummber;
};

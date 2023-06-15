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
  sharesIssued: Maybe<number> | undefined;
  sharesOutstanding: Maybe<number> | undefined;
};
export const getSharesRemaining = ({ sharesIssued, sharesOutstanding }: SharesRemainingProps) => {
  return sharesIssued && sharesOutstanding ? sharesIssued - sharesOutstanding : 0;
};

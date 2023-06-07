import { String0x } from '@src/web3/helpersChain';
import { Offering, OfferingDistribution, OfferingTabSection } from 'types';

export const getLatestDistribution = (offering: Offering) => {
  return offering.distributions?.length > 0 && offering.distributions?.slice(-1)[0];
};

export const calculateDistribution = (
  distribution: OfferingDistribution,
  sharesOutstanding: number,
  myShares: number,
  walletAddress: String0x
) => {
  if (distribution?.hasClaimed?.includes(walletAddress)) return 0;
  const totalDistribution = distribution.amount;
  if (!totalDistribution || !sharesOutstanding || !myShares) return 0;
  return (myShares / sharesOutstanding) * totalDistribution;
};

export const getMyDistToClaim = (
  offering: Offering,
  sharesOutstanding: number,
  myShares: number,
  userWalletAddress: String0x
) => {
  const latestDistribution = getLatestDistribution(offering);
  return (
    offering.distributions?.length > 0 &&
    calculateDistribution(latestDistribution, sharesOutstanding, myShares, userWalletAddress)
  );
};

export const getDescriptionsByTab = (offering: Offering, tab: OfferingTabSection) => {
  return offering.profileDescriptions.filter((description, i) => {
    return description.section === tab;
  });
};

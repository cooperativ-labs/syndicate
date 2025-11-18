import {
  OfferingDescriptionText,
  OfferingFull,
  OfferingTabSectionTypes,
} from "@/types";

export type ManagerModalType =
  | "saleForm"
  | "shareSaleList"
  | "smartContractsSettings"
  | "none";

export const getDescriptionsByTab = (
  offering: OfferingFull,
  tab: OfferingTabSectionTypes | undefined,
): ArrayLike<OfferingDescriptionText | undefined> => {
  if (!offering.descriptions) return [];
  return offering.descriptions.filter((description, i) => {
    return description?.section === tab;
  });
};

type SharesRemainingProps = {
  x: number | undefined | number;
  minus: number | undefined | number;
};
export const getAmountRemaining = ({ x, minus }: SharesRemainingProps) => {
  const thisNumber = x || 0;
  const minusThisNummber = minus || 0;
  return thisNumber - minusThisNummber;
};

import { CurrencyCodeType, RealEstatePropertyWithAddress } from '@/types';

import RealEstatePropertyCard from './RealEstatePropertyCard';

type PropertyCardListProps = {
  properties: RealEstatePropertyWithAddress[];
  operatingCurrency: CurrencyCodeType | null;
};

export default function PropertyCardList({ properties, operatingCurrency }: PropertyCardListProps) {
  return properties?.map((property: RealEstatePropertyWithAddress, i: number) => (
    <RealEstatePropertyCard key={i} property={property} currency={operatingCurrency} />
  ));
}

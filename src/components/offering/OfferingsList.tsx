import React, { FC } from 'react';

import { CurrencyCodeType, LegalEntity, Offering } from '@/types';

import OfferingCard from './OfferingCard';

export type OfferingListOfferingType = Offering & {
  legalEntity: { operating_currency: CurrencyCodeType | null };
};

type OfferingsListProps = {
  offerings: OfferingListOfferingType[];
  organizationId: string | number | null;
};
const OfferingsList: FC<OfferingsListProps> = ({ offerings, organizationId }) => {
  if (!organizationId) {
    return <div>Organization not found</div>;
  }
  return (
    <div className='flex flex-col md:flex-row md:flex-wrap justify-start gap-4'>
      {offerings.map((offering, i: number) => {
        return (
          <div className='grow mb-4' key={i}>
            <OfferingCard
              offering={offering}
              organizationId={organizationId}
              operatingCurrency={offering.legalEntity?.operating_currency}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

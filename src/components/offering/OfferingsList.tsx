import React, { FC } from 'react';

import { OfferingWithParticipants } from '@/types';

import OfferingCard from './OfferingCard';

type OfferingsListProps = {
  offerings: OfferingWithParticipants[];
  operatingCurrency: string | null;
  organizationId: string | number;
};
const OfferingsList: FC<OfferingsListProps> = ({
  offerings,
  operatingCurrency,
  organizationId
}) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {offerings.map((offering, i: number) => {
        return (
          <div className="grow mb-4" key={i}>
            <OfferingCard
              offering={offering}
              organizationId={organizationId}
              operatingCurrency={operatingCurrency}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

import { Offering, OrganizationWithLegalEntities } from '@/types';
import React, { FC } from 'react';

import OfferingCard from './OfferingCard';

type OfferingsListProps = {
  offerings: OrganizationWithLegalEntities[];
};
const OfferingsList: FC<OfferingsListProps> = ({ offerings }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {offerings.map((offering: OrganizationWithLegalEntities, i: number) => {
        return (
          <div className="grow mb-4" key={i}>
            <OfferingCard offering={offering} />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

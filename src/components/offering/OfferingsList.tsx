import React, { FC } from 'react';

import { OfferingFull, OrganizationComplete } from '@/types';

import OfferingCard from './OfferingCard';

type OfferingsListProps = {
  offerings: OfferingFull[];
  organization: OrganizationComplete;
};
const OfferingsList: FC<OfferingsListProps> = ({ offerings, organization }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {offerings.map((offering: OfferingFull, i: number) => {
        return (
          <div className="grow mb-4" key={i}>
            <OfferingCard offering={offering} organization={organization} />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

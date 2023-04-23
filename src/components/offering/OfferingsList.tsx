import OfferingCard from './OfferingCard';
import React, { FC } from 'react';

type OfferingsListProps = {
  offerings: any;
  organizationId: string;
};
const OfferingsList: FC<OfferingsListProps> = ({ offerings, organizationId }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {offerings.map((o, i) => {
        return (
          <div className="flex-grow mb-4" key={i}>
            <OfferingCard offering={o} organizationId={organizationId} />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

import OfferingCard from './OfferingCard';
import React, { FC } from 'react';
import { Offering } from 'types';

type OfferingsListProps = {
  offerings: any;
};
const OfferingsList: FC<OfferingsListProps> = ({ offerings }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {offerings.map((o: Offering, i: number) => {
        return (
          <div className="flex-grow mb-4" key={i}>
            <OfferingCard offering={o} />
          </div>
        );
      })}
    </div>
  );
};

export default OfferingsList;

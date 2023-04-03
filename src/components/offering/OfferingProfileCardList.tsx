import React, { FC } from 'react';

import Card from '../cards/Card';
import OfferingProfileCard from './OfferingProfileCard';
import { Offering } from 'types';

interface OfferingProfileCardListProps {
  offerings?: Offering[];
}

export const colStyle = 'col-span-1 uppercase text-sm font-bold text-gray-700';
const HowToCreate =
  "Create a new class by first publishing a smart contract to Ethereum, then 'Establishing' it by attaching a legal contract. You can begin paying Credits once the Class has been established.";

const OfferingProfileCardList: FC<OfferingProfileCardListProps> = ({ offerings }) => {
  // const existingClasses = contributorCreditClasses().length > 0;

  return (
    <div>
      <OfferingProfileCard />
      <OfferingProfileCard />
      <OfferingProfileCard />
      <OfferingProfileCard />
      <OfferingProfileCard />
    </div>
  );
};

export default OfferingProfileCardList;

import React from 'react';
import router from 'next/router';
import { Offering } from 'types';

type OfferingProfileCardProps = {
  offering?: Offering;
};

const OfferingProfileCard: React.FC<OfferingProfileCardProps> = ({ offering }) => {
  return (
    <div className="my-3 border-2 rounded-lg p-3 bg-opacity-10 hover:shadow-md w-full">
      <div
        className="md:grid grid-cols-4 "
        onClick={() => {
          router.push(`/app/offerings/${1}`);
        }}
      >
        <div className="font-bold md:font-base col-span-1 self-center">Cozy Apartments Inc.</div>
        <div className="col-span-1 pl-5">Basic stats</div>
        <div className="col-span-1">Availability</div>
        <div className="col-span-1 flex justify-end">
          <div className="p-6 w-48 rounded-md bg-emerald-600 text-white text-center uppercase font-bold "> Apply </div>
        </div>
      </div>
    </div>
  );
};

export default OfferingProfileCard;

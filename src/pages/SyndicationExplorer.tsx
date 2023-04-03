import OfferingProfileCardList from '@src/components/offering/OfferingProfileCardList';
import React, { FC } from 'react';

const OfferingExplorer: FC = () => {
  return (
    <div className="flex min-h-full mx-auto px-4 md:px-8 md:mt-8" style={{ maxWidth: '1280px' }}>
      <div className=" z-30 md:z-10 min-h-full min-h-screen w-full">
        <h1 className="text-2xl mb-5 md:text-3xl font-bold text-gray-700">Offering Marketplace</h1>
        <OfferingProfileCardList />
      </div>
    </div>
  );
};
export default OfferingExplorer;

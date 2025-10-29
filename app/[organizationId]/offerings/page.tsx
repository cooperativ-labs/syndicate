import ManagerWrapper from '@src/containers/ManagerWrapper';
import Offerings from '@src/pages/Offerings';
import React from 'react';

const OfferingsPage = () => {
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <ManagerWrapper>
        <Offerings />
      </ManagerWrapper>
    </div>
  );
};

export default OfferingsPage;


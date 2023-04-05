import React, { FC } from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';

import Offerings from '@src/pages/Offerings';
import { NextPage } from 'next';

const OfferingsPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper homePage>
        <Offerings />
      </ManagerWrapper>
    </div>
  );
};
export default OfferingsPage;

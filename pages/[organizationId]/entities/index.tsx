import React from 'react';

import ManagerWrapper from '@src/containers/ManagerWrapper';

import EntityDashboard from '@src/pages/EntityDashboard';
import { NextPage } from 'next';

const EntitiesPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <EntityDashboard />
      </ManagerWrapper>
    </div>
  );
};
export default EntitiesPage;

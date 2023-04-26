import Dashboard from '@src/pages/Dashboard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React from 'react';
import { NextPage } from 'next';
const DashboardPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;

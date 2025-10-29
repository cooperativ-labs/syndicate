import ManagerWrapper from '@src/containers/ManagerWrapper';
import Dashboard from '@src/pages/Dashboard';
import React from 'react';

const DashboardPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};

export default DashboardPage;


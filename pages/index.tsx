import React, { FC } from 'react';
import { useSession } from 'next-auth/react';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import Dashboard from '@src/pages/Dashboard';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { GET_USER } from '@src/utils/dGraphQueries/user';

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

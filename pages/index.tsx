import Dashboard from '@src/pages/Dashboard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

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

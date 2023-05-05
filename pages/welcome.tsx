import Dashboard from '@src/pages/Dashboard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React from 'react';
import { NextPage } from 'next';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import Card from '@src/components/cards/Card';
const DashboardPage: NextPage = () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <div className="flex flex-col w-full h-full items-center">
          <h1 className="text-2xl mb-4 text-center">
            Welcome to Cooperativ's portal for creating and managing investment funds.
          </h1>
          <h2 className="text-2xl font-medium mb-8 text-center">Start by creating an organization.</h2>
          <Card className="rounded-lg shadow-box p-4 " style={{ width: 700 }}>
            <h2 className="text-xl text-cDarkBlue mb-8 ">
              You manage your brand and team members at the organization level. Each organization can manage multiple
              funds.
            </h2>
            <CreateOrganization />
          </Card>
        </div>
      </ManagerWrapper>
    </div>
  );
};
export default DashboardPage;

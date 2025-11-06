import ManagerWrapper from '@src/containers/ManagerWrapper';
import Dashboard from '@src/screens/Dashboard';
import { NextPage } from 'next';

const DashboardPage: NextPage = async () => {
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <Dashboard />
      </ManagerWrapper>
    </div>
  );
};

export default DashboardPage;

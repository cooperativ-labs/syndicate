import ManagerWrapper from '@src/containers/ManagerWrapper';
import { NextPage } from 'next';
import Dashboard from '@src/screens/Dashboard';

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

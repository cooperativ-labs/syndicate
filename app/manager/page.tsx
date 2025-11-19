import WithAuthentication from '@src/containers/WithAuthentication';
import Dashboard from '@src/screens/Dashboard';

export default async function ManagerPage() {
  return (
    <div data-test="page-manager" className="h-full flex p-8">
      <WithAuthentication>
        <Dashboard />
      </WithAuthentication>
    </div>
  );
}

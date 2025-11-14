import WithAuthentication from '@src/containers/WithAuthentication';
import Dashboard from '@src/screens/Dashboard';
import { NextPage } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const DashboardPage: NextPage = async () => {
  // const cookieStore = await cookies();
  // const savedOrganizationId = cookieStore.get('CHOSEN_ORGANIZATION')?.value;
  // if (savedOrganizationId) {
  //   return redirect(`/${savedOrganizationId}/overview`);
  // }

  return (
    <div data-test="component-landing" className="h-full flex p-8">
      <WithAuthentication>
        <Dashboard />
      </WithAuthentication>
    </div>
  );
};

export default DashboardPage;

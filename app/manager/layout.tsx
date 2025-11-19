import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import { UserProvider } from '@contexts/UserContext';
import Manager from '@src/containers/Manager';
import ManagerSideBar from '@src/containers/sideBar/ManagerSideBar';
import WithAuthentication from '@src/containers/WithAuthentication';
import { getUserProfile } from '@src/utils/actions/userActions';
import { createClient } from '@supabase/utils/server';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';
import ModalCreateOrganization from '@src/containers/NewOrganizationModal';

const getCachedUserProfile = cache(async (userId: string) => {
  return await getUserProfile(userId);
});
const getCachedOrgsFromUser = cache(async () => {
  return await getOrgsFromUser();
});

const ManagerLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const cookieStore = await cookies();
  // const savedOrganizationId = (await cookieStore).get('CHOSEN_ORGANIZATION')?.value;
  const userProfile = user ? await getCachedUserProfile(user.id) : null;
  const organizations = await getCachedOrgsFromUser();

  return (
    <>
      <UserProvider userProfile={userProfile} user={user}>
        <OrganizationsProvider
          organizations={organizations}
          // savedOrganizationId={savedOrganizationId || null}
        >
          <WithAuthentication>
            <div className="flex">
              {user?.id && (
                <div className="flex z-30 md:z-10 min-h-screen">
                  <ManagerSideBar />{' '}
                </div>
              )}
              <Manager>{children}</Manager>
            </div>
            <ModalCreateOrganization />
          </WithAuthentication>
        </OrganizationsProvider>
      </UserProvider>
    </>
  );
};

export default ManagerLayout;

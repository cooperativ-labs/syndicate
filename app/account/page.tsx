import Loading from '@src/components/loading/Loading';
import WithAuthentication from '@src/containers/WithAuthentication';
import UserSettings from '@src/screens/UserSettings';
import { getUserProfile } from '@src/utils/actions/userActions';
import { createClient } from '@supabase/utils/server';
import { Suspense } from 'react';

export default async function UserSettingsPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const profile = user ? await getUserProfile(user.id) : null;

  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <WithAuthentication>
        <Suspense fallback={<Loading />}>
          {profile ? <UserSettings profile={profile} /> : <div>Profile not found</div>}
        </Suspense>
      </WithAuthentication>
    </div>
  );
}

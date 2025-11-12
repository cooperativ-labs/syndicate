import ManagerWrapper from '@src/containers/ManagerWrapper';
import UserSettings from '@src/screens/UserSettings';
import { createClient } from '@supabase/utils/server';
import { getUserProfile } from '@src/utils/actions/userActions';

export default async function UserSettingsPage() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const profile = user ? await getUserProfile(user.id) : null;
  if (!profile) {
    return <div>Profile not found</div>;
  }
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <UserSettings profile={profile} />
      </ManagerWrapper>
    </div>
  );
}

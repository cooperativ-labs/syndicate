import ManagerWrapper from '@src/containers/ManagerWrapper';
import UserSettings from '@src/screens/UserSettings';

export default async function UserSettingsPage() {
  return (
    <div
      data-test="component-landing"
      className="bg-linear-to-b from-gray-100 to-blue-50 flex flex-col w-full h-full"
    >
      <ManagerWrapper>
        <UserSettings />
      </ManagerWrapper>
    </div>
  );
}

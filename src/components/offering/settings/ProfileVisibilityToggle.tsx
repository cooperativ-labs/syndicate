import { Switch } from '@src/components/ui/switch';
import { FC } from 'react';

export type ProfileVisibilityToggleProps = {
  profileVisibility: boolean | undefined | null;
  handleToggle: (profileVisibility: boolean) => void;
};
const ProfileVisibilityToggle: FC<ProfileVisibilityToggleProps> = ({
  profileVisibility,
  handleToggle
}) => {
  return (
    <div className="flex align-middle justify-between items-center ">
      <div className="text-sm font-medium text-gray-700 mr-2">
        {profileVisibility ? '' : 'Make visible to investors'}
      </div>
      <Switch checked={profileVisibility || false} onCheckedChange={handleToggle} />
    </div>
  );
};

export default ProfileVisibilityToggle;

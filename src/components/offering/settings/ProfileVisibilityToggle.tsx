import cn from 'classnames';
import React, { FC } from 'react';

export type ProfileVisibilityToggleProps = {
  profileVisibility: boolean;
  handleToggle: (profileVisibility: boolean) => void;
};
const ProfileVisibilityToggle: FC<ProfileVisibilityToggleProps> = ({ profileVisibility, handleToggle }) => {
  return (
    <div className="flex align-middle justify-between">
      <button
        className=" border-2 border-grey-100 shadow-inner rounded-full w-12 bg-white "
        onClick={(e) => {
          e.preventDefault();
          handleToggle(!profileVisibility);
        }}
      >
        <div className={cn([profileVisibility ? ' ml-5 bg-emerald-600' : 'bg-gray-400'], 'h-6 w-6 rounded-full ')} />
      </button>
    </div>
  );
};

export default ProfileVisibilityToggle;

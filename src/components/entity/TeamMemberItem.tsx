import cn from 'classnames';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { EditButton } from '../form-components/ListItemButtons';
import { getOrganizationPermissionOption } from '@src/utils/enumConverters';
import { OrganizationPermissionType, OrganizationUser } from 'types';

type TeamMemberListItemProps = {
  teamMember: OrganizationUser;
  organizationId: string;
  currentUserId: string;
  isAdmin: boolean;
  removeMember: (variables: any) => void;
};

const TeamMemberListItem: FC<TeamMemberListItemProps> = ({
  teamMember,
  organizationId,
  currentUserId,
  isAdmin,
  removeMember,
}) => {
  const [editOn, setEditOn] = useState<boolean>(false);
  const { user, permissions, id } = teamMember;
  const { name, email, id: userId, image } = user;

  const makePermissionsChips = (permissions: OrganizationPermissionType[]) => {
    return permissions.map((permission, i) => {
      const { name, color } = getOrganizationPermissionOption(permission);

      // color refuses to render if I apply it directly to the class. It even appears in the CSS in the inspector, but it doesn't render. I have no idea why. The behavior is also inconsistent. Sometimes it works, sometimes it doesn't.
      const permissionClass = () => {
        switch (name) {
          case 'Admin':
            return `bg-blue-600 rounded-full min-w-min p-1 px-2 text-center text-white text-xs font-semibold`;
          case 'Editor':
            return `bg-green-600 rounded-full min-w-min p-1 px-2 text-center text-white text-xs font-semibold`;
          case 'Auditor':
            return `bg-gray-600 rounded-full min-w-min p-1 px-2 text-center text-white text-xs font-semibold`;
          case 'Viewer':
            return `bg-gray-600 rounded-full min-w-min p-1 px-2 text-center text-white text-xs font-semibold`;
          default:
            return 'green-600';
        }
      };

      return (
        <div key={i} className={cn(permissionClass())}>
          {name}
        </div>
      );
    });
  };

  const canModify = user.id !== currentUserId && isAdmin;

  return (
    <div className="md:flex lg:grid grid-cols-8 gap-1 p-3  border-2 rounded-lg items-center ">
      <div className="col-span-1">
        <img src={image} referrerPolicy="no-referrer" className="w-8 h-8 border-2 border-white rounded-full" />
      </div>
      <div className="col-span-5 mt-3 md:mt-0">
        <div className="md:w-auto text-sm font-medium ">{name}</div>
      </div>
      <div className="flex col-span-1 mt-3 md:mt-0 items-center justify-end">{makePermissionsChips(permissions)}</div>

      {canModify && (
        <div className=" md:mt-0 flex col-span-1 justify-end min-w-max">
          <div className="flex">
            <EditButton toggle={editOn} setToggle={setEditOn} />
          </div>
        </div>
      )}
      {editOn && (
        <div className="col-span-6 flex w-full">
          {canModify && (
            <button
              className="border-2 border-red-900 hover:bg-red-800 text-red-900 hover:text-white font-bold text-xs  uppercase mt-2 md:mt-0 md:ml-2 p-1 px-2 rounded-lg w-full whitespace-nowrap "
              aria-label="remove wallet from whitelist"
              onClick={() =>
                removeMember({
                  variables: {
                    organizationId: organizationId,
                    organizationUserId: id,
                    currentDate: currentDate,
                  },
                })
              }
            >
              Remove team member
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TeamMemberListItem;

import { useUserContext } from '@contexts/UserContext';
import { cn } from '@src/lib/utils';
import { removeTeamMember } from '@src/utils/actions/organizationActions';
import { getOrganizationPermissionOption } from '@src/utils/enumConverters';
import React, { FC, useState } from 'react';

import { OrganizationUserPermissionTypes, OrganizationUserWithProfile } from '@/types';

import { EditButton } from '../form-components/ListItemButtons';
import { Badge } from '../ui/badge';
import { Item } from '../ui/item';
import Image from 'next/image';

export type TeamMemberBaseProps = {
  organizationId: string;
  isAdmin: boolean | '' | undefined;
};

type TeamMemberListItemProps = TeamMemberBaseProps & {
  teamMember: OrganizationUserWithProfile;
};

const TeamMemberListItem: FC<TeamMemberListItemProps> = ({
  teamMember,
  organizationId,
  isAdmin
}) => {
  const { userId: currentUserId } = useUserContext();
  const [editOn, setEditOn] = useState<boolean>(false);
  const {
    user_id: userId,
    permissions,
    id,
    profile: { image, name }
  } = teamMember as OrganizationUserWithProfile;

  const removeMember = async () => {
    await removeTeamMember({ organizationId, organizationUserId: id });
  };

  const makePermissionsChips = (permissions: OrganizationUserPermissionTypes[] | null) => {
    return permissions?.map((permission, i) => {
      const { name, color } = getOrganizationPermissionOption(permission);

      // color refuses to render if I apply it directly to the class. It even appears in the CSS in the inspector, but it doesn't render. I have no idea why. The behavior is also inconsistent. Sometimes it works, sometimes it doesn't.
      const permissionClass = () => {
        switch (name) {
          case 'Admin':
            return `bg-blue-600 rounded-full`;
          case 'Editor':
            return `bg-green-600 rounded-full`;
          case 'Auditor':
            return `bg-gray-600 rounded-full`;
          case 'Viewer':
            return `bg-gray-600 rounded-full`;
          default:
            return 'green-600 rounded-full';
        }
      };

      return (
        <Badge key={i} className={cn(permissionClass())}>
          {name}
        </Badge>
      );
    });
  };

  const canModify = userId !== currentUserId && isAdmin;

  return (
    <Item
      variant="outline"
      className="md:flex  gap-1 p-3  border-2 rounded-lg items-center justify-between "
    >
      <Image
        objectFit="cover"
        src={image || '/assets/images/user-images/placeholder.png'}
        referrerPolicy="no-referrer"
        className="w-8 h-8 border-2 border-white rounded-full"
        width={32}
        height={32}
        alt={name || 'User Profile Image'}
        unoptimized={process.env.NODE_ENV === 'development'}
      />

      <div className="mt-3 md:mt-0">
        <div className="md:w-auto text-sm font-medium ">{name}</div>
      </div>
      <div className="flex items-center justify-end gap-1">
        <div className="flex col-span-1 mt-3 md:mt-0 items-center justify-end">
          {makePermissionsChips(permissions)}
        </div>
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
                onClick={() => removeMember()}
              >
                Remove team member
              </button>
            )}
          </div>
        )}{' '}
      </div>
    </Item>
  );
};

export default TeamMemberListItem;

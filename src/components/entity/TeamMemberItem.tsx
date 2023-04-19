import cn from 'classnames';
import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { EditButton } from '../form-components/ListItemButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getLegalEntityPermissionOption } from '@src/utils/enumConverters';
import { LegalEntityPermissionType, LegalEntityUser } from 'types';

type TeamMemberListItemProps = {
  teamMember: LegalEntityUser;
  entityId: string;
  removeMember: (variables: any) => void;
};

const TeamMemberListItem: FC<TeamMemberListItemProps> = ({ teamMember, entityId, removeMember }) => {
  const [editOn, setEditOn] = useState<boolean>(false);
  const { user, permissions, id } = teamMember;
  const { name, email, id: userId } = user;

  const makePermissionsChips = (permissions: LegalEntityPermissionType[]) => {
    return permissions.map((permission, i) => {
      const { name, color } = getLegalEntityPermissionOption(permission);
      const bg = `bg-${color}`;
      return (
        <div key={i} className={cn(bg, 'rounded-full min-w-min p-1 px-2 text-center text-white text-xs font-semibold')}>
          {name}
        </div>
      );
    });
  };

  return (
    <div className="md:flex lg:grid grid-cols-6 gap-3 p-3  border-2 rounded-lg ">
      <div className="col-span-3 mt-3 md:mt-0">
        <div className="md:w-auto font-medium ">{name}</div>
      </div>
      <div className="flex col-span-2 mt-3 md:mt-0 items-center justify-end">{makePermissionsChips(permissions)}</div>

      <div className=" md:mt-0 flex col-span-1 justify-end min-w-max">
        <div className="flex">
          <EditButton toggle={editOn} setToggle={setEditOn} />
        </div>
      </div>
      {editOn && (
        <div className="col-span-6">
          <div className=" md:mt-0 flex col-span-2 justify-end min-w-max">
            <div className="flex">
              <button
                className="border-2 border-red-900 hover:bg-red-800 text-red-900 hover:text-white font-bold text-sm uppercase mt-2 md:mt-0 md:ml-2 p-2 rounded-full w-12 whitespace-nowrap "
                aria-label="remove wallet from whitelist"
                onClick={() =>
                  removeMember({
                    variables: { entityId: entityId, LegalEntityUserId: id, userId: userId, currentDate: currentDate },
                  })
                }
              >
                <FontAwesomeIcon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMemberListItem;

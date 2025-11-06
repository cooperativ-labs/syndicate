import { REMOVE_ORGANIZATION_USER } from '@src/utils/graphQueries/organization';
import React, { FC } from 'react';

import { OrganizationUser } from '@/types';

import TeamMemberItem, { TeamMemberBaseProps } from './TeamMemberItem';
type TeamMemberListProps = TeamMemberBaseProps & {
  teamMembers: OrganizationUser[] | [];
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, organizationId, isAdmin }) => {
  const [removeMember, { data: dataRemove, error: deleteError }] =
    useMutation(REMOVE_ORGANIZATION_USER);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return (
    <div className="w-full">
      {teamMembers?.map((member, i) => {
        return (
          <div className="mb-3 gap-2" key={i}>
            <TeamMemberItem
              teamMember={member}
              removeMember={removeMember}
              organizationId={organizationId}
              isAdmin={isAdmin}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMemberList;

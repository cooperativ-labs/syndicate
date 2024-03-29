import React, { FC } from 'react';

import { useMutation } from '@apollo/client';

import TeamMemberItem, { TeamMemberBaseProps } from './TeamMemberItem';
import { Maybe, OrganizationUser } from 'types';

import { REMOVE_ORGANIZATION_USER } from '@src/utils/dGraphQueries/organization';

type TeamMemberListProps = TeamMemberBaseProps & {
  teamMembers: Maybe<Maybe<OrganizationUser>[]> | undefined;
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, organizationId, currentUserId, isAdmin }) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_ORGANIZATION_USER);

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
              currentUserId={currentUserId}
              isAdmin={isAdmin}
            />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMemberList;

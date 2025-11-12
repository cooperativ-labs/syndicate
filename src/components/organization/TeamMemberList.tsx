import React, { FC } from 'react';

import { OrganizationUserWithProfile } from '@/types';

import TeamMemberItem, { TeamMemberBaseProps } from './TeamMemberItem';
type TeamMemberListProps = TeamMemberBaseProps & {
  teamMembers: OrganizationUserWithProfile[] | [];
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, organizationId, isAdmin }) => {
  if (!teamMembers) return null;
  return (
    <div className="w-full">
      {teamMembers?.map((member, i) => {
        return (
          <div className="mb-3 gap-2" key={i}>
            <TeamMemberItem teamMember={member} organizationId={organizationId} isAdmin={isAdmin} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMemberList;

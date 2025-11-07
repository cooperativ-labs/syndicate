import React, { FC } from 'react';

import { OrganizationUser } from '@/types';

import TeamMemberItem, { TeamMemberBaseProps } from './TeamMemberItem';
import { removeTeamMember } from '@src/utils/actions/organizationActions';
type TeamMemberListProps = TeamMemberBaseProps & {
  teamMembers: OrganizationUser[] | [];
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, organizationId, isAdmin }) => {
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

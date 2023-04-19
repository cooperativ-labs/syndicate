import React, { FC } from 'react';

import { useMutation } from '@apollo/client';

import TeamMemberItem from './TeamMemberItem';
import { LegalEntityUser, User } from 'types';
import { REMOVE_LEGAL_ENTITY_USER } from '@src/utils/dGraphQueries/entity';
import { REMOVE_WAITLIST_OBJECT } from '@src/utils/dGraphQueries/offering';

type TeamMemberListProps = {
  teamMembers: LegalEntityUser[];
  entityId: string;
  currentUserId: string;
  isAdmin: boolean;
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, entityId, currentUserId, isAdmin }) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_LEGAL_ENTITY_USER);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return (
    <div className="w-full">
      {teamMembers.map((member, i) => {
        return (
          <div className="mb-3" key={i}>
            <TeamMemberItem
              teamMember={member}
              removeMember={removeMember}
              entityId={entityId}
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

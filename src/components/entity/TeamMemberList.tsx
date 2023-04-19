import React, { FC } from 'react';

import { useMutation } from '@apollo/client';

import TeamMemberItem from './TeamMemberItem';
import { LegalEntityUser, User } from 'types';
import { REMOVE_LEGAL_ENTITY_USER } from '@src/utils/dGraphQueries/entity';
import { REMOVE_WAITLIST_OBJECT } from '@src/utils/dGraphQueries/offering';

type TeamMemberListProps = {
  teamMembers: LegalEntityUser[];
  entityId: string;
};

const TeamMemberList: FC<TeamMemberListProps> = ({ teamMembers, entityId }) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_LEGAL_ENTITY_USER);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  return (
    <div className="w-full">
      {teamMembers.map((member, i) => {
        return (
          <div className="mb-3" key={i}>
            <TeamMemberItem teamMember={member} removeMember={removeMember} entityId={entityId} />
          </div>
        );
      })}
    </div>
  );
};

export default TeamMemberList;

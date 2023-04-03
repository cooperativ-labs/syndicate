import * as backendCtc from '../../../web3/index.main';
import React, { FC } from 'react';
import WaitlistItem from './WaitlistItem';
import { REMOVE_WAITLIST_OBJECT } from '@src/utils/dGraphQueries/offering';
import { useMutation } from '@apollo/client';
import { WaitlistMember } from 'types';

type WaitlistProps = {
  offeringWaitlistMembers: WaitlistMember[];
  offeringId: string;
};

const Waitlist: FC<WaitlistProps> = ({ offeringWaitlistMembers, offeringId }) => {
  const [removeMember, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_WAITLIST_OBJECT);

  if (dataRemove) {
    //This should refetch without explicitly coding it, but I can't figure out why it isn't
  }

  return (
    <div className="w-full">
      {offeringWaitlistMembers.map((waitlistMember, i) => {
        return (
          <div className="mb-3" key={i}>
            <WaitlistItem waitlistMember={waitlistMember} removeMember={removeMember} offeringId={offeringId} />
          </div>
        );
      })}
    </div>
  );
};

export default Waitlist;

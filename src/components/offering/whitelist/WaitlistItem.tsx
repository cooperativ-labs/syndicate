import cn from 'classnames';
import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DownloadFile } from '@src/utils/helpersAgreement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { WaitlistMember } from 'types';

type WaitlistItemProps = {
  waitlistMember: WaitlistMember;
  offeringId: string;
  removeMember: (variables: any) => void;
};

const WaitlistItem: FC<WaitlistItemProps> = ({ waitlistMember, offeringId, removeMember }) => {
  return (
    <div className="md:flex lg:grid grid-cols-6 gap-3 p-3  border-2 rounded-lg ">
      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">Name:</div>
        <div className="md:w-auto font-medium ">{waitlistMember.name}</div>
      </div>
      {waitlistMember.minPledge && (
        <div className="col-span-1 mt-3 md:mt-0">
          <div className="text-sm">Pledge:</div>
          <div className="md:w-auto font-medium ">
            {waitlistMember.minPledge} - {waitlistMember.maxPledge} shares
          </div>
        </div>
      )}
      <div className="flex col-span-1 mt-3 md:mt-0 items-center justify-end">
        <div
          className={cn(
            waitlistMember.nonUS ? 'bg-orange-700' : 'bg-blue-700',
            'rounded-full w-8 p-1 text-center text-white text-xs font-semibold'
          )}
        >
          {waitlistMember.nonUS ? 'Int' : 'US'}
        </div>
      </div>
      <div className=" md:mt-0 flex col-span-2 justify-end min-w-max">
        <div className="flex">
          <button
            className="border-2 border-cLightBlue hover:bg-cDarkBlue text-cLightBlue hover:text-white font-bold text-sm uppercase rounded-lg p-1 px-2 whitespace-nowrap w-full"
            aria-label="review application"
            onClick={() =>
              DownloadFile(
                waitlistMember.investorApplication.applicationDoc.text,
                `${waitlistMember.name} - application.md`
              )
            }
          >
            Review Application
          </button>
          <button
            className="border-2 border-red-900 hover:bg-red-800 text-red-900 hover:text-white font-bold text-sm uppercase mt-2 md:mt-0 md:ml-2 p-2 rounded-full w-12 whitespace-nowrap "
            aria-label="remove wallet from whitelist"
            onClick={() =>
              removeMember({ variables: { offeringId: offeringId, id: waitlistMember.id, currentDate: currentDate } })
            }
          >
            <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistItem;

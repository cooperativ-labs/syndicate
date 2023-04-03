import Card from '../cards/Card';
import React from 'react';
import RoundedImage from '../RoundedImage';
import { LegalEntity } from 'types';
import { useRouter } from 'next/router';

type EntityCardProps = {
  entity: LegalEntity;
};

const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  const router = useRouter();
  const {
    displayName,
    description,
    jurisdiction,
    id,
    subsidiaries,
    owners,
    publicFacing: hasProfile,
    offerings,
  } = entity;

  const isOfferingEntity = offerings.length > 0;

  return (
    <div
      onClick={() => {
        router.push(`/app/businesses/${id}`);
      }}
    >
      <Card className="rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <div className=" p-6 flex items-center">
          <RoundedImage className="h-16 w-16 bg-gray-200 border-2 border-gray-100 mr-4" src={entity.profileImage} />
          <div>
            <h1 className="text-lg font-bold">{displayName}</h1>
            <div className="text-xs text-gray-600 mb-1">
              {owners?.length} {`owner${owners?.length === 1 ? '' : `s`}`}
            </div>
            <div className="text-xs text-gray-600 mb-4">
              {subsidiaries?.length} {`subsidiar${subsidiaries?.length === 1 ? 'y' : 'ies'}`}
            </div>
          </div>
        </div>

        <div className="flex border-t-2 border-gray-200 rounded-b-lg px-6 py-2 justify-between">
          {hasProfile ? (
            <div className="text-sm font-bold text-green-700">Has public profile</div>
          ) : (
            <div className="text-sm text-gray-500 font-semibold">Hidden</div>
          )}
          {isOfferingEntity && <div className="text-sm font-bold text-gray-700">This is an offering SPV</div>}
        </div>
      </Card>
    </div>
  );
};

export default EntityCard;

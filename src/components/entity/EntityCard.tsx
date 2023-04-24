import Card from '../cards/Card';
import React from 'react';
import router from 'next/router';
import { LegalEntity } from 'types';

type EntityCardProps = {
  entity: LegalEntity;
};

const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  const { displayName, jurisdiction, id, subsidiaries, owners, offerings, organization } = entity;

  const isOfferingEntity = offerings.length > 0;

  return (
    <div
      onClick={() => {
        router.push(`/${organization.id}/entities/${id}`);
      }}
    >
      <Card className="rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <div className=" p-6 flex items-center">
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

        <div className="flex border-t-2 border-gray-200 rounded-b-lg px-6 py-2 h-10 justify-between">
          <div>
            {isOfferingEntity && <div className="text-sm font-bold text-gray-700">This is an offering SPV</div>}
          </div>
          <div>{jurisdiction && <div className="text-sm font-medium text-gray-500">{jurisdiction}</div>}</div>
        </div>
      </Card>
    </div>
  );
};

export default EntityCard;

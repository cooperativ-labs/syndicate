'use client';

import { renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { useRouter } from 'next/navigation';
import React from 'react';

import { legalEntityWithSubsidiaries } from '@/types';

import Card from '../cards/Card';

export type EntityCardProps = {
  entity: legalEntityWithSubsidiaries;
};

const EntityCard: React.FC<EntityCardProps> = ({ entity }) => {
  const router = useRouter();
  const { display_name, jurisdiction_id, id, subsidiaries, owners, offerings, organizationId } =
    entity ?? {};

  const isOfferingEntity = offerings && offerings.length > 0;

  return (
    <div
      onClick={() => {
        router.push(`/${organizationId}/entities/${id}`);
      }}
    >
      <Card className="rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <div className=" p-6 flex items-center">
          <div>
            <h1 className="text-lg font-bold">{display_name}</h1>
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
            {isOfferingEntity && (
              <div className="text-sm font-bold text-gray-700">This is an offering SPV</div>
            )}
          </div>
          <div>
            {jurisdiction_id && (
              <div className="text-sm font-medium text-gray-500">
                {renderJurisdiction(jurisdiction_id)}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EntityCard;

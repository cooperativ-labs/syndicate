'use client';

import { renderJurisdiction } from '@src/utils/helpersUserAndEntity';
import { useRouter } from 'next/navigation';
import React from 'react';

import { LegalEntityWithJurisdiction } from '@/types';

import { Card } from '../ui/card';

export type EntityCardProps = {
  entity: LegalEntityWithJurisdiction;
  organizationId: string | number;
};

const EntityCard: React.FC<EntityCardProps> = ({ entity, organizationId }) => {
  const router = useRouter();
  const { display_name, jurisdiction, id, offerings } = entity ?? {};

  const isOfferingEntity = offerings && offerings.length > 0;

  return (
    <div
      onClick={() => {
        router.push(`/manager/${organizationId}/entities/${id}`);
      }}
    >
      <Card className="rounded-lg hover:shadow-xl cursor-pointer md:w-96">
        <div className=" p-6 flex items-center">
          <div>
            <h1 className="text-lg font-bold">{display_name}</h1>
          </div>
        </div>

        <div className="flex border-t-2 border-gray-200 rounded-b-lg px-6 py-2 h-10 justify-between">
          <div>
            {isOfferingEntity && (
              <div className="text-sm font-bold text-gray-700">This is an offering SPV</div>
            )}
          </div>
          <div>
            {jurisdiction && (
              <div className="text-sm font-medium text-gray-500">
                {renderJurisdiction(jurisdiction)}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EntityCard;

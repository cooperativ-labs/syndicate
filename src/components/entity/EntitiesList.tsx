'use client';

import React, { FC } from 'react';

import { LegalEntityWithJurisdiction } from '@/types';

import EntityCard from './EntityCard';

type EntitiesListProps = {
  entities: LegalEntityWithJurisdiction[] | null;
  organizationId: string | number;
};

const EntitiesList: FC<EntitiesListProps> = ({ entities, organizationId }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {entities?.map((entity, i) => {
        return (
          <div className="mb-4" key={i}>
            <EntityCard entity={entity} organizationId={organizationId} />
          </div>
        );
      })}
    </div>
  );
};

export default EntitiesList;

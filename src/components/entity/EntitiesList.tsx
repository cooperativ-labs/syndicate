import EntityCard from './EntityCard';
import React, { FC } from 'react';
import { LegalEntity, Maybe } from 'types';

type EntitiesListProps = {
  entities: Maybe<Maybe<LegalEntity>[]> | undefined;
};

const EntitiesList: FC<EntitiesListProps> = ({ entities }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap justify-start gap-4">
      {entities?.map((entity, i) => {
        return (
          <div className="mb-4" key={i}>
            <EntityCard entity={entity} />
          </div>
        );
      })}
    </div>
  );
};

export default EntitiesList;

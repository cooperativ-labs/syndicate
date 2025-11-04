import { LegalEntity } from '@gql/graphql';
import { entityNotHuman } from '@src/utils/helpersUserAndEntity';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

import Button from '../buttons/Button';

import { defaultFieldDiv } from './Inputs';
import Select from './Select';

type EntitySelectorProps = {
  entities: LegalEntity[];
  fieldName: string;
  label: string;
  excludeIndividuals?: boolean;
  withAdd?: boolean;
  setModal?: any;
  className?: string;
};

const EntitySelector: FC<EntitySelectorProps> = ({
  entities,
  setModal,
  label,
  fieldName,
  excludeIndividuals,
  withAdd,
  className
}) => {
  const createEntityList = (entities: LegalEntity[]) => {
    return entities.map((entity, i) => {
      if (excludeIndividuals) {
        if (entityNotHuman(entity)) {
          return (
            <option key={i} value={entity?.id}>
              {entity?.legalName}
            </option>
          );
        }
      } else {
        return (
          <option key={i} value={entity?.id}>
            {entity?.legalName}
          </option>
        );
      }
    });
  };
  return (
    <div className={cn(className ? className : 'md:grid grid-cols-5 gap-4')}>
      <div className="col-span-3 align-end ">
        <Select required className={defaultFieldDiv} labelText={label} name={fieldName}>
          <option value="">Select an entity</option>
          {createEntityList(entities)}
        </Select>
      </div>
      {withAdd && (
        <div className="flex flex-col col-span-2 justify-end">
          <>
            {!setModal && alert('a modal must be set for this button to work')}
            <Button
              className="p-1 px-3 border-2 border-gray-400 rounded-lg mb-3"
              onClick={e => {
                e.preventDefault();
                setModal(true);
              }}
            >
              Add New Entity
            </Button>
          </>
        </div>
      )}
    </div>
  );
};

export default EntitySelector;

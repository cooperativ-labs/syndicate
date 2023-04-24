import Button from '../buttons/Button';
import cn from 'classnames';
import React, { FC } from 'react';
import Select from './Select';
import { defaultFieldDiv } from './Inputs';
import { entityNotHuman } from '@src/utils/helpersUserAndEntity';
import { LegalEntity } from 'types';

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
  className,
}) => {
  const createEntityList = (entities) => {
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
              onClick={(e) => {
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

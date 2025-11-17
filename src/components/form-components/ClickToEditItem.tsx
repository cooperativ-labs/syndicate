import { useOffering } from '@contexts/OfferingContext';
import { cn } from '@src/lib/utils';
import React, { FC } from 'react';

import { EditEntitySelectionType } from '../entity/EntitySpecifications';
import { ParticipantSpecItemType } from '../offering/whitelist/SelctedParticipantDetails';
import { EditOrganizationSelectionType } from '../organization/OrganizationSpecifications';

type ClickToEditItemProps = {
  label: string;
  currentValue: string | undefined | null;
  form: any;
  editOn:
    | EditEntitySelectionType
    | EditOrganizationSelectionType
    | ParticipantSpecItemType
    | string
    | undefined;
  isManager?: boolean;
  itemType: EditEntitySelectionType | EditOrganizationSelectionType | string;
  setEditOn: (editOn: EditEntitySelectionType | EditOrganizationSelectionType | string) => void;
  className?: string;
};
const ClickToEditItem: FC<ClickToEditItemProps> = ({
  label,
  currentValue,
  form,
  editOn,
  itemType,
  isManager = false,
  setEditOn,
  className
}) => {
  return (
    <div className={cn('flex justify-between gap-4 z-10', className)}>
      {editOn === itemType ? (
        form
      ) : (
        <div
          className={cn(
            `font-bold text-gray-700`,
            isManager && 'hover:cursor-pointer hover:underline'
          )}
          onClick={() => {
            isManager ? setEditOn(itemType) : {};
          }}
        >
          {label}
        </div>
      )}
      <div
        className={cn(isManager && 'hover:cursor-pointer')}
        onClick={() => {
          isManager ? setEditOn(itemType) : {};
        }}
      >
        {editOn !== itemType && currentValue}
      </div>
    </div>
  );
};

export default ClickToEditItem;

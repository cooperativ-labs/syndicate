import cn from 'classnames';
import React, { FC } from 'react';
import { EditEntitySelectionType } from '../entity/EntitySpecifications';
import { EditOrganizationSelectionType } from '../organization/OrganizationSpecifications';

type ClickToEditItemProps = {
  label: string;
  currentValue: string;
  form: any;
  editOn: EditEntitySelectionType | EditOrganizationSelectionType | string;
  itemType: EditEntitySelectionType | EditOrganizationSelectionType | string;
  isManager: boolean;
  setEditOn: (editOn: EditEntitySelectionType | EditOrganizationSelectionType | string) => void;
};
const ClickToEditItem: FC<ClickToEditItemProps> = ({
  label,
  currentValue,
  form,
  editOn,
  itemType,
  isManager,
  setEditOn,
}) => {
  return (
    <div className={'flex justify-between gap-4 z-10'}>
      {editOn === itemType ? (
        form
      ) : (
        <div
          className={cn(`font-bold text-gray-700`, isManager && 'hover:cursor-pointer hover:underline')}
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

import { cn } from '@src/lib/utils';
import React, { ReactElement } from 'react';
import { FieldErrors, FieldValues } from 'react-hook-form';

import { Checkbox as CheckboxUI } from '../ui/checkbox';
import { FieldError, FieldLabel } from '../ui/field';

export interface CheckboxProps {
  id?: any;
  name: string;
  required?: boolean;
  checked: boolean | undefined;
}
export interface CustomCheckboxProps extends CheckboxProps {
  labelText?: string | ReactElement;
  className?: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  sideLabel?: boolean;
  errors: FieldErrors<FieldValues>;
}

const Checkbox: React.FC<CustomCheckboxProps> = ({
  labelText,
  id,
  name,
  required,
  checked,
  className,

  fieldLabelClass,
  sideLabel,
  errors
}) => {
  return (
    <div>
      <div
        className={cn(className, [
          sideLabel ? 'flex flex-row-reverse justify-end items-center' : 'flex flex-col'
        ])}
      >
        {labelText && (
          <FieldLabel
            htmlFor={name}
            className={cn(
              fieldLabelClass
                ? fieldLabelClass
                : 'text-sm text-blue-900 font-semibold text-opacity-80',
              sideLabel && 'ml-2 mt-1'
            )}
          >
            {labelText}
            {required ? ' *' : ''}
          </FieldLabel>
        )}
        <CheckboxUI id={id} checked={checked} />
      </div>
      <FieldError errors={errors.name ? [errors.name] : undefined} />
    </div>
  );
};

export default Checkbox;

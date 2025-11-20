import { cn } from '@src/lib/utils';
import React, { ReactNode } from 'react';

import { FieldLabel } from '../ui/field';

export type CustomNonInputProps = {
  labelText?: string;
  fieldLabelClass?: string;
  className?: string;
  children: ReactNode;
};

export const defaultFieldLabelClass = 'text-sm text-blue-900 font-semibold text-opacity-80';
export const defaultFieldDiv = 'pt-2 my-2 bg-opacity-0';

export const NonInput: React.FC<CustomNonInputProps> = ({
  labelText,
  fieldLabelClass,
  className,
  children
}) => {
  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {labelText && (
        <FieldLabel className={cn(fieldLabelClass ? fieldLabelClass : defaultFieldLabelClass)}>
          {labelText}
        </FieldLabel>
      )}
      <div
        className={cn(
          defaultFieldDiv,
          'mt-1 rounded-md bg-slate-50 border-2 border-gray-200 h-12 p-2 pl-3 flex items-center'
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default NonInput;

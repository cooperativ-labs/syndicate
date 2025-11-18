import { cn } from '@src/lib/utils';
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { Calendar } from 'lucide-react';
import React from 'react';

export interface InputProps {
  name: string;
  required?: boolean;
}

export interface CustomDatepickerProps extends InputProps {
  labelText?: string;
  className: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  fieldHeight?: string;
  textArea?: boolean;
}

export const Datepicker: React.FC<CustomDatepickerProps> = ({
  labelText,
  name,
  required,
  className,
  fieldClass,
  fieldHeight,
  fieldLabelClass
}) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  return (
    <div className={cn(className, 'flex flex-col')}>
      {labelText && (
        <label
          htmlFor={name}
          className={cn(
            fieldLabelClass
              ? fieldLabelClass
              : 'text-sm text-blue-900 font-semibold text-opacity-80 '
          )}
        >
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Calendar
        // {...field}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none',
          fieldHeight
        )}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default Datepicker;

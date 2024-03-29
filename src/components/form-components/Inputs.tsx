import cn from 'classnames';
import React, { WheelEvent } from 'react';
import { ErrorMessage, Field } from 'formik';

export const defaultFieldLabelClass = 'text-sm text-blue-900 font-semibold text-opacity-80';
export const defaultFieldClass =
  'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none';
export const defaultFieldDiv = 'pt-3 bg-opacity-0';
export const addressFieldDiv = 'pt-2 my-2 bg-opacity-0';

export interface InputProps {
  id?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onBlur?: any;
  value?: string | number | boolean;
}

export interface CustomInputProps extends InputProps {
  labelText?: string;
  className?: string;
  fieldClass?: string;
  fieldLabelClass?: string;
  fieldHeight?: string;
  textArea?: boolean;
}

export const Input: React.FC<CustomInputProps> = ({
  id,
  labelText,
  name,
  type,
  textArea,
  placeholder,
  required,
  className,
  fieldClass,
  fieldHeight,
  fieldLabelClass,
  onBlur,
}) => {
  return (
    <div className={cn(className, 'flex flex-col w-full')}>
      {labelText && (
        <label htmlFor={name} className={cn(fieldLabelClass ? fieldLabelClass : defaultFieldLabelClass)}>
          {labelText}
          {required ? ' *' : ''}
        </label>
      )}
      <Field
        id={id}
        as={textArea && 'textarea'}
        name={name}
        type={type}
        placeholder={placeholder}
        className={cn(
          fieldClass
            ? fieldClass
            : 'text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none',
          fieldHeight
        )}
        required={required}
        onBlur={onBlur}
        onWheel={(e: WheelEvent<HTMLInputElement>) => {
          if (type === 'number') {
            const inputElement = e.target as HTMLElement;
            inputElement.blur();
          }
        }}
      />
      <ErrorMessage name={name} component="div" className="text-sm text-red-500" />
    </div>
  );
};

export default Input;

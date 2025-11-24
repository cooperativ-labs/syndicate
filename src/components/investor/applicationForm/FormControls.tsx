'use client';

import { Checkbox } from '@src/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle
} from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@src/components/ui/select';
import { Textarea } from '@src/components/ui/textarea';
import React from 'react';
import { Controller, type FieldPath, useFormContext } from 'react-hook-form';

import type { InvestorFormInputsType } from './InvestorApplicationForm';

type BaseFieldProps = {
  label: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  description?: React.ReactNode;
};

type TextFieldProps = BaseFieldProps & {
  name: FieldPath<InvestorFormInputsType>;
  type?: React.HTMLInputTypeAttribute;
  inputProps?: React.ComponentProps<typeof Input>;
};

export function TextField({
  name,
  label,
  placeholder,
  required,
  type = 'text',
  description,
  inputProps
}: TextFieldProps) {
  const { register } = useFormContext<InvestorFormInputsType>();

  return (
    <Field>
      <FieldLabel>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>
      <FieldContent>
        <Input
          type={type}
          placeholder={placeholder}
          required={required}
          {...inputProps}
          {...register(name)}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
}

type TextareaFieldProps = BaseFieldProps & {
  name: FieldPath<InvestorFormInputsType>;
  textareaProps?: React.ComponentProps<typeof Textarea>;
};

export function TextareaField({
  name,
  label,
  placeholder,
  required,
  description,
  textareaProps
}: TextareaFieldProps) {
  const { register } = useFormContext<InvestorFormInputsType>();

  return (
    <Field>
      <FieldLabel>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>
      <FieldContent>
        <Textarea
          placeholder={placeholder}
          required={required}
          {...textareaProps}
          {...register(name)}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
}

type CheckboxFieldProps = {
  name: FieldPath<InvestorFormInputsType>;
  label: React.ReactNode;
  description?: React.ReactNode;
  trueValue?: boolean | string;
  falseValue?: boolean | string;
  disabled?: boolean;
};

export function CheckboxField({
  name,
  label,
  description,
  trueValue = true,
  falseValue = false,
  disabled
}: CheckboxFieldProps) {
  const { control } = useFormContext<InvestorFormInputsType>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field orientation='horizontal' data-disabled={disabled}>
          <Checkbox
            disabled={disabled}
            checked={field.value === trueValue}
            onCheckedChange={checked => field.onChange(checked ? trueValue : falseValue)}
          />
          <FieldContent className='!ml-0'>
            <FieldTitle>{label}</FieldTitle>
            {description && <FieldDescription>{description}</FieldDescription>}
          </FieldContent>
        </Field>
      )}
    />
  );
}

type SelectFieldProps = BaseFieldProps & {
  name: FieldPath<InvestorFormInputsType>;
  options: Array<{ label: string; value: string }>;
  triggerClassName?: string;
};

export function SelectField({
  name,
  label,
  options,
  placeholder,
  required,
  description,
  triggerClassName
}: SelectFieldProps) {
  const { control } = useFormContext<InvestorFormInputsType>();

  return (
    <Field>
      <FieldLabel>
        {label}
        {required ? ' *' : ''}
      </FieldLabel>
      <FieldContent>
        <Controller
          name={name}
          control={control}
          rules={required ? { required: true } : undefined}
          render={({ field }) => (
            <Select value={field.value as string} onValueChange={field.onChange}>
              <SelectTrigger className={triggerClassName}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {description && <FieldDescription>{description}</FieldDescription>}
      </FieldContent>
    </Field>
  );
}

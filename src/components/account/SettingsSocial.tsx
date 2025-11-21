'use client';

import { addOrganizationSocialAccount } from '@src/utils/actions/organizationActions';
import { socialAccountOptions } from '@src/utils/enumConverters';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { LinkedAccountTypes, OrganizationComplete } from '@/types';

import { Button } from '../ui/button';
import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SettingsSocialProps = {
  organization: OrganizationComplete;
};

type SocialFormValues = {
  url: string;
  type: LinkedAccountTypes;
};

const SettingsUserSocial: FC<SettingsSocialProps> = ({ organization }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<SocialFormValues>({
    defaultValues: {
      url: '',
      type: undefined as unknown as LinkedAccountTypes
    }
  });

  const onSubmit = async (values: SocialFormValues) => {
    try {
      await addOrganizationSocialAccount({
        organizationId: organization.id,
        url: values.url,
        type: values.type
      });
      reset();
    } catch (error) {
      console.error('Failed to add social account', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-5 gap-3 relative">
      <Field className="col-span-2">
        <FieldLabel>Platform</FieldLabel>
        <FieldContent>
          <Controller
            name="type"
            control={control}
            rules={{ required: 'Please select a platform.' }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {socialAccountOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && <FieldError errors={[{ message: errors.type.message }]} />}
        </FieldContent>
      </Field>

      <Field className="col-span-2">
        <FieldLabel>URL</FieldLabel>
        <FieldContent>
          <Input
            {...register('url', { required: 'Please include a url.' })}
            type="url"
            placeholder="https://example.com"
          />
          {errors.url && <FieldError errors={[{ message: errors.url.message }]} />}
        </FieldContent>
      </Field>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
      >
        {isSubmitting ? 'Adding...' : 'Add'}
      </Button>
    </form>
  );
};

export default SettingsUserSocial;

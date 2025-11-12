import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet
} from '@src/components/ui/field';
import { Input } from '@src/components/ui/input';
import { updateProfile } from '@src/utils/actions/userActions';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Profile } from '@/types';

import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';

const profileSchema = z.object({
  name: z
    .string()
    .min(1, 'Please include your full name.')
    .regex(/^[a-z ,.'-]+$/i, 'Please only use valid characters'),
  image: z.string().nullable().optional()
});

type ProfileFormData = z.infer<typeof profileSchema>;

type SettingUserPersonalInfoProps = {
  profile: Profile;
};

const SettingUserPersonalInfo: FC<SettingUserPersonalInfoProps> = ({ profile }) => {
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name || '',
      image: profile.image || ''
    }
  });

  const onSubmit = async (values: ProfileFormData) => {
    await updateProfile({
      userId: profile.id,
      name: values.name,
      image: values.image || null
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
      <FieldGroup>
        <FieldLegend variant="label">Personal Information</FieldLegend>
        <FieldSet>
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Field>
                <FieldLabel>Full name *</FieldLabel>
                <Input type="text" placeholder="e.g. Moritz Zimmermann" {...field} />
                <FieldError
                  errors={form.formState.errors.name ? [form.formState.errors.name] : undefined}
                />
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="image"
            render={({ field }) => (
              <Field>
                <FieldLabel>Profile image</FieldLabel>
                <Input
                  type="text"
                  placeholder="e.g. https://source.com/your-picture"
                  {...field}
                  value={field.value || ''}
                />
                <FieldError
                  errors={form.formState.errors.image ? [form.formState.errors.image] : undefined}
                />
              </Field>
            )}
          />
        </FieldSet>
        <LoadingButton
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
          buttonState={buttonState}
          setButtonState={setButtonState}
          text="Save"
          loadingText="Saving"
          successText="Saved"
          errorText="Failed to save"
          reset
        />{' '}
      </FieldGroup>
    </form>
  );
};

export default SettingUserPersonalInfo;

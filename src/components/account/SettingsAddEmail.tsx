import { zodResolver } from '@hookform/resolvers/zod';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { handleAddEmailAddress } from '../notifications/notificationFunctions';
import { Field, FieldContent, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

const fieldDiv = 'md:pt-3 md:my-2 bg-opacity-0';

type SettingsAddEmailProps = {
  completionUrl: string;
};

const emailSchema = z.object({
  address: z.string().min(1, 'Please include an email address.').email('Invalid email address')
});

type EmailFormValues = z.infer<typeof emailSchema>;

const SettingsAddEmail: FC<SettingsAddEmailProps> = ({ completionUrl }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      address: ''
    }
  });

  const onSubmit = async (values: EmailFormValues) => {
    await handleAddEmailAddress(values.address, completionUrl);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid md:grid-cols-4 gap-4">
        <Field className={`${fieldDiv} w-full md:col-span-3`}>
          <FieldLabel htmlFor="settings-add-email">Address</FieldLabel>
          <FieldContent>
            <Input
              id="settings-add-email"
              placeholder="e.g moritz@bonuslife.com"
              type="email"
              aria-invalid={Boolean(errors.address)}
              {...register('address')}
            />
            <FieldError errors={errors.address ? [errors.address] : undefined} />
          </FieldContent>
        </Field>
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase my-8 rounded p-4"
      >
        Add Email
      </button>
    </form>
  );
};

export default SettingsAddEmail;

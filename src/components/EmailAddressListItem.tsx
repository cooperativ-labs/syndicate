import { cn } from '@src/lib/utils';
import {
  removeOrganizationEmail,
  updateOrganizationEmail
} from '@src/utils/actions/organizationActions';
import { Trash } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { EmailAddress } from '@/types';

import { EditButton, MarkPublic } from './form-components/ListItemButtons';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Field, FieldContent, FieldError, FieldLabel, FieldTitle } from './ui/field';
import { Input } from './ui/input';

type EmailAddressListItemProps = {
  email: EmailAddress;
  withEdit?: boolean;
};

const EmailAddressListItem: FC<EmailAddressListItemProps> = ({ email, withEdit }) => {
  const { name, address, description, is_public, organization_id } = email;
  const [editOn, setEditOn] = useState<boolean>(false);
  const organizationId = organization_id?.toString() || '';

  return (
    <div className={cn(withEdit && 'grid grid-cols-9 gap-3 items-center')}>
      <div className="p-3 border-2 rounded-lg col-span-8">
        <div className="md:w-auto ">
          <div className="text-large font-bold flex justify-between">
            {address}
            {withEdit && (
              <div className="flex justify-between">
                <div className="hidden md:flex">
                  <MarkPublic isPublic={is_public} />
                </div>
                <div className="ml-6 w-5">
                  <EditButton toggle={editOn} setToggle={setEditOn} />
                </div>
              </div>
            )}
          </div>
          {name && <div className="flex justify-between">{name}</div>}
          {withEdit && (
            <div className="md:hidden">
              <MarkPublic isPublic={is_public} />{' '}
            </div>
          )}
        </div>
        {description && <div className="mt-1 text-sm text-gray-700">{description}</div>}

        {editOn && (
          <div className="bg-cLightBlue bg-opacity-10 rounded-lg p-4 mt-6">
            <EmailEditForm
              email={email}
              organizationId={organizationId}
              onSave={() => setEditOn(false)}
              onCancel={() => setEditOn(false)}
            />
          </div>
        )}
      </div>
      {withEdit && (
        <div className="flex col-span-1 justify-center">
          <button
            aria-label="delete email address"
            onClick={async () => {
              if (confirm('Are you sure you want to delete this email address?')) {
                try {
                  await removeOrganizationEmail({
                    organizationId,
                    address
                  });
                  toast.success('Email address deleted');
                } catch (error: any) {
                  toast.error(`Failed to delete email: ${error.message}`);
                }
              }
            }}
          >
            <Trash className="text-lg text-gray-600 mr-2" />
          </button>
        </div>
      )}
    </div>
  );
};

type EmailEditFormProps = {
  email: EmailAddress;
  organizationId: string;
  onSave: () => void;
  onCancel: () => void;
};

const EmailEditForm: FC<EmailEditFormProps> = ({ email, organizationId, onSave, onCancel }) => {
  const { name, address, is_public } = email;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<{ name: string; isPublic: boolean }>({
    defaultValues: {
      name: name || '',
      isPublic: !!is_public
    }
  });

  const onSubmit = async (values: { name: string; isPublic: boolean }) => {
    try {
      await updateOrganizationEmail({
        organizationId,
        address,
        name: values.name || null,
        isPublic: values.isPublic
      });
      toast.success('Email address updated');
      onSave();
    } catch (error: any) {
      toast.error(`Failed to update email: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <div className="grid grid-cols-4 gap-3 md:gap-8 items-center">
        <Field className="col-span-3">
          <FieldLabel>Label</FieldLabel>
          <FieldContent>
            <Input {...register('name')} placeholder="e.g. Personal" />
            {errors.name && <FieldError errors={[{ message: errors.name.message }]} />}
          </FieldContent>
        </Field>

        <Field orientation="horizontal" className="col-span-1">
          <Controller
            name="isPublic"
            control={control}
            render={({ field }) => (
              <>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                <FieldContent className="ml-0!">
                  <FieldTitle>Public</FieldTitle>
                </FieldContent>
              </>
            )}
          />
        </Field>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-900 hover:bg-blue-800 text-white font-bold uppercase mt-4"
      >
        Save
      </Button>
    </form>
  );
};

export default EmailAddressListItem;

import { zodResolver } from '@hookform/resolvers/zod';
import { addTeamMember } from '@src/utils/actions/organizationActions';
import { organizationPermissionOptions } from '@src/utils/enumConverters';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { OrganizationPermissionType, OrganizationPermissionTypes } from '@/types';

import { Field, FieldContent, FieldError, FieldGroup } from '../ui/field';
import { Input } from '../ui/input';
import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

type SettingsAddTeamMemberProps = {
  organizationId: string;
};

const formSchema = z.object({
  emailAddress: z.email('Invalid email address'),
  permission: z.nativeEnum(OrganizationPermissionType)
});

type FormData = z.infer<typeof formSchema>;

const SettingsAddTeamMember: FC<SettingsAddTeamMemberProps> = ({ organizationId }) => {
  const [userDoesNotExist, setUserDoesNotExist] = React.useState(false);
  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: '',
      permission: OrganizationPermissionType.EDITOR
    }
  });

  const handleAddTeamMemberAddress = async (
    emailAddress: string,
    permission: OrganizationPermissionTypes
  ) => {
    setUserDoesNotExist(false);
    try {
      await addTeamMember({
        organizationId,
        emailAddress,
        permission
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (userDoesNotExist) {
      setError('emailAddress', { message: 'User does not exist' });
      return;
    }
    await handleAddTeamMemberAddress(data.emailAddress, data.permission);
  };

  return (
    <form className="flex flex-col">
      <FieldGroup>
        <div className="flex gap-2">
          <Field>
            <FieldContent>
              <Controller
                control={control}
                name="emailAddress"
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="e.g moritz@bonuslife.com"
                    aria-invalid={!!errors.emailAddress}
                  />
                )}
              />
              <FieldError errors={errors.emailAddress ? [errors.emailAddress] : undefined} />
            </FieldContent>
          </Field>
          <Field className="flex-1">
            <FieldContent>
              <Controller
                control={control}
                name="permission"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="--Role--" />
                    </SelectTrigger>
                    <SelectContent>
                      {organizationPermissionOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={errors.permission ? [errors.permission] : undefined} />
            </FieldContent>
          </Field>
        </div>

        <LoadingButton
          onClick={handleSubmit(onSubmit)}
          buttonState={buttonState}
          setButtonState={setButtonState}
          text="Add member"
          loadingText="Adding member..."
          successText="Member added!"
          errorText="Failed to add member"
          reset
        />
      </FieldGroup>
    </form>
  );
};

export default SettingsAddTeamMember;

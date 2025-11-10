import { addNotificationRule } from '@src/utils/actions/userActions';
import { notificationSubjectOptions } from '@src/utils/enumConverters';
import { useParams } from 'next/navigation';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

import {
  NotificationMethod,
  NotificationRecipientType,
  NotificationSubject,
  NotificationSubjectTypes
} from '@/types';

const fieldDiv = 'md:my-2 bg-opacity-0';

type SettingsAddNotificationProps = {
  organizationUserId: string | undefined;
};

const SettingsAddNotification: FC<SettingsAddNotificationProps> = ({ organizationUserId }) => {
  const params = useParams<{ organizationId: string }>();
  const organization_id = params?.organizationId;

  if (!organization_id) {
    throw new Error('Organization not found');
  }
  const handleAddNotificationRule = async (notificationSubject: NotificationSubjectTypes) => {
    try {
      await addNotificationRule({
        organizationId: organization_id,
        organizationUserId: organizationUserId ?? '',
        notificationMethod: NotificationMethod.EMAIL,
        notificationRecipientType: NotificationRecipientType.MANAGER,
        notificationSubject: notificationSubject
      });
    } catch (error: any) {
      throw new Error(`Error adding notification rule: ${error}`);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<{ notificationSubject: NotificationSubjectTypes }>({
    defaultValues: {
      notificationSubject: '' as NotificationSubjectTypes
    }
  });

  const onSubmit = async (values: { notificationSubject: NotificationSubjectTypes }) => {
    await handleAddNotificationRule(values.notificationSubject);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <select
          {...register('notificationSubject', {
            required: 'Please include a notification subject.'
          })}
          className={`${fieldDiv} col-span-2 text-sm bg-opacity-0 my-1 p-3 border-2 border-gray-200 rounded-md focus:border-blue-900 focus:outline-none`}
        >
          <option value="">--Subject--</option>
          {notificationSubjectOptions.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            );
          })}
        </select>
        {errors.notificationSubject && (
          <div className="text-sm text-red-500">{errors.notificationSubject.message}</div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-blue-900 hover:bg-blue-800 hover:text-white border-2 border-blue-900 text-sm font-bold uppercase my-0 rounded p-2"
      >
        Set Notification
      </button>
    </form>
  );
};

export default SettingsAddNotification;

import Input from '../form-components/Inputs';
import React, { FC } from 'react';
import Select from '../form-components/Select';
import { ADD_NOTIFICATION_RULE } from '@src/utils/dGraphQueries/organization';
import { Form, Formik } from 'formik';
import { NotificationMethod, NotificationRecipientType, NotificationSubject } from 'types';
import { notificationSubjectOptions } from '@src/utils/enumConverters';

import { useMutation } from '@apollo/client';

const fieldDiv = 'md:my-2 bg-opacity-0';

type SettingsAddNotificationProps = {
  organizationUserId: string | undefined;
};

const SettingsAddNotification: FC<SettingsAddNotificationProps> = ({ organizationUserId }) => {
  const [addNotification, { data, error }] = useMutation(ADD_NOTIFICATION_RULE);

  const handleAddNotificationRule = async (notificationSubject: NotificationSubject) => {
    try {
      await addNotification({
        variables: {
          organizationUserId: organizationUserId,
          NotificationMethod: NotificationMethod.Email,
          notificationRecipientType: NotificationRecipientType.Manager,
          notificationSubject: notificationSubject,
        },
      }).catch((error) => {
        throw new Error(error);
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        notificationSubject: '' as NotificationSubject,
      }}
      validate={async (values) => {
        const errors: any = {}; /** @TODO : Shape */

        if (!values.notificationSubject) {
          errors.notificationSubject = 'Please include a notification subject.';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await handleAddNotificationRule(values.notificationSubject);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col ">
          <div className="flex">
            <Select className={`${fieldDiv} col-span-2`} name="notificationSubject">
              <option value="">--Subject--</option>
              {notificationSubjectOptions.map((option) => {
                return (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                );
              })}
            </Select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="text-blue-900 hover:bg-blue-800 hover:text-white border-2 border-blue-900 text-sm font-bold uppercase my-0 rounded p-2"
          >
            Set Notification
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsAddNotification;

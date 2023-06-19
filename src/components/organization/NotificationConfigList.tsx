import React, { FC } from 'react';

import { useMutation } from '@apollo/client';

import { Maybe, NotificationConfiguration, OrganizationUser } from 'types';

import NotificationConfigItem, { NotificationConfigItemBaseProps } from './NotificationConfigItem';
import { REMOVE_NOTIFICATION_RULE } from '@src/utils/dGraphQueries/organization';

type NotificationConfigListProps = {
  organizationUser: Maybe<OrganizationUser> | undefined;
};

const NotificationConfigList: FC<NotificationConfigListProps> = ({ organizationUser }) => {
  const [removeNotification, { data: dataRemove, error: deleteError }] = useMutation(REMOVE_NOTIFICATION_RULE);

  if (deleteError) {
    throw new Error(deleteError.message);
  }

  const { notificationConfigurations, id } = organizationUser as OrganizationUser;
  return (
    <div className="w-full">
      {notificationConfigurations?.map((config, i) => {
        return (
          <div className="mb-3 gap-2" key={i}>
            <NotificationConfigItem
              notificationConfig={config}
              removeNotification={removeNotification}
              organizationUserId={id}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NotificationConfigList;

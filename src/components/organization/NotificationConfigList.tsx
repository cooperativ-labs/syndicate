import { FC } from 'react';

import { NotificationConfiguration, OrganizationUser } from '@/types';

import NotificationConfigItem from './NotificationConfigItem';

type NotificationConfigListProps = {
  organizationUser:
    | (OrganizationUser & { notificationConfigurations: NotificationConfiguration[] })
    | null;
};

const NotificationConfigList: FC<NotificationConfigListProps> = ({ organizationUser }) => {
  if (!organizationUser) return null;
  return (
    <div className="w-full">
      {organizationUser.notificationConfigurations.map(notificationConfig => (
        <NotificationConfigItem
          key={notificationConfig.id}
          notificationConfig={notificationConfig}
        />
      ))}
    </div>
  );
};

export default NotificationConfigList;

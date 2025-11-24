import { removeNotificationRule } from '@src/utils/actions/userActions';
import { getNotificationSubjectOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { useParams } from 'next/navigation';
import React, { FC, useState } from 'react';

import { NotificationConfiguration } from '@/types';

import { EditButton } from '../form-components/ListItemButtons';

type NotificationConfigItemProps = {
  notificationConfig: NotificationConfiguration;
};

const NotificationConfigItem: FC<NotificationConfigItemProps> = ({ notificationConfig }) => {
  const [editOn, setEditOn] = useState<boolean>(false);
  const { id, notification_subject } = notificationConfig as NotificationConfiguration;
  const params = useParams<{ organizationId: string }>();
  const organizationId = params.organizationId as string;

  const handleRemoveNotification = async ({
    notificationRuleId
  }: {
    notificationRuleId: string;
  }) => {
    try {
      const response = await removeNotificationRule({
        organizationId,
        notificationRuleId: id
      });
      return response;
    } catch (error: any) {
      throw new Error('Error removing notification rule:', error);
    }
  };

  return (
    <div className='md:flex lg:grid grid-cols-8 gap-1 p-3  border-2 rounded-lg items-center '>
      <div className='flex col-span-7 mt-3 md:mt-0 items-center'>
        {getNotificationSubjectOption(notification_subject)?.name}
      </div>

      <div className=' md:mt-0 flex col-span-1 justify-end min-w-max'>
        <div className='flex'>
          <EditButton toggle={editOn} setToggle={setEditOn} />
        </div>
      </div>
      {editOn && (
        <div className='col-span-6 flex w-full'>
          <button
            className='border-2 border-red-900 hover:bg-red-800 text-red-900 hover:text-white font-bold text-xs  uppercase mt-2 md:mt-0 md:ml-2 p-1 px-2 rounded-lg w-full whitespace-nowrap '
            aria-label='remove wallet from whitelist'
            onClick={() =>
              handleRemoveNotification({
                notificationRuleId: id
              })
            }
          >
            Remove notification
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationConfigItem;

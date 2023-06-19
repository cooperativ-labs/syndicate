import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { EditButton } from '../form-components/ListItemButtons';
import { getNotificationSubjectOption } from '@src/utils/enumConverters';
import { Maybe, NotificationConfiguration } from 'types';
import { useSession } from 'next-auth/react';

export type NotificationConfigItemBaseProps = {
  organizationUserId: Maybe<string> | undefined;
};

type NotificationConfigItemProps = NotificationConfigItemBaseProps & {
  notificationConfig: Maybe<NotificationConfiguration>;
  removeNotification: (variables: any) => void;
};

const NotificationConfigItem: FC<NotificationConfigItemProps> = ({
  notificationConfig,
  organizationUserId,

  removeNotification,
}) => {
  const { data: session } = useSession();

  const [editOn, setEditOn] = useState<boolean>(false);
  const { id, emailAddress, notificationRecipientType, notificationMethod, notificationSubject } =
    notificationConfig as NotificationConfiguration;

  return (
    <div className="md:flex lg:grid grid-cols-8 gap-1 p-3  border-2 rounded-lg items-center ">
      <div className="flex col-span-7 mt-3 md:mt-0 items-center">
        {getNotificationSubjectOption(notificationSubject)?.name}
      </div>

      {true && (
        <div className=" md:mt-0 flex col-span-1 justify-end min-w-max">
          <div className="flex">
            <EditButton toggle={editOn} setToggle={setEditOn} />
          </div>
        </div>
      )}
      {editOn && (
        <div className="col-span-6 flex w-full">
          {true && (
            <button
              className="border-2 border-red-900 hover:bg-red-800 text-red-900 hover:text-white font-bold text-xs  uppercase mt-2 md:mt-0 md:ml-2 p-1 px-2 rounded-lg w-full whitespace-nowrap "
              aria-label="remove wallet from whitelist"
              onClick={() =>
                removeNotification({
                  variables: {
                    organizationUserId: organizationUserId,
                    notificationConfigurationId: id,
                    currentDate: currentDate,
                  },
                })
              }
            >
              Remove notification
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationConfigItem;

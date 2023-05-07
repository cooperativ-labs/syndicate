import React, { FC, useState } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { LinkedAccount } from 'types';

import { REMOVE_ORGANIZATION_SOCIAL_ACCOUNT } from '@src/utils/dGraphQueries/organization';
import { useMutation } from '@apollo/client';

type LinkedAccountListProps = {
  account: LinkedAccount;
  isOrganizationManager?: boolean;
};

const LinkedAccountListItem: FC<LinkedAccountListProps> = ({ account, isOrganizationManager }) => {
  const { organization, id, url, type, hidden, verified } = account;
  const [alerted, setAlerted] = useState<Boolean>(false);
  const [deleteSocial, { error }] = useMutation(REMOVE_ORGANIZATION_SOCIAL_ACCOUNT);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">{getSocialAccountOption(type).name}</div> <div className="col-span-1">{url}</div>
      {isOrganizationManager && (
        <button
          onClick={() => {
            deleteSocial({
              variables: { currentDate: currentDate, organizationId: organization.id, id: id, socialId: id },
            });
          }}
        >
          <FontAwesomeIcon icon="times" />
        </button>
      )}
    </div>
  );
};

export default LinkedAccountListItem;

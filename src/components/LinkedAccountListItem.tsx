import { useMutation } from '@apollo/client/react';
import { LinkedAccount, Maybe } from '@gql/graphql';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { REMOVE_ORGANIZATION_SOCIAL_ACCOUNT } from '@src/utils/graphQueries/organization';
import { X } from 'lucide-react';
import React, { FC, useState } from 'react';

type LinkedAccountListProps = {
  account: Maybe<LinkedAccount>;
  isOrganizationManager?: boolean | undefined;
};

const LinkedAccountListItem: FC<LinkedAccountListProps> = ({ account, isOrganizationManager }) => {
  const { organization, id, url, type, hidden, verified } = account as LinkedAccount;
  const [alerted, setAlerted] = useState<boolean>(false);
  const [deleteSocial, { error }] = useMutation(REMOVE_ORGANIZATION_SOCIAL_ACCOUNT);

  if (error && !alerted) {
    alert('Oops. Looks like something went wrong');
    setAlerted(true);
  }

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">{getSocialAccountOption(type)?.name}</div>{' '}
      <div className="col-span-1">{url}</div>
      {isOrganizationManager && (
        <button
          onClick={() => {
            deleteSocial({
              variables: {
                currentDate: currentDate,
                organizationId: organization.id,
                id: id,
                socialId: id
              }
            });
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default LinkedAccountListItem;

import { removeLinkedAccount } from '@src/utils/actions/organizationActions';
import { getSocialAccountOption } from '@src/utils/enumConverters';
import { X } from 'lucide-react';
import React, { FC, useState } from 'react';

import { LinkedAccount } from '@/types';

type LinkedAccountListProps = {
  account: LinkedAccount;
  isOrganizationManager?: boolean | undefined;
};

const LinkedAccountListItem: FC<LinkedAccountListProps> = ({ account, isOrganizationManager }) => {
  const { organization_id, id, url, type, hidden, verified } = account as LinkedAccount;

  const handleDelete = async () => {
    try {
      const response = await removeLinkedAccount({
        organizationId: organization_id,
        linkedAccountId: id
      });
      return response;
    } catch (error: any) {
      throw new Error('Error deleting linked account:', error);
    }
  };

  return (
    <div className="grid grid-cols-3">
      <div className="col-span-1">{getSocialAccountOption(type)?.name}</div>{' '}
      <div className="col-span-1">{url}</div>
      {isOrganizationManager && (
        <button
          onClick={() => {
            handleDelete();
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default LinkedAccountListItem;

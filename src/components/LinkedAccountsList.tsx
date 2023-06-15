import LinkedAccountListItem from './LinkedAccountListItem';
import React, { FC } from 'react';
import { LinkedAccount, Maybe } from 'types';

type LinkedAccountsListProps = {
  linkedAccounts: Maybe<Maybe<LinkedAccount>[]> | undefined;
  isOrganizationManager?: boolean | undefined;
};

const LinkedAccountsList: FC<LinkedAccountsListProps> = ({ linkedAccounts, isOrganizationManager }) => {
  const isAccounts = linkedAccounts?.length && linkedAccounts.length > 0;
  return (
    <div className="w-full">
      {linkedAccounts?.map((account, i) => {
        return (
          <div className="mb-3" key={i}>
            <LinkedAccountListItem account={account} isOrganizationManager={isOrganizationManager} />
          </div>
        );
      })}
      {isAccounts && <hr className="mt-6 mb-8 md:mb-4" />}
    </div>
  );
};

export default LinkedAccountsList;

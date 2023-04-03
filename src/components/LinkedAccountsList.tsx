import LinkedAccountListItem from './LinkedAccountListItem';
import React, { FC } from 'react';
import { LinkedAccount } from 'types';

type LinkedAccountsListProps = {
  linkedAccounts: LinkedAccount[];
};

const LinkedAccountsList: FC<LinkedAccountsListProps> = ({ linkedAccounts }) => {
  return (
    <div className="w-full">
      {linkedAccounts.map((account, i) => {
        return (
          <div className="mb-3" key={i}>
            <LinkedAccountListItem account={account} />
          </div>
        );
      })}
      {linkedAccounts.length > 0 && <hr className="mt-6 mb-8 md:mb-4" />}
    </div>
  );
};

export default LinkedAccountsList;

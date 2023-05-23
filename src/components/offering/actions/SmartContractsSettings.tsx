import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';
import { Currency, Offering, User } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

import NewClassForm from './NewClassForm';

type SmartContractsSettingsProps = {
  user: User;
  offering: Offering;
  chainId: number;
  partitions: String0x[];
  shareContractId: string;
  shareContractAddress: String0x;
  swapContractAddress: String0x;
  investmentCurrency: Currency;
};

const SmartContractsSettings: FC<SmartContractsSettingsProps> = ({
  user,
  offering,
  chainId,
  partitions,
  shareContractId,
  shareContractAddress,
  swapContractAddress,
  investmentCurrency,
}) => {
  return (
    <>
      {!shareContractAddress ? (
        user && <LinkLegal user={user} offering={offering} />
      ) : (
        <div className="flex items-center">
          1. Share contract:{' '}
          <FormattedCryptoAddress
            chainId={chainId}
            className="text-base font-medium ml-2"
            showFull
            withCopy
            address={shareContractAddress}
          />{' '}
        </div>
      )}
      <hr className="my-4" />
      {shareContractAddress && !swapContractAddress ? (
        <CreateSwapContract
          shareContractAddress={shareContractAddress}
          onContractCreated={() => {}}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offering.offeringEntity.id}
          offeringId={offering.id}
        />
      ) : (
        <div className="flex items-center">
          2. Swap contract:{' '}
          <FormattedCryptoAddress
            chainId={chainId}
            className="text-base font-medium ml-2"
            showFull
            withCopy
            address={swapContractAddress}
          />{' '}
        </div>
      )}
      <hr className="my-4" />
      3. Share classes:
      {partitions?.map((partition) => (
        <div key={partition} className="flex items-center">
          {stringFromBytes32(partition)}
        </div>
      ))}
      {shareContractAddress && <NewClassForm shareContractId={shareContractId} />}
    </>
  );
};

export default SmartContractsSettings;

import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';
import { Currency, Offering, OfferingSmartContractSet, User } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

import NewClassForm from './NewClassForm';

type SmartContractsSettingsProps = {
  user: User;
  offering: Offering;
  contractSet: OfferingSmartContractSet;
  chainId: number;
  partitions: String0x[];
  investmentCurrency: Currency;
};

const SmartContractsSettings: FC<SmartContractsSettingsProps> = ({
  user,
  offering,
  chainId,
  contractSet,
  partitions,
  investmentCurrency,
}) => {
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress?.address as String0x;
  const shareContract = contractSet?.shareContract;

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
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offering.offeringEntity.id}
          offeringDetailsId={offering.details.id}
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
      {shareContractAddress && <NewClassForm shareContractId={shareContract.id} />}
    </>
  );
};

export default SmartContractsSettings;

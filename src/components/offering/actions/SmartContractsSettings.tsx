import CreateSwapContract from '../CreateSwapContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { User } from 'types';

import NewClassForm from './NewClassForm';
import SwapContractSettings, { SwapContractSettingsProps } from './SwapContractSettings';

export type SmartContractsSettingsProps = SwapContractSettingsProps & {
  partitions: String0x[];
};

const SmartContractsSettings: FC<SmartContractsSettingsProps & { user: User }> = ({
  user,
  offering,
  chainId,
  contractSet,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  partitions,
  investmentCurrency,
  refetchMainContracts,
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
      <hr className="my-5" />
      <SwapContractSettings
        refetchMainContracts={refetchMainContracts}
        swapApprovalsEnabled={swapApprovalsEnabled}
        txnApprovalsEnabled={txnApprovalsEnabled}
        contractSet={contractSet}
        investmentCurrency={investmentCurrency}
        offering={offering}
        chainId={chainId}
      />
      <hr className="my-5" />
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

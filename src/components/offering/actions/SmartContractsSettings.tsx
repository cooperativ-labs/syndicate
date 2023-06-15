import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { Currency, User } from 'types';

import DistributionContractSettings from './DistributionContractSettings';
import NewClassForm from './NewClassForm';
import SwapContractSettings, {
  SwapContractSettingsProps,
  SwapContractsSettingsAdditional,
} from './SwapContractSettings';
import { useChainId } from 'wagmi';

export type SmartContractsSettingsProps = SwapContractSettingsProps & {
  partitions: String0x[];
};

type SmartContractsSettingsAdditional = SmartContractsSettingsProps &
  SwapContractsSettingsAdditional & {
    user: User;
  };

const SmartContractsSettings: FC<SmartContractsSettingsAdditional> = ({
  user,
  offering,
  contractSet,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  partitions,
  investmentCurrency,
  refetchMainContracts,
}) => {
  const chainId = useChainId();
  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress?.address as String0x;
  return (
    <>
      {!shareContract ? (
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
      <DistributionContractSettings
        investmentCurrency={investmentCurrency}
        offering={offering}
        contractSet={contractSet}
        chainId={chainId}
      />
      <hr className="my-5" />
      4. Share classes:
      {partitions?.map((partition) => (
        <div key={partition} className="flex items-center">
          {stringFromBytes32(partition)}
        </div>
      ))}
      {shareContractAddress && shareContract && <NewClassForm shareContractId={shareContract.id} />}
    </>
  );
};

export default SmartContractsSettings;

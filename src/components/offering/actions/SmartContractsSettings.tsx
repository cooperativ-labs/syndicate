import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';
import { Currency, User } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';

import DistributionContractSettings from './DistributionContractSettings';
import NewClassForm from './NewClassForm';
import ShareContractSettings from './ShareContractSettings';
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
  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress?.address as String0x;
  return (
    <>
      <ShareContractSettings user={user} offering={offering} shareContract={shareContract} partitions={partitions} />

      <hr className="my-5" />
      <SwapContractSettings
        refetchMainContracts={refetchMainContracts}
        swapApprovalsEnabled={swapApprovalsEnabled}
        txnApprovalsEnabled={txnApprovalsEnabled}
        contractSet={contractSet}
        investmentCurrency={investmentCurrency}
        offering={offering}
      />
      <hr className="my-5" />
      <DistributionContractSettings
        investmentCurrency={investmentCurrency}
        offering={offering}
        contractSet={contractSet}
      />
    </>
  );
};

export default SmartContractsSettings;

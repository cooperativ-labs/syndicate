import React, { FC } from 'react';

import DistributionContractSettings from './DistributionContractSettings';
import ShareContractSettings from './ShareContractSettings';
import SwapContractSettings from './SwapContractSettings';
import { SmartContractsSettingsProps } from '@src/components/investor/tradingForms/offering-actions-types';

const SmartContractsSettings: FC<SmartContractsSettingsProps> = ({
  offering,
  contractSet,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  partitions,
  investmentCurrency,
  noLiveOrders,
  refetchMainContracts
}) => {
  const shareContract = contractSet?.shareContract;

  return (
    <>
      <ShareContractSettings
        offering={offering}
        shareContract={shareContract}
        partitions={partitions}
      />
      <hr className="my-5" />
      <SwapContractSettings
        refetchMainContracts={refetchMainContracts}
        swapApprovalsEnabled={swapApprovalsEnabled}
        txnApprovalsEnabled={txnApprovalsEnabled}
        contractSet={contractSet}
        investmentCurrency={investmentCurrency}
        offering={offering}
        noLiveOrders={noLiveOrders}
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

import { SmartContractsSettingsProps } from '@src/components/investor/tradingForms/offering-actions-types';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';

import { OfferingFull } from '@/types';

import DistributionContractSettings from './DistributionContractSettings';
import ShareContractSettings from './ShareContractSettings';
import SwapContractSettings from './SwapContractSettings';

const SmartContractsSettings: FC<SmartContractsSettingsProps> = ({
  contractSet,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  partitions,
  investmentCurrency,
  noLiveOrders,
  refetchMainContracts,
  offering
}) => {
  const shareContract = contractSet?.shareContract;

  if (!shareContract?.established) {
    return <LinkLegal offering={offering} shareContracts={shareContract ? [shareContract] : []} />;
  }

  return (
    <>
      <ShareContractSettings shareContract={shareContract} partitions={partitions} />
      <hr className='my-5' />
      <SwapContractSettings
        refetchMainContracts={refetchMainContracts}
        swapApprovalsEnabled={swapApprovalsEnabled}
        txnApprovalsEnabled={txnApprovalsEnabled}
        contractSet={contractSet}
        investmentCurrency={investmentCurrency}
        noLiveOrders={noLiveOrders}
      />
      <hr className='my-5' />
      <DistributionContractSettings
        investmentCurrency={investmentCurrency}
        contractSet={contractSet}
      />
    </>
  );
};

export default SmartContractsSettings;

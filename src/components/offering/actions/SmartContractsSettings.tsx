import { SmartContractsSettingsProps } from '@src/components/investor/tradingForms/offering-actions-types';
import React, { FC } from 'react';

import DistributionContractSettings from './DistributionContractSettings';
import ShareContractSettings from './ShareContractSettings';
import SwapContractSettings from './SwapContractSettings';
import { OfferingFull } from '@/types';

const SmartContractsSettings: FC<SmartContractsSettingsProps & { offering: OfferingFull }> = ({
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

  return (
    <>
      <ShareContractSettings
        shareContract={shareContract}
        partitions={partitions}
        offering={offering}
      />
      {shareContract && (
        <>
          <hr className="my-5" />
          <SwapContractSettings
            refetchMainContracts={refetchMainContracts}
            swapApprovalsEnabled={swapApprovalsEnabled}
            txnApprovalsEnabled={txnApprovalsEnabled}
            contractSet={contractSet}
            investmentCurrency={investmentCurrency}
            noLiveOrders={noLiveOrders}
          />
          <hr className="my-5" />
          <DistributionContractSettings
            investmentCurrency={investmentCurrency}
            contractSet={contractSet}
          />
        </>
      )}
    </>
  );
};

export default SmartContractsSettings;

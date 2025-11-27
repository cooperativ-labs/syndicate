import { useOffering } from '@contexts/OfferingContext';
import { SmartContractsSettingsProps } from '@src/components/investor/tradingForms/offering-actions-types';
import LinkLegal from '@src/components/legal/LinkLegal';
import React, { FC } from 'react';

import DistributionContractSettings from './DistributionContractSettings';
import ShareContractSettings from './ShareContractSettings';
import SwapContractSettings from './SwapContractSettings';

const SmartContractsSettings: FC<SmartContractsSettingsProps> = () => {
  const { offering, contractSet, partitions } = useOffering();

  const shareContract = contractSet?.shareContract;

  if (!shareContract?.established) {
    return <LinkLegal offering={offering} shareContracts={shareContract ? [shareContract] : []} />;
  }

  return (
    <>
      <ShareContractSettings shareContract={shareContract} partitions={partitions} />
      <hr className='my-5' />
      <SwapContractSettings />
      <hr className='my-5' />
      <DistributionContractSettings />
    </>
  );
};

export default SmartContractsSettings;

import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { String0x } from '@src/web3/helpersChain';
import React, { FC } from 'react';
import { useChainId } from 'wagmi';

import { CurrencyCodeType, OfferingSmartContractSet } from '@/types';
import { useOffering } from '@contexts/OfferingContext';

import CreateDistributionContract from '../CreateDistributionContract';

export type DistributionContractSettingsProps = {
  contractSet: OfferingSmartContractSet | null;
  investmentCurrency: CurrencyCodeType | null | undefined;
};

const DistributionContractSettings: FC<DistributionContractSettingsProps> = ({
  contractSet,
  investmentCurrency
}) => {
  const chainId = useChainId();
  const { legalEntity } = useOffering();
  const shareContract = contractSet?.shareContract;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress
    ?.address as String0x;

  if (!contractSet || !investmentCurrency) {
    return null;
  }

  return (
    <>
      {shareContract && !distributionContractAddress ? (
        <CreateDistributionContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={legalEntity?.id.toString()}
        />
      ) : (
        <div className="flex items-center">
          <div className="font-semibold">Distribution contract: </div>
          <FormattedCryptoAddress
            chainId={chainId}
            className="text-base font-medium ml-2"
            showFull
            withCopy
            address={distributionContractAddress}
          />
        </div>
      )}
    </>
  );
};

export default DistributionContractSettings;

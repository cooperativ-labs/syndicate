import CreateDistributionContract from '../CreateDistributionContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { Currency, Offering, OfferingSmartContractSet } from 'types';
import { String0x } from '@src/web3/helpersChain';

export type DistributionContractSettingsProps = {
  contractSet: OfferingSmartContractSet;
  investmentCurrency: Currency;
  offering: Offering;
  chainId: number;
};

const DistributionContractSettings: FC<DistributionContractSettingsProps> = ({
  contractSet,
  investmentCurrency,
  offering,
  chainId,
}) => {
  const shareContract = contractSet?.shareContract;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress?.address as String0x;

  return (
    <>
      {shareContract && !distributionContractAddress ? (
        <CreateDistributionContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offering.offeringEntity.id}
        />
      ) : (
        <div className="flex items-center">
          3. Distribution contract:{' '}
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

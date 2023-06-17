import CreateDistributionContract from '../CreateDistributionContract';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { Currency, Maybe, Offering, OfferingSmartContractSet } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

export type DistributionContractSettingsProps = {
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  investmentCurrency: Currency | null | undefined;
  offering: Offering;
};

const DistributionContractSettings: FC<DistributionContractSettingsProps> = ({
  contractSet,
  investmentCurrency,
  offering,
}) => {
  const chainId = useChainId();
  const shareContract = contractSet?.shareContract;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress?.address as String0x;

  return (
    <>
      {shareContract && !distributionContractAddress ? (
        <CreateDistributionContract
          contractSet={contractSet}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offering.offeringEntity?.id}
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

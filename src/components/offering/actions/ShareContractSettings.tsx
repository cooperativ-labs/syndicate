import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import SectionBlock from '@src/containers/SectionBlock';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import React, { FC } from 'react';
import { useChainId } from 'wagmi';

import { OfferingFull, SmartContractWithCryptoAddress } from '@/types';

import NewClassForm from './NewClassForm';

type ShareContractSettingsLocal = {
  shareContract: SmartContractWithCryptoAddress;
  offering: OfferingFull;
  partitions: String0x[];
};

const ShareContractSettings: FC<ShareContractSettingsLocal> = ({
  offering,
  shareContract,
  partitions
}) => {
  const chainId = useChainId();

  if (!shareContract?.established) {
    return <LinkLegal offering={offering} shareContracts={shareContract ? [shareContract] : []} />;
  }

  const shareContractAddress = shareContract?.crypto_address_id as String0x;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-lg">Share contract:</h1>
        <FormattedCryptoAddress
          chainId={chainId}
          className="text-sm text-gray-500 font-medium"
          showFull
          withCopy
          address={shareContractAddress}
        />
      </div>

      <SectionBlock
        className="border rounded-lg p-3"
        sectionTitle={'Share classes'}
        mini
        asAccordion
      >
        {partitions?.map(partition => (
          <div key={partition} className="flex items-center">
            - {stringFromBytes32(partition)} (
            <FormattedCryptoAddress address={partition} chainId={chainId} label="id: " withCopy />)
          </div>
        ))}
        {partitions?.length > 0 && <hr className="my-3" />}
        <NewClassForm shareContractId={shareContract.id} />
      </SectionBlock>
    </div>
  );
};

export default ShareContractSettings;

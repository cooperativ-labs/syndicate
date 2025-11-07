import { useUserContext } from '@contexts/UserContext';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import SectionBlock from '@src/containers/SectionBlock';
import { addressWithoutEns, String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import React, { FC } from 'react';
import { useChainId } from 'wagmi';

import { OfferingFull, Profile, SmartContract } from '@/types';

import NewClassForm from './NewClassForm';

export type ShareContractSettingsProps = {
  partitions: String0x[];
};

type ShareContractSettingsLocal = ShareContractSettingsProps & {
  shareContract: SmartContract | undefined;
  offering: OfferingFull;
};

const ShareContractSettings: FC<ShareContractSettingsLocal> = ({
  offering,
  shareContract,
  partitions
}) => {
  const chainId = useChainId();
  const { user } = useUserContext();

  if (!shareContract) {
    return <LinkLegal user={user} offering={offering} />;
  }

  const shareContractAddress = shareContract?.crypto_address_id as String0x;
  return (
    <div className="flex-col ">
      <div className="flex items-center">
        <div className="font-semibold">Share contract: </div>
        <FormattedCryptoAddress
          chainId={chainId}
          className="text-base font-medium ml-2"
          showFull
          withCopy
          address={shareContractAddress}
        />
      </div>

      <div className="mt-4 border-2 rounded-md px-2">
        <SectionBlock className="" sectionTitle={'Share classes'} mini asAccordion>
          {partitions?.map(partition => (
            <div key={partition} className="flex items-center">
              - {stringFromBytes32(partition)} (
              <FormattedCryptoAddress address={partition} chainId={chainId} label="id: " withCopy />
              )
            </div>
          ))}
          <NewClassForm shareContractId={shareContract.id} />
        </SectionBlock>
      </div>
    </div>
  );
};

export default ShareContractSettings;

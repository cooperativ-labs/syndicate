import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import LinkLegal from '@src/components/legal/LinkLegal';
import NewClassForm from './NewClassForm';
import React, { FC } from 'react';
import SectionBlock from '@src/containers/SectionBlock';
import { Maybe, Offering, SmartContract, User } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { useChainId } from 'wagmi';

export type ShareContractSettingsProps = {
  partitions: String0x[];
};

type ShareContractSettingsLocal = ShareContractSettingsProps & {
  shareContract: Maybe<SmartContract> | undefined;
  offering: Offering;
  user: User;
};

const ShareContractSettings: FC<ShareContractSettingsLocal> = ({ user, offering, shareContract, partitions }) => {
  const chainId = useChainId();

  if (!shareContract) {
    return <LinkLegal user={user} offering={offering} />;
  }

  const shareContractAddress = shareContract?.cryptoAddress?.address as String0x;
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
          {partitions?.map((partition) => (
            <div key={partition} className="flex items-center">
              - {stringFromBytes32(partition)}
            </div>
          ))}
          <NewClassForm shareContractId={shareContract.id} />
        </SectionBlock>
      </div>
    </div>
  );
};

export default ShareContractSettings;

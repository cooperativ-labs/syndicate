import { cn } from '@src/lib/utils';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { shareContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import React, { FC, useEffect } from 'react';
import { useAccount, useReadContracts } from 'wagmi';
import { EnrichedOfferingParticipant } from '@/types';

import FormattedCryptoAddress from '../../FormattedCryptoAddress';

type WhitelistAddressListItemProps = {
  participant: EnrichedOfferingParticipant;
  shareContractAddress: String0x;
  setSelectedParticipant: (participantId: string) => void;
  investorListRefreshTrigger: number;
};

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({
  participant,
  shareContractAddress,
  investorListRefreshTrigger,
  setSelectedParticipant
}) => {
  const { address: userWalletAddress } = useAccount();

  const sharedContractBits = {
    address: shareContractAddress,
    abi: shareContractABI
  };

  const { data, isLoading, refetch } = useReadContracts({
    contracts: [
      {
        ...sharedContractBits,
        functionName: 'balanceOf',
        args: [participant?.wallet_address as String0x]
      },
      {
        ...sharedContractBits,
        functionName: 'isWhitelisted',
        args: [participant?.wallet_address as String0x]
      }
    ]
  });

  useEffect(() => {
    if (investorListRefreshTrigger) {
      refetch();
    }
  }, [participant?.wallet_address, investorListRefreshTrigger, refetch]);

  const balance = data?.[0].result as bigint;
  const isWhitelisted = data?.[1].result;

  const isYou = participant?.wallet_address === userWalletAddress;
  const numShares = data ? toNormalNumber(balance, shareContractDecimals) : 0;

  if (!participant) {
    return <></>;
  }

  return (
    <div
      className={cn(
        isYou && 'bg-gray-100',
        'relative md:grid grid-cols-11 gap-3 items-center  p-3  border-2 rounded-lg hover:shadow-md cursor-pointer z-0'
      )}
      onClick={e => {
        setSelectedParticipant(participant.id);
      }}
    >
      <div className="col-span-6 z-10">
        <FormattedCryptoAddress
          chainId={1}
          address={participant.wallet_address}
          withCopy
          className="font-bold text-base "
          userName={participant.name}
          isYou={isYou}
        />
        <div className="text-sm">{`Shares: ${numberWithCommas(numShares)}`}</div>
      </div>

      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">External ID:</div>
        <div className="md:w-auto  font-medium ">{participant.external_id}</div>
      </div>
      <div className="col-span-3 mt-3 md:mt-0 flex justify-end">
        {isWhitelisted ? (
          <div className="font-bold text-emerald-700 uppercase center self-center mr-4">
            approved
          </div>
        ) : (
          <div className="font-bold text-red-700 uppercase center self-center mr-4">unapproved</div>
        )}
      </div>
    </div>
  );
};

export default WhitelistAddressListItem;

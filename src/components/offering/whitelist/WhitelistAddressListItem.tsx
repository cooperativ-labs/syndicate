import cn from 'classnames';
import FormattedCryptoAddress from '../../FormattedCryptoAddress';
import React, { FC, useEffect } from 'react';

import { Maybe, OfferingParticipant } from 'types';
import { shareContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useContractReads } from 'wagmi';
import { numberWithCommas } from '@src/utils/helpersMoney';

type WhitelistAddressListItemProps = {
  participant: Maybe<OfferingParticipant>;
  shareContractAddress: String0x;
  setSelectedParticipant: (participantId: string) => void;
  investorListRefreshTrigger: number;
};

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({
  participant,
  shareContractAddress,
  investorListRefreshTrigger,
  setSelectedParticipant,
}) => {
  const { address: userWalletAddress } = useAccount();

  const sharedContractBits = {
    address: shareContractAddress,
    abi: shareContractABI,
  };

  const { data, isLoading, refetch } = useContractReads({
    contracts: [
      {
        ...sharedContractBits,
        functionName: 'balanceOf',
        args: [participant?.walletAddress as String0x],
      },
      {
        ...sharedContractBits,
        functionName: 'isWhitelisted',
        args: [participant?.walletAddress as String0x],
      },
    ],
  });

  useEffect(() => {
    if (investorListRefreshTrigger) {
      refetch();
    }
  }, [participant?.walletAddress, investorListRefreshTrigger, refetch]);

  const balance = data?.[0].result as bigint;
  const isWhitelisted = data?.[1].result;

  const isYou = participant?.walletAddress === userWalletAddress;
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
      onClick={(e) => {
        setSelectedParticipant(participant.id);
      }}
    >
      <div className="col-span-6 z-10">
        <FormattedCryptoAddress
          chainId={1}
          address={participant.walletAddress}
          withCopy
          className="font-bold text-base "
          userName={participant.name}
          isYou={isYou}
        />
        <div className="text-sm">{`Shares: ${numberWithCommas(numShares)}`}</div>
        {/* <PresentWalletUser className="md:w-auto mt-2 font-medium" walletAddress={participant.address} /> */}
      </div>

      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">External ID:</div>
        <div className="md:w-auto  font-medium ">{participant.externalId}</div>
      </div>
      <div className="col-span-3 mt-3 md:mt-0 flex justify-end">
        {isWhitelisted ? (
          <div className="font-bold text-emerald-700 uppercase center self-center mr-4">approved</div>
        ) : (
          <div className="font-bold text-red-700 uppercase center self-center mr-4">unapproved</div>
        )}
      </div>
    </div>
  );
};

export default WhitelistAddressListItem;

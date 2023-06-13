import cn from 'classnames';
import FormattedCryptoAddress from '../../FormattedCryptoAddress';
import React, { FC, useContext } from 'react';

import { OfferingParticipant } from 'types';
import { shareContractABI } from '@src/web3/generated';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useContractRead } from 'wagmi';
type WhitelistAddressListItemProps = {
  participant: OfferingParticipant;
  shareContractAddress: String0x;
  setSelectedParticipant: (participantId: string) => void;
};

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({
  participant,
  shareContractAddress,
  setSelectedParticipant,
}) => {
  const { address: userWalletAddress } = useAccount();

  const { data, isLoading } = useContractRead({
    address: shareContractAddress as String0x,
    abi: shareContractABI,
    functionName: 'balanceOf',
    args: [participant.walletAddress as String0x],
  });

  const isYou = participant.walletAddress === userWalletAddress;
  const numShares = isLoading ? 'loading...' : data ? toNormalNumber(data, shareContractDecimals) : 0;

  return (
    <div
      className={cn(
        isYou && 'bg-gray-50',
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
        <div className="text-sm">{`Shares: ${numShares}`}</div>
        {/* <PresentWalletUser className="md:w-auto mt-2 font-medium" walletAddress={participant.address} /> */}
      </div>

      <div className="col-span-2 mt-3 md:mt-0">
        <div className="text-sm">External ID:</div>
        <div className="md:w-auto  font-medium ">{participant.externalId}</div>
      </div>
      <div className="col-span-3 mt-3 md:mt-0 flex justify-end">
        {participant.permitted ? (
          <div className="font-bold text-emerald-700 uppercase center self-center mr-4">approved</div>
        ) : (
          <div className="font-bold text-red-700 uppercase center self-center mr-4">Applied</div>
        )}
      </div>
    </div>
  );
};

export default WhitelistAddressListItem;

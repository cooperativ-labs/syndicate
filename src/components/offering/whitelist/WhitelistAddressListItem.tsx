import abi from '../../../web3/ABI';
import cn from 'classnames';
import FormattedCryptoAddress from '../../FormattedCryptoAddress';
import React, { FC, useContext } from 'react';
import StandardButton from '@src/components/buttons/StandardButton';
import { OfferingParticipant } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useContractRead } from 'wagmi';

type WhitelistAddressListItemProps = {
  participant: OfferingParticipant;
  contractId: string;
  setSelectedParticipant: (participantId: string) => void;
};

const WhitelistAddressListItem: FC<WhitelistAddressListItemProps> = ({
  participant,
  contractId,
  setSelectedParticipant,
}) => {
  const { userWalletAddress } = useContext(ReachContext);

  const { data } = useContractRead({
    address: contractId as String0x,
    abi: abi,
    functionName: 'balanceOf',
    args: [participant.walletAddress as String0x],
  });

  const isYou = participant.walletAddress === userWalletAddress;
  const numShares = data ? toNormalNumber(data, 18) : 'loading...';

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

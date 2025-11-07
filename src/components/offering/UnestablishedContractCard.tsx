'use client';

import { SmartContractWithCryptoAddress } from '@/types';
import { cn } from '@src/lib/utils';
import { getCurrencyOption } from '@src/utils/enumConverters';

import { MatchSupportedChains } from '@src/web3/wagmi';

import React from 'react';

import FormattedCryptoAddress from '../FormattedCryptoAddress';
import { updateUnestablishedSmartContract } from '@src/utils/actions/cryptoActions';

interface UnestablishedContractCardProps {
  unestablishedContract: SmartContractWithCryptoAddress;
}

const UnestablishedContractCard: React.FC<UnestablishedContractCardProps> = ({
  unestablishedContract
}) => {
  const { cryptoAddress, id, backing_token } = unestablishedContract;

  if (!cryptoAddress) {
    return null;
  }
  const chain = cryptoAddress.chain_id ? MatchSupportedChains(cryptoAddress.chain_id) : undefined;

  const markUsed = async () => {
    if (window.confirm('Are you sure you want to mark this contract as used?')) {
      await updateUnestablishedSmartContract({ id: id, established: true });
      window.location.reload();
    }
  };

  return (
    <div className="bg-gray-100 p-2 rounded-md ">
      <div className="flex justify-between items-center">
        <div className="text-gray-600 font-semibold">Available Contract</div>
        <div
          className={cn(
            'text-xs  rounded-md max-w-min px-1 h-5 border-2',
            `border-${chain} text-${chain}`
          )}
        >
          {chain?.name}
        </div>
      </div>
      <hr className="border-t-2 mt-1 mb-2 border-gray-300" />
      <div className="flex justify-between items-center">
        <div>
          <FormattedCryptoAddress
            address={cryptoAddress.address}
            chainId={cryptoAddress.chain_id}
            withCopy
            showFull
            label={'Address: '}
          />
          <div className="text-sm text-gray-700">
            {/* Shares authorized: {numberWithCommas(numTokensAuthorized)} */}
            {backing_token && (
              <div> Distribution currency: {getCurrencyOption(backing_token)?.symbol} </div>
            )}
          </div>
        </div>
        <button
          onClick={e => {
            e.preventDefault();
            markUsed();
          }}
          className={cn('text-xs self-center rounded-md px-2 h-6 border-2', `border-2`)}
        >
          Mark as used
        </button>
      </div>
    </div>
  );
};

export default UnestablishedContractCard;

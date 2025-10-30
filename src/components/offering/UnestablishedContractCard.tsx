'use client';

import { useMutation } from '@apollo/client/react';
import { SmartContract } from '@gql/graphql';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { UPDATE_UNESTABLISHED_SMART_CONTRACT } from '@src/utils/graphQueries/crypto';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { isAlgorand, MatchSupportedChains } from '@src/web3/connectors';
import cn from 'classnames';
import Link from 'next/link';
import React from 'react';

import FormattedCryptoAddress from '../FormattedCryptoAddress';

interface UnestablishedContractCardProps {
  unestablishedContract: SmartContract;
}

const UnestablishedContractCard: React.FC<UnestablishedContractCardProps> = ({
  unestablishedContract
}) => {
  const { cryptoAddress, id, backingToken } = unestablishedContract;
  const [updateSmartContract, { data, error }] = useMutation(UPDATE_UNESTABLISHED_SMART_CONTRACT);

  const chain = MatchSupportedChains(cryptoAddress.chainId);

  const markUsed = async () => {
    if (window.confirm('Are you sure you want to mark this contract as used?')) {
      await updateSmartContract({ variables: { id: id, established: true } });
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
            chainId={cryptoAddress.chainId}
            withCopy
            showFull
            label={'Address: '}
          />
          <div className="text-sm text-gray-700">
            {/* Shares authorized: {numberWithCommas(numTokensAuthorized)} */}
            {backingToken && (
              <div> Distribution currency: {getCurrencyOption(backingToken)?.symbol} </div>
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

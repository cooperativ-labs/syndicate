import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC, useEffect } from 'react';

import { getHumanDate } from '@src/utils/helpersGeneral';
import { getIssuanceTradeOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ShareIssuanceTrade } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useAsync } from 'react-use';
import { useChainId, usePublicClient, useTransaction } from 'wagmi';

export type IssuanceSaleProps = {
  paymentTokenDecimals: number | undefined;
};

const IssuanceSale: FC<IssuanceSaleProps & { issuance: ShareIssuanceTrade }> = ({ issuance, paymentTokenDecimals }) => {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { transactionHash, recipientAddress, amount, partition, type, senderAddress, price } = issuance;
  const [blockTime, setBlockTime] = React.useState<Date | null>(null);

  const humanPrice = price && paymentTokenDecimals && toNormalNumber(BigInt(price), paymentTokenDecimals);

  const { data: transactionData } = useTransaction({
    hash: transactionHash as String0x,
  });

  useAsync(async () => {
    const block = await publicClient.getBlock({
      blockHash: transactionData?.blockHash as String0x,
    });
    const time = new Date(Number(block?.timestamp) * 1000);
    setBlockTime(time);
    return time;
  }, [publicClient, setBlockTime, transactionData]);

  return (
    <div className="relative md:grid grid-cols-12 gap-3 items-center p-3 border-b-2 ">
      <div className="col-span-2">
        <div className="font-medium text-base ">{blockTime ? getHumanDate(blockTime) : ''}</div>
      </div>

      <FormattedCryptoAddress
        className={`font-medium text-${getIssuanceTradeOption(type)?.color} col-span-2`}
        chainId={chainId}
        address={senderAddress}
      />

      <FormattedCryptoAddress className={'font-medium col-span-2'} chainId={chainId} address={recipientAddress} />

      <div className="col-span-2">
        <div className="font-medium ">
          {amount} ({stringFromBytes32(partition as String0x)})
        </div>
      </div>

      <FormattedCryptoAddress
        className={'font-medium col-span-3 '}
        chainId={chainId}
        address={transactionHash}
        lookupType="tx"
      />

      <div className="col-span-1">
        <div className={`font-medium`}>{price ? numberWithCommas(humanPrice) : 'N/A'}</div>
      </div>
    </div>
  );
};

export default IssuanceSale;

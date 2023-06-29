import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { getTransferEventOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ShareTransferEvent } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useAsync } from 'react-use';
import { useChainId, usePublicClient, useTransaction } from 'wagmi';

export type TransferEventProps = {
  paymentTokenDecimals: number | undefined;
};

const TransferEvent: FC<TransferEventProps & { transferEvent: ShareTransferEvent }> = ({
  transferEvent,
  paymentTokenDecimals,
}) => {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { transactionHash, recipientAddress, amount, partition, type, senderAddress, price } = transferEvent;
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

  const executor = transactionData?.from;

  return (
    <div className="relative md:grid grid-cols-7 gap-3 items-center p-3 border-b-2 ">
      <div className="flex col-span-1 justify-start">
        <div className="font-medium text-base ">{blockTime ? getHumanDate(blockTime) : ''}</div>
      </div>

      <FormattedCryptoAddress
        className={`font-medium text-${getTransferEventOption(type)?.color} flex col-span-1 justify-center`}
        chainId={chainId}
        address={senderAddress}
      />

      <FormattedCryptoAddress
        className={'font-medium flex col-span-1 justify-center'}
        chainId={chainId}
        address={recipientAddress}
      />

      <div className="flex col-span-1 justify-center">
        <div className="font-medium ">
          {amount} ({stringFromBytes32(partition as String0x)})
        </div>
      </div>

      <FormattedCryptoAddress
        className={'font-medium flex col-span-1 justify-center '}
        chainId={chainId}
        address={transactionHash}
        lookupType="tx"
      />

      <div className={`font-medium text-${getTransferEventOption(type)?.color} flex col-span-1 justify-center`}>
        <div className={`font-medium`}>{type}</div>
      </div>
      <div className="flex col-span-1 justify-center">
        <div className={`font-medium`}>{price ? numberWithCommas(humanPrice) : 'N/A'}</div>
      </div>
    </div>
  );
};

export default TransferEvent;

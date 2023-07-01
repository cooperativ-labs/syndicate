import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import { getCurrencyByCode, getTransferEventOption } from '@src/utils/enumConverters';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ShareTransferEvent } from 'types';
import { String0x, stringFromBytes32 } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useAsync } from 'react-use';
import { useChainId, usePublicClient, useTransaction } from 'wagmi';

const TransferEvent: FC<{ transferEvent: ShareTransferEvent }> = ({ transferEvent }) => {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const { transactionHash, recipientAddress, amount, partition, type, senderAddress, price, currencyCode } =
    transferEvent;
  const [blockTime, setBlockTime] = React.useState<Date | null>(null);

  const paymentTokenDecimals = getCurrencyByCode(currencyCode)?.decimals;
  const humanPrice = price && paymentTokenDecimals ? toNormalNumber(BigInt(price), paymentTokenDecimals) : null;

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
        <div className={`font-medium`}>{price ? numberWithCommas(humanPrice, 2) : 'N/A'}</div>
      </div>
    </div>
  );
};

export default TransferEvent;

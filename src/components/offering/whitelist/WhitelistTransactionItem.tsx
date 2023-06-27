import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC, useEffect } from 'react';
import { getHumanDate } from '@src/utils/helpersGeneral';
import { String0x } from '@src/web3/helpersChain';
import { usePublicClient, useTransaction } from 'wagmi';
import { WhitelistTransaction, WhitelistTransactionType } from 'types';

type WhitelistTransactionItemProps = {
  transaction: WhitelistTransaction | null;
  chainId: number;
};

const WhitelistTransactionItem: FC<WhitelistTransactionItemProps> = ({ chainId, transaction }) => {
  const publicClient = usePublicClient();
  const [blockTime, setBlockTime] = React.useState<Date | null>(null);
  const transactionHash = transaction?.transactionHash;

  const { data } = useTransaction({
    hash: transactionHash as String0x,
  });

  const from = data?.from;

  const getBlockTime = async () => {
    try {
      const block = await publicClient.getBlock({
        blockHash: data?.hash as String0x,
      });
      const time = new Date(Number(block?.timestamp) * 1000);

      setBlockTime(time);
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    getBlockTime();
  }, [publicClient, setBlockTime, transactionHash, data]);

  const types = [
    { type: WhitelistTransactionType.Add, name: 'Approved' },
    { type: WhitelistTransactionType.Remove, name: 'Revoked' },
  ];
  const type = types.find((t) => t.type === transaction?.type)?.name + ' ';

  return (
    <div className="flex gap-2 p-2 border-2 rounded-md my-2 text-sm ">
      {type} on {blockTime ? getHumanDate(blockTime) : ''} by
      <FormattedCryptoAddress className={'text-sm font-medium flex col-span-1 '} chainId={chainId} address={from} />
      (
      <FormattedCryptoAddress
        className={'text-sm font-medium flex col-span-1 '}
        chainId={chainId}
        address={transactionHash}
        label="Transaction: "
        lookupType="tx"
        withCopy
      />
      )
    </div>
  );
};

export default WhitelistTransactionItem;

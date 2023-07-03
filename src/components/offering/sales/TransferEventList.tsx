import React, { FC } from 'react';
import TransferEventItem from './TransferEventItem';
import { ShareTransferEvent } from 'types';

export type TransferEventListProps = { transferEvents: ShareTransferEvent[] };

const TransferEventList: FC<TransferEventListProps> = ({ transferEvents }) => {
  return (
    <>
      <div className="md:grid grid-cols-7 gap-3 items-center pl-3 p-1 mb-2 ">
        <div className="flex col-span-1 justify-start">
          <div className="text-sm font-bold text-gray-700">Date</div>
        </div>

        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">{'Sender'}</div>
        </div>

        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">{'Recipient'}</div>
        </div>

        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">Shares</div>
        </div>
        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">Transaction</div>
        </div>
        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">Type</div>
        </div>
        <div className="flex col-span-1 justify-center">
          <div className="text-sm font-bold text-gray-700">Price</div>
        </div>
      </div>
      {transferEvents?.map((transferEvent: ShareTransferEvent, i: number) => {
        return <TransferEventItem key={i} transferEvent={transferEvent} />;
      })}
    </>
  );
};

export default TransferEventList;

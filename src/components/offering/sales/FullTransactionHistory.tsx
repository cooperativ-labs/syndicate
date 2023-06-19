import React, { FC } from 'react';
import TransferEventList, { TransferEventListProps } from './TransferEventList';

export const FullTransactionHistory: FC<TransferEventListProps> = ({ transferEvents, paymentTokenDecimals }) => {
  return (
    <>
      <h2 className="text-xl md:my-8 text-blue-900 font-semibold">Transaction History</h2>
      <TransferEventList transferEvents={transferEvents} paymentTokenDecimals={paymentTokenDecimals} />
    </>
  );
};

export default FullTransactionHistory;

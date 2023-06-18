import TransferEventList, { TransferEventListProps } from './TransferEventList';
import React, { FC } from 'react';

export const FullTransactionHistory: FC<TransferEventListProps> = ({ transferEvents, paymentTokenDecimals }) => {
  return (
    <>
      <h2 className="text-xl md:my-8 text-blue-900 font-semibold">Transaction History</h2>
      <TransferEventList transferEvents={transferEvents} paymentTokenDecimals={paymentTokenDecimals} />
    </>
  );
};

export default FullTransactionHistory;

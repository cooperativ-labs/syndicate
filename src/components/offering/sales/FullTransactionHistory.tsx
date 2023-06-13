import IssuanceSaleList, { IssuanceSaleListProps } from './IssuanceSaleList';
import React, { FC } from 'react';

export const FullTransactionHistory: FC<IssuanceSaleListProps> = ({ issuances, paymentTokenDecimals }) => {
  return (
    <>
      <h2 className="text-xl md:my-8 text-blue-900 font-semibold">Transaction History</h2>
      <IssuanceSaleList issuances={issuances} paymentTokenDecimals={paymentTokenDecimals} />
    </>
  );
};

export default FullTransactionHistory;

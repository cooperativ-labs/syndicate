import React, { FC } from 'react';

import TransferEventList, { TransferEventListProps } from './TransferEventList';

export const FullTransactionHistory: FC<TransferEventListProps> = ({ transferEvents }) => {
  return <TransferEventList transferEvents={transferEvents} />;
};

export default FullTransactionHistory;

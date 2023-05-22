import DistributionListItem from './DistributionListItem';
import React, { FC } from 'react';
import { Currency, OfferingDistribution } from 'types';

type DistributionListProps = {
  distributions: OfferingDistribution[];
  currency: Currency;
  shareContractId: string;
  hideTransactionId?: boolean;
};

const TEMP_fake_distributions = [
  {
    id: '1',
    date: '2021-09-01',
    amount: 100,
    transactionId: '0x1234567890123456789012345678901234567890',
  },
  {
    id: '1',
    date: '2021-09-01',
    amount: 100,
    transactionId: '0x1234567890123456789012345678901234567890',
  },
  {
    id: '1',
    date: '2021-09-01',
    amount: 100,
    transactionId: '0x1234567890123456789012345678901234567890',
  },
];

const DistributionList: FC<DistributionListProps> = ({
  shareContractId,
  distributions,
  currency,
  hideTransactionId,
}) => {
  return (
    <div className="p-3  border-t-8 rounded-lg w-full">
      <div className="hidden md:grid grid-cols-8 gap-3 items-center mb-5">
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">Date</div>
        </div>
        {!hideTransactionId && (
          <div className="col-span-2 mt-3 md:mt-0">
            <div className="text-sm font-bold text-gray-700">Transaction ID</div>
          </div>
        )}
        <div className="col-span-2 mt-3 md:mt-0">
          <div className="text-sm font-bold text-gray-700">Total Distribution</div>
        </div>
      </div>
      {TEMP_fake_distributions.map((dist, i) => {
        return (
          <div className="mb-3" key={i}>
            <DistributionListItem distribution={dist} currency={currency} hideTransactionId={hideTransactionId} />
          </div>
        );
      })}
    </div>
  );
};

export default DistributionList;

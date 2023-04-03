import DistributionListItem from './DistributionListItem';
import React, { FC } from 'react';
import { Currency, OfferingDistribution } from 'types';

type DistributionListProps = {
  distributions: OfferingDistribution[];
  currency: Currency;
  contractId: string;
  hideTransactionId?: boolean;
};

const DistributionList: FC<DistributionListProps> = ({ contractId, distributions, currency, hideTransactionId }) => {
  return (
    <div className="p-3 bg-gray-100 border-t-8 rounded-lg w-full">
      <div className="hidden md:grid grid-cols-6 gap-3 items-center mb-5">
        <div className="col-span-2">
          <div className="text-sm font-bold text-gray-700">Date</div>
        </div>
        {!hideTransactionId && (
          <div className="col-span-3 mt-3 md:mt-0">
            <div className="text-sm font-bold text-gray-700">Transaction ID</div>
          </div>
        )}
        <div className="col-span-3 mt-3 md:mt-0">
          <div className="text-sm font-bold text-gray-700">Total Distribution</div>
        </div>
      </div>
      {distributions.map((dist, i) => {
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

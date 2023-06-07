import DistributionListItem, { DistributionListItemProps } from './DistributionListItem';
import React, { FC } from 'react';
import { OfferingDistribution } from 'types';

type DistributionListProps = DistributionListItemProps & {
  distributions: OfferingDistribution[];
};

const DistributionList: FC<DistributionListProps> = ({
  distributionContractAddress,
  distributions,
  isDistributor,
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
      {distributions.map((dist, i) => {
        return (
          <div className="mb-3" key={i}>
            <DistributionListItem
              distribution={dist}
              hideTransactionId={hideTransactionId}
              distributionContractAddress={distributionContractAddress}
              isDistributor={isDistributor}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DistributionList;

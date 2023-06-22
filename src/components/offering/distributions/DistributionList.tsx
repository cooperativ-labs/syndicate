import DistributionListItem, { DistributionListItemProps } from './DistributionListItem';
import React, { FC } from 'react';
import { Maybe, OfferingDistribution } from 'types';

type DistributionListProps = DistributionListItemProps & {
  distributions: Maybe<Maybe<OfferingDistribution>[]> | undefined;
};

const DistributionList: FC<DistributionListProps> = ({
  distributionContractAddress,
  distributions,
  isDistributor,
  hideTransactionId,
  walletAddress,
}) => {
  const hasDistributions = distributions && distributions.length > 0;
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
      {hasDistributions ? (
        distributions.map((dist, i) => {
          return (
            <div className="mb-3" key={i}>
              <DistributionListItem
                distribution={dist as OfferingDistribution}
                hideTransactionId={hideTransactionId}
                distributionContractAddress={distributionContractAddress}
                isDistributor={isDistributor}
                walletAddress={walletAddress}
              />
            </div>
          );
        })
      ) : (
        <div className="flex bg-white shadow-md items-center pl-3 p-3 rounded-lg ">
          This offering has not made any distributions.
        </div>
      )}
    </div>
  );
};

export default DistributionList;

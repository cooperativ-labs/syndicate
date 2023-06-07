import cn from 'classnames';
import React, { FC } from 'react';
import SaleManagerPanel from './ShareManagerPanel';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { OfferingSale } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

type ShareSaleStatusWidgetProps = {
  sale: OfferingSale;
  offeringId: string;
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
  isContractOwner: boolean;
  refetchMainContracts: () => void;
};

const ShareSaleStatusWidget: FC<ShareSaleStatusWidgetProps> = ({
  sale,
  offeringId,
  txnApprovalsEnabled,
  paymentTokenAddress,
  paymentTokenDecimals,
  swapContractAddress,
  isContractOwner,
  refetchMainContracts,
}) => {
  const {
    initiator,
    partition,
    amount,
    filledAmount,
    filler,
    isApproved,
    isDisapproved,
    isCancelled,
    isAccepted,
    refetchOrderDetails,
  } = useOrderDetails(swapContractAddress, sale.orderId, paymentTokenDecimals);

  const status =
    initiator &&
    getSwapStatusOption({
      amount,
      filledAmount,
      isApproved,
      isDisapproved,
      isCancelled,
      isAccepted,
      txnApprovalsEnabled,
    });

  const sharesRemaining = amount - filledAmount;

  function refetchAllContracts() {
    refetchMainContracts();
    refetchOrderDetails();
  }

  return (
    <>
      {status && (
        <div className="px-3 pb-3 pt-2 mt-4 rounded-lg bg-slate-200">
          <div className="flex justify-between items-center">
            <div className="text-sm font-bold"> Your offer </div>
            <div
              className={cn(
                'text-xs font-semibold rounded-md max-w-min px-1 h-5 border-2 min-w-max',
                `text-${status?.color}`,
                // 'text-white font-semibold',
                `border-${status?.color}`
              )}
            >
              {status?.name}
            </div>
          </div>

          <div>Remaining: {sharesRemaining} shares</div>
          <div className="flex flex-col gap-2 mt-4">
            <SaleManagerPanel
              isOfferor={true}
              isContractOwner={isContractOwner}
              offeringId={offeringId}
              isApproved={isApproved}
              isDisapproved={isDisapproved}
              sale={sale}
              swapContractAddress={swapContractAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              small
              isAccepted={isAccepted}
              filler={filler}
              refetchAllContracts={refetchAllContracts}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSaleStatusWidget;

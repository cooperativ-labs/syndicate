import cn from 'classnames';
import React, { FC } from 'react';
import SaleManagerPanel from './ShareManagerPanel';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

type ShareSaleStatusWidgetProps = {
  order: ShareOrder;
  offeringId: string;
  swapContractAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  isContractOwner: boolean;
  refetchMainContracts: () => void;
};

const ShareSaleStatusWidget: FC<ShareSaleStatusWidgetProps> = ({
  order,
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
    isAskOrder,
    refetchOrderDetails,
  } = useOrderDetails(swapContractAddress, order.contractIndex, paymentTokenDecimals);

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

  const sharesRemaining = amount && filledAmount ? amount - filledAmount : 0;

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
              order={order}
              swapContractAddress={swapContractAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              small
              isAccepted={isAccepted}
              filler={filler}
              refetchAllContracts={refetchAllContracts}
              isCancelled={isCancelled}
              isFilled={sharesRemaining === 0}
              isAskOrder={isAskOrder}
              initiator={initiator}
              amount={amount}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShareSaleStatusWidget;

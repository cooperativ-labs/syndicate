import cn from 'classnames';
import OfferingSummaryPanel from './OfferingSummaryPanel';
import React, { FC, useState } from 'react';
import SaleManagerPanel, { SaleMangerPanelProps } from './ShareManagerPanel';
import SharePurchaseSteps from './SharePurchaseSteps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAmountRemaining, ManagerModalType } from '@src/utils/helpersOffering';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { Offering, ShareOrder } from 'types';
import { useAccount } from 'wagmi';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

export type OrderStatusType = {
  isApproved: boolean;
  isDisapproved: boolean;
  isAccepted: boolean;
  isCancelled: boolean;
};

export type ShareSaleListItemProps = SaleMangerPanelProps & {
  offering: Offering;
  shareContractAddress: String0x | undefined;

  setModal: (value: ManagerModalType) => void;
  refetchMainContracts: () => void;
};

type AdditionalShareSaleListItemProps = ShareSaleListItemProps & {
  index: number;
  order: ShareOrder;
};

const ShareSaleListItem: FC<AdditionalShareSaleListItemProps> = ({
  index,
  offering,
  order,
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
  isContractOwner,
  setModal,
  refetchMainContracts,
  refetchOfferingInfo,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [open, setOpen] = useState<boolean>(false);

  const {
    initiator,
    partition,
    amount,
    price,
    filledAmount,
    filler,
    isApproved,
    isDisapproved,
    isCancelled,
    isAccepted,
    isShareIssuance,
    isAskOrder,
    isErc20Payment,
    isLoading,
    refetchOrderDetails,
  } = useOrderDetails(swapContractAddress, order.contractIndex, paymentTokenDecimals);

  function refetchAllContracts() {
    refetchMainContracts();
    refetchOrderDetails();
  }
  const isFiller = filler !== '0x0000000000000000000000000000000000000000';
  const currentUserFiller = normalizeEthAddress(userWalletAddress) === normalizeEthAddress(filler);
  const currentUserInitiator = normalizeEthAddress(userWalletAddress) === normalizeEthAddress(initiator);
  const shareQtyRemaining = getAmountRemaining({ x: amount, minus: filledAmount });

  const status =
    order &&
    getSwapStatusOption({
      amount,
      filledAmount,
      isFiller,
      isApproved,
      isDisapproved,
      isCancelled,
      isAccepted,
      txnApprovalsEnabled,
      swapApprovalsEnabled,
      isVisible: order.visible,
    });

  const showArchived = order.archived && (order.visible || currentUserInitiator || isContractOwner);
  const showLive = !order.archived && (order.visible || currentUserInitiator || isContractOwner);
  const showPurchaseSteps = !order.archived && (!currentUserInitiator || (!isAskOrder && isFiller));

  return (
    <>
      {showArchived && (
        <div
          className={cn(
            currentUserInitiator && 'border-2 border-green-600',
            'grid grid-cols-12 p-3 rounded-md bg-slate-100 items-center hover:cursor-pointer'
          )}
        >
          <div className="flex justify-center font-semibold text-lg">{index + 1}.</div>
          <div className="col-span-11">
            <div> Archived/Completed Swap - need to design </div>
            <div> Order index: {order.contractIndex}</div>
            <div> status: {status.name}</div>
            <div> amount: {amount}</div>
          </div>
        </div>
      )}
      {showLive && (
        <div className={'relative items-center shadow-md hover:shadow-lg rounded-md my-5 '}>
          <div className={`absolute top-2 right-2 p-1 px-2 rounded-md border-2 border-${status.color} text-xs`}>
            {status.name}
          </div>
          <div
            className="grid grid-cols-12 p-3 rounded-md bg-slate-100 items-center hover:cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="flex justify-center font-semibold text-lg">{index + 1}.</div>
            <div className="flex justify-between col-span-11">
              <OfferingSummaryPanel
                isAskOrder={isAskOrder}
                initiator={initiator}
                shareQtyRemaining={shareQtyRemaining}
                partition={partition}
                price={price}
                paymentTokenAddress={paymentTokenAddress}
              />

              <div className="flex items-center p-1">
                {/* {isOfferor && (
                  <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                    Manage your offer
                  </button>
                )} */}

                {!open ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}
              </div>
            </div>
          </div>
          {open && (
            <div className="p-2">
              {(currentUserInitiator || isContractOwner) && (
                <SaleManagerPanel
                  currentUserFiller={currentUserFiller}
                  currentUserInitiator={currentUserInitiator}
                  isContractOwner={isContractOwner}
                  offeringId={offering.id}
                  isApproved={isApproved}
                  isDisapproved={isDisapproved}
                  isAccepted={isAccepted}
                  isCancelled={isCancelled}
                  isFilled={shareQtyRemaining === 0}
                  isAskOrder={isAskOrder}
                  filler={filler}
                  initiator={initiator as String0x}
                  order={order}
                  amount={amount}
                  price={price}
                  shareContractAddress={shareContractAddress}
                  partition={partition}
                  swapContractAddress={swapContractAddress}
                  txnApprovalsEnabled={txnApprovalsEnabled}
                  swapApprovalsEnabled={swapApprovalsEnabled}
                  paymentTokenAddress={paymentTokenAddress}
                  paymentTokenDecimals={paymentTokenDecimals}
                  refetchAllContracts={refetchAllContracts}
                  refetchOfferingInfo={refetchOfferingInfo}
                />
              )}
              {showPurchaseSteps && (
                <SharePurchaseSteps
                  offering={offering}
                  order={order}
                  shareQtyRemaining={shareQtyRemaining as number}
                  price={price as number}
                  swapContractAddress={swapContractAddress as String0x}
                  isAskOrder={isAskOrder as boolean}
                  refetchAllContracts={refetchAllContracts as () => void}
                  isApproved={isApproved as boolean}
                  isDisapproved={isDisapproved as boolean}
                  isCancelled={isCancelled as boolean}
                  isAccepted={isAccepted as boolean}
                  filledAmount={filledAmount as number}
                  filler={filler as String0x}
                  paymentTokenAddress={paymentTokenAddress as String0x}
                  paymentTokenDecimals={paymentTokenDecimals as number}
                  txnApprovalsEnabled={txnApprovalsEnabled as boolean}
                  shareContractAddress={shareContractAddress as String0x}
                  partition={partition as String0x}
                  initiator={initiator as String0x}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShareSaleListItem;

/* 

dead swap block {
       - sees disapproved - isDisapproved && !isCancelled
      - sees cancelled - isCancelled 
      - sees filled - fullyFilled
      - sees complete - This does not come from the contract. Perhaps we should show a transaction list 
}

const isDead = isDisapproved || isCancelled || fullyFilled;

screens I need
 - Propose 
    - sale 
    - bid
- Status 
  - txn required
    - awaiting approval
    - someone else is pending
    - approved 
  - swap approval
    - awaiting approval
    - 
- Execute 
    - sale
    - bid

 - Initiate sale
 - Initiate bid
 - 


Is an ask order
  - txn approvals enabled
    - seller 
      - can propose to offer - initiates the swap
      - can cancel offer - isInitiator && isDead
      - is waiting for listing approval - isAccepted && !isApproved && isDead
    - buyer
      - can propose to buy - !isAccepted && !isApproved && noPendingFiller && isDead
      - is waiting for approval - isAccepted && !isApproved && isDead
      - can execute - isAccepted && isApproved &&  currentUserFiller && isDead
      - can cancelAcceptance - isAccepted && currentUserFiller && isDead
    - both
      - dead swap block

  - txn approvals disabled
    - seller
      - can propose to offer - initiates
      - can cancel offer - currentUserInitiator && isDead
      - sale has taken place - find some way to show this
    - buyer
      - can buy - isApproved && isDead
    - both
      - dead swap block
  - No approvals 
    - seller
      - can propose to offer - initiates
      - can cancel offer - currentUserInitiator && isDead
      - sale has taken place - find some way to show this
    - buyer
      - can buy - !isCancelled && !fullyFilled
      - sees sale has taken place
    - both
      - isCancelled || fullyFilled

Is a bid order
  - txn approvals enabled
    - buyer (as initiator)
      - can propose to buy - initiates the swap
      - can cancel offer - isInitiator && isDead
      - is waiting for listing approval - this is frontend only
      - seller has made offer, awaiting approval - isAccepted && !isApproved && isDead
      - can execute - currentUserInitiator && isAccepted && isApproved && isDead
    - seller (as filler)
      - can propose to sell - !isAccepted && !isApproved && noPendingFiller && isDead
      - is waiting for approval - currentUserFiller && isAccepted && !isApproved && isDead
      - can cancelAcceptance - currentUserFiller && isAccepted && isDead
      - claim proceeds = proceeds > 0 
    - both
      - dead swap block
  - txn approvals disabled
    - buyer (as initiator)
      - can propose to buy - initiates
      - can cancel offer - currentUserInitiator && isDead
      - pending approval - !isApproved && isDead
      - awaiting seller - currentUserInitiator && isApproved && isDead
        - disapproved - find some way to show this 
      - can execute - currentUserInitiator && isApproved && isDead
    - seller (as filler)
      - sees offer - isApproved && isDead
      - can accept - isApproved && isDead
      - can cancelAcceptance - currentUserFiller && isAccepted && isDead
      - claim proceeds = proceeds > 0
    - both
      - dead swap block
  - No approvals
    - buyer (as initiator)
      - can propose to buy - initiates
      - can cancel offer - currentUserInitiator && isDead
      - can execute - currentUserInitiator && isAccepted && isDead
*/

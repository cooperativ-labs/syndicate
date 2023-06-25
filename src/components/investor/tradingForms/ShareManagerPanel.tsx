import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC, useState } from 'react';

import { approveRejectSwap, cancelSwap } from '@src/web3/contractSwapCalls';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';

import OrderVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { ADD_TRANSFER_EVENT, UPDATE_ORDER } from '@src/utils/dGraphQueries/orders';

import { numberWithCommas } from '@src/utils/helpersMoney';
import { shareContractDecimals, toContractNumber, toNormalNumber } from '@src/web3/util';
import { ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useMutation } from '@apollo/client';
import { getCurrencyById } from '@src/utils/enumConverters';

export type SaleMangerPanelProps = {
  swapContractAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  swapApprovalsEnabled: boolean | undefined;
  isContractOwner: boolean;
  refetchOfferingInfo: () => void;
};

type AdditionalSaleMangerPanelProps = SaleMangerPanelProps & {
  currentUserFiller: boolean | undefined;
  currentUserInitiator: boolean | undefined;
  offeringId: string;
  isApproved: boolean | undefined;
  isDisapproved: boolean | undefined;
  isAccepted: boolean | undefined;
  isCancelled: boolean | undefined;
  isAskOrder: boolean | undefined;
  isFilled: boolean | undefined;
  filler: String0x | '' | undefined;
  initiator: String0x | '';
  order: ShareOrder;
  amount: number | undefined;
  price: number | undefined;
  partition: String0x | undefined | '';
  small?: boolean;
  shareContractAddress: String0x | undefined;
  refetchAllContracts: () => void;
};

const SaleManagerPanel: FC<AdditionalSaleMangerPanelProps> = ({
  offeringId,
  currentUserFiller,
  currentUserInitiator,
  isApproved,
  isDisapproved,
  isAccepted,
  isCancelled,
  isAskOrder,
  isFilled,
  filler,
  initiator,
  order,
  amount,
  price,
  partition,
  shareContractAddress,
  swapContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
  isContractOwner,
  small,
  refetchAllContracts,
  refetchOfferingInfo,
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [updateOrderObject, { data, error }] = useMutation(UPDATE_ORDER);
  const [addApprovalRecord, { error: issuanceError }] = useMutation(ADD_TRANSFER_EVENT);
  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disapproveButtonStep, setDisapproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');

  const { data: contractData } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress as String0x],
  });

  const { data: acceptedQty } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [filler as String0x, BigInt(order.contractIndex)],
  });

  const acceptedOrderQty = acceptedQty && toNormalNumber(acceptedQty, shareContractDecimals);
  const rawProceeds = contractData && contractData[1]; // Note: contractData[0] is eth, contractData[1] is erc20
  const proceeds = paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;
  const minPurchase = order.minUnits;
  const maxPurchase = order.maxUnits;
  const recipientAddress = txnApprovalsEnabled ? (isAskOrder ? filler : initiator) : initiator;
  const senderAddress = txnApprovalsEnabled ? (isAskOrder ? initiator : filler) : filler;
  const numShares = acceptedOrderQty && acceptedOrderQty > 0 ? acceptedOrderQty : amount;
  const contractPrice = Number(toContractNumber(price as number, paymentTokenDecimals as number));

  const transferEventArgs = {
    shareContractAddress,
    recipientAddress,
    senderAddress,
    numShares,
    contractPrice: contractPrice,
    partition,
    addApprovalRecord,
  };

  const listingIsApproved = isApproved || (txnApprovalsEnabled && order.visible);

  const handleApprove = async ({ isDisapprove }: { isDisapprove: boolean }) => {
    if (!txnApprovalsEnabled || isAccepted || isDisapprove) {
      await approveRejectSwap({
        transferEventArgs: transferEventArgs,
        swapContractAddress,
        contractIndex: order.contractIndex,
        isDisapprove: isDisapprove,
        setButtonStep: isDisapprove ? setDisapproveButtonStep : setApproveButtonStep,
        refetchAllContracts,
      });
    } else if (!isDisapprove) {
      await updateOrderObject({
        variables: {
          currentDate: currentDate,
          orderId: order.id,
          visible: !listingIsApproved,
          archived: order.archived,
        },
      });
    }
  };

  const handleArchive = async () => {
    updateOrderObject({
      variables: { currentDate: currentDate, orderId: order.id, visible: order.visible, archived: true },
    });
    refetchOfferingInfo();
  };

  const handleCancel = async () => {
    await cancelSwap({
      swapContractAddress,
      contractIndex: order.contractIndex,
      orderId: order.id,
      setButtonStep: setCancelButtonStep,
      handleArchive,
      refetchAllContracts,
    });
    refetchOfferingInfo();
  };

  const minMaxSection = (
    <>
      {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} shares</div>}
      {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} shares</div>}
      {!!maxPurchase && <hr className="my-4" />}
    </>
  );

  // Buttons ==========================================================================================================

  const buttonClass =
    'text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full';

  const cancelButton = (
    <Button className={buttonClass} onClick={() => handleCancel()} disabled={cancelButtonStep === 'step1'}>
      <LoadingButtonText
        state={cancelButtonStep}
        idleText="Cancel Offer"
        step1Text="Canceling Sale..."
        confirmedText="Sale Cancelled!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const archiveButton = (
    <Button className={buttonClass} onClick={handleArchive} disabled={claimProceedsButton === 'step1'}>
      {`Archive completed swap`}
    </Button>
  );

  const approveButton = (
    <Button
      className={buttonClass}
      onClick={() => handleApprove({ isDisapprove: false })}
      disabled={approveButtonStep === 'step1'}
    >
      <LoadingButtonText
        state={approveButtonStep}
        idleText={`${
          txnApprovalsEnabled && isAccepted ? 'Approve Trade' : listingIsApproved ? 'Hide Listing' : 'Approve Listing'
        }`}
        step1Text="Approving..."
        confirmedText="Approved"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const disapproveButton = (
    <Button
      className={buttonClass}
      onClick={() => handleApprove({ isDisapprove: true })}
      disabled={approveButtonStep === 'step1'}
    >
      <LoadingButtonText
        state={disapproveButtonStep}
        idleText={`Disapprove ${txnApprovalsEnabled ? 'Trade' : 'Listing'}`}
        step1Text="Disapprove..."
        confirmedText="Disapproved"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const baseInitiatorButtonSet = (
    <>
      {!isCancelled && !isFilled && currentUserInitiator && proceeds === 0 && cancelButton}
      {(isFilled || isCancelled) && proceeds === 0 && archiveButton}
    </>
  );

  const requestStatementText = (
    <span className="flex mt-2">
      <FormattedCryptoAddress
        chainId={chainId}
        address={isAskOrder ? recipientAddress : senderAddress}
        className="text-base"
      />
      &nbsp;
      {`${
        txnApprovalsEnabled ? (isAskOrder ? 'is requesting to purchase' : 'is offering to sell') : 'is offering to sell'
      } `}
      {numShares} shares for {numberWithCommas(price)} {getCurrencyById(paymentTokenAddress)?.symbol} per share.
    </span>
  );

  console.log({
    isCancelled,
    isFilled,
    currentUserInitiator,
    currentUserFiller,
    proceeds,
    isAccepted,
    isDisapproved,
    isApproved,
    isAskOrder,
    isContractOwner,
    txnApprovalsEnabled,
    swapApprovalsEnabled,
    contractIndex: order.contractIndex,
  });

  return (
    <div className="flex flex-col mb-2">
      {minMaxSection}
      {isContractOwner ? (
        <>
          {isAccepted && <div className="pl-1 mb-2 font-semibold text-cDarkBlue">{requestStatementText} </div>}
          <div className={cn(small ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3')}>
            {(swapApprovalsEnabled || txnApprovalsEnabled) && (
              <>
                {!isApproved && !isDisapproved ? (
                  <>
                    {approveButton} {disapproveButton}
                  </>
                ) : (
                  disapproveButton
                )}
              </>
            )}
            {baseInitiatorButtonSet}
          </div>

          {isAccepted && (
            <>
              <hr className="my-4" />
              <OrderVisibilityToggle
                orderVisibility={order.visible}
                orderId={order.id}
                orderArchived={order.archived}
              />
            </>
          )}
        </>
      ) : (
        baseInitiatorButtonSet
      )}
      {(isCancelled || isFilled) && proceeds !== 0 && <div>Completed swap. Please claim proceeds.</div>}
    </div>
  );
};

export default SaleManagerPanel;

/* Panel scenarios
As the Manager: 
  - SwapApprovals are not enabled
    - If the order is not filled or cancelled, show the cancel button
    - If the order is filled or cancelled, show the archive button
  - SwapApprovals are enabled
    - If the order is not approved, show the "Approve Listing" button (replaces visibility toggle)
    - If the order is approved, show the disapprove button
    - If the order is filled or cancelled, show the archive button
  - TxnApprovals are enabled
    - If swapApprovals are enabled, show the "Approve Listing" ( just toggles visibility ) and "Disapprove" buttons 
    - If swapApprovals are not enabled, show visibility toggle
    - If the order is filled or cancelled, show the archive button
As the Initiator:
  - SwapApprovals are not enabled
    - If the order is not filled or cancelled, show the cancel button
    - If the order is filled or cancelled, show the archive button
  - SwapApprovals are enabled
    - Show cancel button
    - If the order is filled or cancelled, show the archive button
  - TxnApprovals are enabled
    - if not approved, show "Awaiting approval"
    - if approved, show cancel button
As the Investor
  - SwapApprovals are not enabled
    - show purchase form
  - SwapApprovals are enabled
    - item does not appear
  - TxnApprovals are enabled
    - show purchase steps
*/

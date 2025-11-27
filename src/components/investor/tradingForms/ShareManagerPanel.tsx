/**
 * ShareManagerPanel
 *
 * Displays action buttons and status for managing share orders.
 * Uses a two-layer approval system:
 *   - Layer 1: Listing Approval (listingApprovalsRequired) - controls visibility
 *   - Layer 2: Transaction Approval (txnApprovalsRequired) - controls individual trades
 *
 * @see ai/ai-sale-manager-interface.md for full documentation of UI scenarios
 */

import { useOffering } from '@contexts/OfferingContext';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import OrderVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';
import {
  LoadingButtonChain,
  LoadingButtonStateType
} from '@src/components/ui/loading-button-chain';
import { cn } from '@src/lib/utils';
import { updateOrder } from '@src/utils/actions/orderActions';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { approveRejectSwap, cancelSwap } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { usePathname } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useChainId, useConnection, useReadContract } from 'wagmi';

import { SaleManagerPanelProps } from './offering-actions-types';
import { useSharePanelUI } from './useSharePanelUI';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type ShareManagerPanelProps = SaleManagerPanelProps & {
  small?: boolean;
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

const SaleManagerPanel: FC<ShareManagerPanelProps> = ({
  order,
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
  amount,
  price,
  partition,
  small
}) => {
  const {
    contractSet,
    paymentTokenAddress,
    paymentTokenDecimals,
    txnApprovalsRequired,
    listingApprovalsRequired,
    isContractOwner,
    refetchMainContracts,
    refetchOfferingInfo
  } = useOffering();

  // ─────────────────────────────────────────────────────────────────────────────
  // State & Hooks
  // ─────────────────────────────────────────────────────────────────────────────
  const [archiveButtonStatus, setArchiveButtonStatus] = useState<ButtonLoadingState>('default');
  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disapproveButtonStep, setDisapproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');

  const { address: userWalletAddress } = useConnection();
  const chainId = useChainId();
  const pathname = usePathname();

  // Contract addresses
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;

  // ─────────────────────────────────────────────────────────────────────────────
  // Contract Data
  // ─────────────────────────────────────────────────────────────────────────────
  const { data: contractData } = useReadContract({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress as String0x]
  });

  const { data: acceptedQty } = useReadContract({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [filler as String0x, BigInt(order.contract_index)]
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Derived Values
  // ─────────────────────────────────────────────────────────────────────────────
  const acceptedOrderQty = acceptedQty && toNormalNumber(acceptedQty, shareContractDecimals);
  const rawProceeds = contractData && contractData[1]; // [0] = eth, [1] = erc20
  const proceeds =
    paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const numShares = acceptedOrderQty && acceptedOrderQty > 0 ? acceptedOrderQty : amount;
  const minPurchase = order.min_units;
  const maxPurchase = order.max_units;

  // Determine sender/recipient based on order type and approval mode
  const recipientAddress = txnApprovalsRequired ? (isAskOrder ? filler : initiator) : initiator;
  const senderAddress = txnApprovalsRequired ? (isAskOrder ? initiator : filler) : filler;

  const transferEventArgs = {
    shareContractAddress,
    recipientAddress,
    senderAddress,
    numShares,
    price,
    currencyCode: getCurrencyById(paymentTokenAddress)?.value,
    partition
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // UI Configuration (from hook)
  // ─────────────────────────────────────────────────────────────────────────────
  const ui = useSharePanelUI({
    isApproved,
    isDisapproved,
    isAccepted,
    isCancelled,
    isFilled,
    listingApprovalsRequired,
    txnApprovalsRequired,
    isContractOwner,
    currentUserInitiator,
    currentUserFiller,
    proceeds
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Handlers
  // ─────────────────────────────────────────────────────────────────────────────
  const handleApproveListing = async () => {
    await updateOrder({
      orderId: order.id,
      visible: true,
      archived: order.archived ?? false,
      revalidationPath: { path: pathname, type: 'layout' }
    });
  };

  const handleDisapproveListing = async () => {
    await updateOrder({
      orderId: order.id,
      visible: false,
      archived: order.archived ?? false,
      revalidationPath: { path: pathname, type: 'layout' }
    });
  };

  const handleApproveTxn = async () => {
    await approveRejectSwap({
      transferEventArgs,
      swapContractAddress,
      paymentTokenDecimals,
      contractIndex: order.contract_index,
      isDisapprove: false,
      setButtonStep: setApproveButtonStep,
      refetchMainContracts
    });
  };

  const handleDisapproveTxn = async () => {
    await approveRejectSwap({
      transferEventArgs,
      swapContractAddress,
      paymentTokenDecimals,
      contractIndex: order.contract_index,
      isDisapprove: true,
      setButtonStep: setDisapproveButtonStep,
      refetchMainContracts
    });
  };

  const handleArchive = async () => {
    try {
      setArchiveButtonStatus('loading');
      await updateOrder({
        orderId: order.id,
        visible: !order.archived,
        archived: !order.archived,
        revalidationPath: { path: pathname, type: 'layout' }
      });
      setArchiveButtonStatus('success');
    } catch (error) {
      console.error('Error archiving order:', error);
      setArchiveButtonStatus('error');
    }
  };

  const handleCancel = async () => {
    await cancelSwap({
      swapContractAddress,
      contractIndex: order.contract_index ?? 0,
      setButtonStep: setCancelButtonStep,
      handleArchive,
      refetchMainContracts
    });
    refetchOfferingInfo();
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // UI Components
  // ─────────────────────────────────────────────────────────────────────────────
  const currencySymbol = getCurrencyById(paymentTokenAddress)?.symbol;

  const MinMaxSection = () => (
    <>
      {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} shares</div>}
      {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} shares</div>}
      {(!!minPurchase || !!maxPurchase) && <hr className='my-4' />}
    </>
  );

  const RequestStatement = () => (
    <div className='pl-1 mb-2 font-semibold text-cDarkBlue'>
      <span className='flex mt-2 flex-wrap items-center'>
        <FormattedCryptoAddress
          chainId={chainId}
          address={isAskOrder ? recipientAddress : senderAddress}
          className='text-base'
        />
        <span className='mx-1'>
          {txnApprovalsRequired
            ? isAskOrder
              ? 'is requesting to purchase'
              : 'is offering to sell'
            : 'is offering to sell'}
        </span>
        <span className='font-bold'>{numShares} shares</span>
        <span className='mx-1'>to</span>
        <FormattedCryptoAddress
          chainId={chainId}
          address={isAskOrder ? senderAddress : recipientAddress}
          className='text-base'
        />
        <span className='ml-1'>
          for {numberWithCommas(price)} {currencySymbol} per share.
        </span>
      </span>
    </div>
  );

  const AwaitingApprovalMessage = ({ type }: { type: 'listing' | 'transaction' }) => (
    <div className='p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-center'>
      Awaiting {type} approval from manager
    </div>
  );

  const DisapprovedMessage = () => (
    <div className='p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-center'>
      This offer has been disapproved
    </div>
  );

  const ClaimProceedsMessage = () => (
    <div className='p-3 bg-green-50 border border-green-200 rounded-md text-green-800'>
      Completed swap. Please claim proceeds.
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Button Components
  // ─────────────────────────────────────────────────────────────────────────────
  const ApproveListingButton = () => (
    <LoadingButtonChain
      onClick={handleApproveListing}
      disabled={approveButtonStep === 'step1'}
      state={approveButtonStep}
      idleText='Approve Listing'
      step1Text='Approving...'
      confirmedText='Listing Approved'
      failedText='Failed'
      rejectedText='Click to retry'
    />
  );

  const DisapproveListingButton = () => (
    <LoadingButtonChain
      onClick={handleDisapproveListing}
      disabled={disapproveButtonStep === 'step1'}
      state={disapproveButtonStep}
      idleText='Hide Listing'
      step1Text='Hiding...'
      confirmedText='Listing Hidden'
      failedText='Failed'
      rejectedText='Click to retry'
    />
  );

  const ApproveTxnButton = () => (
    <LoadingButtonChain
      onClick={handleApproveTxn}
      disabled={approveButtonStep === 'step1'}
      state={approveButtonStep}
      idleText='Approve Trade'
      step1Text='Approving...'
      confirmedText='Trade Approved'
      failedText='Transaction failed'
      rejectedText='You rejected the transaction. Click here to try again.'
    />
  );

  const DisapproveTxnButton = () => (
    <LoadingButtonChain
      onClick={handleDisapproveTxn}
      disabled={disapproveButtonStep === 'step1'}
      state={disapproveButtonStep}
      idleText='Disapprove Trade'
      step1Text='Disapproving...'
      confirmedText='Trade Disapproved'
      failedText='Transaction failed'
      rejectedText='You rejected the transaction. Click here to try again.'
    />
  );

  const CancelButton = () => (
    <LoadingButtonChain
      onClick={handleCancel}
      disabled={cancelButtonStep === 'step1'}
      state={cancelButtonStep}
      idleText='Cancel Remaining Offer'
      step1Text='Canceling Sale...'
      confirmedText='Sale Cancelled!'
      failedText='Transaction failed'
      rejectedText='You rejected the transaction. Click here to try again.'
    />
  );

  const ArchiveButton = () => (
    <LoadingButton
      onClick={handleArchive}
      buttonState={archiveButtonStatus}
      setButtonState={setArchiveButtonStatus}
      text={order.archived ? 'Unarchive' : 'Archive completed swap'}
      loadingText={order.archived ? 'Unarchiving...' : 'Archiving...'}
      successText={order.archived ? 'Unarchived!' : 'Archived!'}
      errorText='Error'
      reset
    />
  );

  const VisibilityToggle = () => (
    <OrderVisibilityToggle
      orderVisibility={order.visible}
      orderId={order.id}
      orderArchived={order.archived}
    />
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  const buttonGridClass = cn(small ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3');

  return (
    <div className='flex flex-col mb-2 gap-3'>
      <MinMaxSection />

      {/* Request Statement (when txn is pending approval) */}
      {ui.showRequestStatement && <RequestStatement />}

      {/* Status Messages */}
      {ui.showAwaitingListingApproval && <AwaitingApprovalMessage type='listing' />}
      {ui.showAwaitingTxnApproval && <AwaitingApprovalMessage type='transaction' />}
      {isDisapproved && <DisapprovedMessage />}

      {/* Action Buttons */}
      <div className={buttonGridClass}>
        {/* Listing Layer Buttons */}
        {ui.showApproveListingButton && <ApproveListingButton />}
        {ui.showDisapproveListingButton && !isDisapproved && <DisapproveListingButton />}

        {/* Transaction Layer Buttons */}
        {ui.showApproveTxnButton && <ApproveTxnButton />}
        {ui.showDisapproveTxnButton && !isDisapproved && <DisapproveTxnButton />}

        {/* Universal Buttons */}
        {ui.showCancelButton && <CancelButton />}
        {ui.showArchiveButton && <ArchiveButton />}
      </div>

      {/* Visibility Toggle */}
      {ui.showListingVisibilityToggle && (
        <>
          <hr className='my-2' />
          <VisibilityToggle />
        </>
      )}

      {/* Claim Proceeds Notice */}
      {ui.showClaimProceeds && <ClaimProceedsMessage />}
    </div>
  );
};

export default SaleManagerPanel;

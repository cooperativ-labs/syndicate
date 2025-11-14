import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import OrderVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { Button } from '@src/components/ui/button';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { LoadingButtonChain } from '@src/components/ui/loading-button-chain';
import { cn } from '@src/lib/utils';
import { updateOrder } from '@src/utils/actions/orderActions';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { approveRejectSwap, cancelSwap } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import React, { FC, useState } from 'react';
import { useAccount, useChainId, useReadContract } from 'wagmi';

import { ShareOrder } from '@/types';

import { SaleMangerPanelProps } from './offering-actions-types';

type AdditionalSaleMangerPanelProps = SaleMangerPanelProps & {
  currentUserFiller: boolean | undefined;
  currentUserInitiator: boolean | undefined;
  offeringId: string;
  isApproved: boolean | undefined;

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
  currentUserInitiator,
  isApproved,
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
  refetchOfferingInfo
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();

  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disapproveButtonStep, setDisapproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');

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

  const acceptedOrderQty = acceptedQty && toNormalNumber(acceptedQty, shareContractDecimals);
  const rawProceeds = contractData && contractData[1]; // Note: contractData[0] is eth, contractData[1] is erc20
  const proceeds =
    paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;
  const minPurchase = order.min_units;
  const maxPurchase = order.max_units;
  const recipientAddress = txnApprovalsEnabled ? (isAskOrder ? filler : initiator) : initiator;
  const senderAddress = txnApprovalsEnabled ? (isAskOrder ? initiator : filler) : filler;
  const numShares = acceptedOrderQty && acceptedOrderQty > 0 ? acceptedOrderQty : amount;

  const transferEventArgs = {
    shareContractAddress,
    recipientAddress,
    senderAddress,
    numShares,
    price,
    currencyCode: getCurrencyById(paymentTokenAddress)?.value,
    partition
  };

  const listingIsApproved = isApproved || (txnApprovalsEnabled && order.visible);
  const transactionIsAccepted = txnApprovalsEnabled && isAccepted;

  const allowVisibilityApproveDisapprove = transactionIsAccepted ? false : true; // dont change visibility if transaction if Txn on and accepted, don't change visiblity of Txn off and
  const allowContractApproveDisapprove = !isFilled || !isCancelled;

  const updateListingVisibility = async (isDisapprove: boolean) => {
    await updateOrder({
      orderId: order.id,
      visible: !isDisapprove,
      archived: order.archived ?? false
    });
  };

  const handleApprove = async ({ isDisapprove }: { isDisapprove: boolean }) => {
    if (allowContractApproveDisapprove) {
      await approveRejectSwap({
        transferEventArgs: transferEventArgs,
        swapContractAddress,
        paymentTokenDecimals,
        contractIndex: order.contract_index,
        isDisapprove: isDisapprove,
        setButtonStep: isDisapprove ? setDisapproveButtonStep : setApproveButtonStep,
        refetchAllContracts
      });
    }
    if (allowVisibilityApproveDisapprove) {
      await updateListingVisibility(isDisapprove);
    }
  };

  const handleArchive = async (archive: boolean) => {
    await updateOrder({
      orderId: order.id,
      visible: order.visible ?? false,
      archived: archive
    });
    refetchOfferingInfo();
  };

  const handleCancel = async () => {
    await cancelSwap({
      swapContractAddress,
      contractIndex: order.contract_index ?? 0,
      setButtonStep: setCancelButtonStep,
      handleArchive,
      refetchAllContracts
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
    'text-sm p-3 px-6 text-cLightBlue hover:text-white bg-white bg-opacity-50 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full';

  const cancelButton = (
    <Button
      className={buttonClass}
      onClick={() => handleCancel()}
      disabled={cancelButtonStep === 'step1'}
    >
      <LoadingButtonChain
        state={cancelButtonStep}
        idleText="Cancel Remaining Offer"
        step1Text="Canceling Sale..."
        confirmedText="Sale Cancelled!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const archiveButton = (
    <Button
      className={buttonClass}
      onClick={() => handleArchive(!order.archived)}
      disabled={claimProceedsButton === 'step1'}
    >
      {order.archived ? 'Unarchive' : `Archive completed swap`}
    </Button>
  );

  const approveButton = (
    <Button
      className={buttonClass}
      onClick={() =>
        transactionIsAccepted || !txnApprovalsEnabled
          ? handleApprove({ isDisapprove: false })
          : listingIsApproved
            ? updateListingVisibility(true)
            : updateListingVisibility(false)
      }
      disabled={approveButtonStep === 'step1'}
    >
      <LoadingButtonChain
        state={approveButtonStep}
        idleText={`${transactionIsAccepted ? 'Approve Trade' : listingIsApproved ? 'Hide Listing' : 'Approve Listing'}`}
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
      <LoadingButtonChain
        state={disapproveButtonStep}
        idleText={`Disapprove ${transactionIsAccepted ? 'Trade' : 'Listing'}`}
        step1Text="Disapproving..."
        confirmedText="Disapproved"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const baseInitiatorButtonSet = (
    <>
      {!isCancelled && !isFilled && currentUserInitiator && cancelButton}
      {(isFilled || isCancelled) && isContractOwner && archiveButton}
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
        txnApprovalsEnabled
          ? isAskOrder
            ? 'is requesting to purchase'
            : 'is offering to sell'
          : 'is offering to sell'
      } `}
      {numShares} shares to &nbsp;
      <FormattedCryptoAddress
        chainId={chainId}
        address={isAskOrder ? senderAddress : recipientAddress}
        className="text-base"
      />{' '}
      &nbsp; for {numberWithCommas(price)} {getCurrencyById(paymentTokenAddress)?.symbol} per share.
    </span>
  );

  return (
    <div className="flex flex-col mb-2">
      {minMaxSection}
      {isContractOwner && !isCancelled && !isFilled ? (
        <>
          {isAccepted && (
            <div className="pl-1 mb-2 font-semibold text-cDarkBlue">{requestStatementText} </div>
          )}
          <div className={cn(small ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3')}>
            {(swapApprovalsEnabled || txnApprovalsEnabled) && (
              <>
                {!isApproved ? (
                  <>
                    {approveButton} {allowContractApproveDisapprove && disapproveButton}
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
      {(isCancelled || isFilled) && proceeds !== 0 && (
        <div className="flex">
          {isContractOwner && (isFilled || isCancelled) && (
            <OrderVisibilityToggle
              orderVisibility={order.visible}
              orderId={order.id}
              orderArchived={order.archived}
            />
          )}
          Completed swap. Please claim proceeds.
        </div>
      )}
      {/* <OrderVisibilityToggle orderVisibility={order.visible} orderId={order.id} orderArchived={order.archived} /> */}
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

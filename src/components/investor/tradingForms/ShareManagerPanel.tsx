import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC, useState } from 'react';

import { approveRejectSwap, cancelSwap, claimProceeds } from '@src/web3/contractSwapCalls';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';

import OrderVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { ADD_TRANSFER_EVENT, DELETE_ORDER, UPDATE_ORDER } from '@src/utils/dGraphQueries/trades';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { shareContractDecimals, toContractNumber, toNormalNumber } from '@src/web3/util';
import { ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useMutation } from '@apollo/client';

export type SaleMangerPanelProps = {
  swapContractAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  isContractOwner: boolean;
  refetchOffering: () => void;
};

type AdditionalSaleMangerPanelProps = SaleMangerPanelProps & {
  offeringId: string;
  isOfferor: boolean;
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
  isOfferor,
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
  isContractOwner,
  small,
  refetchAllContracts,
  refetchOffering,
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [deleteOrderObject, { data: deleteData }] = useMutation(DELETE_ORDER);
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

  // Note: contractData[0] is eth, contractData[1] is erc20
  const rawProceeds = contractData && contractData[1];
  const proceeds = paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const minPurchase = order.minUnits;
  const maxPurchase = order.maxUnits;

  const recipientAddress = txnApprovalsEnabled ? (isAskOrder ? filler : initiator) : initiator;
  const senderAddress = txnApprovalsEnabled ? (isAskOrder ? initiator : filler) : filler;
  const numShares = acceptedOrderQty && acceptedOrderQty > 0 ? acceptedOrderQty : amount;
  const decimalAdjustedPrice = Number(toContractNumber(price as number, paymentTokenDecimals as number));

  const handleApprove = async ({ isDisapprove }: { isDisapprove: boolean }) => {
    await approveRejectSwap({
      transferEventArgs: txnApprovalsEnabled // This adds a disapproval record
        ? {
            shareContractAddress,
            recipientAddress,
            senderAddress,
            numShares,
            decimalAdjustedPrice: decimalAdjustedPrice,
            partition,
            addApprovalRecord,
          }
        : undefined,
      swapContractAddress,
      contractIndex: order.contractIndex,
      isDisapprove: isDisapprove,
      setButtonStep: setApproveButtonStep,
      refetchAllContracts,
    });
    if (!isDisapprove && !txnApprovalsEnabled) {
      updateOrderObject({
        variables: {
          currentDate: currentDate,
          orderId: order.id,
          visible: true,
        },
      });
    }
  };

  const handleCancel = async () => {
    await cancelSwap({
      swapContractAddress,
      contractIndex: order.contractIndex,
      orderId: order.id,
      setButtonStep: setCancelButtonStep,
      deleteOrderObject,
      refetchAllContracts,
    });
    refetchOffering();
  };

  const handleClaimProceeds = async () => {
    await claimProceeds({ swapContractAddress, setButtonStep: setClaimProceedsButton });
  };

  const handleDelete = async () => {
    deleteOrderObject({ variables: { orderId: order.id } });
    // refetchOffering();
  };

  const buttonClass =
    'text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full';
  return (
    <div className="flex flex-col">
      {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} shares</div>}
      {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} shares</div>}
      {!!maxPurchase && <hr className="my-4" />}
      <div className={cn(small ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3')}>
        {!isCancelled && !isFilled && isOfferor && proceeds === 0 && (
          <Button className={buttonClass} onClick={() => handleCancel()} disabled={cancelButtonStep === 'submitting'}>
            <LoadingButtonText
              state={cancelButtonStep}
              idleText="Cancel Offer"
              submittingText="Canceling Sale..."
              confirmedText="Sale Cancelled!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
        {isOfferor && proceeds !== 0 && (
          <Button className={buttonClass} onClick={handleClaimProceeds} disabled={claimProceedsButton === 'submitting'}>
            <LoadingButtonText
              state={claimProceedsButton}
              idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
              submittingText="Claiming Proceeds..."
              confirmedText="Proceeds Claimed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
        {(isCancelled || isFilled) && proceeds === 0 && (
          <Button className={buttonClass} onClick={handleDelete} disabled={claimProceedsButton === 'submitting'}>
            {`Delete completed swap`}
          </Button>
        )}
        {isContractOwner && order && <OrderVisibilityToggle orderVisibility={order.visible} id={order.id} />}
      </div>
      {/* if swapsApprovals are enabled but txnApprovals are not - show approve button (or disapprove if already approved) */}
      {/* if both txnApprovals are turned on, then only show button when enabled  */}

      {(!txnApprovalsEnabled || isAccepted) && isContractOwner && !isDisapproved && (
        <div className=" mt-3 grid grid-cols-2 gap-3">
          {!isApproved && (
            <Button
              className={buttonClass}
              onClick={() => handleApprove({ isDisapprove: false })}
              disabled={approveButtonStep === 'submitting'}
            >
              <LoadingButtonText
                state={approveButtonStep}
                idleText={`Approve ${txnApprovalsEnabled ? 'Trade' : 'Listing'}`}
                submittingText="Approving..."
                confirmedText="Confirmed"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          )}
          <div>
            <Button
              className={buttonClass}
              onClick={() => handleApprove({ isDisapprove: true })}
              disabled={approveButtonStep === 'submitting'}
            >
              <LoadingButtonText
                state={disapproveButtonStep}
                idleText={`Disapprove ${txnApprovalsEnabled ? 'Trade' : 'Listing'}`}
                submittingText="Disapprove..."
                confirmedText="Confirmed"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          </div>

          {
            <div className="flex flex-col">
              <FormattedCryptoAddress
                chainId={chainId}
                address={recipientAddress}
                label={`${txnApprovalsEnabled ? (isAskOrder ? 'Requester' : 'Initiator') : 'Initiator'}: `}
              />
              Shares {txnApprovalsEnabled ? (isAskOrder ? 'Requested' : 'Offered') : 'Offered'}: {numShares}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default SaleManagerPanel;

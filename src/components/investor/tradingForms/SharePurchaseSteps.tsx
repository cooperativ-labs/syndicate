import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ShareCompleteSwap from './ShareCompleteSwap';
import SharePurchaseRequest, { SharePurchaseRequestProps } from './SharePurchaseRequest';
import { ADD_TRANSFER_EVENT } from '@src/utils/dGraphQueries/orders';
import { fillOrder } from '@src/web3/contractSwapCalls';
import { LoadingButtonStateType } from '@src/components/buttons/Button';
import { useAccount, useBalance, useContractRead } from 'wagmi';

import OrderStatusBar from './OrderStatusBar';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { useMutation } from '@apollo/client';

type SharePurchaseStepsProps = SharePurchaseRequestProps & {
  isApproved: boolean;
  isDisapproved: boolean;
  isCancelled: boolean;
  isAccepted: boolean;
  filler: String0x | '';
  filledAmount: number;
  initiator: String0x | '';
  shareQtyRemaining: number;
  shareContractAddress: String0x;
  partition: String0x;
  isAsk: boolean;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
};

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  offering,
  order,
  shareQtyRemaining,
  shareContractAddress,
  isAsk,
  partition,
  price,
  swapContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  isApproved,
  isDisapproved,
  isAccepted,
  filledAmount,
  filler,
  initiator,
  refetchAllContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [addTrade, { error: issuanceError }] = useMutation(ADD_TRANSFER_EVENT);

  const { data: orderQtyData, refetch } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [userWalletAddress as String0x, BigInt(order.contractIndex)],
  });

  const { data: bacBalanceData } = useBalance({
    address: userWalletAddress,
    token: paymentTokenAddress,
  });

  const refetchAllPlusAccepted = () => {
    refetchAllContracts();
    refetch();
  };

  const organization = offering.offeringEntity.organization;
  const recipient = (isAsk ? filler : initiator) as String0x;
  const sender = (isAsk ? initiator : filler) as String0x;

  const myBacBalance = bacBalanceData?.formatted;
  const acceptedOrderQty = toNormalNumber(orderQtyData, shareContractDecimals);
  const currentUserFiller = userWalletAddress === filler;
  const isCompleted = filledAmount === acceptedOrderQty;

  const showRequestForm = (!isAccepted && txnApprovalsEnabled) || (!txnApprovalsEnabled && shareQtyRemaining > 0);
  const showTradeExecutionForm = txnApprovalsEnabled && isApproved && !showRequestForm;

  const callFillOrder = async ({
    setButtonStep,
    amount,
  }: {
    setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
    amount: number;
  }) => {
    await fillOrder({
      swapContractAddress,
      shareContractAddress,
      contractIndex: order.contractIndex,
      amount,
      price,
      paymentTokenDecimals,
      recipient,
      sender,
      partition,
      offeringId: offering.id,
      organization,
      addTrade: addTrade,
      setButtonStep: setButtonStep,
      refetchAllContracts: refetchAllContracts,
    });
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <OrderStatusBar
        isApproved={isApproved}
        isDisapproved={isDisapproved}
        isAccepted={isAccepted}
        isCompleted={isCompleted}
        acceptedOrderQty={acceptedOrderQty}
        txnApprovalsEnabled={txnApprovalsEnabled}
        currentUserFiller={currentUserFiller}
      />

      {!isCompleted && showRequestForm && (
        <div className="p-3 border-2 rounded-lg">
          {` ${txnApprovalsEnabled ? '1. Apply to p' : ' P'}urchase shares`}
          <SharePurchaseRequest
            txnApprovalsEnabled={txnApprovalsEnabled}
            offering={offering}
            order={order}
            price={price}
            myBacBalance={myBacBalance}
            swapContractAddress={swapContractAddress}
            refetchAllContracts={refetchAllPlusAccepted}
            callFillOrder={callFillOrder}
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
          />
        </div>
      )}

      {txnApprovalsEnabled && !isCompleted && (
        <div className="p-3 border-2 rounded-lg">
          {showTradeExecutionForm ? (
            <ShareCompleteSwap
              swapContractAddress={swapContractAddress}
              acceptedOrderQty={acceptedOrderQty as number}
              price={price}
              paymentTokenDecimals={paymentTokenDecimals}
              contractIndex={order.contractIndex}
              paymentTokenAddress={paymentTokenAddress}
              callFillOrder={callFillOrder}
            />
          ) : (
            <> {`2. Confirm your trade`}</>
          )}
        </div>
      )}
    </div>
  );
};

export default SharePurchaseSteps;

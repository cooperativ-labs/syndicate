import Button, { LoadingButtonStateType } from '@src/components/buttons/Button';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import ShareCompleteSwap from './ShareCompleteSwap';
import SharePurchaseRequest, { SharePurchaseRequestProps } from './SharePurchaseRequest';
import { acceptOrder, fillOrder, setAllowance } from '@src/web3/contractSwapCalls';
import { ADD_TRANSFER_EVENT } from '@src/utils/dGraphQueries/orders';
import { erc20ABI, useAccount, useBalance, useContractRead } from 'wagmi';

import OrderStatusBar from './OrderStatusBar';
import { getIsAllowanceSufficient } from '@src/utils/helpersAllowance';
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
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
  refetchAllContracts: () => void;
};

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  offering,
  order,
  shareQtyRemaining,
  shareContractAddress,
  isAskOrder,
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
  myShareQty,
  refetchAllContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [addTrade] = useMutation(ADD_TRANSFER_EVENT);

  const { data: orderQtyData, refetch } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [filler as String0x, BigInt(order.contractIndex)],
  });

  const { data: bacBalanceData } = useBalance({
    address: userWalletAddress,
    token: paymentTokenAddress,
  });

  const refetchAllPlusAccepted = () => {
    refetchAllContracts();
    refetch();
  };

  const myBacBalance = bacBalanceData?.formatted;
  const acceptedOrderQty = toNormalNumber(orderQtyData, shareContractDecimals);
  const isFiller = filler !== '0x0000000000000000000000000000000000000000';
  const organization = offering.offeringEntity.organization;
  const recipient = (isAskOrder ? filler : initiator) as String0x;
  const sender = (isAskOrder ? initiator : filler) as String0x;

  const currentUserFiller = userWalletAddress === filler;
  const currentUserInitiator = userWalletAddress === initiator;

  //there should be an on-completion toast or modal that confirms completions, but the form reset
  const showRequestForm =
    (!currentUserInitiator && !isAccepted && txnApprovalsEnabled) ||
    (!currentUserInitiator && !txnApprovalsEnabled && shareQtyRemaining > 0);
  // const showCancelForm = txnApprovalsEnabled && !isCompleted && !showRequestForm && isAccepted && currentUserFiller;
  const showTradeExecutionForm = isApproved && (isAskOrder ? currentUserFiller : currentUserInitiator && isFiller);

  const { data: allowanceData } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress],
  });

  type CallFillOrderType = {
    amount: number;
    setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  };

  const callFillOrder = async ({ amount, setButtonStep }: CallFillOrderType) => {
    if ((!isAskOrder && !currentUserInitiator) || (txnApprovalsEnabled && !isAccepted)) {
      setButtonStep('step2');
      await acceptOrder({
        swapContractAddress: swapContractAddress,
        contractIndex: order.contractIndex,
        amount: amount,
        offeringId: offering.id,
        organization: offering.offeringEntity?.organization,
        isAskOrder,
        refetchAllContracts: refetchAllPlusAccepted,
        setButtonStep: setButtonStep,
      });
    } else {
      const allowance = toNormalNumber(allowanceData, paymentTokenDecimals);
      const allowanceRequiredForPurchase = amount * price;
      const isAllowanceSufficient = getIsAllowanceSufficient(allowance, allowanceRequiredForPurchase);
      if (isAllowanceSufficient) {
        setButtonStep('step2');
        await fillOrder({
          swapContractAddress,
          shareContractAddress,
          contractIndex: order.contractIndex,
          amount: amount,
          price,
          paymentTokenDecimals,
          recipient,
          sender,
          partition,
          offeringId: offering.id,
          organization,
          addTrade: addTrade,
          setButtonStep: setButtonStep,
          refetchAllContracts: refetchAllPlusAccepted,
        });
      } else {
        setButtonStep('step1');
        await setAllowance({
          paymentTokenAddress,
          paymentTokenDecimals,
          spenderAddress: swapContractAddress,
          amount: allowanceRequiredForPurchase,
          setButtonStep,
        });
        setButtonStep('step2');
        await fillOrder({
          swapContractAddress,
          shareContractAddress,
          contractIndex: order.contractIndex,
          amount: amount,
          price,
          paymentTokenDecimals,
          recipient,
          sender,
          partition,
          offeringId: offering.id,
          organization,
          addTrade: addTrade,
          setButtonStep: setButtonStep,
          refetchAllContracts: refetchAllPlusAccepted,
        });
      }
    }
  };

  const firstStepTitle = () => {
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const action = isAskOrder ? 'purchase' : 'sell';
    const mainText = txnApprovalsEnabled ? `1. Request to ${action}` : `1. ${capitalizeFirstLetter(action)}`;

    return `${mainText} shares`;
  };

  return (
    <div className="flex flex-col w-full gap-3">
      <OrderStatusBar
        isApproved={isApproved}
        isDisapproved={isDisapproved}
        isAccepted={isAccepted}
        acceptedOrderQty={acceptedOrderQty}
        txnApprovalsEnabled={txnApprovalsEnabled}
        currentUserFiller={currentUserFiller}
        currentUserInitiator={currentUserInitiator}
        isAskOrder={isAskOrder}
      />

      {showRequestForm && (
        <>
          <hr className="border-gray-300 my-2" />
          <div className="p-3 border-2 rounded-lg ">
            {` ${firstStepTitle()}`}
            <SharePurchaseRequest
              txnApprovalsEnabled={txnApprovalsEnabled}
              offering={offering}
              order={order}
              price={price}
              shareQtyRemaining={shareQtyRemaining}
              myBacBalance={myBacBalance}
              callFillOrder={callFillOrder}
              isAskOrder={isAskOrder}
              myShareQty={myShareQty}
            />
          </div>
        </>
      )}

      {/* {showCancelForm && (
        <div className="p-3 border-2 rounded-lg">
          <Button onClick={cancelRequest}>Cancel Request</Button>
        </div>
      )} */}

      <div className="p-3 border-2 rounded-lg">
        {showTradeExecutionForm ? (
          <ShareCompleteSwap
            acceptedOrderQty={acceptedOrderQty as number}
            callFillOrder={callFillOrder}
            sender={sender}
            recipient={recipient}
            isAskOrder={isAskOrder}
            price={price}
            paymentTokenAddress={paymentTokenAddress}
          />
        ) : (
          <> {`2. Confirm your trade`}</>
        )}
      </div>
    </div>
  );
};

export default SharePurchaseSteps;

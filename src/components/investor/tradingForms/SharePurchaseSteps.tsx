import { useOffering } from '@contexts/OfferingContext';
import { LoadingButtonStateType } from '@src/components/ui/loading-button-chain';
import { addTransferEvent } from '@src/utils/actions/orderActions';
import { getIsAllowanceSufficient } from '@src/utils/helpersAllowance';
import { acceptOrder, fillOrder, setAllowance } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { erc20Abi, formatUnits } from 'viem';
import { useConnection, useReadContract } from 'wagmi';

import { SharePurchaseStepsProps } from './offering-actions-types';
import OrderStatusBar from './OrderStatusBar';
import ShareCompleteSwap from './ShareCompleteSwap';
import SharePurchaseSaleRequest from './SharePurchaseSaleRequest';

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  order,
  shareQtyRemaining,
  isAskOrder,
  partition,
  price,
  refetchOrderAndContracts,
  isApproved,
  isFilled,
  isAccepted,
  isCancelled,
  filler,
  initiator,
  filledAmount
}) => {
  const {
    offering,
    contractSet,
    paymentTokenAddress,
    paymentTokenDecimals,
    txnApprovalsRequired,
    myShareQty
  } = useOffering();

  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;

  const { address: userWalletAddress } = useConnection();

  const isEnded = isCancelled || isFilled;

  const { data: orderQtyData, refetch } = useReadContract({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [filler as String0x, BigInt(order.contract_index)]
  });

  const { data: bacBalanceData } = useReadContract({
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userWalletAddress ? [userWalletAddress as String0x] : undefined,
    query: {
      enabled: Boolean(userWalletAddress)
    }
  });

  const refetchAllPlusAccepted = () => {
    refetchOrderAndContracts();
    refetch();
  };

  const myBacBalance =
    bacBalanceData && paymentTokenDecimals
      ? formatUnits(bacBalanceData, paymentTokenDecimals)
      : undefined;
  const acceptedOrderQty = toNormalNumber(orderQtyData, shareContractDecimals);
  const isFiller = filler !== '0x0000000000000000000000000000000000000000';
  const organizationId = offering.legalEntity.organization_id.toString();
  const recipient = (isAskOrder ? filler : initiator) as String0x;
  const sender = (isAskOrder ? initiator : filler) as String0x;

  const currentUserFiller = userWalletAddress === filler;
  const currentUserInitiator = userWalletAddress === initiator;

  //there should be an on-completion toast or modal that confirms completions, but the form reset
  const showRequestForm =
    (!currentUserInitiator && !isAccepted && txnApprovalsRequired) ||
    (!currentUserInitiator && !txnApprovalsRequired && shareQtyRemaining > 0);
  // const showCancelForm = txnApprovalsRequired && !isFilled && !showRequestForm && isAccepted && currentUserFiller;
  const showTradeExecutionForm =
    (!isEnded && txnApprovalsRequired) || (isFiller && !txnApprovalsRequired);
  const isTradeExecutionStep =
    !isCancelled &&
    !isFilled &&
    isApproved &&
    (isAskOrder ? currentUserFiller : currentUserInitiator && isFiller);

  const { data: allowanceData } = useReadContract({
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress]
  });

  type CallFillOrderType = {
    amount: number;
    setButtonStep: Dispatch<SetStateAction<LoadingButtonStateType>>;
  };

  const callFillOrder = async ({ amount, setButtonStep }: CallFillOrderType) => {
    if ((!isAskOrder && !currentUserInitiator) || (txnApprovalsRequired && !isAccepted)) {
      setButtonStep('step1');
      await acceptOrder({
        swapContractAddress: swapContractAddress,
        contractIndex: order.contract_index,
        amount: amount,
        offeringId: offering.id.toString(),
        organizationId: organizationId,
        isAskOrder,
        refetchAllContracts: refetchAllPlusAccepted,
        setButtonStep: setButtonStep
      });
    } else {
      const allowance = toNormalNumber(allowanceData, paymentTokenDecimals);
      const allowanceRequiredForPurchase = amount * price;
      const isAllowanceSufficient = getIsAllowanceSufficient(
        allowance,
        allowanceRequiredForPurchase
      );
      if (isAllowanceSufficient) {
        setButtonStep('step2');
        await fillOrder({
          swapContractAddress,
          shareContractAddress,
          paymentTokenAddress,
          contractIndex: order.contract_index,
          amount: amount,
          price,
          paymentTokenDecimals,
          recipient,
          sender,
          partition,
          offeringId: offering.id.toString(),
          organizationId,
          addTrade: addTransferEvent,
          setButtonStep: setButtonStep,
          refetchAllContracts: refetchAllPlusAccepted
        });
      } else {
        setButtonStep('step1');
        await setAllowance({
          paymentTokenAddress,
          paymentTokenDecimals,
          spenderAddress: swapContractAddress,
          amount: allowanceRequiredForPurchase,
          setButtonStep
        });
        setButtonStep('step2');
        await fillOrder({
          swapContractAddress,
          shareContractAddress,
          paymentTokenAddress,
          contractIndex: order.contract_index,
          amount: amount,
          price,
          paymentTokenDecimals,
          recipient,
          sender,
          partition,
          offeringId: offering.id.toString(),
          organizationId,
          addTrade: addTransferEvent,
          setButtonStep: setButtonStep,
          refetchAllContracts: refetchAllPlusAccepted
        });
      }
    }
  };

  const firstStepTitle = () => {
    function capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const action = isAskOrder ? 'purchase' : 'sell';
    const mainText = txnApprovalsRequired
      ? `1. Request to ${action}`
      : `1. ${capitalizeFirstLetter(action)}`;
    return `${mainText} shares`;
  };

  return (
    <div className='flex flex-col w-full gap-3'>
      <OrderStatusBar
        isApproved={isApproved}
        isFilled={isFilled}
        isAccepted={isAccepted}
        acceptedOrderQty={acceptedOrderQty}
        txnApprovalsRequired={txnApprovalsRequired}
        currentUserFiller={currentUserFiller}
        currentUserInitiator={currentUserInitiator}
        isAskOrder={isAskOrder}
        swapContractAddress={swapContractAddress}
        contractIndex={order.contract_index}
        refetchOrderAndContracts={refetchOrderAndContracts}
      />

      {showRequestForm && (
        <>
          <hr className='border-gray-300 my-2' />
          <div className='p-3 border-2 rounded-lg '>
            {` ${firstStepTitle()}`}
            <SharePurchaseSaleRequest
              order={order}
              price={price}
              shareQtyRemaining={shareQtyRemaining}
              myBacBalance={myBacBalance}
              callFillOrder={callFillOrder}
              isAskOrder={isAskOrder}
            />
          </div>
        </>
      )}

      {showTradeExecutionForm && (
        <div className='p-3 border-2 rounded-lg'>
          <ShareCompleteSwap
            isTradeExecutionStep={isTradeExecutionStep}
            acceptedOrderQty={acceptedOrderQty as number}
            callFillOrder={callFillOrder}
            sender={sender}
            recipient={recipient}
            isAskOrder={isAskOrder}
            price={price}
            paymentTokenAddress={paymentTokenAddress}
          />
        </div>
      )}
    </div>
  );
};

export default SharePurchaseSteps;

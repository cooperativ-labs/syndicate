import React, { FC, useEffect, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import ShareCompleteSwap from './ShareCompleteSwap';
import SharePurchaseRequest, { SharePurchaseRequestProps } from './SharePurchaseRequest';
import { erc20ABI, useAccount, useBalance, useContractRead, useContractReads } from 'wagmi';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';

type SharePurchaseStepsProps = SharePurchaseRequestProps & {
  isApproved: boolean;
  isDisapproved: boolean;
  isCancelled: boolean;
  isAccepted: boolean;
  filler: String0x | '';
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
  permittedEntity,
  isApproved,
  isDisapproved,
  isCancelled,
  isAccepted,
  filler,
  initiator,
  refetchAllContracts,
}) => {
  const { address: userWalletAddress } = useAccount();

  const { data: orderQtyData, refetch } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [userWalletAddress, BigInt(order.contractIndex)],
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
  const acceptedOrderQty = orderQtyData && toNormalNumber(orderQtyData, shareContractDecimals);
  const currentUserFiller = userWalletAddress === filler;
  const currentUserPending = isAccepted && currentUserFiller;
  const otherOrderPending = isAccepted && !currentUserFiller;
  const showRequestForm = !isAccepted && txnApprovalsEnabled && shareQtyRemaining > 0;
  const showTradeExecutionForm = (isAccepted || !txnApprovalsEnabled) && isApproved;

  return (
    <div className="flex flex-col w-full gap-3">
      {currentUserPending ? (
        <div className="p-3 border-2 border-green-600 rounded-lg">
          {`Your request for ${numberWithCommas(acceptedOrderQty)} shares is pending`}
        </div>
      ) : (
        otherOrderPending && (
          <div className="p-3 border-2 border-orange-600 rounded-lg">{`Another investor's request is pending`}</div>
        )
      )}
      {showRequestForm && (
        <div className="p-3 border-2 rounded-lg">
          1. Apply to purchase shares
          <SharePurchaseRequest
            offering={offering}
            order={order}
            price={price}
            myBacBalance={myBacBalance}
            swapContractAddress={swapContractAddress}
            permittedEntity={permittedEntity}
            refetchAllContracts={refetchAllPlusAccepted}
          />
        </div>
      )}

      <div className="p-3 border-2 rounded-lg">
        2. Confirm your trade
        {showTradeExecutionForm && (
          <ShareCompleteSwap
            isAsk={isAsk}
            filler={filler as String0x}
            initiator={initiator as String0x}
            swapContractAddress={swapContractAddress}
            txnApprovalsEnabled={txnApprovalsEnabled}
            acceptedOrderQty={acceptedOrderQty}
            price={price}
            paymentTokenDecimals={paymentTokenDecimals}
            contractIndex={order.contractIndex}
            refetchAllContracts={refetchAllPlusAccepted}
            shareContractAddress={shareContractAddress}
            paymentTokenAddress={paymentTokenAddress}
            partition={partition}
          />
        )}
      </div>
    </div>
  );
};

export default SharePurchaseSteps;

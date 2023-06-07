import React, { FC, useEffect, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import ShareCompleteSwap from './ShareCompleteSwap';
import SharePurchaseRequest, { SharePurchaseRequestProps } from './SharePurchaseRequest';
import { erc20ABI, useAccount, useBalance, useContractReads } from 'wagmi';
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
  shareQtyRemaining: number;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
};

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  offering,
  sale,
  shareQtyRemaining,
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
  refetchAllContracts,
}) => {
  const [openStep, setOpenStep] = useState<number>(0);
  const [status, setStatus] = useState<string>('pending');
  const { address: userWalletAddress } = useAccount();

  const { data, refetch } = useContractReads({
    contracts: [
      {
        address: paymentTokenAddress,
        abi: erc20ABI,
        functionName: 'allowance',
        args: [userWalletAddress, swapContractAddress],
      },
      {
        address: swapContractAddress,
        abi: swapContractABI,
        functionName: 'acceptedOrderQty',
        args: [userWalletAddress, BigInt(sale.orderId)],
      },
    ],
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
  const allowance = data && toNormalNumber(data[0].result, paymentTokenDecimals);
  const acceptedOrderQty = data && toNormalNumber(data[1].result, shareContractDecimals);
  const allowanceRequiredForPurchase = acceptedOrderQty * price;
  const isAllowanceSufficient = allowance >= allowanceRequiredForPurchase;
  const currentUserFiller = userWalletAddress === filler;

  const currentUserPending = isAccepted && currentUserFiller;
  const otherOrderPending = isAccepted && !currentUserFiller;
  const showRequestForm = !isAccepted && txnApprovalsEnabled && shareQtyRemaining > 0;
  const showAllowanceForm = !isAllowanceSufficient && isAccepted && (isApproved || !txnApprovalsEnabled);
  const showTradeExecutionForm = isAccepted && isApproved && isAllowanceSufficient;

  useEffect(() => {
    if (showRequestForm) {
      setOpenStep(1);
    } else if (showAllowanceForm) {
      setOpenStep(2);
    } else if (showTradeExecutionForm) {
      setOpenStep(3);
    } else if (isCancelled) {
      setOpenStep(0);
      setStatus('cancelled');
    } else if (isDisapproved) {
      setOpenStep(0);
      setStatus('disapproved');
    } else {
      setOpenStep(0);
    }
  }, [showRequestForm, showAllowanceForm, showTradeExecutionForm, isCancelled, isDisapproved]);

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
          {openStep === 1 && (
            <SharePurchaseRequest
              offering={offering}
              sale={sale}
              price={price}
              myBacBalance={myBacBalance}
              swapContractAddress={swapContractAddress}
              permittedEntity={permittedEntity}
              refetchAllContracts={refetchAllPlusAccepted}
            />
          )}
        </div>
      )}

      <div className="p-3 border-2 rounded-lg">
        2. Permit the smart contract to move your money{' '}
        {openStep === 2 && (
          <SetAllowanceForm
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            spenderAddress={swapContractAddress}
            amount={allowanceRequiredForPurchase}
            refetchAllowance={refetch}
          />
        )}
      </div>

      <div className="p-3 border-2 rounded-lg">
        3. Confirm your trade
        {openStep === 3 && (
          <ShareCompleteSwap
            swapContractAddress={swapContractAddress}
            txnApprovalsEnabled={txnApprovalsEnabled}
            acceptedOrderQty={acceptedOrderQty}
            orderId={sale.orderId}
            refetchAllContracts={refetchAllContracts}
          />
        )}
      </div>
    </div>
  );
};

export default SharePurchaseSteps;

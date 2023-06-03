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
  paymentTokenAddress: String0x;
  txnApprovalsEnabled: boolean;
};

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  offering,
  sale,
  saleQty,
  soldQty,
  price,
  swapContractAddress,
  paymentTokenAddress,
  txnApprovalsEnabled,
  permittedEntity,
  isApproved,
  isDisapproved,
  isCancelled,
  isAccepted,
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
  const paymentTokenDecimals = bacBalanceData?.decimals;
  const allowance = data && toNormalNumber(data[0].result, paymentTokenDecimals);
  const acceptedOrderQty = data && toNormalNumber(data[1].result, shareContractDecimals);
  const allowanceRequiredForPurchase = acceptedOrderQty * price;
  const isAllowanceSufficient = allowance >= allowanceRequiredForPurchase * 1.1;

  useEffect(() => {
    if (!isAccepted && txnApprovalsEnabled) {
      setOpenStep(1);
    } else if (!isAllowanceSufficient && isAccepted && (isApproved || !txnApprovalsEnabled)) {
      setOpenStep(2);
    } else if (isAccepted && isApproved && isAllowanceSufficient) {
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
  }, [isApproved, isDisapproved, isCancelled, isAccepted, txnApprovalsEnabled, isAllowanceSufficient, allowance]);

  return (
    <div className="flex flex-col w-full gap-3">
      <div className="p-3 border-2 rounded-lg">
        1. Apply to purchase shares
        {openStep === 1 && (
          <SharePurchaseRequest
            offering={offering}
            sale={sale}
            saleQty={saleQty}
            soldQty={soldQty}
            price={price}
            myBacBalance={myBacBalance}
            swapContractAddress={swapContractAddress}
            permittedEntity={permittedEntity}
            refetchAllContracts={refetchAllPlusAccepted}
          />
        )}
      </div>
      <div className="p-3 border-2 rounded-lg">
        {isAccepted && `request for ${numberWithCommas(acceptedOrderQty)} shares pending`}
      </div>
      <div className="p-3 border-2 rounded-lg">
        2. Permit the smart contract to move your money{' '}
        {openStep === 2 && (
          <SetAllowanceForm
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            swapContractAddress={swapContractAddress}
            amount={allowanceRequiredForPurchase * 1.1}
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

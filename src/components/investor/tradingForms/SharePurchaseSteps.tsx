import React, { FC, useEffect, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import SharePurchaseForm, { SharePurchaseFormProps } from './SharePurchaseForm';
import SharePurchaseRequest, { SharePurchaseRequestProps } from './SharePurchaseRequest';
import { erc20ABI, useAccount, useContractRead, useContractReads } from 'wagmi';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';

type SharePurchaseStepsProps = SharePurchaseRequestProps &
  SharePurchaseFormProps & {
    isApproved: boolean;
    isDisapproved: boolean;
    isCancelled: boolean;
    isAccepted: boolean;
    paymentTokenAddress: String0x;
    filler: String0x;
    filledAmount: number;
    txnApprovalsEnabled: boolean;
  };

const SharePurchaseSteps: FC<SharePurchaseStepsProps> = ({
  offering,
  sale,
  saleQty,
  soldQty,
  price,
  myBacBalance,
  swapContractAddress,
  paymentTokenAddress,
  txnApprovalsEnabled,
  permittedEntity,
  isApproved,
  isDisapproved,
  isCancelled,
  isAccepted,
  filler,
  filledAmount,
  setRecallContract,
}) => {
  const [openStep, setOpenStep] = useState<number>(1);
  const [status, setStatus] = useState<string>('pending');
  const { address: userWalletAddress } = useAccount();

  const { data } = useContractReads({
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

  const allowance = data && Number(data[0].result);
  const acceptedOrderQty = data && Number(data[1].result);

  // NEED TO INSTRUCT THE USER TO SET ALLOWANCE MANUALLY WHEN NOT USING ACCEPT FUNCTION
  // NEED TO SET AMOUNT FOR FILLORDER WHEN NOT USING ACCEPT
  const allowanceRequiredForPurchase = acceptedOrderQty * price;

  useEffect(() => {
    if (!isAccepted) {
      setOpenStep(1);
    } else if (isAccepted && (isApproved || !txnApprovalsEnabled)) {
      setOpenStep(2);
    } else if (isAccepted && isApproved && allowance > 0) {
      setOpenStep(3);
    } else if (isCancelled) {
      setOpenStep(0);
      setStatus('cancelled');
    } else if (isDisapproved) {
      setOpenStep(0);
      setStatus('disapproved');
    }
  }, [isApproved, isDisapproved, isCancelled, isAccepted, txnApprovalsEnabled, allowance]);

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
            setRecallContract={setRecallContract}
          />
        )}
      </div>

      <div className="p-3 border-2 rounded-lg">
        2. Permit the smart contract to move your money{' '}
        {openStep === 2 && (
          <SetAllowanceForm
            paymentTokenAddress={paymentTokenAddress}
            swapContractAddress={swapContractAddress}
            amount={allowanceRequiredForPurchase}
          />
        )}
      </div>
      <div className="p-3 border-2 rounded-lg">3. Confirm your trade{openStep === 3 && <>This is where you pay</>}</div>
    </div>
  );
};

export default SharePurchaseSteps;

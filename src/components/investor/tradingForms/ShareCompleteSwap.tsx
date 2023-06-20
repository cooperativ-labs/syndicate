import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import React, { FC, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';

type ShareCompleteSwapProps = {
  contractIndex: number;
  price: number;
  paymentTokenDecimals: number;
  swapContractAddress: String0x;
  acceptedOrderQty: number;
  paymentTokenAddress: String0x;
  callFillOrder: (args: {
    amount: number;
    setButtonStep: React.Dispatch<React.SetStateAction<LoadingButtonStateType>>;
  }) => void;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({
  acceptedOrderQty,

  paymentTokenAddress,
  swapContractAddress,
  price,
  paymentTokenDecimals,
  callFillOrder,
}) => {
  const [buttonStep, setButtonStep] = useState<LoadingButtonStateType>('idle');
  const { address: userWalletAddress } = useAccount();

  const { data: allowanceData, refetch } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress],
  });

  // ABSTRACT THIS OUT
  const allowance = allowanceData && toNormalNumber(allowanceData, paymentTokenDecimals);
  const allowanceRequiredForPurchase = acceptedOrderQty * price;
  // const allowanceRequiredForPurchase = ((orderQty as number) * price) as number;

  const isAllowanceSufficient = allowance ? allowance >= allowanceRequiredForPurchase : false;

  return (
    <div className={'flex flex-col'}>
      {isAllowanceSufficient ? (
        <Button
          className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
          onClick={() => {
            callFillOrder({
              amount: acceptedOrderQty,
              setButtonStep: setButtonStep,
            });
          }}
        >
          <LoadingButtonText
            state={buttonStep}
            idleText={'Execute trade'}
            submittingText={'Executing...'}
            confirmedText={'Confirmed!'}
            failedText="Transaction failed"
            rejectedText="You rejected the transaction. Click here to try again."
          />
        </Button>
      ) : (
        <SetAllowanceForm
          paymentTokenAddress={paymentTokenAddress}
          paymentTokenDecimals={paymentTokenDecimals}
          spenderAddress={swapContractAddress}
          amount={allowanceRequiredForPurchase}
          refetchAllowance={refetch}
        />
      )}
    </div>
  );
};

export default ShareCompleteSwap;

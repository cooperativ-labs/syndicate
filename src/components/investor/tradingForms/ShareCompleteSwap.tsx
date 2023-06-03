import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { fillOrder } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';

import React, { FC, useState } from 'react';

type ShareCompleteSwapProps = {
  swapContractAddress: String0x;
  txnApprovalsEnabled: boolean;
  acceptedOrderQty: number;
  orderId: number;
  refetchAllContracts: () => void;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({
  swapContractAddress,
  acceptedOrderQty,
  txnApprovalsEnabled,
  orderId,
  refetchAllContracts,
}) => {
  const [amount, setAmount] = useState<number>(acceptedOrderQty);
  const [buttonStatus, setButtonStatus] = useState<LoadingButtonStateType>('idle');
  return (
    <div>
      {!txnApprovalsEnabled && (
        <input
          type="number"
          className="mr-2"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10))}
        />
      )}
      <Button
        className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
        onClick={() => {
          fillOrder({
            swapContractAddress: swapContractAddress,
            orderId: orderId,
            amount: txnApprovalsEnabled ? acceptedOrderQty : amount,
            setButtonStep: setButtonStatus,
            refetchAllContracts: refetchAllContracts,
          });
        }}
      >
        <LoadingButtonText
          state={buttonStatus}
          idleText={'Execute trade'}
          submittingText={'Executing...'}
          confirmedText={'Confirmed!'}
          failedText="Transaction failed"
          rejectedText="You rejected the transaction. Click here to try again."
        />
      </Button>
    </div>
  );
};

export default ShareCompleteSwap;

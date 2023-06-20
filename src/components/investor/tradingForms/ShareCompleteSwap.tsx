import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import { ADD_TRANSFER_EVENT } from '@src/utils/dGraphQueries/orders';
import { fillOrder } from '@src/web3/contractSwapCalls';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useMutation } from '@apollo/client';

import React, { FC, useState } from 'react';
import SetAllowanceForm from './SetAllowanceForm';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import { Organization } from 'types';

type ShareCompleteSwapProps = {
  contractIndex: number;
  isAsk: boolean;
  filler: String0x;
  initiator: String0x;
  price: number;
  paymentTokenDecimals: number;
  swapContractAddress: String0x;
  txnApprovalsEnabled: boolean;
  acceptedOrderQty: number;
  shareContractAddress: String0x;
  paymentTokenAddress: String0x;
  partition: String0x;
  offeringId: string;
  organization: Organization;
  refetchAllContracts: () => void;
};

const ShareCompleteSwap: FC<ShareCompleteSwapProps> = ({
  contractIndex,
  isAsk,
  swapContractAddress,
  acceptedOrderQty,
  price,
  paymentTokenDecimals,
  paymentTokenAddress,
  txnApprovalsEnabled,
  shareContractAddress,
  filler,
  initiator,
  partition,
  offeringId,
  organization,
  refetchAllContracts,
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [buttonStatus, setButtonStatus] = useState<LoadingButtonStateType>('idle');
  const [addTrade, { error: issuanceError }] = useMutation(ADD_TRANSFER_EVENT);
  const orderQty = txnApprovalsEnabled ? acceptedOrderQty : amount;
  const { address: userWalletAddress } = useAccount();

  const { data: allowanceData, refetch } = useContractRead({
    address: paymentTokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [userWalletAddress as String0x, swapContractAddress],
  });

  const allowance = allowanceData && toNormalNumber(allowanceData, paymentTokenDecimals);
  const allowanceRequiredForPurchase = orderQty * price;
  // const allowanceRequiredForPurchase = ((orderQty as number) * price) as number;

  const isAllowanceSufficient = allowance ? allowance >= allowanceRequiredForPurchase : false;

  const recipient = isAsk ? filler : initiator;
  const sender = isAsk ? initiator : filler;

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
      {isAllowanceSufficient ? (
        <Button
          className="rounded-lg p-3 bg-blue-500 hover:bg-blue-700 text-white font-medium"
          onClick={() => {
            fillOrder({
              swapContractAddress,
              shareContractAddress,
              contractIndex,
              amount: txnApprovalsEnabled ? orderQty : amount,
              price,
              paymentTokenDecimals,
              recipient,
              sender,
              partition,
              offeringId,
              organization,
              addTrade: addTrade,
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

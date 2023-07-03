import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import React, { FC, useState } from 'react';
import { cancelAcceptance } from '@src/web3/contractSwapCalls';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';

const buttonClass =
  'text-sm p-3 px-6 text-cLightBlue hover:text-white bg-white bg-opacity-50 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative ';

type OrderStatusBarProps = {
  isAccepted: boolean | undefined;
  acceptedOrderQty: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  currentUserFiller: boolean | undefined;
  currentUserInitiator: boolean | undefined;
  isAskOrder: boolean | undefined;
  isApproved: boolean | undefined;
  isFilled: boolean | undefined;
  swapContractAddress: String0x;
  contractIndex: number;
  refetchAllContracts: () => void;
};

const OrderStatusBar: FC<OrderStatusBarProps> = ({
  isAccepted,
  acceptedOrderQty,
  txnApprovalsEnabled,
  currentUserFiller,
  currentUserInitiator,
  isAskOrder,
  isApproved,
  isFilled,
  swapContractAddress,
  contractIndex,
  refetchAllContracts,
}) => {
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const manOfAction = isAskOrder ? currentUserFiller : currentUserInitiator;
  const currentUserPending = isAccepted && (currentUserFiller || currentUserInitiator) && !isApproved && !isFilled;
  const currentUserApproved = txnApprovalsEnabled && isAccepted && isApproved && manOfAction;
  const currentUserDisapproved = txnApprovalsEnabled && manOfAction && false;
  const otherOrderPending = txnApprovalsEnabled && isAccepted && !manOfAction;

  //check transaction events for disapproval

  const handleCancelAcceptance = async () => {
    await cancelAcceptance({
      swapContractAddress,
      contractIndex,
      setButtonStep: setCancelButtonStep,
      refetchAllContracts,
    });
  };

  const cancelAcceptanceButton = (
    <Button className={buttonClass} onClick={() => handleCancelAcceptance()} disabled={cancelButtonStep === 'step1'}>
      <LoadingButtonText
        state={cancelButtonStep}
        idleText="Cancel Request"
        step1Text="Canceling..."
        confirmedText="Request Cancelled!"
        failedText="Transaction failed"
        rejectedText="You rejected the transaction. Click here to try again."
      />
    </Button>
  );

  const cases = () => {
    if (currentUserPending) {
      return {
        color: 'border-orange-600 text-orange-600',
        text: `Your request for ${numberWithCommas(acceptedOrderQty as number)} shares is pending`,
      };
    } else if (currentUserApproved) {
      return {
        color: 'border-green-600 text-green-600',
        text: `Your request for ${numberWithCommas(acceptedOrderQty as number)} shares has been approved`,
      };
    } else if (currentUserDisapproved) {
      return {
        color: 'border-orange-600 text-orange-600',
        text: `Your request for ${numberWithCommas(acceptedOrderQty as number)} shares has been disapproved`,
      };
    } else if (otherOrderPending) {
      return { color: 'border-yellow-600 text-yellow-600', text: `Another investor's request is pending` };
    } else {
      return undefined;
    }
  };

  const { color, text } = cases() || { color: undefined, text: undefined };
  const className = cn(color, 'border-2 font-semibold p-3 rounded-lg flex items-center justify-between ');

  return cases() ? (
    <div className={className}>
      {text} {(currentUserPending || currentUserApproved) && cancelAcceptanceButton}
    </div>
  ) : (
    <></>
  );
};

export default OrderStatusBar;

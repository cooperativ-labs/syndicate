import cn from 'classnames';
import React, { FC } from 'react';
import { numberWithCommas } from '@src/utils/helpersMoney';

type OrderStatusBarProps = {
  isAccepted: boolean | undefined;
  acceptedOrderQty: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  currentUserFiller: boolean | undefined;
  currentUserInitiator: boolean | undefined;
  isAskOrder: boolean | undefined;
  isApproved: boolean | undefined;
  isDisapproved: boolean | undefined;
};

const OrderStatusBar: FC<OrderStatusBarProps> = ({
  isAccepted,
  acceptedOrderQty,
  txnApprovalsEnabled,
  currentUserFiller,
  currentUserInitiator,
  isAskOrder,
  isApproved,
  isDisapproved,
}) => {
  const manOfAction = isAskOrder ? currentUserFiller : currentUserInitiator;
  const currentUserPending = isAccepted && (currentUserFiller || currentUserInitiator) && !isApproved && !isDisapproved;
  const currentUserApproved = txnApprovalsEnabled && isAccepted && isApproved && manOfAction;
  const currentUserDisapproved = txnApprovalsEnabled && isAccepted && isDisapproved && manOfAction;
  const otherOrderPending = txnApprovalsEnabled && isAccepted && !manOfAction;

  const cases = () => {
    if (currentUserPending) {
      return {
        color: 'border-yellow-600 text-yellow-600',
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
  const className = cn(color, 'border-2 font-semibold p-3 rounded-lg ');

  return cases() ? <div className={className}>{text}</div> : <></>;
};

export default OrderStatusBar;

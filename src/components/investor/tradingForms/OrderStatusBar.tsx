import cn from 'classnames';
import React, { FC } from 'react';
import { numberWithCommas } from '@src/utils/helpersMoney';

type OrderStatusBarProps = {
  isAccepted: boolean | undefined;
  acceptedOrderQty: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  currentUserFiller: boolean | undefined;
  isApproved: boolean | undefined;
  isDisapproved: boolean | undefined;
  isCompleted: boolean | undefined;
};

const OrderStatusBar: FC<OrderStatusBarProps> = ({
  isAccepted,
  acceptedOrderQty,
  txnApprovalsEnabled,
  currentUserFiller,
  isApproved,
  isDisapproved,
  isCompleted,
}) => {
  const currentUserPending = isAccepted && currentUserFiller && !isApproved && !isDisapproved;
  const currentUserApproved = txnApprovalsEnabled && isAccepted && isApproved;
  const currentUserDisapproved = txnApprovalsEnabled && isAccepted && isDisapproved && currentUserFiller;
  const otherOrderPending = txnApprovalsEnabled && isAccepted && !currentUserFiller;

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
    } else if (isCompleted) {
      return {
        color: 'border-green-600 text-green-600',
        text: `Order completed: ${numberWithCommas(acceptedOrderQty as number)} shares transferred`,
      };
    } else {
      return { color: undefined, text: undefined };
    }
  };

  const color = cases().color;
  const className = cn(color, 'border-2 font-semibold p-3 rounded-lg');

  return <div className={className}>{cases().text}</div>;
};

export default OrderStatusBar;

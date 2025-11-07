import { cn } from '@src/lib/utils';
import { updateOrder } from '@src/utils/actions/orderActions';
import React, { FC } from 'react';

type OrderVisibilityToggleProps = {
  orderVisibility: boolean | undefined | null;
  orderArchived: boolean | undefined | null;
  orderId: string;
};
const OrderVisibilityToggle: FC<OrderVisibilityToggleProps> = ({
  orderVisibility,
  orderArchived,
  orderId
}) => {
  const handleToggle = () => {
    updateOrder({
      orderId: orderId,
      visible: !orderVisibility,
      archived: orderArchived ?? false
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex align-middle justify-between min-w-max">
        <span className="mr-2"> Visible to investors </span>
        <button
          className=" border-2 border-grey-50 rounded-full w-12 bg-white  mr-10"
          onClick={e => {
            e.preventDefault();
            handleToggle();
          }}
        >
          <div
            className={cn(
              [orderVisibility ? ' ml-5 bg-emerald-600' : 'bg-gray-400'],
              'h-6 w-6 rounded-full '
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default OrderVisibilityToggle;

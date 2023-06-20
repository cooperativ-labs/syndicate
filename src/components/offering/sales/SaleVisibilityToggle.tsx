import cn from 'classnames';
import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { UPDATE_ORDER } from '@src/utils/dGraphQueries/orders';
import { useMutation } from '@apollo/client';

type OrderVisibilityToggleProps = {
  orderVisibility: boolean | undefined | null;
  orderArchived: boolean | undefined | null;
  orderId: string;
};
const OrderVisibilityToggle: FC<OrderVisibilityToggleProps> = ({ orderVisibility, orderArchived, orderId }) => {
  const [updateOrderObject, { data, error }] = useMutation(UPDATE_ORDER);

  const handleToggle = () => {
    updateOrderObject({
      variables: {
        currentDate: currentDate,
        orderId: orderId,
        visible: !orderVisibility,
        archived: orderArchived,
      },
    });
  };

  return (
    <div className="flex items-center">
      <div className="flex align-middle justify-between min-w-max">
        <span className="mr-2"> Visible to investors </span>
        <button
          className=" border-2 border-grey-50 rounded-full w-12 bg-white  mr-10"
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
          }}
        >
          <div className={cn([orderVisibility ? ' ml-5 bg-emerald-600' : 'bg-gray-400'], 'h-6 w-6 rounded-full ')} />
        </button>
      </div>
    </div>
  );
};

export default OrderVisibilityToggle;

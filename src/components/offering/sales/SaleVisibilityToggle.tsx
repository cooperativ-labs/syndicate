import { Switch } from '@src/components/ui/switch';
import { updateOrder } from '@src/utils/actions/orderActions';
import React, { FC, useEffect, useState } from 'react';

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
  const [optimisticVisibility, setOptimisticVisibility] = useState<boolean>(
    orderVisibility ?? false
  );

  useEffect(() => {
    setOptimisticVisibility(orderVisibility ?? false);
  }, [orderVisibility]);

  const handleToggle = async (nextVisibility: boolean) => {
    setOptimisticVisibility(nextVisibility);
    try {
      await updateOrder({
        orderId,
        visible: nextVisibility,
        archived: orderArchived ?? false,
        revalidationPath: {
          path: '/manager/[organizationId]/offerings/[offeringId]',
          type: 'layout'
        }
      });
    } catch (error) {
      console.error('Failed to update order visibility', error);
      setOptimisticVisibility(prev => !prev);
    }
  };

  return (
    <div className='flex items-center justify-between min-w-max'>
      <span className='mr-2 text-sm font-medium text-gray-700'>Visible to investors</span>
      <Switch
        checked={optimisticVisibility}
        onCheckedChange={checked => {
          void handleToggle(checked);
        }}
        aria-label='Toggle investor visibility'
        className='mr-10'
      />
    </div>
  );
};

export default OrderVisibilityToggle;

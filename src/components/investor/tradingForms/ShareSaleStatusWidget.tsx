import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { cn } from '@src/lib/utils';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { String0x } from '@src/web3/helpersChain';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';
import React, { FC } from 'react';
import { useConnection, useChainId } from 'wagmi';

import { ShareOrder } from '@/types';

import SaleManagerPanel from './ShareManagerPanel';

type ShareOrderStatusItemProps = {
  order: ShareOrder | undefined;
  swapContractAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  swapApprovalsEnabled: boolean | undefined;
};

const ShareOrderStatusItem: FC<ShareOrderStatusItemProps> = ({
  order,
  swapContractAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  swapApprovalsEnabled
}) => {
  const contractIndex = order ? order?.contract_index : 0;
  if (!paymentTokenDecimals) {
    throw new Error('Payment token decimals are required (ShareOrderStatusItem)');
  }
  const { initiator, amount, filledAmount, isApproved, isCancelled, isAccepted, isFilled, filler } =
    useOrderDetails(swapContractAddress, contractIndex, paymentTokenDecimals);
  const chainId = useChainId();
  const sharesRemaining = getAmountRemaining({ x: amount, minus: filledAmount });
  const status =
    order &&
    getSwapStatusOption({
      amount,
      filledAmount,
      isFiller: !!filler,
      isApproved,
      isFilled,
      isCancelled,
      isAccepted,
      txnApprovalsEnabled,
      swapApprovalsEnabled,
      isVisible: order?.visible ?? false
    });

  const statusColor = status?.color;
  return (
    <div className='flex justify-between items-center p-1 px-2 border-2 rounded-md my-1'>
      <div className='text-sm font-bold'>
        <FormattedCryptoAddress chainId={chainId} address={initiator} />{' '}
      </div>
      <div
        className={cn(
          'text-xs font-semibold rounded-md max-w-min px-1 h-5 border-2 min-w-max',
          `text-${statusColor}`,
          // 'text-white font-semibold',
          `border-${statusColor}`
        )}
      >
        {status?.name}
      </div>
    </div>
  );
};

type ShareSaleStatusWidgetProps = {
  orders: ShareOrder[] | undefined;
  swapContractAddress: String0x | undefined;
  paymentTokenAddress: String0x | undefined;
  paymentTokenDecimals: number | undefined;
  txnApprovalsEnabled: boolean | undefined;
  swapApprovalsEnabled: boolean | undefined;
  isContractOwner: boolean;
};

const ShareSaleStatusWidget: FC<ShareSaleStatusWidgetProps> = ({
  orders,
  txnApprovalsEnabled,
  swapApprovalsEnabled,
  paymentTokenDecimals,
  swapContractAddress,
  isContractOwner
}) => {
  const { address: userWalletAddress } = useConnection();
  const myOrders =
    orders && orders?.filter(order => order?.initiator === userWalletAddress || isContractOwner);

  return (
    <>
      {myOrders?.map(order => (
        <ShareOrderStatusItem
          key={order?.contract_index}
          order={order}
          swapContractAddress={swapContractAddress}
          paymentTokenDecimals={paymentTokenDecimals}
          txnApprovalsEnabled={txnApprovalsEnabled}
          swapApprovalsEnabled={swapApprovalsEnabled}
        />
      ))}
    </>
  );
};

export default ShareSaleStatusWidget;

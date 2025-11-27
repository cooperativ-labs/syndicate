import { useOffering } from '@contexts/OfferingContext';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { cn } from '@src/lib/utils';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { String0x } from '@src/web3/helpersChain';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';
import React, { FC } from 'react';
import { useChainId, useConnection } from 'wagmi';

import { ShareOrder } from '@/types';

import { ShareSaleStatusWidgetProps } from './offering-actions-types';

type ShareOrderStatusItemProps = {
  order: ShareOrder | undefined;
  swapContractAddress: String0x | undefined;
  paymentTokenDecimals: number;
  txnApprovalsRequired: boolean | undefined;
  listingApprovalsRequired: boolean | undefined;
};

const ShareOrderStatusItem: FC<ShareOrderStatusItemProps> = ({
  order,
  swapContractAddress,
  paymentTokenDecimals,
  txnApprovalsRequired,
  listingApprovalsRequired
}) => {
  const contractIndex = order ? order?.contract_index : 0;
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
      txnApprovalsRequired,
      listingApprovalsRequired,
      isVisible: order?.visible ?? false
    });

  const statusColor = status?.color;
  return (
    <div className="flex flex-col p-1 px-2 border-2 rounded-md my-2 gap-1">
      <div className="text-sm font-bold">
        <FormattedCryptoAddress chainId={chainId} address={initiator} />{' '}
      </div>
      <div
        className={cn(
          'text-xs font-semibold rounded-md max-w-min px-1 h-5 border-2 min-w-max',
          `text-${statusColor}`,
          `border-${statusColor}`
        )}
      >
        {status?.name}
      </div>
    </div>
  );
};

const ShareSaleStatusWidget: FC<ShareSaleStatusWidgetProps> = () => {
  const {
    orders,
    contractSet,
    paymentTokenDecimals,
    txnApprovalsRequired,
    listingApprovalsRequired,
    isContractOwner
  } = useOffering();

  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;
  const { address: userWalletAddress } = useConnection();

  if (!paymentTokenDecimals) {
    return null;
  }

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
          txnApprovalsRequired={txnApprovalsRequired}
          listingApprovalsRequired={listingApprovalsRequired}
        />
      ))}
    </>
  );
};

export default ShareSaleStatusWidget;

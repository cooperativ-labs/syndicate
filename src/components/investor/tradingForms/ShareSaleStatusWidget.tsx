import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC } from 'react';
import SaleManagerPanel from './ShareManagerPanel';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { Maybe, ShareOrder } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId } from 'wagmi';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

type ShareOrderStatusItemProps = {
  order: Maybe<ShareOrder>;
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
  swapApprovalsEnabled,
}) => {
  const contractIndex = order ? order?.contractIndex : 0;
  const { initiator, amount, filledAmount, isApproved, isCancelled, isAccepted, isFilled, filler } = useOrderDetails(
    swapContractAddress,
    contractIndex,
    paymentTokenDecimals
  );
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
      isVisible: order.visible,
    });

  const statusColor = status?.color;
  return (
    <div className="flex justify-between items-center p-1 px-2 border-2 rounded-md my-1">
      <div className="text-sm font-bold">
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
  orders: Maybe<ShareOrder>[];
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
  isContractOwner,
}) => {
  const { address: userWalletAddress } = useAccount();
  const myOrders = orders && orders?.filter((order) => order?.initiator === userWalletAddress || isContractOwner);

  return (
    <>
      {myOrders?.map((order) => (
        <ShareOrderStatusItem
          key={order?.contractIndex}
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

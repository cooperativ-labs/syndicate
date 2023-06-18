import Button from '@src/components/buttons/Button';

import React, { Dispatch, FC, SetStateAction } from 'react';
import ShareSaleListItem, { ShareSaleListItemProps } from './ShareSaleListItem';
import { Maybe, ShareOrder } from 'types';
import { ManagerModalType } from '@src/utils/helpersOffering';
export type ShareSaleListProps = ShareSaleListItemProps & {
  orders: Maybe<ShareOrder>[] | undefined;
  setModal: Dispatch<SetStateAction<ManagerModalType>>;
};

const ShareSaleList: FC<ShareSaleListProps> = ({
  offering,
  orders,
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,

  isContractOwner,
  setModal,
  refetchMainContracts,
  refetchOffering,
}) => {
  const saleButton = (
    <Button
      className="mt-4 p-3 shadow-md rounded-md bg-slate-300 w-full uppercase font-semibold"
      onClick={() => {
        setModal('saleForm');
      }}
    >
      Post Bid/Ask
    </Button>
  );

  if (orders && orders.length < 1) {
    return <>{saleButton}</>;
  }

  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold">{`Offers`}</h2>
      {orders?.map((order, i) => {
        return (
          <div key={i}>
            <ShareSaleListItem
              index={i}
              offering={offering}
              order={order as ShareOrder}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              isContractOwner={isContractOwner}
              setModal={setModal}
              refetchMainContracts={refetchMainContracts}
              paymentTokenDecimals={paymentTokenDecimals}
              shareContractAddress={shareContractAddress}
              refetchOffering={refetchOffering}
            />
          </div>
        );
      })}

      {<>{saleButton}</>}
    </>
  );
};

export default ShareSaleList;

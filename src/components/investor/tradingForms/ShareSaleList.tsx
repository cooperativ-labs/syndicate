import Button from '@src/components/buttons/Button';

import React, { Dispatch, FC, SetStateAction } from 'react';
import ShareSaleListItem, { ShareSaleListItemProps } from './ShareSaleListItem';

import { ShareOrder } from 'types';

type ShareSaleListProps = ShareSaleListItemProps & {
  orders: ShareOrder[];
  setSaleFormModal: Dispatch<SetStateAction<boolean>>;
};

const ShareSaleList: FC<ShareSaleListProps> = ({
  offering,
  orders: offers,
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  permittedEntity,
  isContractOwner,
  setSaleFormModal,
  setShareSaleManagerModal,
  refetchMainContracts,
}) => {
  const saleButton = (
    <Button
      className="mt-4 p-3 shadow-md rounded-md bg-slate-300 w-full uppercase font-semibold"
      onClick={() => {
        setSaleFormModal(true), setShareSaleManagerModal(false);
      }}
    >
      Post Bid/Ask
    </Button>
  );

  if (offers.length < 1) {
    return <>{saleButton}</>;
  }

  return (
    <>
      <h2 className="text-xl text-blue-900 font-semibold">{`Offers`}</h2>
      {offers.map((order, i) => {
        return (
          <div key={i}>
            <ShareSaleListItem
              index={i}
              offering={offering}
              order={order}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              txnApprovalsEnabled={txnApprovalsEnabled}
              permittedEntity={permittedEntity}
              isContractOwner={isContractOwner}
              setShareSaleManagerModal={setShareSaleManagerModal}
              refetchMainContracts={refetchMainContracts}
              paymentTokenDecimals={paymentTokenDecimals}
              shareContractAddress={shareContractAddress}
            />
          </div>
        );
      })}

      {<>{saleButton}</>}
    </>
  );
};

export default ShareSaleList;

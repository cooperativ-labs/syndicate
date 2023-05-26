import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import SharePurchaseForm from './SharePurchaseForm';
import { Offering, OfferingParticipant, OfferingSale } from 'types';

import OfferingSummaryPanel from './OfferingSummaryPanel';
import { DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

import { String0x } from '@src/web3/helpersChain';

import SaleManagerPanel from './ShareManagerPanel';
import { getSale, SaleContentsType } from '@src/web3/reachCalls';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ReachContext } from '@src/SetReachContext';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

type ShareSaleListItemProps = {
  index: number;
  offering: Offering;
  sale: OfferingSale;
  myBacBalance: number;
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  walletAddress: string;
  permittedEntity: OfferingParticipant;
  isContractOwner: boolean;
  setModal: (boolean) => void;
  setRecallContract: Dispatch<SetStateAction<string>>;
};
const ShareSaleListItem: FC<ShareSaleListItemProps> = ({
  index,
  offering,
  sale,
  myBacBalance,
  swapContractAddress,
  paymentTokenAddress,
  permittedEntity,
  walletAddress,
  isContractOwner,
  setModal,
  setRecallContract,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const isOfferor = walletAddress === sale.initiator;
  const minPurchase = sale.minUnits;
  const maxPurchase = sale.maxUnits;

  const {
    initiator,
    partition,
    amount,
    price,
    filledAmount,
    filler,
    isApproved,
    isDisapproved,
    isCancelled,
    isAccepted,
    isShareIssuance,
    isAskOrder,
    isErc20Payment,
    isLoading,
  } = useOrderDetails(swapContractAddress, sale.orderId, paymentTokenAddress);

  if ((!isApproved && isContractOwner) || isApproved) {
    return (
      <div className="items-center shadow-md rounded-md my-5 ">
        <div
          className="grid grid-cols-12 p-3 rounded-md bg-slate-100 items-center hover:cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex justify-center font-semibold text-lg">{index + 1}.</div>
          <div className="flex justify-between col-span-11">
            <OfferingSummaryPanel
              seller={sale.initiator}
              saleQty={amount}
              soldQty={filledAmount}
              price={price}
              paymentTokenAddress={paymentTokenAddress}
            />
            <div className="flex items-center p-1">
              {isOfferor && (
                <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                  Manage your offer
                </button>
              )}
              {!isApproved && (
                <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                  Review sale request
                </button>
              )}
              {!open ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}
            </div>
          </div>
        </div>
        {open && (
          <div className="p-2">
            {isOfferor ? (
              <>
                {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} units</div>}
                {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} units</div>}
                {!!maxPurchase && <hr className="my-4" />}
                <SaleManagerPanel
                  isOfferor={isOfferor}
                  isContractOwner={isContractOwner}
                  offeringId={offering.id}
                  isApproved={isApproved}
                  sale={sale}
                  swapContractAddress={swapContractAddress}
                  btId={paymentTokenAddress}
                />
              </>
            ) : (
              <SharePurchaseForm
                offering={offering}
                sale={sale}
                saleQty={amount}
                soldQty={filledAmount}
                price={price}
                myBacBalance={myBacBalance}
                swapContractAddress={swapContractAddress}
                permittedEntity={permittedEntity}
                setModal={setModal}
                setRecallContract={setRecallContract}
              />
            )}
          </div>
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export default ShareSaleListItem;

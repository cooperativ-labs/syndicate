import OfferingSummaryPanel from './OfferingSummaryPanel';
import React, { FC, useState } from 'react';
import SaleManagerPanel from './ShareManagerPanel';
import SharePurchaseSteps from './SharePurchaseSteps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { Offering, OfferingParticipant, ShareOrder } from 'types';
import { useAccount } from 'wagmi';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

export type OrderStatusType = {
  isApproved: boolean;
  isDisapproved: boolean;
  isAccepted: boolean;
  isCancelled: boolean;
};

export type ShareSaleListItemProps = {
  offering: Offering;
  swapContractAddress: String0x;
  shareContractAddress: String0x;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
  permittedEntity: OfferingParticipant;
  isContractOwner: boolean;
  setShareSaleManagerModal: (boolean) => void;
  refetchMainContracts: () => void;
};

type Addendum = ShareSaleListItemProps & {
  index: number;
  order: ShareOrder;
};

const ShareSaleListItem: FC<Addendum> = ({
  index,
  offering,
  order,
  swapContractAddress,
  shareContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  permittedEntity,
  isContractOwner,
  setShareSaleManagerModal,
  refetchMainContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [open, setOpen] = useState<boolean>(false);

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
    refetchOrderDetails,
  } = useOrderDetails(swapContractAddress, order.contractIndex, paymentTokenDecimals);

  function refetchAllContracts() {
    refetchMainContracts();
    refetchOrderDetails();
  }

  const isOfferor = normalizeEthAddress(userWalletAddress) === normalizeEthAddress(initiator);
  const shareQtyRemaining = amount - filledAmount;

  return (
    <>
      {isOfferor || isContractOwner || order.visible ? (
        <div className="items-center shadow-md rounded-md my-5 ">
          <div
            className="grid grid-cols-12 p-3 rounded-md bg-slate-100 items-center hover:cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="flex justify-center font-semibold text-lg">{index + 1}.</div>
            <div className="flex justify-between col-span-11">
              <OfferingSummaryPanel
                seller={initiator}
                shareQtyRemaining={shareQtyRemaining}
                price={price}
                paymentTokenAddress={paymentTokenAddress}
              />
              <div className="flex items-center p-1">
                {isOfferor && (
                  <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                    Manage your offer
                  </button>
                )}
                {!isApproved && filler && txnApprovalsEnabled && isContractOwner && (
                  <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                    Review order request
                  </button>
                )}
                {!open ? <FontAwesomeIcon icon="chevron-down" /> : <FontAwesomeIcon icon="chevron-up" />}
              </div>
            </div>
          </div>
          {open && (
            <div className="p-2">
              {isOfferor || isContractOwner ? (
                <SaleManagerPanel
                  isOfferor={isOfferor}
                  isContractOwner={isContractOwner}
                  offeringId={offering.id}
                  isApproved={isApproved}
                  isDisapproved={isDisapproved}
                  isAccepted={isAccepted}
                  isCancelled={isCancelled}
                  isFilled={shareQtyRemaining === 0}
                  filler={filler}
                  order={order}
                  swapContractAddress={swapContractAddress}
                  txnApprovalsEnabled={txnApprovalsEnabled}
                  paymentTokenAddress={paymentTokenAddress}
                  paymentTokenDecimals={paymentTokenDecimals}
                  refetchAllContracts={refetchAllContracts}
                />
              ) : (
                <SharePurchaseSteps
                  offering={offering}
                  order={order}
                  shareQtyRemaining={shareQtyRemaining}
                  price={price}
                  swapContractAddress={swapContractAddress}
                  isAsk={isAskOrder}
                  permittedEntity={permittedEntity}
                  refetchAllContracts={refetchAllContracts}
                  isApproved={isApproved}
                  isDisapproved={isDisapproved}
                  isCancelled={isCancelled}
                  isAccepted={isAccepted}
                  filler={filler}
                  paymentTokenAddress={paymentTokenAddress}
                  paymentTokenDecimals={paymentTokenDecimals}
                  txnApprovalsEnabled={txnApprovalsEnabled}
                  shareContractAddress={shareContractAddress}
                  partition={partition as String0x}
                  initiator={initiator}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ShareSaleListItem;

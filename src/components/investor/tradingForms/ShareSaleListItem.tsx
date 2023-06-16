import OfferingSummaryPanel from './OfferingSummaryPanel';
import React, { FC, useState } from 'react';
import SaleManagerPanel, { SaleMangerPanelProps } from './ShareManagerPanel';
import SharePurchaseSteps from './SharePurchaseSteps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { Maybe, Offering, OfferingParticipant, ShareOrder } from 'types';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { useAccount } from 'wagmi';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';

export type OrderStatusType = {
  isApproved: boolean;
  isDisapproved: boolean;
  isAccepted: boolean;
  isCancelled: boolean;
};

export type ShareSaleListItemProps = SaleMangerPanelProps & {
  offering: Offering;
  shareContractAddress: String0x | undefined;
  permittedEntity: Maybe<OfferingParticipant> | undefined;
  setShareSaleManagerModal: (value: boolean) => void;
  refetchMainContracts: () => void;
};

type AdditionalShareSaleListItemProps = ShareSaleListItemProps & {
  index: number;
  order: ShareOrder;
};

const ShareSaleListItem: FC<AdditionalShareSaleListItemProps> = ({
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
  refetchOffering,
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

  const shareQtyRemaining = getAmountRemaining({ x: amount, minus: filledAmount });

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
                  isAskOrder={isAskOrder}
                  filler={filler}
                  initiator={initiator as String0x}
                  order={order}
                  amount={amount}
                  price={price}
                  shareContractAddress={shareContractAddress}
                  partition={partition}
                  swapContractAddress={swapContractAddress}
                  txnApprovalsEnabled={txnApprovalsEnabled}
                  paymentTokenAddress={paymentTokenAddress}
                  paymentTokenDecimals={paymentTokenDecimals}
                  refetchAllContracts={refetchAllContracts}
                  refetchOffering={refetchOffering}
                />
              ) : (
                <SharePurchaseSteps
                  offering={offering}
                  order={order}
                  shareQtyRemaining={shareQtyRemaining as number}
                  price={price as number}
                  swapContractAddress={swapContractAddress as String0x}
                  isAsk={isAskOrder as boolean}
                  permittedEntity={permittedEntity as OfferingParticipant}
                  refetchAllContracts={refetchAllContracts as () => void}
                  isApproved={isApproved as boolean}
                  isDisapproved={isDisapproved as boolean}
                  isCancelled={isCancelled as boolean}
                  isAccepted={isAccepted as boolean}
                  filler={filler as String0x}
                  paymentTokenAddress={paymentTokenAddress as String0x}
                  paymentTokenDecimals={paymentTokenDecimals as number}
                  txnApprovalsEnabled={txnApprovalsEnabled as boolean}
                  shareContractAddress={shareContractAddress as String0x}
                  partition={partition as String0x}
                  initiator={initiator as String0x}
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

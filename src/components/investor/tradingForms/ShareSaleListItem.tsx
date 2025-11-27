//AI should reference @ai-order-flows.md for the flow types

import { useOffering } from '@contexts/OfferingContext';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import { cn } from '@src/lib/utils';
import { getSwapStatusOption } from '@src/utils/enumConverters';
import { getAmountRemaining } from '@src/utils/helpersOffering';
import { getDisapprovedTransferEvents } from '@src/utils/helpersOrder';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { useOrderDetails } from '@src/web3/hooks/useOrderDetails';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { FC, useState } from 'react';
import { useChainId, useConnection } from 'wagmi';

import { ShareSaleListItemProps } from './offering-actions-types';
import OfferingSummaryPanel from './OfferingSummaryPanel';
import SaleManagerPanel from './ShareManagerPanel';
import SharePurchaseSteps from './SharePurchaseSteps';

const ShareSaleListItem: FC<ShareSaleListItemProps> = ({ order }) => {
  const {
    offering,
    contractSet,
    paymentTokenAddress,
    paymentTokenDecimals,
    txnApprovalsRequired,
    listingApprovalsRequired,
    isContractOwner,
    transferEvents,
    refetchMainContracts
  } = useOffering();

  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const { address: userWalletAddress } = useConnection();
  const chainId = useChainId();
  const [open, setOpen] = useState<boolean>(false);

  if (!paymentTokenDecimals) {
    throw new Error('Payment token decimals are required (ShareSaleListItem)');
  }
  if (!swapContractAddress) {
    throw new Error('Swap contract address is required (ShareSaleListItem)');
  }

  const {
    initiator,
    partition,
    amount,
    price,
    filledAmount,
    filler,
    isApproved,
    isFilled,
    isCancelled,
    isAccepted,
    isAskOrder,
    refetchOrderDetails
  } = useOrderDetails(swapContractAddress, order.contract_index, paymentTokenDecimals);

  function refetchOrderAndContracts() {
    refetchMainContracts();
    refetchOrderDetails();
  }
  const isFiller = filler !== '0x0000000000000000000000000000000000000000';
  const currentUserFiller = normalizeEthAddress(userWalletAddress) === normalizeEthAddress(filler);
  const currentUserInitiator =
    normalizeEthAddress(userWalletAddress) === normalizeEthAddress(initiator);
  const shareQtyRemaining = getAmountRemaining({ x: amount, minus: filledAmount });

  const status =
    order &&
    getSwapStatusOption({
      amount,
      filledAmount,
      isFiller,
      isApproved,
      isFilled,
      isCancelled,
      isAccepted,
      txnApprovalsRequired,
      listingApprovalsRequired,
      isVisible: order?.visible ?? false
    });

  const disapprovedTransferEvents = getDisapprovedTransferEvents(
    transferEvents,
    order,
    userWalletAddress,
    isContractOwner
  );
  const isDisapproved = !isAccepted && disapprovedTransferEvents?.length ? true : false;
  const disapprovedTransferEvent = disapprovedTransferEvents?.slice(-1)[0];

  const showOrder = order.visible || currentUserInitiator || isContractOwner;
  const showPurchaseSteps =
    !order.archived && !isFilled && (!currentUserInitiator || (!isAskOrder && isFiller));

  return (
    <>
      {showOrder && (
        <div className={'relative items-center shadow-md hover:shadow-lg rounded-md my-5 '}>
          <div
            className="rounded-md bg-slate-100 items-center hover:cursor-pointer"
            onClick={() => {
              setOpen(!open);
              refetchMainContracts();
            }}
          >
            <div className="flex flex-col">
              {currentUserInitiator && (
                <div className="flex justify-end items-center pr-3 border-b-2 border-green-600 text-green-600 text-xs uppercase font-semibold rounded-t-md ">
                  <div className="">{`Your ${isAskOrder ? 'sell' : 'purchase'} offer`}</div>
                </div>
              )}
              {isDisapproved && (
                <div className="flex justify-end items-center pr-3 border-b-2 border-red-700 text-red-700 text-xs uppercase font-semibold rounded-t-md ">
                  {`Manager rejected your proposal to purchase ${disapprovedTransferEvent?.amount} shares`}
                </div>
              )}
              <div className="grid grid-cols-12 p-3">
                <div className="flex col-span-8">
                  <OfferingSummaryPanel
                    shareQtyRemaining={shareQtyRemaining}
                    shareQtyOffered={amount}
                    partition={partition}
                    price={price}
                    paymentTokenAddress={paymentTokenAddress}
                  />
                </div>
                <div className="flex col-span-3 justify-end items-center">
                  <div className={`p-2  rounded-md text-${status.color} text-sm uppercase`}>
                    {status.name}
                  </div>
                </div>

                <div className="flex items-center p-1 justify-end">
                  {!open ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </div>
              </div>
            </div>
          </div>
          {open && (
            <div>
              <div className="flex items-center border-b-2 bg-slate-200">
                <div className=" p-1 pl-3 flex justify-between text-sm w-full">
                  <div className="flex items-center">
                    {`${isAskOrder ? 'Seller' : 'Buyer'}`}
                    <FormattedCryptoAddress
                      className="ml-1"
                      chainId={chainId}
                      address={initiator}
                      withCopy
                    />
                  </div>
                  <div className={` p-1 px-2 items-center text-xs`}>
                    offer Id: {order?.contract_index}
                  </div>
                </div>
              </div>

              <div className="p-2 pt-4 bg-slate-100">
                {(currentUserInitiator || isContractOwner) && (
                  <SaleManagerPanel
                    order={order}
                    currentUserFiller={currentUserFiller}
                    currentUserInitiator={currentUserInitiator}
                    isApproved={isApproved}
                    isDisapproved={isDisapproved}
                    isAccepted={isAccepted}
                    isCancelled={isCancelled}
                    isFilled={isFilled}
                    isAskOrder={isAskOrder}
                    filler={filler}
                    initiator={initiator as String0x}
                    amount={amount}
                    price={price}
                    partition={partition}
                  />
                )}
                {showPurchaseSteps && (
                  <SharePurchaseSteps
                    order={order}
                    shareQtyRemaining={shareQtyRemaining as number}
                    price={price as number}
                    isAskOrder={isAskOrder as boolean}
                    refetchOrderAndContracts={refetchOrderAndContracts}
                    isApproved={isApproved as boolean}
                    isFilled={isFilled as boolean}
                    isCancelled={isCancelled as boolean}
                    isAccepted={isAccepted as boolean}
                    filledAmount={filledAmount as number}
                    filler={filler as String0x}
                    partition={partition as String0x}
                    initiator={initiator as String0x}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShareSaleListItem;

/* 

dead swap block {
       - sees disapproved - isDisapproved && !isCancelled
      - sees cancelled - isCancelled 
      - sees filled - fullyFilled
      - sees complete - This does not come from the contract. Perhaps we should show a transaction list 
}

*/

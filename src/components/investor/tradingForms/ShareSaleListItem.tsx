import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import SharePurchaseForm from './SharePurchaseForm';
import { Offering, OfferingParticipant, OfferingSale } from 'types';

import OfferingSummaryPanel from './OfferingSummaryPanel';
import { DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingButtonStateType } from '@src/components/buttons/Button';

import { StandardChainErrorHandling } from '@src/web3/helpersChain';
import { useAsyncFn } from 'react-use';
import { useMutation } from '@apollo/client';

import SaleManagerPanel from './ShareManagerPanel';
import { getSale, SaleContentsType } from '@src/web3/reachCalls';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ReachContext } from '@src/SetReachContext';

type ShareSaleListItemProps = {
  index: number;
  offering: Offering;
  sale: OfferingSale;
  initiator: string;
  myBacBalance: number;
  contractId: string;
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
  initiator,
  myBacBalance,
  contractId,
  permittedEntity,
  walletAddress,
  isContractOwner,
  setModal,
  setRecallContract,
}) => {
  const { reachLib, reachAcc } = useContext(ReachContext);
  const [open, setOpen] = useState<boolean>(false);
  const [saleContents, setSaleContents] = useState<SaleContentsType>({
    qty: 0,
    qtySold: 0,
    price: 0,
    proceeds: 0,
    saleDetails: undefined,
    status: undefined,
    btId: undefined,
  });

  const isOfferor = walletAddress === sale.initiator;
  const minPurchase = sale.minUnits;
  const maxPurchase = sale.maxUnits;

  const retrieveSale = () => {
    getSale(reachLib, reachAcc, contractId, initiator, setSaleContents);
  };

  useEffect(() => {
    if (!saleContents.price) {
      retrieveSale();
    }
  }, [saleContents, retrieveSale]);

  if (
    (saleContents.status === 'initd' && isContractOwner) ||
    saleContents.status === 'partl' ||
    saleContents.status === 'apprv'
  ) {
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
              saleQty={saleContents.qty}
              soldQty={saleContents.qtySold}
              price={saleContents.price}
              investmentCurrency={offering.details.investmentCurrency}
            />
            <div className="flex items-center p-1">
              {isOfferor && (
                <button className="flex items-center p-1 px-2 mr-4 border-2 border-cDarkBlue rounded-md">
                  Manage your offer
                </button>
              )}
              {saleContents.status === 'initd' && (
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
            {isOfferor || saleContents.status === 'initd' ? (
              <>
                {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} units</div>}
                {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} units</div>}
                {!!maxPurchase && <hr className="my-4" />}
                <SaleManagerPanel
                  isOfferor={isOfferor}
                  isContractOwner={isContractOwner}
                  offeringId={offering.id}
                  status={saleContents.status}
                  sale={sale}
                  contractId={contractId}
                  recallGetSale={retrieveSale}
                  proceeds={saleContents.proceeds}
                  btId={saleContents.btId}
                />
              </>
            ) : (
              <SharePurchaseForm
                offering={offering}
                sale={sale}
                saleQty={saleContents.qty}
                soldQty={saleContents.qtySold}
                price={saleContents.price}
                myBacBalance={myBacBalance}
                contractId={contractId}
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

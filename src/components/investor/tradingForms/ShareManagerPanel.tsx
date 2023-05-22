import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import React, { FC, useContext, useState } from 'react';
import SaleVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { approveSwap, cancelSale, claimProceeds } from '@src/web3/reachCalls';
import { DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { getCurrencyById, SaleStatusType } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { OfferingSale } from 'types';
import { ReachContext } from '@src/SetReachContext';
import { useMutation } from '@apollo/client';

type SaleMangerPanelProps = {
  offeringId: string;
  isOfferor: boolean;
  status: SaleStatusType;
  proceeds: number;
  btId: string;
  sale: OfferingSale;
  shareContractId: string;
  isContractOwner: boolean;
  small?: boolean;
  recallGetSale: (state: string) => void;
};

const SaleManagerPanel: FC<SaleMangerPanelProps> = ({
  offeringId,
  isOfferor,
  status,
  proceeds,
  btId,
  sale,
  shareContractId,
  isContractOwner,
  small,
  recallGetSale,
}) => {
  const { reachLib } = useContext(ReachContext);
  const [deleteSaleObject, { data, error }] = useMutation(DELETE_SALE);
  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');

  return (
    <div>
      <div className={cn(small ? 'flex flex-col gap-2' : 'flex gap-3')}>
        {proceeds > 0 && isOfferor && (
          <Button
            className="text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full"
            onClick={() => claimProceeds(reachLib, shareContractId, proceeds, setClaimProceedsButton, recallGetSale)}
            disabled={claimProceedsButton === 'submitting'}
          >
            <LoadingButtonText
              state={claimProceedsButton}
              idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(btId).symbol}`}
              submittingText="Claiming Proceeds..."
              confirmedText="Proceeds Claimed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
        {proceeds === 0 && isOfferor && (
          <Button
            className="text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full"
            onClick={() =>
              cancelSale(
                reachLib,
                shareContractId,
                offeringId,
                sale.id,
                status,
                setCancelButtonStep,
                recallGetSale,
                deleteSaleObject
              )
            }
            disabled={cancelButtonStep === 'submitting'}
          >
            <LoadingButtonText
              state={cancelButtonStep}
              idleText="Cancel Offer"
              submittingText="Canceling Sale..."
              confirmedText="Sale Cancelled!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
        {status === 'initd' && isContractOwner ? (
          <Button
            className="text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full"
            onClick={() => approveSwap(reachLib, shareContractId, sale.initiator, setApproveButtonStep, recallGetSale)}
            disabled={approveButtonStep === 'submitting'}
          >
            <LoadingButtonText
              state={approveButtonStep}
              idleText="Approve Listing"
              submittingText="Approving Listing..."
              confirmedText="Listing Approved!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        ) : (
          isContractOwner && sale && <SaleVisibilityToggle saleVisibility={sale.visible} saleId={sale.id} />
        )}
      </div>
    </div>
  );
};

export default SaleManagerPanel;

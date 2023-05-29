import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import React, { FC, useContext, useState } from 'react';
import SaleVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { approveSwap, cancelSwap, claimProceeds } from '@src/web3/contractFunctionCalls';
import { DELETE_SALE } from '@src/utils/dGraphQueries/offering';
import { getCurrencyById, SaleStatusType } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { OfferingSale } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { useAccount, useContractRead } from 'wagmi';
import { useMutation } from '@apollo/client';

type SaleMangerPanelProps = {
  offeringId: string;
  isOfferor: boolean;
  isApproved: boolean;
  btId: string;
  sale: OfferingSale;
  swapContractAddress: String0x;
  isContractOwner: boolean;
  small?: boolean;
};

const SaleManagerPanel: FC<SaleMangerPanelProps> = ({
  offeringId,
  isOfferor,
  isApproved,
  btId,
  sale,
  swapContractAddress,
  isContractOwner,
  small,
}) => {
  const { address: userWalletAddress } = useAccount();
  const [deleteSaleObject, { data, error }] = useMutation(DELETE_SALE);
  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');

  const {
    data: contractData,
    isLoading,
    error: contractError,
  } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress],
  });
  const proceeds = Number(contractData[1]) ?? 0;

  return (
    <div>
      <div className={cn(small ? 'flex flex-col gap-2' : 'flex gap-3')}>
        {proceeds > 0 && isOfferor && (
          <Button
            className="text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full"
            onClick={() => claimProceeds(swapContractAddress, setClaimProceedsButton)}
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
              cancelSwap(swapContractAddress, sale.orderId, sale.id, offeringId, setCancelButtonStep, deleteSaleObject)
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
        {!isApproved && isContractOwner ? (
          <Button
            className="text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full"
            onClick={() => approveSwap(swapContractAddress, sale.orderId, setApproveButtonStep)}
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

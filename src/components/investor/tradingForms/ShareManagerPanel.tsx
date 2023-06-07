import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import cn from 'classnames';
import FormattedCryptoAddress from '@src/components/FormattedCryptoAddress';
import React, { FC, useState } from 'react';
import SaleVisibilityToggle from '@src/components/offering/sales/SaleVisibilityToggle';
import { approveRejectSwap, cancelSwap, claimProceeds } from '@src/web3/contractSwapCalls';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { DELETE_SALE, UPDATE_SALE } from '@src/utils/dGraphQueries/offering';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { OfferingSale } from 'types';
import { shareContractDecimals, toNormalNumber } from '@src/web3/util';
import { String0x } from '@src/web3/helpersChain';
import { swapContractABI } from '@src/web3/generated';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useMutation } from '@apollo/client';

type SaleMangerPanelProps = {
  offeringId: string;
  isOfferor: boolean;
  isApproved: boolean;
  isDisapproved: boolean;
  isAccepted: boolean;
  filler: String0x | '';
  sale: OfferingSale;
  swapContractAddress: String0x;
  paymentTokenAddress: String0x;
  paymentTokenDecimals: number;
  txnApprovalsEnabled: boolean;
  isContractOwner: boolean;
  small?: boolean;
  refetchAllContracts: () => void;
};

const SaleManagerPanel: FC<SaleMangerPanelProps> = ({
  offeringId,
  isOfferor,
  isApproved,
  isDisapproved,
  isAccepted,
  filler,
  sale,
  swapContractAddress,
  paymentTokenAddress,
  paymentTokenDecimals,
  txnApprovalsEnabled,
  isContractOwner,
  small,
  refetchAllContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const chainId = useChainId();
  const [deleteSaleObject] = useMutation(DELETE_SALE);
  const [updateSaleObject, { data, error }] = useMutation(UPDATE_SALE);
  const [approveButtonStep, setApproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [disapproveButtonStep, setDisapproveButtonStep] = useState<LoadingButtonStateType>('idle');
  const [cancelButtonStep, setCancelButtonStep] = useState<LoadingButtonStateType>('idle');
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');

  const { data: contractData } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress],
  });

  const { data: acceptedQty } = useContractRead({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'acceptedOrderQty',
    args: [filler as String0x, BigInt(sale.orderId)],
  });

  const acceptedOrderQty = acceptedQty && toNormalNumber(acceptedQty, shareContractDecimals);

  // Note: contractData[0] is eth, contractData[1] is erc20
  const rawProceeds = contractData && contractData[1];
  const proceeds = rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const minPurchase = sale.minUnits;
  const maxPurchase = sale.maxUnits;

  const handleApprove = async () => {
    await approveRejectSwap({
      swapContractAddress,
      orderId: sale.orderId,
      isDisapprove: false,
      setButtonStep: setApproveButtonStep,
      refetchAllContracts,
    });
    updateSaleObject({
      variables: {
        currentDate: currentDate,
        saleId: sale.id,
        visible: true,
      },
    });
  };

  const handleDisapprove = async () => {
    await approveRejectSwap({
      swapContractAddress,
      orderId: sale.orderId,
      isDisapprove: true,
      setButtonStep: setDisapproveButtonStep,
      refetchAllContracts,
    });
  };

  const buttonClass =
    'text-sm p-3 px-6 text-cLightBlue hover:text-white bg-opacity-100 hover:bg-opacity-1 hover:bg-cDarkBlue border-2 border-cLightBlue hover:border-white font-semibold rounded-md relative w-full';
  return (
    <div className="flex flex-col">
      {!!minPurchase && <div>Minimum purchase: {numberWithCommas(minPurchase)} shares</div>}
      {!!maxPurchase && <div>Maximum purchase: {numberWithCommas(maxPurchase)} shares</div>}
      {!!maxPurchase && <hr className="my-4" />}
      <div className={cn(small ? 'flex flex-col gap-2' : 'grid grid-cols-2 gap-3')}>
        {isOfferor && proceeds === 0 && (
          <Button
            className={buttonClass}
            onClick={() =>
              cancelSwap({
                swapContractAddress,
                orderId: sale.orderId,
                saleId: sale.id,
                offeringId,
                setButtonStep: setCancelButtonStep,
                deleteSaleObject,
              })
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
        {isOfferor && proceeds !== 0 && (
          <Button
            className={buttonClass}
            onClick={() => claimProceeds({ swapContractAddress, setButtonStep: setClaimProceedsButton })}
            disabled={claimProceedsButton === 'submitting'}
          >
            <LoadingButtonText
              state={claimProceedsButton}
              idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress).symbol}`}
              submittingText="Claiming Proceeds..."
              confirmedText="Proceeds Claimed!"
              failedText="Transaction failed"
              rejectedText="You rejected the transaction. Click here to try again."
            />
          </Button>
        )}
        {isContractOwner && sale && <SaleVisibilityToggle saleVisibility={sale.visible} saleId={sale.id} />}
      </div>
      {/* if swapsApprovals are enabled but txnApprovals are not - show approve button (or disapprove if already approved) */}
      {/* if both txnApprovals are turned on, then only show button when enabled  */}

      {(!txnApprovalsEnabled || isAccepted) && isContractOwner && !isDisapproved && (
        <div className=" mt-3 grid grid-cols-2 gap-3">
          {!isApproved && (
            <Button className={buttonClass} onClick={handleApprove} disabled={approveButtonStep === 'submitting'}>
              <LoadingButtonText
                state={approveButtonStep}
                idleText={`Approve ${txnApprovalsEnabled ? 'Trade' : 'Listing'}`}
                submittingText="Approving..."
                confirmedText="Confirmed"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          )}
          <div>
            <Button className={buttonClass} onClick={handleDisapprove} disabled={approveButtonStep === 'submitting'}>
              <LoadingButtonText
                state={disapproveButtonStep}
                idleText={`Disapprove ${txnApprovalsEnabled ? 'Trade' : 'Listing'}`}
                submittingText="Disapprove..."
                confirmedText="Confirmed"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          </div>

          <div className="flex flex-col">
            <FormattedCryptoAddress chainId={chainId} address={filler} label="Requester: " />
            Shares requested: {acceptedOrderQty}
          </div>
        </div>
      )}
    </div>
  );
};

export default SaleManagerPanel;

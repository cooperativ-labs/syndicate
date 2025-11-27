import { useOffering } from '@contexts/OfferingContext';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import CloseButton from '@src/components/buttons/CloseButton';
import { OfferingActionsProps } from '@src/components/investor/tradingForms/offering-actions-types';
import PostBidAskForm from '@src/components/investor/tradingForms/PostBidAskForm';
import PostInitialSale from '@src/components/investor/tradingForms/PostInitialSale';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import Loading from '@src/components/loading/Loading';
import { Button } from '@src/components/ui/button';
import { LoadingButton } from '@src/components/ui/loading-button';
import { Popover, PopoverContent, PopoverTrigger } from '@src/components/ui/popover';
import FormModal from '@src/containers/FormModal';
import { getCurrencyById } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { claimProceeds } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import React, { FC, useState } from 'react';
import { useConnection, useReadContract } from 'wagmi';

import SendShares from '../SendShares';

import SmartContractsSettings from './SmartContractsSettings';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;

const OfferingActions: FC<OfferingActionsProps> = () => {
  const {
    offering,
    documents,
    isOfferingManager,
    hasContract,
    isContractOwner,
    contractSet,
    orders,
    noLiveOrders,
    paymentTokenAddress,
    paymentTokenDecimals,
    issueReachingContract,
    isLoading,
    refetchMainContracts,
    refetchOfferingInfo
  } = useOffering();

  const [managerModal, setManagerModal] = useState<ManagerModalType>('none');
  const [isExistingShares, setIsExistingShares] = useState<boolean>(false);
  const [claimProceedsButton, setClaimProceedsButton] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const [isSendPopoverOpen, setIsSendPopoverOpen] = useState<boolean>(false);

  const { name: offeringName } = offering;

  const { address: userWalletAddress } = useConnection();
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;

  const hasOrders = orders && orders.length > 0;

  const { data: contractData } = useReadContract({
    address: swapContractAddress,
    abi: swapContractABI,
    functionName: 'unclaimedProceeds',
    args: [userWalletAddress as String0x]
  });

  const rawProceeds = contractData && contractData[1];
  const proceeds =
    paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const handleClaimProceeds = async () => {
    await claimProceeds({
      swapContractAddress,
      setButtonStep: (state: any) => {
        if (state === 'idle' || state === 'confirmed') {
          setClaimProceedsButton('success');
        } else if (state === 'failed' || state === 'rejected') {
          setClaimProceedsButton('error');
        } else if (state === 'step1' || state === 'step2' || state === 'step3') {
          setClaimProceedsButton('loading');
        }
      }
    });
  };

  const refetchAllContracts = () => {
    refetchMainContracts();
    refetchOfferingInfo();
  };

  const FormModals = (
    <>
      <FormModal
        formOpen={managerModal === 'shareSaleList'}
        onClose={() => setManagerModal('none')}
        title={`Manage shares of ${offeringName}`}
      >
        {userWalletAddress && <ShareSaleList setModal={setManagerModal} />}
      </FormModal>
      <FormModal
        formOpen={managerModal === 'smartContractsSettings'}
        onClose={() => setManagerModal('none')}
        title={`Smart contract settings`}
      >
        <SmartContractsSettings />
      </FormModal>
      <FormModal
        formOpen={managerModal === 'saleForm'}
        onClose={() => setManagerModal('none')}
        title={`${isExistingShares ? 'Sell' : 'Offer new'} shares of ${offeringName}`}
      >
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsExistingShares(!isExistingShares)}
        >{`${
          isExistingShares
            ? 'Create a fresh offering of orders'
            : 'Sell existing shares from your wallet instead.'
        }`}</Button>
        {isExistingShares ? (
          <PostBidAskForm
            walletAddress={userWalletAddress as string}
            setModal={setManagerModal}
            refetchAllContracts={refetchAllContracts}
          />
        ) : (
          <PostInitialSale setModal={setManagerModal} />
        )}
      </FormModal>
    </>
  );

  const ButtonPanel = (
    <div className='flex flex-col w-full gap-3'>
      {isOfferingManager ? (
        <>
          <Button
            variant='default'
            className='p-3'
            onClick={() => setManagerModal('smartContractsSettings')}
          >
            Configure shares & trading
          </Button>

          <Popover open={isSendPopoverOpen} onOpenChange={setIsSendPopoverOpen}>
            <PopoverTrigger asChild>
              <Button>Send shares</Button>
            </PopoverTrigger>
            <PopoverContent className='w-[300px] max-w-[90vw] p-0 rounded-md'>
              <div className='relative  p-4 rounded-md'>
                <div className='absolute -top-1 right-0 z-40'>
                  <CloseButton onClick={() => setIsSendPopoverOpen(false)} />
                </div>
                <SendShares />
              </div>
            </PopoverContent>
          </Popover>
          {swapContractAddress ? (
            <Button
              onClick={() => {
                setManagerModal('shareSaleList');
              }}
            >
              Manage Share Sales
            </Button>
          ) : (
            <></>
          )}
          {proceeds !== 0 && (
            <LoadingButton
              buttonState={claimProceedsButton}
              setButtonState={setClaimProceedsButton}
              text={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
              loadingText='Claiming Proceeds...'
              successText='Proceeds Claimed!'
              errorText='Transaction failed'
              reset
              onClick={handleClaimProceeds}
            />
          )}
        </>
      ) : (
        <div>The offeror has not yet created shares or your wallet is not connected.</div>
      )}
    </div>
  );

  const NoContract = isOfferingManager ? (
    <>
      {(issueReachingContract.share || issueReachingContract.swap) && !!shareContractAddress && (
        <div className='text-sm text-red-700 font-semibold mb-2'>
          There was an issue reaching the contract. Please contact your administrator.
        </div>
      )}
      <Button
        variant='default'
        className='p-3'
        onClick={() => setManagerModal('smartContractsSettings')}
      >
        Configure shares & trading
      </Button>
    </>
  ) : (
    <>The offeror has not yet created shares or your wallet is not connected.</>
  );

  return (
    <>
      {FormModals}
      {isLoading ? (
        <div className='flex justify-center self-center'>
          <Loading />
        </div>
      ) : (
        <>
          <div className=''>{!hasContract ? NoContract : ButtonPanel}</div>
          {hasOrders && paymentTokenAddress && <ShareSaleStatusWidget />}
        </>
      )}
    </>
  );
};

export default OfferingActions;

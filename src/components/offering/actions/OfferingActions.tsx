i;
import { Maybe, ShareOrder, ShareTransferEvent } from '@/types';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import CloseButton from '@src/components/buttons/CloseButton';
import PostBidAskForm, {
  PostBidAskFormProps
} from '@src/components/investor/tradingForms/PostBidAskForm';
import PostInitialSale, {
  PostInitialSaleProps
} from '@src/components/investor/tradingForms/PostInitialSale';
import ShareSaleList, {
  ShareSaleListProps
} from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import Loading from '@src/components/loading/Loading';
import { Button } from '@src/components/ui/button';
import { LoadingButton } from '@src/components/ui/loading-button';
import FormModal from '@src/containers/FormModal';
import { getCurrencyById } from '@src/utils/enumConverters';
import { GET_USER } from '@src/utils/graphQueries/user';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { claimProceeds } from '@src/web3/contractSwapCalls';
import { swapContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import React, { FC, useState } from 'react';
import { useAccount, useContractRead } from 'wagmi';

import SendShares from '../SendShares';

import SmartContractsSettings, { SmartContractsSettingsProps } from './SmartContractsSettings';

export const standardClass = `text-white hover:shadow-md bg-cLightBlue hover:bg-cDarkBlue text-sm p-3 px-6 font-semibold rounded-md relative mt-3'`;
export type ActionPanelActionsProps = boolean | 'send' | 'distribute' | 'sale';

type OfferingActionsProps = SmartContractsSettingsProps &
  PostBidAskFormProps &
  PostInitialSaleProps & {
    orders: Maybe<ShareOrder>[] | undefined;
    hasContract: boolean;
    loading: boolean | undefined;
    isOfferingManager: boolean;
    retrievalIssue: boolean;
    issueReachingContract: { share: boolean; swap: boolean };
    userId: string | undefined;
    transferEvents: ShareTransferEvent[] | undefined;
  };

const OfferingActions: FC<OfferingActionsProps> = ({
  retrievalIssue,
  hasContract,
  issueReachingContract,
  loading,
  isOfferingManager,
  offering,
  paymentTokenAddress,
  paymentTokenDecimals,
  swapApprovalsEnabled,
  txnApprovalsEnabled,
  sharesOutstanding,
  orders,
  contractSet,
  isContractOwner,
  noLiveOrders,
  partitions,
  transferEvents,
  refetchMainContracts,
  refetchOfferingInfo,
  currentSalePrice,
  myShareQty,
  userId
}) => {
  const { data: userData } = useQuery(GET_USER, { variables: { id: userId } });
  const user = userData?.queryUser[0];

  const [managerModal, setManagerModal] = useState<ManagerModalType>('none');

  const [isExistingShares, setIsExistingShares] = useState<boolean>(false);
  const [claimProceedsButton, setClaimProceedsButton] = useState<
    'default' | 'disabled' | 'loading' | 'success' | 'error'
  >('default');
  const [showActionPanel, setShowActionPanel] = useState<ActionPanelActionsProps>(false);

  // const [updateDistribution, { data: updateDistributionData }] = useMutation(UPDATE_DISTRIBUTION);

  const { id, participants, details } = offering;

  const { address: userWalletAddress } = useAccount();
  const shareContractId = contractSet?.shareContract?.id as string;
  const shareContractAddress = contractSet?.shareContract?.cryptoAddress.address as String0x;
  const swapContractAddress = contractSet?.swapContract?.cryptoAddress.address as String0x;

  const offeringName = offering.name;
  const offeringMin = offering.details?.minUnitsPerInvestor;
  const investmentCurrency = offering.details?.investmentCurrency;
  const sharesIssued = offering.details?.numUnits;
  const hasOrders = orders && orders.length > 0;

  const { data: contractData } = useContractRead({
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

  const FormModals = (
    <>
      <FormModal
        formOpen={managerModal === 'shareSaleList'}
        onClose={() => setManagerModal('none')}
        title={`Manage shares of ${offeringName}`}
      >
        {userWalletAddress && (
          <ShareSaleList
            offering={offering}
            orders={orders}
            swapContractAddress={swapContractAddress}
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            isContractOwner={isContractOwner === !!isOfferingManager}
            setModal={setManagerModal}
            refetchMainContracts={refetchMainContracts}
            txnApprovalsEnabled={txnApprovalsEnabled}
            swapApprovalsEnabled={swapApprovalsEnabled}
            shareContractAddress={shareContractAddress}
            refetchOfferingInfo={refetchOfferingInfo}
            myShareQty={myShareQty}
            transferEvents={transferEvents}
          />
        )}
      </FormModal>
      <FormModal
        formOpen={managerModal === 'smartContractsSettings'}
        onClose={() => setManagerModal('none')}
        title={`Smart contract settings`}
      >
        <SmartContractsSettings
          user={user}
          offering={offering}
          partitions={partitions}
          contractSet={contractSet}
          noLiveOrders={noLiveOrders}
          investmentCurrency={investmentCurrency}
          swapApprovalsEnabled={swapApprovalsEnabled}
          txnApprovalsEnabled={txnApprovalsEnabled}
          refetchMainContracts={refetchMainContracts}
        />
      </FormModal>
      <FormModal
        formOpen={managerModal === 'saleForm'}
        onClose={() => setManagerModal('none')}
        title={`${isExistingShares ? 'Sell' : 'Offer new'} shares of ${offeringName}`}
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExistingShares(!isExistingShares)}
        >{`${
          isExistingShares
            ? 'Create a fresh offering of orders'
            : 'Sell existing shares from your wallet instead.'
        }`}</Button>
        {isExistingShares ? (
          <PostBidAskForm
            offering={offering}
            offeringMin={offeringMin}
            sharesOutstanding={sharesOutstanding}
            walletAddress={userWalletAddress as String0x}
            myShareQty={myShareQty}
            swapContractAddress={swapContractAddress}
            isContractOwner={isContractOwner === !!isOfferingManager}
            currentSalePrice={currentSalePrice}
            setModal={setManagerModal}
            partitions={partitions}
            paymentTokenDecimals={paymentTokenDecimals}
            refetchAllContracts={refetchMainContracts}
            refetchOfferingInfo={refetchOfferingInfo}
            swapApprovalsEnabled={swapApprovalsEnabled}
          />
        ) : (
          <PostInitialSale
            sharesIssued={sharesIssued}
            sharesOutstanding={sharesOutstanding}
            offeringId={offering.id}
            priceStart={offering.details?.priceStart}
            swapContractAddress={swapContractAddress}
            shareContractId={shareContractId}
            partitions={partitions}
            paymentTokenAddress={paymentTokenAddress}
            paymentTokenDecimals={paymentTokenDecimals}
            setModal={setManagerModal}
            refetchAllContracts={refetchMainContracts}
            refetchOfferingInfo={refetchOfferingInfo}
          />
        )}
      </FormModal>
      {/* <FormModal formOpen={bidFormModel} onClose={() => setBidFormModel(false)} title={`Bid for shares of ${offeringName}`}>
  <ShareBidForm
    offering={offering}
    walletAddress={userWalletAddress}
    offeringMin={details?.minUnitsPerInvestor}
    shareContractAddress={shareContractAddress}
    permittedEntity={permittedEntity}
    setModal={setBidFormModel}
    setRecallContract={setRecallContract}
  />
</FormModal> */}
    </>
  );

  const ActionPanel = (
    <div className=" relative mt-4 bg-gray-100 p-4 rounded-md">
      <div className="absolute -top-1 right-0 z-40">
        <CloseButton
          onClick={() => {
            setShowActionPanel(false);
          }}
        />
      </div>
      {showActionPanel === 'send' && (
        <SendShares
          investmentCurrency={investmentCurrency}
          currentSalePrice={currentSalePrice}
          sharesIssued={details?.numUnits}
          sharesOutstanding={sharesOutstanding}
          shareContractAddress={shareContractAddress}
          shareContractId={shareContractId}
          offeringParticipants={participants}
          partitions={partitions}
          myShareQty={myShareQty}
          refetchMainContracts={refetchMainContracts}
        />
      )}
    </div>
  );

  const ButtonPanel = (
    <div className="flex flex-col w-full gap-3">
      {isOfferingManager ? (
        <>
          <Button
            variant="default"
            className="p-3"
            onClick={() => setManagerModal('smartContractsSettings')}
          >
            Configure shares & trading
          </Button>

          <Button
            onClick={() => {
              setShowActionPanel('send');
            }}
          >
            Send shares
          </Button>
          {swapContractAddress ? (
            <Button
              onClick={() => {
                setManagerModal('shareSaleList');
              }}
            >
              Manage Share Sales
            </Button>
          ) : (
            <Button
              onClick={() => {
                setManagerModal('smartContractsSettings');
              }}
            >
              Configure trading
            </Button>
          )}
          {proceeds !== 0 && (
            <LoadingButton
              buttonState={claimProceedsButton}
              setButtonState={setClaimProceedsButton}
              text={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
              loadingText="Claiming Proceeds..."
              successText="Proceeds Claimed!"
              errorText="Transaction failed"
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
        <div className="text-sm text-red-700 font-semibold mb-2">
          There was an issue reaching the contract. Please contact your administrator.
        </div>
      )}
      <Button
        variant="default"
        className="p-3"
        onClick={() => setManagerModal('smartContractsSettings')}
      >
        Configure shares & trading
      </Button>
    </>
  ) : (
    <>The offeror has not yet created shares or your wallet is not connected.</>
  );

  const myOrder = orders && orders?.find(order => order?.initiator === userWalletAddress);

  return (
    <>
      {FormModals}
      {retrievalIssue ? (
        <RetrievalIssue className="mt-10" />
      ) : loading ? (
        <div className="flex justify-center self-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="">
            {!hasContract ? NoContract : showActionPanel ? ActionPanel : ButtonPanel}
          </div>
          {hasOrders && (
            <ShareSaleStatusWidget
              orders={orders}
              swapContractAddress={swapContractAddress}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              txnApprovalsEnabled={txnApprovalsEnabled}
              swapApprovalsEnabled={swapApprovalsEnabled}
              isContractOwner={isContractOwner}
            />
          )}
        </>
      )}
    </>
  );
};

export default OfferingActions;

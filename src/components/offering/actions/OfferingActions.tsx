import Button, { LoadingButtonStateType, LoadingButtonText } from '@src/components/buttons/Button';
import CloseButton from '@src/components/buttons/CloseButton';
import FormModal from '@src/containers/FormModal';
import Loading from '@src/components/loading/Loading';
import PostBidAskForm, { PostBidAskFormProps } from '@src/components/investor/tradingForms/PostBidAskForm';
import PostInitialSale, { PostInitialSaleProps } from '@src/components/investor/tradingForms/PostInitialSale';
import React, { FC, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import SendShares from '../SendShares';
import ShareSaleList, { ShareSaleListProps } from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import SmartContractsSettings, { SmartContractsSettingsProps } from './SmartContractsSettings';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { Maybe, ShareOrder } from 'types';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { String0x } from '@src/web3/helpersChain';

import { claimProceeds } from '@src/web3/contractSwapCalls';
import { getCurrencyById } from '@src/utils/enumConverters';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { swapContractABI } from '@src/web3/generated';
import { toNormalNumber } from '@src/web3/util';
import { useAccount, useContractRead } from 'wagmi';
import { useQuery } from '@apollo/client';

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
    userId: string | undefined;
  };

const OfferingActions: FC<OfferingActionsProps> = ({
  retrievalIssue,
  hasContract,
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
  partitions,
  refetchMainContracts,
  refetchOfferingInfo,

  currentSalePrice,
  myShares,
  userId,
}) => {
  const { data: userData } = useQuery(GET_USER, { variables: { id: userId } });
  const user = userData?.queryUser[0];

  const [managerModal, setManagerModal] = useState<ManagerModalType>('none');

  const [isExistingShares, setIsExistingShares] = useState<boolean>(false);
  const [claimProceedsButton, setClaimProceedsButton] = useState<LoadingButtonStateType>('idle');
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
    args: [userWalletAddress as String0x],
  });

  const rawProceeds = contractData && contractData[1];
  const proceeds = paymentTokenDecimals && rawProceeds ? toNormalNumber(rawProceeds, paymentTokenDecimals) : 0;

  const handleClaimProceeds = async () => {
    await claimProceeds({ swapContractAddress, setButtonStep: setClaimProceedsButton });
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
        <button
          className="p-2 border-2 border-gray-300 text-sm text-gray-800 rounded-md"
          onClick={() => setIsExistingShares(!isExistingShares)}
        >{`${
          isExistingShares ? 'Create a fresh offering of orders' : 'Sell existing shares from your wallet instead.'
        }`}</button>
        {isExistingShares ? (
          <PostBidAskForm
            offering={offering}
            offeringMin={offeringMin}
            sharesOutstanding={sharesOutstanding}
            walletAddress={userWalletAddress as String0x}
            myShares={myShares}
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
          sharesIssued={details?.numUnits}
          sharesOutstanding={sharesOutstanding}
          shareContractAddress={shareContractAddress}
          shareContractId={shareContractId}
          offeringParticipants={participants}
          partitions={partitions}
          myShares={myShares}
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
            className="p-3 bg-cLightBlue rounded-md text-white"
            onClick={() => setManagerModal('smartContractsSettings')}
          >
            Configure shares & trading
          </Button>

          <Button
            onClick={() => {
              setShowActionPanel('send');
            }}
            className={standardClass}
          >
            Send shares
          </Button>
          {swapContractAddress ? (
            <Button
              onClick={() => {
                setManagerModal('shareSaleList');
              }}
              className={standardClass}
            >
              Manage Share Sales
            </Button>
          ) : (
            <Button
              onClick={() => {
                setManagerModal('smartContractsSettings');
              }}
              className={standardClass}
            >
              Configure trading
            </Button>
          )}
          {proceeds !== 0 && (
            <Button className={standardClass} onClick={handleClaimProceeds} disabled={claimProceedsButton === 'step1'}>
              <LoadingButtonText
                state={claimProceedsButton}
                idleText={`Claim ${numberWithCommas(proceeds)} ${getCurrencyById(paymentTokenAddress)?.symbol}`}
                step1Text="Claiming Proceeds..."
                confirmedText="Proceeds Claimed!"
                failedText="Transaction failed"
                rejectedText="You rejected the transaction. Click here to try again."
              />
            </Button>
          )}
        </>
      ) : (
        <div>The offeror has not yet created shares or your wallet is not connected.</div>
      )}
    </div>
  );

  const NoContract = isOfferingManager ? (
    <Button
      className="p-3 bg-cLightBlue rounded-md text-white"
      onClick={() => setManagerModal('smartContractsSettings')}
    >
      Configure shares & trading
    </Button>
  ) : (
    <>The offeror has not yet created shares or your wallet is not connected.</>
  );

  const myOrder = orders && orders?.find((order) => order?.initiator === userWalletAddress);

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
          <div className="">{!hasContract ? NoContract : showActionPanel ? ActionPanel : ButtonPanel}</div>
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

import Button from '@src/components/buttons/Button';
import ContractInvestorActions, { ContractInvestorActionsProps } from './InvestorActions';
import ContractOwnerActions, { ContractOwnerActionsProps } from './OwnerActions';
import CreateSwapContract from '../CreateSwapContract';
import FormModal from '@src/containers/FormModal';
import Loading from '@src/components/loading/Loading';
import PostAskForm from '@src/components/investor/tradingForms/PostAskForm';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import router from 'next/router';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import { OfferingParticipant, OfferingSale } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useAccount } from 'wagmi';

export type ActionPanelActionsProps = boolean | 'send' | 'distribute' | 'sale';

type OfferingActionsProps = ContractOwnerActionsProps &
  ContractInvestorActionsProps & {
    sales: OfferingSale[];
    hasContract: boolean;
    loading: boolean;
    isOfferingManager: boolean;
    retrievalIssue: boolean;
    isContractOwner: boolean;
    myBacBalance: number;
    permittedEntity: OfferingParticipant;
    currentSalePrice: number;
    myShares: number;
  };

const OfferingActions: FC<OfferingActionsProps> = ({
  retrievalIssue,
  hasContract,
  loading,
  isOfferingManager,
  offering,
  sharesOutstanding,
  sales,
  shareContractId,
  swapContractId,
  isContractOwner,
  myDistToClaim,
  distributionId,
  isWhitelisted,
  partitions,
  refetch,
  setRecallContract,
  myBacBalance,
  permittedEntity,
  currentSalePrice,
  myShares,
}) => {
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [swapContractModal, setSwapContractModal] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const { address: userWalletAddress } = useAccount();

  const offeringName = offering.name;
  const offeringMin = offering.details.minUnitsPerInvestor;
  const investmentCurrency = offering.details.investmentCurrency;

  const organization = offering.offeringEntity.organization;
  if (!hasContract) {
    return isOfferingManager ? (
      <Button
        className="p-3 bg-cLightBlue rounded-md text-white"
        onClick={() => router.push(`/${organization.id}/offerings/${offering.id}/create-shares`)}
      >
        Create Shares
      </Button>
    ) : (
      <>The offeror has not yet created shares or your wallet is not connected.</>
    );
  }

  return (
    <>
      <FormModal
        formOpen={shareSaleManagerModal}
        onClose={() => setShareSaleManagerModal(false)}
        title={`Manage shares of ${offeringName}`}
      >
        {userWalletAddress && (
          <ShareSaleList
            offering={offering}
            walletAddress={userWalletAddress}
            sales={sales}
            myBacBalance={myBacBalance}
            shareContractId={shareContractId}
            permittedEntity={permittedEntity}
            isContractOwner={isContractOwner === !!isOfferingManager}
            setShareSaleManagerModal={setShareSaleManagerModal}
            setSaleFormModal={setSaleFormModal}
            setRecallContract={setRecallContract}
          />
        )}
      </FormModal>
      <FormModal
        formOpen={swapContractModal}
        onClose={() => setSwapContractModal(false)}
        title={`Set up trading for ${offeringName}`}
      >
        <CreateSwapContract
          shareContractId={shareContractId}
          onContractCreated={() => {}}
          investmentCurrency={investmentCurrency}
          contractOwnerEntityId={offering.offeringEntity.id}
        />
      </FormModal>
      <FormModal formOpen={saleFormModal} onClose={() => setSaleFormModal(false)} title={`Sell shares of ${name}`}>
        <PostAskForm
          offering={offering}
          offeringMin={offeringMin}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress}
          myShares={myShares}
          shareContractId={shareContractId}
          permittedEntity={permittedEntity}
          isContractOwner={isContractOwner === !!isOfferingManager}
          currentSalePrice={currentSalePrice}
          setModal={setSaleFormModal}
          setRecallContract={setRecallContract}
        />
      </FormModal>
      {/* <FormModal formOpen={bidFormModel} onClose={() => setBidFormModel(false)} title={`Bid for shares of ${name}`}>
        <ShareBidForm
          offering={offering}
          walletAddress={userWalletAddress}
          offeringMin={details?.minUnitsPerInvestor}
          shareContractId={shareContractId}
          permittedEntity={permittedEntity}
          setModal={setBidFormModel}
          setRecallContract={setRecallContract}
        />
      </FormModal> */}
      {retrievalIssue ? (
        <RetrievalIssue className="mt-10" />
      ) : loading ? (
        <div className="flex justify-center self-center">
          <Loading />
        </div>
      ) : (
        <div className="">
          {isContractOwner ? (
            <ContractOwnerActions
              offering={offering}
              shareContractId={shareContractId}
              swapContractId={swapContractId}
              sharesOutstanding={sharesOutstanding}
              myDistToClaim={myDistToClaim}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setSwapContractModal={setSwapContractModal}
              setRecallContract={setRecallContract}
              refetch={refetch}
              distributionId={distributionId}
              partitions={partitions}
            />
          ) : (
            <ContractInvestorActions
              offering={offering}
              shareContractId={shareContractId}
              swapContractId={swapContractId}
              isWhitelisted={isWhitelisted}
              myDistToClaim={myDistToClaim}
              distributionId={distributionId}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setRecallContract={setRecallContract}
            />
          )}
          <ShareSaleStatusWidget
            sales={sales}
            offeringId={offering.id}
            shareContractId={shareContractId}
            isContractOwner={isContractOwner}
          />
        </div>
      )}
    </>
  );
};

export default OfferingActions;

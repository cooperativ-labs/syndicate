import Button from '@src/components/buttons/Button';
import ContractInvestorActions, { ContractInvestorActionsProps } from './InvestorActions';
import ContractOwnerActions, { ContractOwnerActionsProps } from './OwnerActions';
import CreateSwapContract from '../CreateSwapContract';
import FormModal from '@src/containers/FormModal';
import LinkLegal from '@src/components/legal/LinkLegal';
import Loading from '@src/components/loading/Loading';
import PostAskForm from '@src/components/investor/tradingForms/PostAskForm';
import React, { FC, useState } from 'react';
import RetrievalIssue from '@src/components/alerts/ContractRetrievalIssue';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import router from 'next/router';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import ShareSaleStatusWidget from '@src/components/investor/tradingForms/ShareSaleStatusWidget';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { OfferingParticipant, OfferingSale, User } from 'types';
import { useAccount, useChainId } from 'wagmi';
import { useQuery } from '@apollo/client';

import PostInitialSale from '@src/components/investor/tradingForms/PostInitialSale';
import SmartContractsSettings from './SmartContractsSettings';
import { String0x } from '@src/web3/helpersChain';

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
    userId: string;
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
  shareContractAddress,
  swapContractAddress,
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
  userId,
}) => {
  const chainId = useChainId();
  const { data: userData } = useQuery(GET_USER, { variables: { id: userId } });
  const user = userData?.queryUser[0];
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [smartContractsSettingsModal, setSmartContractsSettingsModal] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const [contractSettingsPanel, setContractSettingsPanel] = useState<boolean>(false);
  const { address: userWalletAddress } = useAccount();

  const offeringName = offering.name;
  const offeringMin = offering.details.minUnitsPerInvestor;
  const investmentCurrency = offering.details.investmentCurrency;
  const sharesIssued = offering.details?.numUnits;
  const FormModals = (
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
            shareContractAddress={shareContractAddress}
            permittedEntity={permittedEntity}
            isContractOwner={isContractOwner === !!isOfferingManager}
            setShareSaleManagerModal={setShareSaleManagerModal}
            setSaleFormModal={setSaleFormModal}
            setRecallContract={setRecallContract}
          />
        )}
      </FormModal>
      <FormModal
        formOpen={smartContractsSettingsModal}
        onClose={() => setSmartContractsSettingsModal(false)}
        title={`Smart contract settings`}
      >
        <SmartContractsSettings
          user={user}
          offering={offering}
          chainId={chainId}
          partitions={partitions}
          shareContractId={shareContractId}
          shareContractAddress={shareContractAddress}
          swapContractAddress={swapContractAddress}
          investmentCurrency={investmentCurrency}
        />
      </FormModal>
      <FormModal
        formOpen={saleFormModal}
        onClose={() => setSaleFormModal(false)}
        title={`Sell shares of ${offeringName}`}
      >
        {/* <PostAskForm
          offering={offering}
          offeringMin={offeringMin}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress as String0x}
          myShares={myShares}
          swapContractAddress={swapContractAddress}
          permittedEntity={permittedEntity}
          isContractOwner={isContractOwner === !!isOfferingManager}
          currentSalePrice={currentSalePrice}
          setModal={setSaleFormModal}
        /> */}
        <PostInitialSale
          sharesIssued={sharesIssued}
          sharesOutstanding={sharesOutstanding}
          offeringId={offering.id}
          offeringMin={offeringMin}
          priceStart={offering.details.priceStart}
          currency={offering.details.investmentCurrency}
          swapContractAddress={swapContractAddress}
        />
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

  const ContractActions = (
    <div className="flex flex-col w-full gap-3">
      {isOfferingManager ? (
        <Button
          className="p-3 bg-cLightBlue rounded-md text-white"
          onClick={() => setSmartContractsSettingsModal(true)}
        >
          Configure shares & trading
        </Button>
      ) : (
        <div>The offeror has not yet created shares or your wallet is not connected.</div>
      )}

      {isContractOwner ? (
        <ContractOwnerActions
          offering={offering}
          shareContractId={shareContractId}
          shareContractAddress={shareContractAddress}
          swapContractAddress={swapContractAddress}
          sharesOutstanding={sharesOutstanding}
          myDistToClaim={myDistToClaim}
          setShareSaleManagerModal={setShareSaleManagerModal}
          setSmartContractsSettingsModal={setSmartContractsSettingsModal}
          setRecallContract={setRecallContract}
          refetch={refetch}
          distributionId={distributionId}
          partitions={partitions}
        />
      ) : (
        <ContractInvestorActions
          offering={offering}
          shareContractAddress={shareContractAddress}
          swapContractAddress={swapContractAddress}
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
        shareContractAddress={shareContractAddress}
        isContractOwner={isContractOwner}
      />
    </div>
  );

  const NoContract = isOfferingManager ? (
    <Button className="p-3 bg-cLightBlue rounded-md text-white" onClick={() => setSmartContractsSettingsModal(true)}>
      Configure shares & trading
    </Button>
  ) : (
    <>The offeror has not yet created shares or your wallet is not connected.</>
  );

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
        <div className="">{hasContract ? ContractActions : NoContract}</div>
      )}
    </>
  );
};

export default OfferingActions;

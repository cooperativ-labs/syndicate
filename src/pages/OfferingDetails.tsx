import AlertBanner from '@src/components/alerts/AlertBanner';
import BasicOfferingDetailsForm from '@src/components/offering/settings/BasicOfferingDetailsForm';
import Button from '@src/components/buttons/Button';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import DashboardCard from '@src/components/cards/DashboardCard';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingActions from '@src/components/offering/actions/OfferingActions';
import OfferingDashboardTitle from '@src/components/offering/OfferingDashboardTitle';
import OfferingDescriptionSettings from '@src/components/offering/settings/OfferingDescriptionSettings';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import OfferingFinancialSettings from '@src/components/offering/settings/OfferingFinancialSettings';
import OfferingProfileSettings from '@src/components/offering/settings/OfferingProfileSettings';
import OfferingTabContainer from '@src/containers/OfferingTabContainer';
import React, { FC, useState } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { DocumentType, Offering } from 'types';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { readContracts, useAccount } from 'wagmi';
import { useSession } from 'next-auth/react';

import FullTransactionHistory from '@src/components/offering/sales/FullTransactionHistory';
import HashInstructions from '@src/components/documentVerification/HashInstructions';
import useOfferingDetails from '@hooks/useOfferingDetails';
import { MatchSupportedChains } from '@src/web3/connectors';

type OfferingDetailsProps = {
  offering: Offering;
  refetchOffering: () => void;
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, refetchOffering }) => {
  const { address: userWalletAddress } = useAccount();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const { id, name, offeringEntity, details, isPublic, accessCode, documents } = offering;
  const offeringDocs = documents && getDocumentsOfType(documents, DocumentType.OfferingDocument);

  const [financialSettingsPanel, setFinancialSettingsPanel] = useState<boolean>(false);
  const [descriptionSettingsPanel, setDescriptionSettingsPanel] = useState<boolean>(false);
  const [transactionHistoryPanel, setTransactionHistoryPanel] = useState<boolean>(false);
  const [investorListRefreshTrigger, setInvestorListRefreshTrigger] = useState<number>(0); //this seems extremely hackish, but I can't figure out any other way to get the contract hooks in WhitelistAddressListItem to refresh.

  const {
    hasContract,
    isContractOwner,
    contractManagerMatches,
    swapContractMatches,
    contractMatchesCurrentChain,
    contractSet,
    shareContract,
    shareContractAddress,
    contractOrders,
    transferEvents,
    partitions,
    legalLinkTexts,
    isOfferingManager,
    currentSalePrice,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    isLoading,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    totalDistributed,
    noLiveOrders,
    issueReachingContract,
    refetchShareContract,
    refetchSwapContract,
    refetchOrders,
    refetchTransactionHistory,
  } = useOfferingDetails(offering, userId);

  const triggerInvestorListRefresh = () => {
    setInvestorListRefreshTrigger(investorListRefreshTrigger + 1);
  };

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
    refetchTransactionHistory();
    triggerInvestorListRefresh();
  };

  const refetchOfferingInfo = () => {
    refetchOffering();
    refetchTransactionHistory();
    refetchOrders();
  };

  return (
    <>
      <RightSideBar formOpen={transactionHistoryPanel} onClose={() => setTransactionHistoryPanel(false)}>
        <FullTransactionHistory transferEvents={transferEvents} />
      </RightSideBar>
      <RightSideBar formOpen={financialSettingsPanel} onClose={() => setFinancialSettingsPanel(false)}>
        <OfferingFinancialSettings offering={offering} />
      </RightSideBar>
      <RightSideBar formOpen={descriptionSettingsPanel} onClose={() => setDescriptionSettingsPanel(false)}>
        <>
          {userId && <OfferingProfileSettings offering={offering} userId={userId} />}
          <hr className="my-4" />
          <OfferingDescriptionSettings offering={offering} />
        </>
      </RightSideBar>
      <div className="md:mx-4">
        <AlertBanner
          show={hasContract && !contractManagerMatches && !isLoading}
          color="orange-600"
          text={`${
            isContractOwner
              ? 'Your account does not manage this offering, but the connected wallet manages the associated shares.'
              : 'Your account manages this offering, but the connected wallet does not manage the associated shares. To manage shares, please switch to the appropriate wallet.'
          }`}
        />
        <AlertBanner
          show={!swapContractMatches && contractMatchesCurrentChain}
          color="orange-600"
          text={`The swap contract for this offering does not match the share contract. Please contact ${
            process.env.NEXT_PUBLIC_CLIENT === 'reizen' ? 'Reizen' : 'Cooperativ'
          } Support.`}
        />
        <AlertBanner
          show={!contractMatchesCurrentChain}
          color="orange-600"
          text={`The share contract for this offering is not on the chain to which your wallet is currently connected. Please which to ${
            MatchSupportedChains(shareContract?.cryptoAddress.chainId)?.name
          }.`}
        />
        {/* MAIN CONTENT  */}

        <TwoColumnLayout twoThirdsLayout gap="12">
          {/* Slot 1 */}
          <DashboardCard>
            <OfferingDashboardTitle
              profileVisibility={isPublic}
              offeringId={id}
              organizationId={offeringEntity?.organization.id}
              accessCode={accessCode}
              offeringName={name}
              isOfferingManager={isOfferingManager}
              shareContractAddress={shareContractAddress}
              chainId={shareContract?.cryptoAddress.chainId}
            />
            {/* <EntityAddressPanel offeringEntity={offeringEntity} owners={owners} /> */}

            <hr className="my-5" />
            {details ? (
              <OfferingDetailsDisplay
                className="my-6"
                offeringDetails={details}
                currentSalePrice={currentSalePrice}
                isOfferingManager={isOfferingManager}
                contractViewDetails={{
                  sharesOutstanding: sharesOutstanding,
                  myShareQty: myShareQty,
                  paymentToken: paymentTokenAddress,
                  totalDistributed: totalDistributed,
                }}
              />
            ) : isOfferingManager ? (
              !userWalletAddress ? (
                <div className="flex mt-4">
                  <ChooseConnectorButton buttonText={'Connect wallet to continue'} large />
                </div>
              ) : (
                <BasicOfferingDetailsForm offeringId={id} operatingCurrency={offeringEntity?.operatingCurrency} />
              )
            ) : (
              'This offering has no details yet.'
            )}

            <hr className="my-10" />
            {isOfferingManager && (
              <div className="flex items-center mt-10 gap-3">
                <Button
                  onClick={() => {
                    setFinancialSettingsPanel(true);
                    refetchTransactionHistory();
                  }}
                  className=" bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  Edit Syndication Financials
                </Button>

                <Button
                  onClick={() => setDescriptionSettingsPanel(true)}
                  className=" bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  Edit Profile Details
                </Button>

                <Button
                  onClick={() => setTransactionHistoryPanel(true)}
                  className=" bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  View Transaction History
                </Button>
              </div>
            )}
          </DashboardCard>
          {/* Slot 2 */}
          <div className="">
            {details?.investmentCurrency && (
              <DashboardCard>
                <div className="">
                  <div className="font-xl font-semibold">Smart contract actions</div>
                  <div className="mt-4">
                    {!userWalletAddress ? (
                      <ChooseConnectorButton buttonText={'Connect Wallet'} />
                    ) : (
                      <OfferingActions
                        userId={userId}
                        retrievalIssue={false}
                        hasContract={hasContract}
                        loading={isLoading}
                        isOfferingManager={isOfferingManager}
                        orders={contractOrders}
                        offering={offering}
                        contractSet={contractSet}
                        issueReachingContract={issueReachingContract}
                        paymentTokenAddress={paymentTokenAddress}
                        paymentTokenDecimals={paymentTokenDecimals}
                        swapApprovalsEnabled={swapApprovalsEnabled}
                        txnApprovalsEnabled={txnApprovalsEnabled}
                        sharesOutstanding={sharesOutstanding}
                        isContractOwner={isContractOwner}
                        noLiveOrders={noLiveOrders}
                        partitions={partitions}
                        refetchMainContracts={refetchMainContracts}
                        refetchOfferingInfo={refetchOfferingInfo}
                        currentSalePrice={currentSalePrice}
                        myShareQty={myShareQty}
                        transferEvents={transferEvents}
                      />
                    )}
                  </div>
                </div>
              </DashboardCard>
            )}
          </div>
        </TwoColumnLayout>
        <hr className="border-t-2 border-gray-100 mb-12" />

        <TwoColumnLayout twoThirdsLayout gap="12">
          {/* Slot 3 */}
          <div>
            {details && (
              <OfferingTabContainer
                offering={offering}
                contractManagerMatches={contractManagerMatches}
                isContractOwner={isContractOwner}
                offeringEntity={offeringEntity}
                isOfferingManager={isOfferingManager}
                contractSet={contractSet}
                currentSalePrice={currentSalePrice}
                partitions={partitions}
                transferEvents={transferEvents}
                refetchContracts={refetchMainContracts}
                triggerInvestorListRefresh={triggerInvestorListRefresh}
                investorListRefreshTrigger={investorListRefreshTrigger}
              />
            )}
          </div>

          <>
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Documents</h1>
            <DocumentList
              documents={offeringDocs}
              isOfferingManager={isOfferingManager}
              offeringId={offering.id}
              entityId={offeringEntity?.id}
            />
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Token agreement</h1>
            {legalLinkTexts && legalLinkTexts.length > 0 && smartContractDocuments?.length > 0 && (
              <HashInstructions
                contractDocuments={smartContractDocuments}
                agreementTexts={legalLinkTexts}
                shareContractAddress={shareContractAddress}
              />
            )}
          </>

          <></>

          {/* Slot 4 */}
        </TwoColumnLayout>
      </div>
    </>
  );
};

export default OfferingDetails;

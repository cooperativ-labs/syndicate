'use client';
import { useUserContext } from '@contexts/UserContext';
import useOfferingDetails from '@hooks/useOfferingDetails';
import AlertBanner from '@src/components/alerts/AlertBanner';
import Button from '@src/components/buttons/Button';
import DashboardCard from '@src/components/cards/DashboardCard';
import HashInstructions from '@src/components/documentVerification/HashInstructions';
import OfferingActions from '@src/components/offering/actions/OfferingActions';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingDashboardTitle from '@src/components/offering/OfferingDashboardTitle';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import FullTransactionHistory from '@src/components/offering/sales/FullTransactionHistory';
import BasicOfferingDetailsForm from '@src/components/offering/settings/BasicOfferingDetailsForm';
import OfferingDescriptionSettings from '@src/components/offering/settings/OfferingDescriptionSettings';
import OfferingFinancialSettings from '@src/components/offering/settings/OfferingFinancialSettings';
import OfferingProfileSettings from '@src/components/offering/settings/OfferingProfileSettings';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import OfferingTabContainer from '@src/containers/OfferingTabContainer';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { getOfferingDocumentsById } from '@src/utils/actions/offeringActions';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount } from 'wagmi';

import { CurrencyCodeType, Document, DocumentType, OfferingFull, OrganizationUser } from '@/types';

type OfferingDetailsProps = {
  offering: OfferingFull;
  documents?: Document[];
  organizationUsers: OrganizationUser[];
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, documents, organizationUsers }) => {
  const { address: userWalletAddress } = useAccount();
  const { user } = useUserContext();
  const userId = user?.id;
  const {
    id,
    name,
    offering_entity_id,
    is_public,
    access_code,
    legalEntity,
    raise_start,
    raise_period,
    max_raise,
    distribution_period,
    stage,
    additional_info
  } = offering;

  const offeringDocs = getDocumentsOfType(documents, DocumentType.OFFERING_DOCUMENT);

  const distributionEndDate =
    raise_start && raise_period
      ? new Date(new Date(raise_start).getTime() + raise_period * 24 * 60 * 60 * 1000).toISOString()
      : undefined;

  const details = {
    investmentCurrency: offering.investment_currency,
    minUnitsPerInvestor: offering.min_units_per_investor,
    maxUnitsPerInvestor: offering.max_units_per_investor,
    priceStart: offering.price_start,
    maxRaise: offering.max_raise,
    numUnits: offering.num_units,
    distributionFrequency: offering.distribution_frequency,
    distributionPeriod: offering.distribution_period,
    distributionCurrency: legalEntity?.operating_currency,
    distributionStartDate: raise_start,
    distributionEndDate: distributionEndDate,
    distributionAmount: max_raise,
    distributionType: distribution_period,
    distributionStatus: stage,
    distributionRecipient: legalEntity?.legal_name,
    distributionNotes: additional_info,
    distributionAttachments: documents
  };

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
    refetchTransactionHistory
  } = useOfferingDetails(offering, organizationUsers, userId);

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
    refetchTransactionHistory();
    refetchOrders();
  };

  return (
    <>
      <RightSideBar
        formOpen={transactionHistoryPanel}
        onClose={() => setTransactionHistoryPanel(false)}
      >
        <FullTransactionHistory transferEvents={transferEvents} />
      </RightSideBar>
      <RightSideBar
        formOpen={financialSettingsPanel}
        onClose={() => setFinancialSettingsPanel(false)}
      >
        <OfferingFinancialSettings offering={offering} />
      </RightSideBar>
      <RightSideBar
        formOpen={descriptionSettingsPanel}
        onClose={() => setDescriptionSettingsPanel(false)}
      >
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
          text={`The swap contract for this offering does not match the share contract. Please contact Cooperativ Support.`}
        />
        <AlertBanner
          show={!contractMatchesCurrentChain}
          color="orange-600"
          text={`The share contract for this offering is not on the chain to which your wallet is currently connected. Please which to ${
            MatchSupportedChains(shareContract?.cryptoAddress.chain_id)?.name
          }.`}
        />
        {/* MAIN CONTENT  */}

        <TwoColumnLayout twoThirdsLayout gap="12">
          {/* Slot 1 */}
          <DashboardCard>
            <OfferingDashboardTitle
              profileVisibility={is_public || false}
              offeringId={id.toString()}
              organizationId={legalEntity.organization_id.toString()}
              accessCode={access_code || ''}
              offeringName={name}
              isOfferingManager={isOfferingManager}
              shareContractAddress={shareContractAddress}
              chainId={shareContract?.cryptoAddress.chain_id || undefined}
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
                  totalDistributed: totalDistributed
                }}
              />
            ) : isOfferingManager ? (
              !userWalletAddress ? (
                <div className="flex mt-4">
                  <ChooseConnectorButton buttonText={'Connect wallet to continue'} large />
                </div>
              ) : (
                <BasicOfferingDetailsForm
                  offeringId={id.toString()}
                  operatingCurrency={legalEntity?.operating_currency as CurrencyCodeType}
                />
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
                        documents={offeringDocs}
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
                offeringEntity={legalEntity}
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
              offeringId={id.toString()}
              entityId={offering_entity_id.toString()}
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

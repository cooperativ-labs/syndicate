'use client';
import { useOffering } from '@contexts/OfferingContext';
import { useUserContext } from '@contexts/UserContext';
import AlertBanner from '@src/components/alerts/AlertBanner';
import DashboardCard from '@src/components/cards/DashboardCard';
import HashInstructions from '@src/components/documentVerification/HashInstructions';
import OfferingActionsContainer from '@src/components/offering/actions/OfferingActionsContainer';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingBasicDetailsForm from '@src/components/offering/OfferingBasicDetailsForm';
import OfferingDashboardTitle from '@src/components/offering/OfferingDashboardTitle';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import FullTransactionHistory from '@src/components/offering/sales/FullTransactionHistory';
import OfferingDescriptionSettings from '@src/components/offering/settings/OfferingDescriptionSettings';
import OfferingFinancialSettings from '@src/components/offering/settings/OfferingFinancialSettings';
import OfferingProfileSettings from '@src/components/offering/settings/OfferingProfileSettings';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import OfferingTabContainer from '@src/containers/OfferingTabContainer';
import SheetButtonRight from '@src/containers/sideBar/SheetButtonRight';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { MatchSupportedChains } from '@src/web3/wagmi';
import React, { FC } from 'react';
import { useConnection } from 'wagmi';

import { CurrencyCodeType, DocumentType } from '@/types';

const OfferingDetails: FC = () => {
  const { address: userWalletAddress } = useConnection();
  const { user } = useUserContext();
  const userId = user?.id;

  const {
    offering,
    documents,
    isOfferingManager,
    legalEntity,
    hasContract,
    isContractOwner,
    contractManagerMatches,
    swapContractMatches,
    contractMatchesCurrentChain,
    shareContractAddress,
    transferEvents,
    partitions,
    legalLinkTexts,
    currentSalePrice,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    isLoading,
    paymentTokenAddress,
    totalDistributed,
    refetchShareContract,
    refetchTransactionHistory,
    refetchMainContracts,
    investorListRefreshTrigger,
    triggerInvestorListRefresh
  } = useOffering();

  const {
    id,
    name,
    is_public,
    access_code,
    raise_start,
    raise_period,
    max_raise,
    distribution_period,
    stage,
    additional_info,
    offeringSmartContracts
  } = offering;

  const offeringDocs = documents
    ? getDocumentsOfType(documents, DocumentType.OFFERING_DOCUMENT)
    : [];

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

  const showBasicOfferingDetailsForm =
    !details.priceStart && !details.numUnits && !paymentTokenAddress;

  return (
    <div className='flex flex-col h-full'>
      <div className='md:mx-4'>
        <AlertBanner
          show={hasContract && !contractManagerMatches && !isLoading}
          color='orange-600'
          text={`${
            isContractOwner
              ? 'Your account does not manage this offering, but the connected wallet manages the associated shares.'
              : 'Your account manages this offering, but the connected wallet does not manage the associated shares. To manage shares, please switch to the appropriate wallet.'
          }`}
        />
        <AlertBanner
          show={!swapContractMatches && contractMatchesCurrentChain}
          color='orange-600'
          text={`The swap contract for this offering does not match the share contract. Please contact Cooperativ Support.`}
        />
        <AlertBanner
          show={!contractMatchesCurrentChain}
          color='orange-600'
          text={`The share contract for this offering is not on the chain to which your wallet is currently connected. Please which to ${
            MatchSupportedChains(offeringSmartContracts?.shareContract.cryptoAddress.chain_id || 0)
              ?.name
          }.`}
        />
        {/* MAIN CONTENT  */}

        <TwoColumnLayout twoThirdsLayout gap='6'>
          {/* Slot 1 */}
          <DashboardCard>
            <OfferingDashboardTitle
              profileVisibility={is_public || false}
              offeringId={id.toString()}
              organizationId={legalEntity.organization_id.toString()}
              accessCode={access_code || ''}
              offeringName={name}
              isOfferingManager={isOfferingManager}
              shareContractAddress={shareContractAddress ?? ('0x0' as `0x${string}`)}
              chainId={offeringSmartContracts?.shareContract.cryptoAddress.chain_id || undefined}
            />
            {/* <EntityAddressPanel offeringEntity={offeringEntity} owners={owners} /> */}

            <hr className='my-5' />
            {showBasicOfferingDetailsForm ? (
              <OfferingBasicDetailsForm
                offering={offering}
                isOfferingManager={isOfferingManager}
                legalEntity={legalEntity}
                refetchShareContract={refetchShareContract}
              />
            ) : (
              <OfferingDetailsDisplay
                className='my-6'
                offering={offering}
                currentSalePrice={currentSalePrice}
                isOfferingManager={isOfferingManager}
                contractViewDetails={{
                  sharesOutstanding: sharesOutstanding,
                  myShareQty: myShareQty,
                  paymentToken: paymentTokenAddress,
                  totalDistributed: totalDistributed
                }}
              />
            )}

            <hr className='my-10' />
            {isOfferingManager && (
              <div className='flex items-center mt-10 gap-3'>
                <SheetButtonRight
                  title='Offering Financials'
                  buttonText='Edit Syndication Financials'
                  onOpen={() => refetchTransactionHistory()}
                >
                  <OfferingFinancialSettings offering={offering} />
                </SheetButtonRight>

                <SheetButtonRight title='Profile Details' buttonText='Edit Profile Details'>
                  <>
                    {userId && <OfferingProfileSettings offering={offering} userId={userId} />}
                    <hr className='my-4' />
                    <OfferingDescriptionSettings offering={offering} />
                  </>
                </SheetButtonRight>
                <SheetButtonRight buttonText='View Transaction History' title='Transaction History'>
                  <FullTransactionHistory transferEvents={transferEvents} />
                </SheetButtonRight>
              </div>
            )}
          </DashboardCard>
          {/* Slot 2 */}

          <OfferingActionsContainer userWalletAddress={userWalletAddress} />
        </TwoColumnLayout>
        <hr className='border-t-2 border-gray-100 mb-12' />

        <TwoColumnLayout twoThirdsLayout gap='6'>
          {/* Slot 3 */}
          <div>
            {offering && (
              <OfferingTabContainer
                legalEntity={legalEntity}
                distributions={offering.distributions}
                investment_currency={offering.investment_currency as CurrencyCodeType}
                offeringId={offering.id.toString()}
                offeringParticipants={offering.participants}
                contractManagerMatches={contractManagerMatches}
                isContractOwner={isContractOwner}
                offeringEntity={legalEntity}
                isOfferingManager={isOfferingManager}
                contractSet={offeringSmartContracts}
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
            <h1 className='text-cDarkBlue text-xl font-bold  mb-3 mt-16 '>Documents</h1>
            <DocumentList
              documents={offeringDocs}
              isOfferingManager={isOfferingManager}
              offeringId={id.toString()}
              entityId={legalEntity.id.toString()}
            />
            <h1 className='text-cDarkBlue text-xl font-bold  mb-3 mt-16 '>Token agreement</h1>
            {legalLinkTexts &&
              legalLinkTexts.length > 0 &&
              smartContractDocuments?.length > 0 &&
              shareContractAddress && (
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
    </div>
  );
};

export default OfferingDetails;

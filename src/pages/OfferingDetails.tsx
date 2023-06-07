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
import React, { FC, useEffect, useState } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import {
  ContractSale,
  getCurrentSalePrice,
  getLowestSalePrice,
  getSaleArrayFromContract,
} from '@src/utils/helpersMoney';
import { DocumentType, Offering } from 'types';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { getLatestDistribution, getMyDistToClaim } from '@src/utils/helpersOffering';
import { useAccount, useChainId } from 'wagmi';
import { useSession } from 'next-auth/react';

import HashInstructions from '@src/components/documentVerification/HashInstructions';
import { MatchSupportedChains } from '@src/web3/connectors';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { useAsync } from 'react-use';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';

// import { ABI } from '@src/web3/ABI';

type OfferingDetailsProps = {
  offering: Offering;
  refetch: () => void;
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, refetch }) => {
  const { address: userWalletAddress } = useAccount();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { id, name, offeringEntity, participants, sales, details, isPublic, accessCode, smartContractSets } = offering;
  const contractSet = smartContractSets?.slice(-1)[0];
  const chainId = useChainId();

  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress.address as String0x;
  const swapContract = contractSet?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;
  const distributionContract = contractSet?.distributionContract;
  const distributionContractAddress = distributionContract?.cryptoAddress.address as String0x;

  const partitions = shareContract?.partitions as String0x[];
  const owners = offeringEntity?.owners;
  const documents = offering?.documents;
  const legalLinkTexts = getDocumentsOfType(documents, DocumentType.ShareLink);
  const isOfferingManager = getIsEditorOrAdmin(userId, offering.offeringEntity?.organization);
  const [financialSettingsPanel, setFinancialSettingsPanel] = useState<boolean>(false);
  const [descriptionSettingsPanel, setDescriptionSettingsPanel] = useState<boolean>(false);
  const [contractSaleList, setContractSaleList] = useState<ContractSale[]>([]);

  const {
    contractOwner,
    myShares,
    sharesOutstanding,
    allDocuments,
    isLoading: shareIsLoading,
    refetchShareContract,
  } = useShareContractInfo(shareContractAddress, userWalletAddress);

  const fundsDistributed = 20000;
  const numDistributions = 4;

  const {
    shareTokenAddress,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    nextOrderId,
    isLoading: swapIsLoading,
    refetchSwapContract,
  } = useSwapContractInfo(swapContractAddress);

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
  };

  const isLoading = shareIsLoading || swapIsLoading;

  const hasContract = !!contractOwner;
  const isContractOwner = contractOwner === userWalletAddress;
  const contractOwnerMatches = isContractOwner === !!isOfferingManager;
  const offeringDocs = getDocumentsOfType(offering.documents, DocumentType.OfferingDocument);
  const latestDistribution = getLatestDistribution(offering);
  const myDistToClaim = getMyDistToClaim(offering, sharesOutstanding, myShares, userWalletAddress);

  const offeringParticipant = participants.find((participant) => {
    return participant.addressOfferingId === userWalletAddress + id;
  });
  // NOTE: This is set up to accept multiple sales from the DB, but `saleDetails`
  // currently refers to the single sale the contract can currently offer

  const contractSales = sales.filter((sale) => {
    return sale.saleContractAddress === swapContractAddress;
  });

  useAsync(async () => {
    const contractSaleList = await getSaleArrayFromContract(sales, swapContractAddress, paymentTokenDecimals);
    setContractSaleList(contractSaleList);
  }, [sales, swapContractAddress, paymentTokenDecimals, getSaleArrayFromContract]);

  const currentSalePrice = getCurrentSalePrice(contractSaleList, offering.details?.priceStart);

  const swapContractMatches = !swapContract
    ? true
    : normalizeEthAddress(shareTokenAddress) === normalizeEthAddress(shareContractAddress);

  const contractMatchesCurrentChain = !shareContract ? true : shareContract.cryptoAddress.chainId === chainId;

  return (
    <>
      <RightSideBar formOpen={financialSettingsPanel} onClose={() => setFinancialSettingsPanel(false)}>
        <OfferingFinancialSettings offering={offering} />
      </RightSideBar>
      <RightSideBar formOpen={descriptionSettingsPanel} onClose={() => setDescriptionSettingsPanel(false)}>
        <>
          <OfferingProfileSettings offering={offering} userId={userId} />
          <hr className="my-4" />
          <OfferingDescriptionSettings offering={offering} />
        </>
      </RightSideBar>
      <div className="md:mx-4">
        {hasContract && !contractOwnerMatches && !isLoading && (
          <AlertBanner
            text={`${
              isContractOwner
                ? 'Your account does not manage this offering, but the connected wallet manages the associated shares.'
                : 'Your account manages this offering, but the connected wallet does not manage the associated shares. To manage shares, please switch to the appropriate wallet.'
            }`}
          />
        )}
        {!swapContractMatches && contractMatchesCurrentChain && (
          <AlertBanner
            text={`The swap contract for this offering does not match the share contract. Please contact Cooperativ Support.`}
          />
        )}
        {!contractMatchesCurrentChain && (
          <AlertBanner
            text={`The share contract for this offering is not on the chain to which your wallet is currently connected. Please which to ${
              MatchSupportedChains(shareContract.cryptoAddress.chainId).name
            }.`}
          />
        )}

        {/* MAIN CONTENT  */}

        <TwoColumnLayout twoThirdsLayout gap="12">
          {/* Slot 1 */}
          <DashboardCard>
            <OfferingDashboardTitle
              profileVisibility={isPublic}
              offeringId={id}
              organizationId={offeringEntity.organization.id}
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
                  myShares: myShares,
                  paymentToken: paymentTokenAddress,
                }}
              />
            ) : isOfferingManager ? (
              <BasicOfferingDetailsForm offeringId={id} operatingCurrency={offeringEntity.operatingCurrency} />
            ) : (
              'This offering has no details yet.'
            )}

            <hr className="my-10" />
            {isOfferingManager && (
              <div className="flex items-center mt-10 ">
                <Button
                  onClick={() => setFinancialSettingsPanel(true)}
                  className=" bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  Edit Syndication Financials
                </Button>
                <div className="mx-2" />
                <Button
                  onClick={() => setDescriptionSettingsPanel(true)}
                  className=" bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  Edit Profile Details
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
                        sales={contractSales}
                        offering={offering}
                        contractSet={contractSet}
                        paymentTokenAddress={paymentTokenAddress}
                        paymentTokenDecimals={paymentTokenDecimals}
                        swapApprovalsEnabled={swapApprovalsEnabled}
                        txnApprovalsEnabled={txnApprovalsEnabled}
                        sharesOutstanding={sharesOutstanding}
                        isContractOwner={isContractOwner}
                        partitions={partitions}
                        refetchMainContracts={refetchMainContracts}
                        distributionId={latestDistribution.id}
                        myDistToClaim={myDistToClaim}
                        permittedEntity={offeringParticipant}
                        currentSalePrice={currentSalePrice}
                        myShares={myShares}
                        investmentCurrency={offering.details.investmentCurrency}
                        chainId={0}
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
                contractOwnerMatches={contractOwnerMatches}
                isContractOwner={isContractOwner}
                offeringEntity={offeringEntity}
                isOfferingManager={isOfferingManager}
                contractSet={contractSet}
                currentSalePrice={currentSalePrice}
                partitions={partitions}
              />
            )}
          </div>

          <>
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Documents</h1>
            <DocumentList
              documents={offeringDocs}
              isOfferingManager={isOfferingManager}
              offeringId={offering.id}
              ownerEntityId={owners[0].id}
            />
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Token agreement</h1>
            {legalLinkTexts.length > 0 && allDocuments?.length > 0 && (
              <HashInstructions
                contractDocuments={allDocuments}
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

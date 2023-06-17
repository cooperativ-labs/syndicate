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
import { ContractOrder, getCurrentOrderPrice, getOrderArrayFromContract } from '@src/utils/helpersMoney';
import { DocumentType, Offering } from 'types';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useAccount, useChainId, useContractRead } from 'wagmi';
import { useSession } from 'next-auth/react';

import FullTransactionHistory from '@src/components/offering/sales/FullTransactionHistory';
import HashInstructions from '@src/components/documentVerification/HashInstructions';
import { dividendContractABI } from '@src/web3/generated';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { MatchSupportedChains } from '@src/web3/connectors';
import { normalizeEthAddress, String0x } from '@src/web3/helpersChain';
import { RETRIEVE_ISSUANCES_AND_TRADES } from '@src/utils/dGraphQueries/trades';
import { toNormalNumber } from '@src/web3/util';
import { useAsync } from 'react-use';
import { useQuery } from '@apollo/client';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';
// import { ABI } from '@src/web3/ABI';

type OfferingDetailsProps = {
  offering: Offering;
  refetchOffering: () => void;
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, refetchOffering }) => {
  const { address: userWalletAddress } = useAccount();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { id, name, offeringEntity, participants, orders, details, isPublic, accessCode, smartContractSets } = offering;
  const contractSet = smartContractSets?.slice(-1)[0];
  const chainId = useChainId();

  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress.address as String0x;
  const swapContract = contractSet?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress.address as String0x;
  const distributionPaymentToken = getCurrencyOption(details?.investmentCurrency);
  const distributionPaymentTokenAddress = distributionPaymentToken?.address as String0x;
  const distributionPaymentTokenDecimals = distributionPaymentToken ? distributionPaymentToken?.decimals : 18;

  const { data: issuanceData, refetch: refetchTransactionHistory } = useQuery(RETRIEVE_ISSUANCES_AND_TRADES, {
    variables: { shareContractAddress: shareContractAddress },
  });
  const issuances = issuanceData?.queryShareIssuanceTrade;

  const partitions = shareContract?.partitions as String0x[];
  const documents = offering?.documents;
  const legalLinkTexts = documents && getDocumentsOfType(documents, DocumentType.ShareLink);
  const isOfferingManager = getIsEditorOrAdmin(userId, offering.offeringEntity?.organization) ?? false;
  const [financialSettingsPanel, setFinancialSettingsPanel] = useState<boolean>(false);
  const [descriptionSettingsPanel, setDescriptionSettingsPanel] = useState<boolean>(false);
  const [transactionHistoryPanel, setTransactionHistoryPanel] = useState<boolean>(false);
  const [contractSaleList, setContractSaleList] = useState<ContractOrder[]>([]);

  const {
    contractOwner,
    myShares,
    sharesOutstanding,
    allDocuments,
    isLoading: shareIsLoading,
    refetchShareContract,
  } = useShareContractInfo(shareContractAddress, userWalletAddress);

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

  const { data: distributionData } = useContractRead({
    address: distributionContractAddress,
    abi: dividendContractABI,
    functionName: 'balances',
    args: [distributionPaymentTokenAddress as String0x],
  });
  const totalDistributed = toNormalNumber(distributionData, distributionPaymentTokenDecimals);

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
    refetchTransactionHistory();
  };

  const isLoading = shareIsLoading || swapIsLoading;

  const hasContract = !!contractOwner;
  const isContractOwner = contractOwner === userWalletAddress;
  const contractOwnerMatches = isContractOwner === !!isOfferingManager;
  const offeringDocs = documents && getDocumentsOfType(documents, DocumentType.OfferingDocument);

  const offeringParticipant = participants?.find((participant) => {
    return participant?.addressOfferingId === userWalletAddress + id;
  });

  // NOTE: This is set up to accept multiple orders from the DB, but `saleDetails`
  // currently refers to the single order the contract can currently offer
  const contractOrders = orders?.filter((order) => {
    return order?.swapContractAddress === swapContractAddress;
  });

  useAsync(async () => {
    const contractSaleList =
      orders &&
      paymentTokenDecimals &&
      (await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals));
    contractSaleList && setContractSaleList(contractSaleList);
  }, [orders, swapContractAddress, paymentTokenDecimals, getOrderArrayFromContract]);

  const currentSalePrice = getCurrentOrderPrice(contractSaleList, offering.details?.priceStart);

  const swapContractMatches = !swapContract
    ? true
    : normalizeEthAddress(shareTokenAddress) === normalizeEthAddress(shareContractAddress);

  const contractMatchesCurrentChain = !shareContract ? true : shareContract.cryptoAddress.chainId === chainId;

  return (
    <>
      <RightSideBar formOpen={transactionHistoryPanel} onClose={() => setTransactionHistoryPanel(false)}>
        <FullTransactionHistory issuances={issuances} paymentTokenDecimals={paymentTokenDecimals} />
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
              MatchSupportedChains(shareContract?.cryptoAddress.chainId)?.name
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
                  myShares: myShares,
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
                        paymentTokenAddress={paymentTokenAddress}
                        paymentTokenDecimals={paymentTokenDecimals}
                        swapApprovalsEnabled={swapApprovalsEnabled}
                        txnApprovalsEnabled={txnApprovalsEnabled}
                        sharesOutstanding={sharesOutstanding}
                        isContractOwner={isContractOwner}
                        partitions={partitions}
                        refetchMainContracts={refetchMainContracts}
                        refetchOffering={refetchOffering}
                        currentSalePrice={currentSalePrice}
                        myShares={myShares}
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
                issuances={issuances}
                refetchContracts={refetchMainContracts}
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
            {legalLinkTexts && legalLinkTexts.length > 0 && allDocuments?.length > 0 && (
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

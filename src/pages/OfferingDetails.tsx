import AlertBanner from '@src/components/alerts/AlertBanner';
import BasicOfferingDetailsForm from '@src/components/offering/settings/BasicOfferingDetailsForm';
import Button from '@src/components/buttons/Button';
import DashboardCard from '@src/components/cards/DashboardCard';
import FormModal from '@src/containers/FormModal';

import OfferingActions from '@src/components/offering/actions/OfferingActions';
import OfferingDashboardTitle from '@src/components/offering/OfferingDashboardTitle';
import OfferingDescriptionSettings from '@src/components/offering/settings/OfferingDescriptionSettings';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';

import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import DocumentList from '@src/components/offering/documents/DocumentList';
import HashInstructions from '@src/components/indicators/HashInstructions';
import OfferingFinancialSettings from '@src/components/offering/settings/OfferingFinancialSettings';
import OfferingProfileSettings from '@src/components/offering/settings/OfferingProfileSettings';
import OfferingTabContainer from '@src/containers/OfferingTabContainer';
import React, { FC, useState } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import ShareBidForm from '@src/components/investor/tradingForms/ShareBidForm';
import ShareOfferForm from '@src/components/investor/tradingForms/ShareOfferForm';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { DocumentType, Offering } from 'types';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { GetEstablishedContracts } from '@src/utils/helpersContracts';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { getLatestDistribution, getMyDistToClaim } from '@src/utils/helpersOffering';
import { getLowestSalePrice } from '@src/utils/helpersMoney';
import { useAccount, useChainId } from 'wagmi';
import { useSession } from 'next-auth/react';

import { useContractInfo } from '@src/web3/hooks/useContractInfo';

// import { ABI } from '@src/web3/ABI';

type OfferingDetailsProps = {
  offering: Offering;
  refetch: () => void;
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, refetch }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { address: userWalletAddress } = useAccount();

  const chainId = useChainId();
  const { id, name, offeringEntity, participants, sales, details, isPublic, accessCode, smartContracts } = offering;

  const establishedContract = GetEstablishedContracts(smartContracts, chainId)[0];
  // const contractId = establishedContract?.cryptoAddress.address;
  const contractId = '0x18201F3219e818eE419cF3aa193ff269ABAB0df8' as `0x${string}}`;
  const owners = offeringEntity?.owners;
  const documents = offering?.documents;
  const legalLinkText = getDocumentsOfType(documents, DocumentType.ShareLink)[0]?.text;
  const isOfferingManager = getIsEditorOrAdmin(userId, offering.offeringEntity?.organization);

  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [financialSettingsPanel, setFinancialSettingsPanel] = useState<boolean>(false);
  const [descriptionSettingsPanel, setDescriptionSettingsPanel] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const [recallContract, setRecallContract] = useState<string>();

  const {
    contractOwner,
    isManager,
    isWhitelisted,
    myShares,
    myBacBalance,
    sharesOutstanding,
    allDocuments,
    fundsDistributed,
    numDistributions,
    bacId,
    contractHashes,
    partitions,
    isLoading,
  } = useContractInfo(contractId, userWalletAddress);

  const hasContract = !!contractOwner;
  const isContractOwner = contractOwner === userWalletAddress;
  const contractOwnerMatches = isContractOwner === !!isOfferingManager;
  const offeringDocs = getDocumentsOfType(offering.documents, DocumentType.OfferingDocument);
  const latestDistribution = getLatestDistribution(offering);
  const myDistToClaim = getMyDistToClaim(offering, sharesOutstanding, myShares, userWalletAddress);

  const permittedEntity = participants.find((participant) => {
    return participant.addressOfferingId === userWalletAddress + id;
  });
  // NOTE: This is set up to accept multiple sales from the DB, but `saleDetails`
  // currently refers to the single sale the contract can currently offer
  const contractSales = sales.filter((sale) => {
    return sale.smartContractId === contractId;
  });

  const currentSalePrice = getLowestSalePrice(sales, details?.priceStart);

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
      <FormModal
        formOpen={shareSaleManagerModal}
        onClose={() => setShareSaleManagerModal(false)}
        title={`Manage shares of ${name}`}
      >
        {userWalletAddress && (
          <ShareSaleList
            offering={offering}
            walletAddress={userWalletAddress}
            sales={contractSales}
            myBacBalance={myBacBalance}
            contractId={contractId}
            permittedEntity={permittedEntity}
            isContractOwner={contractOwnerMatches && isContractOwner}
            setShareSaleManagerModal={setShareSaleManagerModal}
            setSaleFormModal={setSaleFormModal}
            setRecallContract={setRecallContract}
          />
        )}
      </FormModal>
      <FormModal formOpen={saleFormModal} onClose={() => setSaleFormModal(false)} title={`Sell shares of ${name}`}>
        <ShareOfferForm
          offering={offering}
          offeringMin={details?.minUnitsPerInvestor}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress}
          myShares={myShares}
          contractId={contractId}
          permittedEntity={permittedEntity}
          isContractOwner={contractOwnerMatches && isContractOwner}
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
          contractId={contractId}
          permittedEntity={permittedEntity}
          setModal={setBidFormModel}
          setRecallContract={setRecallContract}
        />
      </FormModal> */}
      <div className="md:mx-4">
        {!contractOwnerMatches && !isLoading && (
          <AlertBanner
            text={`${
              isContractOwner
                ? 'Your account does not manage this offering, but the connected wallet manages the associated shares.'
                : 'Your account manages this offering, but the connected wallet does not manage the associated shares. To manage shares, please switch to the appropriate wallet.'
            }`}
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
                  fundsDistributed: fundsDistributed,
                  myShares: myShares,
                  bacId: bacId,
                }}
              />
            ) : isOfferingManager ? (
              <BasicOfferingDetailsForm offeringId={id} operatingCurrency={offeringEntity.operatingCurrency} />
            ) : (
              'This offering has no details yet.'
            )}

            {isOfferingManager && <hr className="my-10" />}
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
                        retrievalIssue={false}
                        hasContract={hasContract}
                        loading={isLoading}
                        isOfferingManager={isOfferingManager}
                        saleFormModal={saleFormModal}
                        sales={contractSales}
                        offering={offering}
                        contractId={contractId}
                        sharesOutstanding={sharesOutstanding}
                        isContractOwner={isContractOwner}
                        myBacBalance={myBacBalance}
                        isWhitelisted={isWhitelisted}
                        partitions={partitions}
                        setShareSaleManagerModal={setShareSaleManagerModal}
                        setSaleFormModal={setSaleFormModal}
                        refetch={refetch}
                        setRecallContract={setRecallContract}
                        distributionId={latestDistribution.id}
                        myDistToClaim={myDistToClaim}
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
                contractId={contractId}
                currentSalePrice={currentSalePrice}
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
            {legalLinkText && contractHashes && (
              <HashInstructions hashes={contractHashes} agreementText={legalLinkText} />
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

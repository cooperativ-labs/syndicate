import * as backendCtc from '../web3/index.main';
import AlertBanner from '@src/components/alerts/AlertBanner';
import BasicOfferingDetailsForm from '@src/components/offering/settings/BasicOfferingDetailsForm';
import Button from '@src/components/buttons/Button';
import DashboardCard from '@src/components/cards/DashboardCard';
import FormModal from '@src/containers/FormModal';
import HashInstructions from '@src/components/indicators/HashInstructions';
import OfferingActions from '@src/components/offering/actions/OfferingActions';
import OfferingDashboardTitle from '@src/components/offering/OfferingDashboardTitle';
import OfferingDescriptionSettings from '@src/components/offering/settings/OfferingDescriptionSettings';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';

import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingFinancialSettings from '@src/components/offering/settings/OfferingFinancialSettings';
import OfferingProfileSettings from '@src/components/offering/settings/OfferingProfileSettings';
import OfferingTabContainer from '@src/containers/OfferingTabContainer';
import React, { FC, useContext, useEffect, useState } from 'react';
import RightSideBar from '@src/containers/sideBar/RightSidebar';
import ShareBidForm from '@src/components/investor/tradingForms/ShareBidForm';
import ShareOfferForm from '@src/components/investor/tradingForms/ShareOfferForm';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { calculateDistribution, getLowestSalePrice } from '@src/utils/helpersMoney';
import { DocumentType, Offering } from 'types';
import { getContractParticipants } from '@src/web3/reachCalls';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { GetEstablishedContracts } from '@src/utils/helpersContracts';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import { ReachContext } from '@src/SetReachContext';
import { setChainId } from '@src/web3/connectors';
import { useAsyncFn } from 'react-use';
import { UserAccountContext } from '@src/SetAppContext';

type OfferingDetailsProps = {
  offering: Offering;
  refetch: () => void;
};

const OfferingDetails: FC<OfferingDetailsProps> = ({ offering, refetch }) => {
  const { uuid } = useContext(UserAccountContext);
  const { reachLib, reachAcc, userWalletAddress } = useContext(ReachContext);
  const chainId = setChainId;
  const {
    id,
    name,
    offeringEntity,
    offeringUsers,
    participants,
    sales,
    details,
    isPublic,
    accessCode,
    smartContracts,
  } = offering;

  const establishedContract = GetEstablishedContracts(smartContracts, chainId)[0];
  const contractId = establishedContract?.cryptoAddress.address;
  const owners = offeringEntity?.owners;
  const documents = offering?.documents;
  const legalLinkText = getDocumentsOfType(documents, DocumentType.ShareLink)[0]?.text;

  ///TOKEN STUFF
  const [retrievalIssue, setRetrievalIssue] = useState<boolean>();
  const [sharesOutstanding, setSharesOutstanding] = useState<number>();

  const [fundsDistributed, setFundsDistributed] = useState<number>();
  const [numDistributions, setNumDistributions] = useState<number>();
  const [myShares, setMyShares] = useState<number>();
  const [myBacBalance, setMyBacBalance] = useState<number>();
  const [bacId, setBacId] = useState<string>();
  const [myBacToClaim, setMyBacToClaim] = useState<number>();
  const [contractHashes, setContractHashes] = useState();
  const [contractManager, setContractManager] = useState<string>();
  const [isOptedIn, setIsOptedIn] = useState<boolean>(false);
  const [isWhiteListed, setIsWhiteListed] = useState<boolean>();
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [financialSettingsPanel, setFinancialSettingsPanel] = useState<boolean>(false);
  const [descriptionSettingsPanel, setDescriptionSettingsPanel] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const [recallContract, setRecallContract] = useState<string>();

  const hasContract = !!contractManager;
  const offeringOwner = offeringUsers.find((u) => {
    return u.user.uuid === uuid;
  });
  const isOfferingOwner = !!offeringOwner;
  const isContractOwner = contractManager && contractManager === userWalletAddress;
  const contractOwnerMatches = isContractOwner === isOfferingOwner;
  const offeringDocs = getDocumentsOfType(offering.documents, DocumentType.OfferingDocument);
  const latestDistribution = offering.distributions?.length > 0 && offering.distributions?.slice(-1)[0];
  const myDistToClaim =
    offering.distributions?.length > 0 &&
    calculateDistribution(latestDistribution, sharesOutstanding, myShares, userWalletAddress);

  const [contractInfo, getContractInfo] = useAsyncFn(async () => {
    try {
      const { formatAddress, formatCurrency, bigNumberToNumber } = reachLib;
      const contractUserPubKey = await reachAcc.getAddress();
      //CONTRACT MANAGERS
      const ctc = await reachAcc.contract(backendCtc, contractId);

      const contractOfficers = await ctc.views.vCcCm();
      setContractManager(formatAddress(contractOfficers[1][1]));
      const whitelistStatus = await ctc.views.wlMember(userWalletAddress);
      const isWhiteListed = whitelistStatus[1];
      setIsWhiteListed(isWhiteListed);
      const optedIn = await ctc.views.vOptedIn(contractUserPubKey);
      setIsOptedIn(optedIn[1]);

      //CONTRACT DATA
      const tot = await ctc.views.totSTBTD();
      setRetrievalIssue(tot[0] === 'None');
      const ctcVersion = await ctc.views.vcVersion();
      console.log('Contract version:', ctcVersion[1][0]);
      const btInfo = await ctc.views.vBtBal();
      // const myTokens = await ctc.views.totSTBTDRec(reachAcc.getAddress());
      const myAvailableTokens = await ctc.views.claimSTBT(userWalletAddress);
      const hashes = await ctc.views.vHash();
      setContractHashes(hashes.slice(1));
      const totST = parseInt(formatCurrency(tot[1][0], 6), 10);
      const totAmountDistributed = parseInt(formatCurrency(tot[1][1], 6), 10);
      const numDistributions = bigNumberToNumber(tot[1][2]);
      const btBalance = parseInt(formatCurrency(btInfo[1][0], 6), 10);
      const myST = parseInt(formatCurrency(myAvailableTokens[1][0], 6), 10); // This shows just shares I hold on ALGO, but also shows tokens waiting to be claimed on ETH
      const btID = bigNumberToNumber(btInfo[1][1]).toString();
      const myBacBalance = parseInt(formatCurrency(await reachAcc.balanceOf(btID), 6), 10);
      setSharesOutstanding(totST);
      setFundsDistributed(totAmountDistributed);
      setNumDistributions(numDistributions);
      setMyShares(myST);
      setMyBacBalance(myBacBalance);
      setBacId(btID);
    } catch (e) {
      return e;
    }
  }, [recallContract, contractId, reachLib, userWalletAddress, reachAcc]);

  useEffect(() => {
    if (reachLib) {
      getContractInfo();
      // console.log(getContractParticipants(reachLib, reachAcc, contractId));
    }
  }, [recallContract, contractId, reachLib, userWalletAddress, reachAcc, getContractInfo]);

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
          <OfferingProfileSettings offering={offering} uuid={uuid} />
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
        {!contractOwnerMatches && !contractInfo.loading && (
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
              gpEntityId={owners[0].id}
              accessCode={accessCode}
              offeringName={name}
              isOfferingOwner={isOfferingOwner}
            />
            {/* <EntityAddressPanel offeringEntity={offeringEntity} owners={owners} /> */}

            <hr className="my-5" />
            {details ? (
              <OfferingDetailsDisplay
                className="my-6"
                offeringDetails={details}
                currentSalePrice={currentSalePrice}
                isOfferingOwner={isOfferingOwner}
                contractViewDetails={{
                  sharesOutstanding: sharesOutstanding,
                  fundsDistributed: fundsDistributed,
                  myShares: myShares,
                  bacId: bacId,
                }}
              />
            ) : (
              <BasicOfferingDetailsForm offeringId={id} operatingCurrency={offeringEntity.operatingCurrency} />
            )}

            {isOfferingOwner && <hr className="my-10" />}
            {isOfferingOwner && (
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
                        retrievalIssue={retrievalIssue}
                        hasContract={hasContract}
                        loading={contractInfo.loading}
                        isOfferingOwner={isOfferingOwner}
                        saleFormModal={saleFormModal}
                        sales={contractSales}
                        offering={offering}
                        contractId={contractId}
                        sharesOutstanding={sharesOutstanding}
                        isContractOwner={isContractOwner}
                        myBacBalance={myBacBalance}
                        isOptedIn={isOptedIn}
                        isWhiteListed={isWhiteListed}
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
            <OfferingTabContainer
              offering={offering}
              contractOwnerMatches={contractOwnerMatches}
              isContractOwner={isContractOwner}
              offeringEntity={offeringEntity}
              isOfferingOwner={isOfferingOwner}
              contractId={contractId}
            />
          </div>

          <>
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Documents</h1>
            <DocumentList
              documents={offeringDocs}
              isOfferingOwner={isOfferingOwner}
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

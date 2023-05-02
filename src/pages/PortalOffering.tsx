import DashboardCard from '@src/components/cards/DashboardCard';
import React, { FC, useContext, useEffect, useState } from 'react';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { useAccount, useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Container from '@src/containers/Layouts/Container';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import DocumentList from '@src/components/offering/documents/DocumentList';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { DocumentType, Offering } from 'types';
import { useAsyncFn } from 'react-use';
import { getCurrentSalePrice } from '@src/utils/helpersMoney';
import { GetEstablishedContracts } from '@src/utils/helpersContracts';
import { ReachContext } from '@src/SetReachContext';
import * as backendCtc from '../web3/index.main';
import HashInstructions from '@src/components/indicators/HashInstructions';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import FormModal from '@src/containers/FormModal';
import ShareOfferForm from '@src/components/investor/tradingForms/ShareOfferForm';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import OfferingActions from '@src/components/offering/actions/OfferingActions';
import { getLatestDistribution, getMyDistToClaim } from '@src/utils/helpersOffering';

type PortalOfferingProps = {
  offering: Offering;
  refetch: () => void;
};

const PortalOffering: FC<PortalOfferingProps> = ({ offering, refetch }) => {
  const { address: userWalletAddress } = useAccount();
  const { chain } = useNetwork();
  const { reachLib, reFetchWallet } = useContext(ReachContext);
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;

  const establishedContract = offering && GetEstablishedContracts(offering.offeringEntity.smartContracts, chain.id)[0];
  const contractId = establishedContract?.cryptoAddress.address;

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
  const [isWhiteListed, setIsWhiteListed] = useState<boolean>(true);
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);
  const [recallContract, setRecallContract] = useState<string>();

  const [contractInfo, getContractInfo] = useAsyncFn(async () => {
    try {
      const acc = await reachLib.getDefaultAccount();
      const { formatAddress, formatCurrency, bigNumberToNumber } = reachLib;
      const contractUserPubKey = await acc.getAddress();
      //CONTRACT MANAGERS
      const ctc = await acc.contract(backendCtc, contractId);

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
      // const myTokens = await ctc.views.totSTBTDRec(acc.getAddress());
      const myAvailableTokens = await ctc.views.claimSTBT(userWalletAddress);
      const hashes = await ctc.views.vHash();
      setContractHashes(hashes.slice(1));
      const totST = parseInt(formatCurrency(tot[1][0], 6), 10);
      const totAmountDistributed = parseInt(formatCurrency(tot[1][1], 6), 10);
      const numDistributions = bigNumberToNumber(tot[1][2]);
      const btBalance = parseInt(formatCurrency(btInfo[1][0], 6), 10);
      const myST = parseInt(formatCurrency(myAvailableTokens[1][0], 6), 10); // This shows just shares I hold on ALGO, but also shows tokens waiting to be claimed on ETH
      const btID = bigNumberToNumber(btInfo[1][1]).toString();
      const myBacBalance = parseInt(formatCurrency(await acc.balanceOf(btID), 6), 10);
      setSharesOutstanding(totST);
      setFundsDistributed(totAmountDistributed);
      setNumDistributions(numDistributions);
      setMyShares(myST);
      setMyBacBalance(myBacBalance);
      setBacId(btID);
    } catch (e) {
      return e;
    }
  }, [recallContract, contractId, userWalletAddress]);

  useEffect(() => {
    getContractInfo();
    // console.log(getContractParticipants(reachLib, reachAcc, contractId));
  }, [recallContract, contractId, userWalletAddress, getContractInfo]);

  const {
    details,
    brandColor,
    website,
    offeringEntity,
    name: offeringName,
    id: offeringId,
    distributions,
    participants,
    sales,
  } = offering;

  const documents = offering?.documents;
  const legalLinkText = getDocumentsOfType(documents, DocumentType.ShareLink)[0]?.text;

  const TEMP_offeringParticipant = true;
  const offeringParticipant = participants.find((participant) => {
    return participant.addressOfferingId === userWalletAddress + offeringId;
  });

  const contractSales = sales.filter((sale) => {
    return sale.smartContractId === contractId;
  });

  const currentSalePrice = getCurrentSalePrice(offering);
  const offeringDocs = getDocumentsOfType(offering.documents, DocumentType.OfferingDocument);
  const latestDistribution = getLatestDistribution(offering);
  const myDistToClaim = getMyDistToClaim(offering, sharesOutstanding, myShares, userWalletAddress);

  if (!TEMP_offeringParticipant) {
    return (
      <div className="w-screen h-screen flex justify-center items-center pb-32">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are not a participant of this offering</h1>
          <p className="text-lg">Please contact the organization for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div data-test="component-PortalOffering" className="flex flex-col w-full h-full mx-auto px-4 pt-10">
      <FormModal
        formOpen={saleFormModal}
        onClose={() => setSaleFormModal(false)}
        title={`Sell shares of ${offeringName}`}
      >
        <ShareOfferForm
          offering={offering}
          offeringMin={details?.minUnitsPerInvestor}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress}
          myShares={myShares}
          contractId={contractId}
          permittedEntity={offeringParticipant}
          isContractOwner={false}
          currentSalePrice={currentSalePrice}
          setModal={setSaleFormModal}
          setRecallContract={setRecallContract}
        />
      </FormModal>
      <FormModal
        formOpen={shareSaleManagerModal}
        onClose={() => setShareSaleManagerModal(false)}
        title={`Manage your shares of ${offeringName}`}
      >
        <ShareSaleList
          offering={offering}
          walletAddress={userWalletAddress}
          sales={contractSales}
          myBacBalance={myBacBalance}
          contractId={contractId}
          permittedEntity={offeringParticipant}
          isContractOwner={false}
          setShareSaleManagerModal={setShareSaleManagerModal}
          setSaleFormModal={setSaleFormModal}
          setRecallContract={setRecallContract}
        />
      </FormModal>
      <Container>
        <h2 className="text-4xl  text-blue-900 font-semibold mb-4">{offeringName}</h2>
      </Container>
      <Container className="flex flex-col">
        <TwoColumnLayout>
          <DashboardCard>
            <ShareSaleList
              offering={offering}
              walletAddress={userWalletAddress}
              sales={contractSales}
              myBacBalance={myBacBalance}
              contractId={contractId}
              permittedEntity={offeringParticipant}
              isContractOwner={false}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setSaleFormModal={setSaleFormModal}
              setRecallContract={setRecallContract}
            />
            {/* <OfferingActions
              retrievalIssue={retrievalIssue}
              hasContract={isWhiteListed}
              loading={contractInfo.loading}
              isOfferingManager={false}
              saleFormModal={saleFormModal}
              sales={contractSales}
              offering={offering}
              contractId={contractId}
              sharesOutstanding={sharesOutstanding}
              isContractOwner={false}
              myBacBalance={myBacBalance}
              isOptedIn={isOptedIn}
              isWhiteListed={isWhiteListed}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setSaleFormModal={setSaleFormModal}
              refetch={refetch}
              setRecallContract={setRecallContract}
              distributionId={latestDistribution.id}
              myDistToClaim={myDistToClaim}
            /> */}
          </DashboardCard>
          <DashboardCard>
            <OfferingDetailsDisplay
              className="my-6"
              offeringDetails={details}
              currentSalePrice={currentSalePrice}
              isOfferingManager={false}
              contractViewDetails={{
                sharesOutstanding: sharesOutstanding,
                fundsDistributed: fundsDistributed,
                myShares: myShares,
                bacId: bacId,
              }}
            />
          </DashboardCard>
        </TwoColumnLayout>
        <TwoColumnLayout twoThirdsLayout>
          <div className="mt-4 ">
            <DistributionList
              contractId={contractId}
              distributions={offering.distributions}
              currency={offering.details.distributionCurrency}
            />
            <div className="mt-20 flex">
              <ProfileTabContainer offering={offering} />
            </div>
          </div>
          <div>
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3  ">Offering documents</h1>
            <DocumentList documents={offeringDocs} isOfferingManager={false} offeringId={offering.id} />{' '}
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Token agreement</h1>
            {legalLinkText && contractHashes && (
              <HashInstructions hashes={contractHashes} agreementText={legalLinkText} />
            )}
          </div>
        </TwoColumnLayout>
      </Container>
    </div>
  );
};

export default PortalOffering;

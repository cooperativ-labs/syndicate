import Container from '@src/containers/Layouts/Container';
import DashboardCard from '@src/components/cards/DashboardCard';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import FormModal from '@src/containers/FormModal';

import HashInstructions from '@src/components/documentVerification/HashInstructions';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import React, { FC, useState } from 'react';
import ShareOfferForm from '@src/components/investor/tradingForms/ShareOfferForm';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { DocumentType, Offering } from 'types';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getCurrentSalePrice } from '@src/utils/helpersMoney';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { GetEstablishedContracts } from '@src/utils/helpersContracts';
import { getLatestDistribution, getMyDistToClaim } from '@src/utils/helpersOffering';
import { useAccount, useNetwork } from 'wagmi';
import { useContractInfo } from '@src/web3/hooks/useContractInfo';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

type PortalOfferingProps = {
  offering: Offering;
  refetch: () => void;
};

const PortalOffering: FC<PortalOfferingProps> = ({ offering, refetch }) => {
  const { address: userWalletAddress } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;

  const establishedContract = offering && GetEstablishedContracts(offering.offeringEntity.smartContracts, chain.id)[0];
  // const contractId = establishedContract?.cryptoAddress.address;
  const contractId = '0x18201F3219e818eE419cF3aa193ff269ABAB0df8' as `0x${string}}`;

  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
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
    isLoading,
  } = useContractInfo(contractId, userWalletAddress);

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
  const legalLinkTexts = getDocumentsOfType(documents, DocumentType.ShareLink);

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
            {legalLinkTexts.length > 0 && allDocuments?.length > 0 && (
              <HashInstructions
                contractDocuments={allDocuments}
                agreementTexts={legalLinkTexts}
                contractId={contractId}
              />
            )}
          </div>
        </TwoColumnLayout>
      </Container>
    </div>
  );
};

export default PortalOffering;

import Container from '@src/containers/Layouts/Container';
import DashboardCard from '@src/components/cards/DashboardCard';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import FormModal from '@src/containers/FormModal';

import HashInstructions from '@src/components/documentVerification/HashInstructions';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import PostBidAskForm from '@src/components/investor/tradingForms/PostBidAskForm';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import React, { FC, useState } from 'react';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { DocumentType, Offering } from 'types';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { shareContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import useOfferingDetails from '@hooks/useOfferingDetails';

type PortalOfferingProps = {
  offering: Offering;
  refetchOffering: () => void;
};

const PortalOffering: FC<PortalOfferingProps> = ({ offering, refetchOffering }) => {
  const { address: userWalletAddress } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;

  const {
    details,
    brandColor,
    website,
    offeringEntity,
    name: offeringName,
    id: offeringId,
    distributions,
    participants,

    smartContractSets,
  } = offering;

  const minUnitsPerInvestor = details?.minUnitsPerInvestor;
  const [managerModal, setManagerModal] = useState<ManagerModalType>('none');

  const {
    shareContractAddress,
    swapContractAddress,
    distributionContractAddress,
    contractOrders,
    legalLinkTexts,
    currentSalePrice,
    myShares,
    sharesOutstanding,
    smartContractDocuments,
    paymentTokenAddress,
    paymentTokenDecimals,
    swapApprovalsEnabled,
    txnApprovalsEnabled,
    refetchShareContract,
    refetchSwapContract,
    refetchOrders,
    refetchTransactionHistory,
  } = useOfferingDetails(offering);

  const { data: partitions, error } = useContractRead({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'partitionsOf',
    args: [userWalletAddress as String0x],
  });

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
    refetchTransactionHistory();
    refetchOrders();
  };

  const refetchOfferingInfo = () => {
    refetchOffering();
    refetchTransactionHistory();
    refetchOrders();
  };

  const documents = offering?.documents;

  const offeringParticipant = participants?.find((participant) => {
    return participant?.addressOfferingId === userWalletAddress + offeringId;
  });

  const offeringDocs = documents && getDocumentsOfType(documents, DocumentType.OfferingDocument);

  if (!offeringParticipant) {
    return (
      <div className="w-screen h-screen flex justify-center items-center pb-32">
        <div className="text-center">
          <h1 className="text-2xl font-bold">You are not a participant of this offering</h1>
          <p className="text-lg">Please contact the fund manager for more information.</p>
        </div>
      </div>
    );
  }

  return (
    <div data-test="component-PortalOffering" className="flex flex-col w-full h-full mx-auto px-4 pt-10">
      <FormModal
        formOpen={managerModal === 'saleForm'}
        onClose={() => setManagerModal('none')}
        title={`Sell shares of ${offeringName}`}
      >
        <PostBidAskForm
          offering={offering}
          offeringMin={minUnitsPerInvestor}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress as String0x}
          myShares={myShares}
          swapContractAddress={swapContractAddress}
          swapApprovalsEnabled={swapApprovalsEnabled}
          isContractOwner={false}
          currentSalePrice={currentSalePrice}
          setModal={setManagerModal}
          partitions={partitions as String0x[]}
          paymentTokenDecimals={paymentTokenDecimals}
          refetchAllContracts={refetchMainContracts}
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
              orders={contractOrders}
              swapContractAddress={swapContractAddress}
              isContractOwner={false}
              setModal={setManagerModal}
              refetchMainContracts={refetchMainContracts}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              txnApprovalsEnabled={txnApprovalsEnabled}
              shareContractAddress={shareContractAddress}
              refetchOfferingInfo={refetchOfferingInfo}
            />
          </DashboardCard>
          <DashboardCard>
            <OfferingDetailsDisplay
              className="my-6"
              offeringDetails={details}
              currentSalePrice={currentSalePrice}
              isOfferingManager={false}
              contractViewDetails={{
                sharesOutstanding: sharesOutstanding,
                totalDistributed: undefined,
                myShares: myShares,
                paymentToken: paymentTokenAddress,
              }}
            />
          </DashboardCard>
        </TwoColumnLayout>
        <TwoColumnLayout twoThirdsLayout>
          <div className="mt-4 ">
            <DistributionList
              distributionContractAddress={distributionContractAddress}
              distributions={offering?.distributions}
              walletAddress={userWalletAddress as String0x}
            />
            <div className="mt-20 flex">
              <ProfileTabContainer offering={offering} />
            </div>
          </div>
          <div>
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3  ">Offering documents</h1>
            <DocumentList documents={offeringDocs} isOfferingManager={false} offeringId={offering.id} />{' '}
            <h1 className="text-cDarkBlue text-xl font-bold  mb-3 mt-16 ">Token agreement</h1>
            {legalLinkTexts &&
              smartContractDocuments &&
              legalLinkTexts?.length > 0 &&
              smartContractDocuments?.length > 0 && (
                <HashInstructions
                  contractDocuments={smartContractDocuments}
                  agreementTexts={legalLinkTexts}
                  shareContractAddress={shareContractAddress}
                />
              )}
          </div>
        </TwoColumnLayout>
      </Container>
    </div>
  );
};

export default PortalOffering;

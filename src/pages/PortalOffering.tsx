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
import useOfferingDetails from '@hooks/useOfferingDetails';
import { DocumentType, Offering } from 'types';
import { floatWithCommas } from '@src/utils/helpersMoney';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { shareContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { toNormalNumber } from '@src/web3/util';
import { useAccount, useBalance, useContractRead, useContractReads, useNetwork } from 'wagmi';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

type PortalOfferingProps = {
  offering: Offering;
  refetchOffering: () => void;
};

const PortalOffering: FC<PortalOfferingProps> = ({ offering, refetchOffering }) => {
  const { address: userWalletAddress } = useAccount();
  const router = useRouter();
  const orgId = router.query.organizationId;
  const { data: organizationData } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });

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
    myShareQty,
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
    transferEvents,
  } = useOfferingDetails(offering);

  const sharedContractSpecs = {
    address: shareContractAddress,
    abi: shareContractABI,
  };

  const { data } = useContractReads({
    contracts: [
      {
        ...sharedContractSpecs,
        functionName: 'partitionsOf',
        args: [userWalletAddress as String0x],
      },
      {
        ...sharedContractSpecs,
        functionName: 'isWhitelisted',
        args: [userWalletAddress as String0x],
      },
    ],
  });

  const { data: bacBalanceData, refetch: refetchUserBalance } = useBalance({
    address: userWalletAddress,
    token: paymentTokenAddress,
  });
  const myBacBalance = bacBalanceData?.formatted;
  const bacSymbol = bacBalanceData?.symbol;

  const partitions = data?.[0].result;
  const isWhitelistError = data?.[1].error;
  const isWhitelisted = data?.[1].result;

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
    refetchTransactionHistory();
    refetchUserBalance();
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
          <h1 className="text-2xl font-bold">You are not a participant of this offering.</h1>
          <p className="text-lg">Please contact the fund manager for more information.</p>
        </div>
      </div>
    );
  }

  const whitelistError = (
    <div className="w-screen h-screen flex justify-center items-center pb-32">
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Error retrieving allowlist status.</h1>
          <p className="text-lg">Please make sure your wallet is set to the same network as this offering.</p>
        </div>
      </div>
    </div>
  );

  const removedFromWhitelist = (
    <div className="flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">You have been removed from this offering.</h1>
        <p className="text-lg">Please contact the fund manager for more information.</p>
      </div>
    </div>
  );

  if (isWhitelistError) {
    return whitelistError;
  } else if (!isWhitelisted) {
    return <div className="w-screen h-screen flex justify-center items-center pb-32">{removedFromWhitelist}</div>;
  }

  return (
    <div data-test="component-PortalOffering" className="flex flex-col w-full h-full mx-auto px-4 pt-10">
      <FormModal
        formOpen={managerModal === 'saleForm'}
        onClose={() => setManagerModal('none')}
        title={`Buy or sell shares of ${offeringName}`}
      >
        <PostBidAskForm
          offering={offering}
          offeringMin={minUnitsPerInvestor}
          sharesOutstanding={sharesOutstanding}
          walletAddress={userWalletAddress as String0x}
          myShareQty={myShareQty}
          swapContractAddress={swapContractAddress}
          swapApprovalsEnabled={swapApprovalsEnabled}
          isContractOwner={false}
          currentSalePrice={currentSalePrice}
          setModal={setManagerModal}
          partitions={partitions as String0x[]}
          paymentTokenDecimals={paymentTokenDecimals}
          refetchOfferingInfo={refetchOfferingInfo}
          refetchAllContracts={refetchMainContracts}
        />
      </FormModal>

      <Container>
        <h2 className="text-4xl  text-blue-900 font-semibold mb-4">{offeringName}</h2>
      </Container>
      <Container className="flex flex-col">
        <TwoColumnLayout>
          <DashboardCard>
            {isWhitelisted ? (
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
                swapApprovalsEnabled={swapApprovalsEnabled}
                shareContractAddress={shareContractAddress}
                refetchOfferingInfo={refetchOfferingInfo}
                myShareQty={myShareQty}
                transferEvents={transferEvents}
              />
            ) : (
              removedFromWhitelist
            )}
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
                myShareQty: myShareQty,
                paymentToken: paymentTokenAddress,
              }}
            />
            <hr className="mt-6 mb-4" />
            <div className="flex text-xs font-medium uppercase">
              {`Your wallet balance: ${floatWithCommas(myBacBalance as string, 2)} ${bacSymbol}
               `}
            </div>
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

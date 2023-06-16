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
import { ContractOrder, getCurrentOrderPrice, getOrderArrayFromContract } from '@src/utils/helpersMoney';
import { DocumentType, Offering } from 'types';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { shareContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import { useAsync } from 'react-use';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useShareContractInfo } from '@src/web3/hooks/useShareContractInfo';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';

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
    orders,
    smartContractSets,
  } = offering;

  const minUnitsPerInvestor = details?.minUnitsPerInvestor;

  const contractSet = smartContractSets?.slice(-1)[0];
  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress.address as String0x;
  const swapContract = contractSet?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;

  const [contractSaleList, setContractSaleList] = useState<ContractOrder[]>([]);
  const [shareSaleManagerModal, setShareSaleManagerModal] = useState<boolean>(false);
  const [saleFormModal, setSaleFormModal] = useState<boolean>(false);
  const [bidFormModel, setBidFormModel] = useState<boolean>(false);

  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress?.address as String0x;
  const {
    myShares,
    sharesOutstanding,
    allDocuments,
    isLoading: shareIsLoading,
    refetchShareContract,
  } = useShareContractInfo(shareContractAddress, userWalletAddress);

  const myBacBalance = 234000;
  const fundsDistributed = 20000;
  const numDistributions = 4;

  const {
    paymentTokenAddress,
    paymentTokenDecimals,
    txnApprovalsEnabled,
    swapApprovalsEnabled,
    isLoading: swapIsLoading,
    refetchSwapContract,
  } = useSwapContractInfo(swapContractAddress);

  const refetchMainContracts = () => {
    refetchShareContract();
    refetchSwapContract();
  };

  const { data: partitions, error } = useContractRead({
    address: shareContractAddress,
    abi: shareContractABI,
    functionName: 'partitionsOf',
    args: [userWalletAddress as String0x],
  });

  const isLoading = shareIsLoading || swapIsLoading;

  const documents = offering?.documents;
  const legalLinkTexts = documents && getDocumentsOfType(documents, DocumentType.ShareLink);

  const offeringParticipant = participants?.find((participant) => {
    return participant?.addressOfferingId === userWalletAddress + offeringId;
  });

  useAsync(async () => {
    const contractSaleList =
      orders &&
      paymentTokenDecimals &&
      (await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals));
    contractSaleList && setContractSaleList(contractSaleList);
  }, [orders, swapContractAddress, paymentTokenDecimals, getOrderArrayFromContract]);

  const contractOrders = orders?.filter((order) => {
    return order?.swapContractAddress === swapContractAddress;
  });

  const currentSalePrice = getCurrentOrderPrice(contractSaleList, offering.details?.priceStart);
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
        formOpen={saleFormModal}
        onClose={() => setSaleFormModal(false)}
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
          permittedEntity={offeringParticipant}
          isContractOwner={false}
          currentSalePrice={currentSalePrice}
          setModal={setSaleFormModal}
          partitions={partitions as String0x[]}
          paymentTokenDecimals={paymentTokenDecimals}
          refetchAllContracts={refetchMainContracts}
        />
      </FormModal>

      {/* <FormModal
        formOpen={shareSaleManagerModal}
        onClose={() => setShareSaleManagerModal(false)}
        title={`Manage your shares of ${offeringName}`}
      >
        <ShareSaleList
          offering={offering}
          walletAddress={userWalletAddress}
          orders={contractOrders}
          permittedEntity={offeringParticipant}
          isContractOwner={false}
          setShareSaleManagerModal={setShareSaleManagerModal}
          setSaleFormModal={setSaleFormModal}
          refetchMainContracts={refetchMainContracts}
          swapContractAddress={swapContractAddress}
          paymentTokenAddress={paymentTokenAddress}
          txnApprovalsEnabled={txnApprovalsEnabled}
        />
      </FormModal> */}
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
              permittedEntity={offeringParticipant}
              isContractOwner={false}
              setShareSaleManagerModal={setShareSaleManagerModal}
              setSaleFormModal={setSaleFormModal}
              refetchMainContracts={refetchMainContracts}
              paymentTokenAddress={paymentTokenAddress}
              paymentTokenDecimals={paymentTokenDecimals}
              txnApprovalsEnabled={txnApprovalsEnabled}
              shareContractAddress={shareContractAddress}
              refetchOffering={refetchOffering}
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
            {legalLinkTexts && allDocuments && legalLinkTexts?.length > 0 && allDocuments?.length > 0 && (
              <HashInstructions
                contractDocuments={allDocuments}
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

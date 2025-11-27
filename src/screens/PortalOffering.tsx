'use client';

import { useOffering } from '@contexts/OfferingContext';
import DashboardCard from '@src/components/cards/DashboardCard';
import HashInstructions from '@src/components/documentVerification/HashInstructions';
import PostBidAskForm from '@src/components/investor/tradingForms/PostBidAskForm';
import ShareSaleList from '@src/components/investor/tradingForms/ShareSaleList';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingDetailsDisplay from '@src/components/offering/OfferingDetailsDisplay';
import FormModal from '@src/containers/FormModal';
import Container from '@src/containers/Layouts/Container';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import { getRealEstatePropertiesFromOffering } from '@src/utils/actions/rePropertyActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import { floatWithCommas } from '@src/utils/helpersMoney';
import { ManagerModalType } from '@src/utils/helpersOffering';
import { shareContractABI } from '@src/web3/generated';
import { String0x } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { erc20Abi, formatUnits } from 'viem';
import { useConnection, useReadContract, useReadContracts } from 'wagmi';

import { DocumentType, OfferingParticipant } from '@/types';

const PortalOffering: FC = () => {
  const { address: userWalletAddress } = useConnection();

  const {
    offering,
    documents,
    shareContractAddress,
    distributionContractAddress,
    orders,
    legalLinkTexts,
    currentSalePrice,
    myShareQty,
    sharesOutstanding,
    smartContractDocuments,
    paymentTokenAddress,
    paymentTokenDecimals,
    refetchMainContracts,
    refetchOfferingInfo
  } = useOffering();

  const { min_units_per_investor, name: offeringName, id: offeringId, participants } = offering;

  const [managerModal, setManagerModal] = useState<ManagerModalType>('none');

  const offeringDocs = documents
    ? getDocumentsOfType(documents, DocumentType.OFFERING_DOCUMENT)
    : [];

  const sharedContractSpecs = {
    address: shareContractAddress,
    abi: shareContractABI
  };

  const { data } = useReadContracts({
    contracts: [
      {
        ...sharedContractSpecs,
        functionName: 'partitionsOf',
        args: [userWalletAddress as String0x]
      },
      {
        ...sharedContractSpecs,
        functionName: 'isWhitelisted',
        args: [userWalletAddress as String0x]
      }
    ]
  });

  const tokenDecimals = paymentTokenDecimals ?? 18;

  const { data: bacBalanceData, refetch: refetchUserBalance } = useReadContract({
    address: paymentTokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userWalletAddress ? [userWalletAddress as String0x] : undefined,
    query: { enabled: Boolean(userWalletAddress && paymentTokenAddress) }
  });
  const myBacBalance = bacBalanceData ? formatUnits(bacBalanceData, tokenDecimals) : undefined;

  const partitions = data?.[0].result;
  const isWhitelistError = data?.[1].error;
  const isWhitelisted = data?.[1].result;

  const { value: propertiesData } = useAsync(async () => {
    const properties = await getRealEstatePropertiesFromOffering(offering.id.toString());
    return properties;
  }, [offering.id]);

  const realEstateProperties = propertiesData ?? [];

  const offeringParticipant = participants?.find((participant: OfferingParticipant) => {
    return (
      userWalletAddress &&
      participant?.wallet_address.toLowerCase() === userWalletAddress.toLowerCase()
    );
  });

  if (!offeringParticipant) {
    return (
      <div className='w-screen h-screen flex justify-center items-center pb-32'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>You are not a participant of this offering.</h1>
          <p className='text-lg'>Please contact the fund manager for more information.</p>
        </div>
      </div>
    );
  }

  const whitelistError = (
    <div className='w-screen h-screen flex justify-center items-center pb-32'>
      <div className='flex justify-center items-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold'>Error retrieving allowlist status.</h1>
          <p className='text-lg'>
            Please make sure your wallet is set to the same network as this offering.
          </p>
        </div>
      </div>
    </div>
  );

  const removedFromWhitelist = (
    <div className='flex justify-center items-center'>
      <div className='text-center'>
        <h1 className='text-2xl font-bold'>You have been removed from this offering.</h1>
        <p className='text-lg'>Please contact the fund manager for more information.</p>
      </div>
    </div>
  );

  if (isWhitelistError) {
    return whitelistError;
  } else if (!isWhitelisted) {
    return (
      <div className='w-screen h-screen flex justify-center items-center pb-32'>
        {removedFromWhitelist}
      </div>
    );
  }

  return (
    <div
      data-test='component-PortalOffering'
      className='flex flex-col w-full h-full mx-auto px-4 pt-10'
    >
      <FormModal
        formOpen={managerModal === 'saleForm'}
        onClose={() => setManagerModal('none')}
        title={`Buy or sell shares of ${offeringName}`}
      >
        <PostBidAskForm
          walletAddress={userWalletAddress as string}
          setModal={setManagerModal}
          refetchAllContracts={refetchMainContracts}
        />
      </FormModal>

      <Container>
        <h2 className='text-4xl  text-blue-900 font-semibold mb-4'>{offeringName}</h2>
      </Container>
      <Container className='flex flex-col'>
        <TwoColumnLayout>
          <DashboardCard>
            {isWhitelisted ? <ShareSaleList setModal={setManagerModal} /> : removedFromWhitelist}
          </DashboardCard>
          <DashboardCard>
            <OfferingDetailsDisplay
              className='my-6'
              offering={offering}
              currentSalePrice={currentSalePrice}
              isOfferingManager={false}
              contractViewDetails={{
                sharesOutstanding: sharesOutstanding,
                totalDistributed: undefined,
                myShareQty: myShareQty,
                paymentToken: paymentTokenAddress
              }}
            />
            <hr className='mt-6 mb-4' />
            <div className='flex text-xs font-medium uppercase'>
              {`Your wallet balance: ${floatWithCommas(myBacBalance as string, 2)} ${getCurrencyOption(offering.investment_currency)?.symbol}
               `}
            </div>
          </DashboardCard>
        </TwoColumnLayout>
        <TwoColumnLayout twoThirdsLayout>
          <div className='mt-4 '>
            {distributionContractAddress && (
              <DistributionList
                distributionContractAddress={distributionContractAddress}
                distributions={offering?.distributions}
                walletAddress={userWalletAddress as String0x}
              />
            )}

            <div className='mt-20 flex'>
              <ProfileTabContainer
                offering={offering}
                realEstateProperties={realEstateProperties}
              />
            </div>
          </div>
          <div>
            <h1 className='text-cDarkBlue text-xl font-bold  mb-3  '>Offering documents</h1>
            <DocumentList
              documents={offeringDocs}
              isOfferingManager={false}
              offeringId={offering.id.toString()}
            />{' '}
            <h1 className='text-cDarkBlue text-xl font-bold  mb-3 mt-16 '>Token agreement</h1>
            {legalLinkTexts &&
              smartContractDocuments &&
              legalLinkTexts?.length > 0 &&
              smartContractDocuments?.length > 0 &&
              shareContractAddress && (
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

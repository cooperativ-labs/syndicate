'use client';

import AddressDisplay from '@src/components/address/AddressDisplay';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import ShareOfferPanel from '@src/components/offering/ShareOfferPanel';
import { contentSectionHeader } from '@src/components/offering/tabs/TextSection';
import OfferingProperties from '@src/components/properties/OfferingProperties';
import Header from '@src/containers/Header';
import Container from '@src/containers/Layouts/Container';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import ChooseConnectorButton from '@src/containers/wallet/ChooseConnectorButton';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';
import {
  ContractOrder,
  getCurrentOrderPrice,
  getOrderArrayFromContract
} from '@src/utils/helpersOrder';
import { getBaseUrl } from '@src/utils/helpersURL';
import { String0x } from '@src/web3/helpersChain';
import { useSwapContractInfo } from '@src/web3/hooks/useSwapContractInfo';
import { cn } from '@src/lib/utils';
import { useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { useAccount } from 'wagmi';
import { getOfferingDocumentsById } from '@src/utils/actions/offeringActions';
import { getRealEstateProperties } from '@src/utils/actions/rePropertyActions';
import {
  Document,
  DocumentType,
  OfferingFull,
  OrganizationComplete,
  OfferingDistribution,
  RealEstatePropertyWithAddresses
} from '@/types';
import { getDistributions, retrieveOrders } from '@src/utils/actions/orderActions';

type OfferingProfileProps = {
  offering: OfferingFull;
  organization: OrganizationComplete;
};

const OfferingProfile: FC<OfferingProfileProps> = ({ offering, organization }) => {
  const router = useRouter();

  const { address: userWalletAddress } = useAccount();
  const {
    id: offeringId,
    name: offeringName,
    website,
    offeringSmartContracts,
    legalEntity,
    price_start
  } = offering;

  const [contractSaleList, setContractSaleList] = useState<ContractOrder[]>([]);
  const [realEstateProperties, setRealEstateProperties] = useState<
    RealEstatePropertyWithAddresses[]
  >([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [distributions, setDistributions] = useState<OfferingDistribution[]>([]);
  const shareContract = offeringSmartContracts?.shareContract;
  const swapContract = offeringSmartContracts?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;
  const distributionContract = offeringSmartContracts?.distributionContract;
  const distributionContractAddress = distributionContract?.cryptoAddress.address as String0x;

  const partitions = shareContract?.partitions as String0x[];

  const shareURL = `${getBaseUrl()}/${offeringId}`;

  const { paymentTokenDecimals } = useSwapContractInfo(swapContractAddress);

  useAsync(async () => {
    const orders = await retrieveOrders(swapContractAddress);
    if (orders) {
      const contractSaleList =
        paymentTokenDecimals &&
        (await getOrderArrayFromContract(orders, swapContractAddress, paymentTokenDecimals));
      contractSaleList && setContractSaleList(contractSaleList);
    }
  }, [swapContractAddress, paymentTokenDecimals, getOrderArrayFromContract]);

  useAsync(async () => {
    const realEstateProperties = await getRealEstateProperties(legalEntity.id.toString());
    setRealEstateProperties(realEstateProperties);
  }, [legalEntity.id]);

  useAsync(async () => {
    const distributions = await getDistributions(distributionContractAddress);
    setDistributions(distributions);
  }, [distributionContractAddress]);

  useAsync(async () => {
    const documents = await getOfferingDocumentsById(offering.id.toString());
    setDocuments(documents);
  }, [offering.id]);

  const currentSalePrice = getCurrentOrderPrice(contractSaleList, price_start);
  // const OfferingReProperties = legalEntity?.real_estate_propertyCollection;
  // const operatingCurrency = legalEntity?.operating_currency;

  const { id: orgId, name: orgName, logo } = organization || { id: '', name: '', logo: '' };

  const OrgLogo = logo ? logo : '/assets/images/logos/company-placeholder.jpeg';

  return (
    <div data-test="layout-project" className="w-full h-full pb-10 md:pb-20">
      <Header offering={offering} realEstateProperties={realEstateProperties} />
      {/* <div className="w-full bg-white border-gray-200 border-b-2 ">
        <section className="w-full flex py-4 mx-8 md:px-8 lg:px-16">
          {stage && <Progress brandColor={brandColor ?? '#275A8F'} lightBrand={false} stage={stage} className="flex" />}
        </section>
      </div> */}
      <div className="absolute right-4 top-4 flex justify-end ">
        <div className="flex items-center justify-center rounded-full bg-slate-50 shadow-sm">
          <ChooseConnectorButton buttonText={'Connect Wallet'} />
        </div>
      </div>
      {/* <WalletChooserModal /> */}
      <Container className="flex flex-col px-2 md:px-8 z-40 relative">
        <TwoColumnLayout twoThirdsLayout className="lg:-mt-24">
          {/* Slot 1 */}
          <div className="grow flex flex-col justify-center z-10">
            <h1 className={cn(['mt-24 text-3xl ubuntu font-bold text-gray-800'])}>
              <span className="flex items-center">
                {offeringName}

                {/* <button
                  data-test="atom-join-project-button"
                  className={cn([
                    'flex ubuntu rounded-full bg-white text-green-500 px-2 py-2 w-10 h-10',
                    'items-center text-base shadow-lg shrink-0 flex justify-center ml-4',
                  ])}
                  onClick={() => copyTextToClipboard(shareURL)}
                >
                  <img src="/assets/images/icons/share.svg" className="h-4 w-4" />
                </button> */}
              </span>
            </h1>
            <div
              className="flex text-sm text-gray-800 my-3 bg-white  rounded-full drop-shadow-md hover:drop-shadow-xl hover:cursor-pointer items-center max-w-max "
              onClick={() => router.push(`/${orgId}/portal`)}
            >
              <img
                className="h-10 w-10 bg-slate-400 border border-slate-400 rounded-full"
                src={OrgLogo}
              />{' '}
              <span className="pl-2 pr-4 font-semibold">{orgName}</span>
            </div>
            {legalEntity?.addresses?.map((address, i) => (
              <AddressDisplay address={address} key={i} className="text-sm" />
            ))}
            {website && (
              <a href={website} target="_blank" rel="noreferrer">
                <div className="text-sm text-gray-800"> {website} </div>
              </a>
            )}
          </div>

          {/* <section className="flex w-full col-span-1">
              <div>{details && <OfferingDetailsPublic offeringDetails={details} brandColor={brandColor} />}</div>
            </section> */}
          {/* Slot 2 */}
          <div className="">
            <ShareOfferPanel
              offering={offering}
              currentUser={userWalletAddress}
              currentSalePrice={currentSalePrice}
              organization={organization}
            />
          </div>
          {/* Slot 1 */}
          <div className="mt-4 ">
            <div className="flex">
              <ProfileTabContainer offering={offering} />
            </div>
          </div>
          {/* Slot 2 */}
          <>
            <h2 className="text-gray-800 font-bold mb-3">Offering Documents</h2>
            <DocumentList
              documents={getDocumentsOfType(documents, DocumentType.OFFERING_DOCUMENT)}
              isOfferingManager={false}
              offeringId={offering.id.toString()}
            />
          </>
          {/* Slot 3 */}
          <></>
          {/* Slot 4 */}
          <div>
            <div>
              <h2 className="text-gray-800 font-bold mb-3">Distribution History</h2>

              <DistributionList
                distributionContractAddress={distributionContractAddress}
                distributions={distributions}
                hideTransactionId
                walletAddress={userWalletAddress}
              />
            </div>
          </div>
        </TwoColumnLayout>
        <div className="w-full">
          <h1 className={contentSectionHeader}>Properties</h1>
          <OfferingProperties
            properties={realEstateProperties}
            offeringEntity={legalEntity}
            isOfferingManager={false}
            offeringId={offering.id.toString()}
          />
        </div>
      </Container>
    </div>
  );
};

export default OfferingProfile;

import AddressDisplay from '@src/components/address/AddressDisplay';
import cn from 'classnames';
import Container from '@src/containers/Layouts/Container';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import Header from '@src/containers/Header';
import OfferingProperties from '@src/components/properties/OfferingProperties';
import ProfileTabContainer from '@src/containers/ProfileTabContainer';
import React, { FC } from 'react';
import router from 'next/router';
import ShareOfferPanel from '@src/components/offering/ShareOfferPanel';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { contentSectionHeader } from '@src/components/offering/tabs/TextSection';
import { DocumentType, Offering } from 'types';
import { getBaseUrl } from '@src/utils/helpersURL';
import { getCurrentSalePrice } from '@src/utils/helpersMoney';
import { getDocumentsOfType } from '@src/utils/helpersDocuments';

import { String0x } from '@src/web3/helpersChain';
import { useAccount, useChainId } from 'wagmi';

type OfferingProfileProps = {
  offering: Offering;
};

const OfferingProfile: FC<OfferingProfileProps> = ({ offering }) => {
  const { address: userWalletAddress } = useAccount();
  const {
    details,
    brandColor,
    website,
    offeringEntity,
    id: offeringId,
    name: offeringName,
    distributions,
    smartContractSets,
  } = offering;
  const contractSet = smartContractSets?.slice(-1)[0];

  const shareContract = contractSet?.shareContract;
  const shareContractAddress = shareContract?.cryptoAddress.address as String0x;
  const swapContract = contractSet?.swapContract;
  const swapContractAddress = swapContract?.cryptoAddress.address as String0x;
  const distributionContract = contractSet?.distributionContract;
  const distributionContractAddress = distributionContract?.cryptoAddress.address as String0x;

  const partitions = shareContract?.partitions as String0x[];
  const type = details && details.type;
  const stage = details && details.stage;
  const organization = offeringEntity.organization;
  const shareURL = `${getBaseUrl()}/${offeringId}`;

  const currentSalePrice = getCurrentSalePrice(offering);
  const OfferingReProperties = offering.offeringEntity.realEstateProperties;
  const operatingCurrency = offering.offeringEntity.operatingCurrency;

  const { id: orgId, name: orgName, logo } = organization;

  const OrgLogo = logo ? logo : '/assets/images/logos/company-placeholder.jpeg';

  return (
    <div data-test="layout-project" className="w-full h-full pb-10 md:pb-20">
      <Header offering={offering} />
      {/* <div className="w-full bg-white border-gray-200 border-b-2 ">
        <section className="w-full flex py-4 mx-8 md:px-8 lg:px-16">
          {stage && <Progress brandColor={brandColor ?? '#275A8F'} lightBrand={false} stage={stage} className="flex" />}
        </section>
      </div> */}

      <Container className="flex flex-col px-2 md:px-8 z-40 relative">
        <TwoColumnLayout twoThirdsLayout className="lg:-mt-24">
          {/* Slot 1 */}
          <div className="flex-grow flex flex-col justify-center z-10">
            <h1 className={cn(['mt-24 text-3xl ubuntu font-bold text-gray-800'])}>
              <span className="flex items-center">
                {offeringName}

                {/* <button
                  data-test="atom-join-project-button"
                  className={cn([
                    'flex ubuntu rounded-full bg-white text-green-500 px-2 py-2 w-10 h-10',
                    'items-center text-base shadow-lg flex-shrink-0 flex justify-center ml-4',
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
              <img className="h-10 w-10 bg-slate-400 border-1 border-slate-400 rounded-full" src={OrgLogo} />{' '}
              <span className="pl-2 pr-4 font-semibold">{orgName}</span>
            </div>
            {offeringEntity.addresses.map((address, i) => (
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
            {details && (
              <ShareOfferPanel
                offering={offering}
                currentUser={userWalletAddress}
                currentSalePrice={currentSalePrice}
                organization={organization}
              />
            )}
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
              documents={getDocumentsOfType(offering.documents, DocumentType.OfferingDocument)}
              isOfferingManager={false}
              offeringId={offering.id}
            />
          </>
          {/* Slot 3 */}
          <></>
          {/* Slot 4 */}
          <div>
            <div>
              <h2 className="text-gray-800 font-bold mb-3">Distribution History</h2>
              {details && (
                <DistributionList
                  distributionContractAddress={distributionContractAddress}
                  distributions={distributions}
                  hideTransactionId
                  walletAddress={userWalletAddress}
                />
              )}
            </div>
          </div>
        </TwoColumnLayout>
        <div className="w-full">
          <h1 className={contentSectionHeader}>Properties</h1>
          <OfferingProperties offeringEntity={offeringEntity} isOfferingManager={false} offeringId={offering.id} />
        </div>
      </Container>
    </div>
  );
};

export default OfferingProfile;

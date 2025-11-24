import DistributionList from '@src/components/offering/distributions/DistributionList';
import SubmitDistribution from '@src/components/offering/SubmitDistribution';
import Tab from '@src/components/offering/tabs/Tab';
import AddWhitelistAddress from '@src/components/offering/whitelist/AddWhitelistAddress';
import WhitelistAddressList, {
  WhitelistAddressListProps
} from '@src/components/offering/whitelist/WhitelistAddressList';
import OfferingProperties from '@src/components/properties/OfferingProperties';
import { Button } from '@src/components/ui/button';
import { Separator } from '@src/components/ui/separator';
import { cn } from '@src/lib/utils';
import { getRealEstatePropertiesFromOffering } from '@src/utils/actions/rePropertyActions';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { String0x } from '@src/web3/helpersChain';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { useConnection } from 'wagmi';

import {
  CurrencyCodeType,
  EnrichedOfferingParticipant,
  Jurisdiction,
  LegalEntity,
  OfferingDistribution,
  OfferingParticipant,
  OfferingSmartContractSet,
  ShareTransferEvent
} from '@/types';

import FormModal from './FormModal';

type OfferingTabContainerProps = WhitelistAddressListProps & {
  legalEntity: LegalEntity;
  distributions: OfferingDistribution[];
  investment_currency: CurrencyCodeType;
  offeringId: string;
  offeringParticipants: EnrichedOfferingParticipant[];
  contractSet: OfferingSmartContractSet | null;
  contractManagerMatches: boolean;
  isContractOwner: boolean;
  offeringEntity: LegalEntity | undefined;
  isOfferingManager: boolean;
  currentSalePrice: number | undefined;
  partitions: String0x[];
  transferEvents: ShareTransferEvent[];
  investorListRefreshTrigger: number;
  refetchContracts: () => void;
};

const TabOptions = [
  { value: 'investors', name: 'Investors', showInvestors: false },
  { value: 'distributions', name: 'Distributions', showInvestors: true },
  { value: 'properties', name: 'Properties', showInvestors: true }
];

const OfferingTabContainer: FC<OfferingTabContainerProps> = ({
  legalEntity,
  distributions,
  investment_currency,
  offeringId,
  offeringParticipants,
  contractSet,
  contractManagerMatches,
  isContractOwner,
  offeringEntity,
  isOfferingManager,
  currentSalePrice,
  partitions,
  transferEvents,
  investorListRefreshTrigger,
  triggerInvestorListRefresh,
  refetchContracts
}) => {
  const { address: userWalletAddress } = useConnection();
  const distArraylength = distributions?.length;
  const hasDistributions = distArraylength && distArraylength > 0;
  const startingTab = isOfferingManager
    ? 'investors'
    : hasDistributions
      ? 'distributions'
      : 'properties';
  const [activeTab, setActiveTab] = useState<string>(startingTab);
  const investorTabOptions = TabOptions.filter(tab => tab.showInvestors);
  const tabList = isOfferingManager ? TabOptions : investorTabOptions;
  const [submitDistributionModal, setSubmitDistributionModal] = useState<boolean>(false);

  const { value: propertiesData } = useAsync(async () => {
    const properties = await getRealEstatePropertiesFromOffering(offeringId);
    return properties;
  }, [offeringId]);

  const properties = propertiesData ?? [];

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress
    ?.address as String0x;
  const distributionTokenDecimals = getCurrencyOption(investment_currency)?.decimals;
  const distributionTokenAddress = getCurrencyOption(investment_currency)?.address as String0x;

  return (
    <div>
      {distributionContractAddress && (
        <FormModal
          formOpen={submitDistributionModal}
          onClose={() => setSubmitDistributionModal(false)}
          title={`Submit a distribution`}
        >
          <SubmitDistribution
            distributionContractAddress={distributionContractAddress}
            distributionTokenDecimals={distributionTokenDecimals}
            distributionTokenAddress={distributionTokenAddress}
            partitions={partitions}
            offeringId={offeringId}
            refetchContracts={refetchContracts}
          />
        </FormModal>
      )}
      <div className={cn(`grid grid-cols-${tabList.length}`)}>
        {tabList.map((tab, i) => {
          return (
            <Tab
              key={i}
              tabId={tab.value}
              label={tab.name}
              setActiveTab={setActiveTab}
              activeTab={activeTab}
            />
          );
        })}
      </div>
      <div>
        {activeTab === 'properties' && (
          <div className='mt-8'>
            <div className='mb-6'>
              <h1 className='text-cDarkBlue text-2xl font-medium  '>Properties</h1>
            </div>
            <OfferingProperties
              offeringEntity={offeringEntity as LegalEntity}
              isOfferingManager={isOfferingManager}
              offeringId={offeringId}
              properties={properties}
            />
          </div>
        )}
        {activeTab === 'investors' && (
          <div className='mt-8'>
            {shareContractAddress ? (
              <div>
                <div className='flex justify-between items-center mb-6'>
                  <h1 className='text-cDarkBlue text-2xl font-medium '>Investors</h1>
                </div>
                <WhitelistAddressList
                  offeringParticipants={offeringParticipants}
                  distributions={distributions}
                  contractSet={contractSet}
                  investmentCurrency={investment_currency}
                  currentSalePrice={currentSalePrice}
                  offeringId={offeringId}
                  organizationId={legalEntity.organization_id.toString()}
                  transferEventList={transferEvents}
                  investorListRefreshTrigger={investorListRefreshTrigger}
                  triggerInvestorListRefresh={triggerInvestorListRefresh}
                  refetchContracts={refetchContracts}
                />
                <Separator className='my-4 mt-5' />
                <AddWhitelistAddress
                  shareContractAddress={shareContractAddress}
                  offeringId={offeringId}
                  organizationId={legalEntity.organization_id}
                />
              </div>
            ) : (
              <div>You must create a share contract before you can add investors.</div>
            )}
          </div>
        )}
        {activeTab === 'distributions' && (
          <div className='mt-8'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-cDarkBlue text-2xl font-medium '>Distributions</h1>
              {contractManagerMatches && isContractOwner && !!distributionContractAddress && (
                <Button
                  onClick={() => {
                    setSubmitDistributionModal(true);
                  }}
                  className='h-12 bg-cLightBlue p-3 font-semibold text-white rounded-md'
                >
                  Submit Distribution
                </Button>
              )}
            </div>
            <DistributionList
              distributionContractAddress={distributionContractAddress}
              distributions={distributions}
              isDistributor
              walletAddress={userWalletAddress as String0x}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferingTabContainer;

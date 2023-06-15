import AddWhitelistAddress from '@src/components/offering/whitelist/AddWhitelistAddress';
import Button from '@src/components/buttons/Button';
import cn from 'classnames';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import FormModal from './FormModal';
import OfferingProperties from '@src/components/properties/OfferingProperties';
import React, { FC, useState } from 'react';
import SubmitDistribution from '@src/components/offering/SubmitDistribution';
import Tab from '@src/components/offering/tabs/Tab';
import Waitlist from '@src/components/offering/whitelist/Waitlist';
import WhitelistAddressList from '@src/components/offering/whitelist/WhitelistAddressList';
import { getCurrencyOption } from '@src/utils/enumConverters';
import { LegalEntity, Maybe, Offering, OfferingSmartContractSet } from 'types';
import { String0x } from '@src/web3/helpersChain';
import { useAccount } from 'wagmi';

type OfferingTabContainerProps = {
  offering: Offering;
  contractSet: Maybe<OfferingSmartContractSet> | undefined;
  contractOwnerMatches: boolean;
  isContractOwner: boolean;
  offeringEntity: Maybe<LegalEntity> | undefined;
  isOfferingManager: boolean;
  currentSalePrice: Maybe<number> | undefined;
  partitions: String0x[];
  issuances: any[];
  refetchContracts: () => void;
};

const TabOptions = [
  { value: 'investors', name: 'Investors', showInvestors: false },
  { value: 'distributions', name: 'Distributions', showInvestors: true },
  { value: 'properties', name: 'Properties', showInvestors: true },
];

const OfferingTabContainer: FC<OfferingTabContainerProps> = ({
  offering,
  contractSet,
  contractOwnerMatches,
  isContractOwner,
  offeringEntity,
  isOfferingManager,
  currentSalePrice,
  partitions,
  issuances,
  refetchContracts,
}) => {
  const { address: userWalletAddress } = useAccount();
  const distributions = offering.distributions;
  const investmentCurrency = offering.details?.investmentCurrency;
  const distArraylength = distributions?.length;
  const hasDistributions = distArraylength && distArraylength > 0;
  const startingTab = isOfferingManager ? 'investors' : hasDistributions ? 'distributions' : 'properties';
  const [activeTab, setActiveTab] = useState<string>(startingTab);
  const investorTabOptions = TabOptions.filter((tab) => tab.showInvestors);
  const tabList = isOfferingManager ? TabOptions : investorTabOptions;
  const [submitDistributionModal, setSubmitDistributionModal] = useState<boolean>(false);

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress?.address as String0x;
  const distributionTokenDecimals = getCurrencyOption(offering.details?.investmentCurrency)?.decimals;
  const distributionTokenAddress = getCurrencyOption(offering.details?.investmentCurrency)?.address as String0x;

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
            offeringId={offering.id}
          />
        </FormModal>
      )}
      <div className={cn(`grid grid-cols-${tabList.length}`)}>
        {tabList.map((tab, i) => {
          return <Tab key={i} tabId={tab.value} label={tab.name} setActiveTab={setActiveTab} activeTab={activeTab} />;
        })}
      </div>
      <div>
        {activeTab === 'properties' && (
          <div className="mt-8">
            <h1 className="text-cDarkBlue text-2xl font-medium   mb-6 ">Properties</h1>
            <OfferingProperties
              offeringEntity={offeringEntity}
              isOfferingManager={isOfferingManager}
              offeringId={offering.id}
            />
          </div>
        )}
        {activeTab === 'investors' && (
          <div className="mt-8">
            {/* {isOfferingManager && (
              <>
                <h1 className="text-cDarkBlue text-2xl font-medium  mb-6 mt-8 ">Investor Waitlist</h1>
                {offering.waitlistMembers?.length > 0 && (
                  <Waitlist // MUST WORK ON THIS
                    offeringWaitlistMembers={offering.waitlistMembers}
                    offeringId={offering.id}
                  />
                )}
              </>
            )} */}
            {shareContractAddress ? (
              <div>
                <h1 className="text-cDarkBlue text-2xl font-medium  mb-6 mt-8 ">Investors</h1>
                <WhitelistAddressList
                  offeringParticipants={offering.participants}
                  contractSet={contractSet}
                  investmentCurrency={investmentCurrency}
                  currentSalePrice={currentSalePrice}
                  offeringId={offering.id}
                  issuances={issuances}
                  refetchContracts={refetchContracts}
                />
                <hr className="mt-5" />
                <AddWhitelistAddress shareContractAddress={shareContractAddress} offeringId={offering.id} />
              </div>
            ) : (
              <div>You must create a share contract before you can add investors.</div>
            )}
          </div>
        )}
        {activeTab === 'distributions' && (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-cDarkBlue text-2xl font-medium mb-6 mt-8 ">Distributions</h1>
              {contractOwnerMatches && isContractOwner && !!distributionContractAddress && (
                <Button
                  onClick={() => {
                    setSubmitDistributionModal(true);
                  }}
                  className="h-12 bg-cLightBlue p-3 font-semibold text-white rounded-md"
                >
                  Submit Distribution
                </Button>
              )}
            </div>
            <DistributionList
              distributionContractAddress={distributionContractAddress}
              distributions={offering.distributions}
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

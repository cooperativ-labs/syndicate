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
import { LegalEntity, Offering, OfferingSmartContractSet } from 'types';
import { String0x } from '@src/web3/helpersChain';

type OfferingTabContainerProps = {
  offering: Offering;
  contractSet: OfferingSmartContractSet;
  contractOwnerMatches: boolean;
  isContractOwner: boolean;
  offeringEntity: LegalEntity;
  isOfferingManager: boolean;
  currentSalePrice: number;
  partitions: String0x[];
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
}) => {
  const distributions = offering.distributions;
  const investmentCurrency = offering.details.investmentCurrency;
  const startingTab = isOfferingManager ? 'investors' : distributions.length > 0 ? 'distributions' : 'properties';
  const [activeTab, setActiveTab] = useState<string>(startingTab);
  const investorTabOptions = TabOptions.filter((tab) => tab.showInvestors);
  const tabList = isOfferingManager ? TabOptions : investorTabOptions;
  const [submitDistributionModal, setSubmitDistributionModal] = useState<boolean>(false);

  const shareContractAddress = contractSet?.shareContract?.cryptoAddress?.address as String0x;
  const distributionContractAddress = contractSet?.distributionContract?.cryptoAddress?.address as String0x;
  const distributionTokenDecimals = getCurrencyOption(offering.details?.investmentCurrency).decimals;
  const distributionTokenAddress = getCurrencyOption(offering.details?.investmentCurrency).address as String0x;

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
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferingTabContainer;

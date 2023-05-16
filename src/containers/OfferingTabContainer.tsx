import AddWhitelistAddress from '@src/components/offering/whitelist/AddWhitelistAddress';
import Button from '@src/components/buttons/Button';
import cn from 'classnames';
import DistributionList from '@src/components/offering/distributions/DistributionList';
import OfferingProperties from '@src/components/properties/OfferingProperties';
import React, { FC, useState } from 'react';
import Tab from '@src/components/offering/tabs/Tab';
import Waitlist from '@src/components/offering/whitelist/Waitlist';
import WhitelistAddressList from '@src/components/offering/whitelist/WhitelistAddressList';
import { LegalEntity, Offering } from 'types';

type OfferingTabContainerProps = {
  offering: Offering;
  contractId: string;
  contractOwnerMatches: boolean;
  isContractOwner: boolean;
  offeringEntity: LegalEntity;
  isOfferingManager: boolean;
  currentSalePrice: number;
};

const TabOptions = [
  { value: 'investors', name: 'Investors', showInvestors: false },
  { value: 'distributions', name: 'Distributions', showInvestors: true },
  { value: 'properties', name: 'Properties', showInvestors: true },
];

const OfferingTabContainer: FC<OfferingTabContainerProps> = ({
  offering,
  contractId,
  contractOwnerMatches,
  isContractOwner,
  offeringEntity,
  isOfferingManager,
  currentSalePrice,
}) => {
  const distributions = offering.distributions;
  const investmentCurrency = offering.details.investmentCurrency;
  const startingTab = isOfferingManager ? 'investors' : distributions.length > 0 ? 'distributions' : 'properties';
  const [activeTab, setActiveTab] = useState<string>(startingTab);
  const investorTabOptions = TabOptions.filter((tab) => tab.showInvestors);
  const tabList = isOfferingManager ? TabOptions : investorTabOptions;

  return (
    <div>
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
            {true ? (
              // {contractOwnerMatches && isContractOwner ? (
              <div>
                <h1 className="text-cDarkBlue text-2xl font-medium  mb-6 mt-8 ">Investors</h1>
                <WhitelistAddressList
                  offeringParticipants={offering.participants}
                  contractId={contractId}
                  investmentCurrency={investmentCurrency}
                  currentSalePrice={currentSalePrice}
                />
                <hr className="mt-5" />
                <AddWhitelistAddress contractId={contractId} offeringId={offering.id} />
              </div>
            ) : (
              <div>You must create a share contract before you can add investors.</div>
            )}
          </div>
        )}
        {activeTab === 'distributions' && (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-cDarkBlue text-2xl font-medium   mb-6 mt-8 ">Distributions</h1>
              {contractOwnerMatches && isContractOwner && (
                <Button onClick={() => {}} className="h-12 bg-cLightBlue p-3 font-semibold text-white rounded-md">
                  Submit Distribution
                </Button>
              )}
            </div>
            <DistributionList
              contractId={contractId}
              distributions={offering.distributions}
              currency={offering.details.distributionCurrency}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferingTabContainer;

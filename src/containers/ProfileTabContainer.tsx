import SourcesAndUsesDisplay from '@src/components/offering/tabs/financialDisplay/SourcesAndUses';
import TotalInvestmentValue from '@src/components/offering/tabs/financialDisplay/TotalInvestmentValue';
import TotalReturns from '@src/components/offering/tabs/financialDisplay/TotalReturns';
import Tab from '@src/components/offering/tabs/Tab';
import TextSection, { contentSectionHeader } from '@src/components/offering/tabs/TextSection';
import { tabSectionOptions } from '@src/utils/enumConverters';
import React, { FC, useState } from 'react';
import { useWindowSize } from 'react-use';

import {
  OfferingDescriptionText,
  OfferingFull,
  OfferingTabSection,
  RealEstatePropertyWithAddresses
} from '@/types';

type ProfileTabContainerProps = {
  offering: OfferingFull;
  realEstateProperties: RealEstatePropertyWithAddresses[];
};

const ProfileTabContainer: FC<ProfileTabContainerProps> = ({ offering, realEstateProperties }) => {
  const [activeTab, setActiveTab] = useState<typeof OfferingTabSection | string>(
    OfferingTabSection.DETAILS
  );
  const isMobile = useWindowSize().width < 768;
  function sortByOrder(descriptions: OfferingDescriptionText[]) {
    return descriptions.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
  }

  const detailsDescriptions = sortByOrder(
    offering.offeringProfileDescriptions?.filter(
      description => description?.section === OfferingTabSection.DETAILS
    ) as OfferingDescriptionText[]
  );
  const termsDescriptions = sortByOrder(
    offering.offeringProfileDescriptions?.filter(
      description => description?.section === OfferingTabSection.TERMS
    ) as OfferingDescriptionText[]
  );
  const offerorInfoDescriptions = sortByOrder(
    offering.offeringProfileDescriptions?.filter(
      description => description?.section === OfferingTabSection.OFFEROR_INFO
    ) as OfferingDescriptionText[]
  );
  const disclosuresDescriptions = sortByOrder(
    offering.offeringProfileDescriptions?.filter(
      description => description?.section === OfferingTabSection.DISCLOSURES
    ) as OfferingDescriptionText[]
  );

  const operatingCurrency = offering.legalEntity?.operating_currency;

  return (
    <div>
      <div className="py-8 md:py-0">
        <div className="absolute md:relative left-0 right-0 ">
          <nav className="overflow-x-scroll whitespace-nowrap">
            {tabSectionOptions.map((tab, i) => {
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
          </nav>
        </div>
      </div>
      <div className="p-2 mt-10">
        {activeTab === OfferingTabSection.DETAILS && (
          <div>
            {!!offering.primary_video && (
              <div className="mb-10">
                <h1 className={contentSectionHeader}>Featured video</h1>
                <iframe
                  width={isMobile ? '350' : '560'}
                  height={isMobile ? '200' : '315'}
                  src={offering.primary_video}
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {detailsDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
        {activeTab === OfferingTabSection.FINANCIALS && operatingCurrency && (
          <div>
            <TotalReturns offering={offering} />
            <SourcesAndUsesDisplay operatingCurrency={operatingCurrency} offering={offering} />
            <TotalInvestmentValue
              OfferingReProperties={realEstateProperties}
              operatingCurrency={operatingCurrency}
            />
          </div>
        )}
        {activeTab === OfferingTabSection.TERMS && (
          <div>
            {termsDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
        {activeTab === OfferingTabSection.OFFEROR_INFO && (
          <div>
            {offerorInfoDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
        {activeTab === OfferingTabSection.DISCLOSURES && (
          <div>
            {disclosuresDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTabContainer;

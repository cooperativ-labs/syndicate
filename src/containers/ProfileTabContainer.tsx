import MapPanel from '@src/components/MapPanel';
import React, { FC, useState } from 'react';
import SourcesAndUsesDisplay from '@src/components/offering/tabs/financialDisplay/SourcesAndUses';
import Tab from '@src/components/offering/tabs/Tab';
import TextSection, { contentSectionHeader } from '@src/components/offering/tabs/TextSection';
import TotalInvestmentValue from '@src/components/offering/tabs/financialDisplay/TotalInvestmentValue';
import TotalReturns from '@src/components/offering/tabs/financialDisplay/TotalReturns';
import { Offering, OfferingDescriptionText, OfferingTabSection } from 'types';
import { tabSectionOptions } from '@src/utils/enumConverters';
import { useWindowSize } from 'react-use';

type ProfileTabContainerProps = {
  offering: Offering;
};

const ProfileTabContainer: FC<ProfileTabContainerProps> = ({ offering }) => {
  const [activeTab, setActiveTab] = useState<OfferingTabSection>(OfferingTabSection.Details);
  const isMobile = useWindowSize().width < 768;
  function sortByOrder(descriptions: OfferingDescriptionText[]) {
    return descriptions.sort((a, b) => (a.order < b.order ? -1 : a.order > b.order ? 1 : 0));
  }

  const detailsDescriptions = sortByOrder(
    offering.profileDescriptions.filter((description) => description.section === OfferingTabSection.Details)
  );
  const termsDescriptions = sortByOrder(
    offering.profileDescriptions.filter((description) => description.section === OfferingTabSection.Terms)
  );
  const offerorInfoDescriptions = sortByOrder(
    offering.profileDescriptions.filter((description) => description.section === OfferingTabSection.OfferorInfo)
  );
  const disclosuresDescriptions = sortByOrder(
    offering.profileDescriptions.filter((description) => description.section === OfferingTabSection.Disclosures)
  );

  const OfferingReProperties = offering.offeringEntity.realEstateProperties;
  const operatingCurrency = offering.offeringEntity.operatingCurrency;

  return (
    <div>
      <div className="py-8 md:py-0">
        <div className="absolute md:relative left-0 right-0 ">
          <nav className="overflow-x-scroll whitespace-nowrap">
            {tabSectionOptions.map((tab, i) => {
              return (
                <Tab key={i} tabId={tab.value} label={tab.name} setActiveTab={setActiveTab} activeTab={activeTab} />
              );
            })}
          </nav>
        </div>
      </div>
      <div className="p-2 mt-10">
        {activeTab === OfferingTabSection.Details && (
          <div>
            {!!offering.primaryVideo && (
              <div className="mb-10">
                <h1 className={contentSectionHeader}>Featured video</h1>
                <iframe
                  width={isMobile ? '350' : '560'}
                  height={isMobile ? '200' : '315'}
                  src={offering.primaryVideo}
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
        {activeTab === OfferingTabSection.Financials && (
          <div>
            <TotalReturns offeringDetails={offering.details} />
            <SourcesAndUsesDisplay operatingCurrency={operatingCurrency} offeringDetails={offering.details} />
            <TotalInvestmentValue OfferingReProperties={OfferingReProperties} operatingCurrency={operatingCurrency} />
          </div>
        )}
        {activeTab === OfferingTabSection.Terms && (
          <div>
            {termsDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
        {activeTab === OfferingTabSection.OfferorInfo && (
          <div>
            {offerorInfoDescriptions.map((description, i) => (
              <TextSection key={i} title={description.title} text={description.text} />
            ))}
          </div>
        )}
        {activeTab === OfferingTabSection.Disclosures && (
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

import cn from 'classnames';

import DocumentList from '@src/components/offering/documents/DocumentList';
import EntitiesList from '@src/components/entity/EntitiesList';
import OfferingsList from '@src/components/offering/OfferingsList';
import React, { FC, useState } from 'react';
import Tab from '@src/components/offering/tabs/Tab';
import { LegalEntity, Offering, RealEstateProperty } from 'types';

type EntityTabContainerProps = {
  properties?: RealEstateProperty[];
  offerings: Offering[];
  subsidiaries: LegalEntity[];
  entity: LegalEntity;
};

const TabOptions = [
  // { value: 'properties', name: 'Properties' },
  { value: 'offerings', name: 'Offerings' },
  { value: 'subsidiaries', name: 'Subsidiaries & SPVs' },
  { value: 'documents', name: 'Documents' },
];
const EntityTabContainer: FC<EntityTabContainerProps> = ({ properties, offerings, subsidiaries, entity }) => {
  const [activeTab, setActiveTab] = useState<string>('offerings');

  return (
    <div>
      <div className={cn(`grid grid-cols-${TabOptions.length}`)}>
        {TabOptions.map((tab, i) => {
          return <Tab key={i} tabId={tab.value} label={tab.name} setActiveTab={setActiveTab} activeTab={activeTab} />;
        })}
      </div>
      <div>
        {activeTab === 'offerings' && (
          <div className="mt-8">
            <OfferingsList offerings={offerings} />
          </div>
        )}{' '}
        {/* {activeTab === 'properties' && (
          <div className="mt-8">
            <h1 className="text-cDarkBlue text-2xl font-medium   mb-6 ">Properties</h1>
            <OfferingsList offerings={offerings} />
          </div>
        )} */}
        {activeTab === 'subsidiaries' && (
          <div className="mt-8">
            <EntitiesList entities={subsidiaries} />
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="mt-8">
            <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Documents</h2>
            <DocumentList documents={entity.documentsOwned} isOfferingManager={false} hideUpload />
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityTabContainer;

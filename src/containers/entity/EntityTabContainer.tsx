'use client';
import EntitiesList from '@src/components/entity/EntitiesList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingsList, { OfferingListOfferingType } from '@src/components/offering/OfferingsList';
import Tab from '@src/components/offering/tabs/Tab';
import PropertyCardList from '@src/components/properties/PropertyCardList';
import { cn } from '@src/lib/utils';
import { getEntityDocumentsById } from '@src/utils/actions/documentActions';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';

import {
  CurrencyCodeType,
  LegalEntity,
  LegalEntityWithJurisdiction,
  Offering,
  RealEstateProperty,
  RealEstatePropertyWithAddress
} from '@/types';

type EntityTabContainerProps = {
  operatingCurrency: CurrencyCodeType | null;
  organizationId: string | number;
  properties?: RealEstatePropertyWithAddress[];
  offerings: OfferingListOfferingType[];
  subsidiaries: LegalEntityWithJurisdiction[] | null;
  entityId: string | number;
};

const TabOptions = [
  // { value: 'properties', name: 'Properties' },
  { value: 'offerings', name: 'Offerings' },
  { value: 'subsidiaries', name: 'Subsidiaries & SPVs' },
  { value: 'documents', name: 'Documents' }
];
const EntityTabContainer: FC<EntityTabContainerProps> = ({
  properties,
  organizationId,
  offerings,
  subsidiaries,
  entityId,
  operatingCurrency
}) => {
  const [activeTab, setActiveTab] = useState<string>('offerings');

  const { value: documents } = useAsync(async () => {
    const documents = await getEntityDocumentsById(entityId);
    return documents;
  }, [entityId]);

  return (
    <div>
      <div className={cn(`grid grid-cols-${TabOptions.length}`)}>
        {TabOptions.map((tab, i) => {
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
        {activeTab === 'offerings' && (
          <div className='mt-8'>
            <OfferingsList offerings={offerings} organizationId={organizationId} />
          </div>
        )}{' '}
        {activeTab === 'properties' && properties && (
          <div className='mt-8'>
            <h1 className='text-cDarkBlue text-2xl font-medium   mb-6 '>Properties</h1>
            <PropertyCardList properties={properties} operatingCurrency={operatingCurrency} />
          </div>
        )}
        {activeTab === 'subsidiaries' && (
          <div className='mt-8'>
            <EntitiesList entities={subsidiaries} organizationId={organizationId} />
          </div>
        )}
        {activeTab === 'documents' && (
          <div className='mt-8'>
            <h2 className='text-cDarkBlue text-xl font-bold  mb-3 '>Documents</h2>
            <DocumentList documents={documents || []} isOfferingManager={false} hideUpload />
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityTabContainer;

'use client';
import EntitiesList from '@src/components/entity/EntitiesList';
import DocumentList from '@src/components/offering/documents/DocumentList';
import OfferingsList from '@src/components/offering/OfferingsList';
import Tab from '@src/components/offering/tabs/Tab';
import { cn } from '@src/lib/utils';
import React, { FC, useState } from 'react';
import { useAsync } from 'react-use';
import { LegalEntityWithJurisdiction, OfferingWithParticipants, RealEstateProperty } from '@/types';
import { getEntityDocumentsById } from '@src/utils/actions/documentActions';

type EntityTabContainerProps = {
  operatingCurrency: string | null;
  organizationId: string | number;
  properties?: RealEstateProperty[];
  offerings: OfferingWithParticipants[];
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
  operatingCurrency,
  organizationId,
  offerings,
  subsidiaries,
  entityId
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
          <div className="mt-8">
            <OfferingsList
              offerings={offerings}
              operatingCurrency={operatingCurrency}
              organizationId={organizationId}
            />
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
            <EntitiesList entities={subsidiaries} organizationId={organizationId} />
          </div>
        )}
        {activeTab === 'documents' && (
          <div className="mt-8">
            <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Documents</h2>
            <DocumentList documents={documents || []} isOfferingManager={false} hideUpload />
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityTabContainer;

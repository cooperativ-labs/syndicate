'use client';

import AddItemButton from '@src/components/buttons/AddItemButton';
import CreateEntity from '@src/components/entity/CreateEntity';
import EntitiesList from '@src/components/entity/EntitiesList';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import React, { FC } from 'react';

import { useEntities } from '@/contexts/EntityContext';
import { useOrganizations } from '@/contexts/OrganizationsContext';

const EntityDashboard: FC = () => {
  const { isEditorOrAdmin } = useOrganizations();
  const { organizationId } = useParams();

  const { entities } = useEntities();
  const router = useRouter();

  const hasEntities = entities.length > 0;
  if (!hasEntities) {
    return (
      <LimitedWidthSection center>
        {/* <EnsureProfileCompletion
              user={user}
              explainerText="In order to create a business, we first need some personal information"
            >
              <> */}
        <div className='text-cLightBlue font-bold text-lg'>Create a legal business entity.</div>
        <hr className='my-6' />
        <CreateEntity actionOnCompletion={() => router.back()} />
        {/* </> */}
        {/* </EnsureProfileCompletion> */}
      </LimitedWidthSection>
    );
  }

  return (
    <div data-test='component-dashboard' className='flex flex-col w-full h-full'>
      <div className=' '>
        <EntitiesList entities={entities} organizationId={organizationId as string} />
        {isEditorOrAdmin && (
          <AddItemButton
            onClick={() => router.push(`/manager/${organizationId}/create-entity`)}
            classNames='p-5 border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700 mt-5'
            text='Add Entity'
          />
        )}
      </div>
    </div>
  );
};

export default EntityDashboard;

'use client';

import { useUserContext } from '@contexts/UserContext';
import AddItemButton from '@src/components/buttons/AddItemButton';
import CreateEntity from '@src/components/entity/CreateEntity';
import EntitiesList from '@src/components/entity/EntitiesList';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { LegalEntityWithSubsidiaries, OrganizationWithUsers } from '@/types';

const EntityDashboard: FC<{ entities: LegalEntityWithSubsidiaries[] }> = ({ entities }) => {
  const { user } = useUserContext();
  const router = useRouter();

  const organization = entities[0].organization;

  const isAdminOrEditor = getIsEditorOrAdmin(user?.id, organization);

  const hasEntities = entities.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className=" ">
        {hasEntities ? (
          <>
            <EntitiesList entities={entities} />
            {isAdminOrEditor && (
              <AddItemButton
                onClick={() => router.push(`/${organization.id.toString()}/create-entity`)}
                classNames="p-5 border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700 mt-5"
                text="Add Entity"
              />
            )}
          </>
        ) : (
          <LimitedWidthSection center>
            {/* <EnsureProfileCompletion
              user={user}
              explainerText="In order to create a business, we first need some personal information"
            >
              <> */}
            <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
            <hr className="my-6" />
            <CreateEntity actionOnCompletion={() => router.back()} />
            {/* </> */}
            {/* </EnsureProfileCompletion> */}
          </LimitedWidthSection>
        )}
      </div>
    </div>
  );
};

export default EntityDashboard;

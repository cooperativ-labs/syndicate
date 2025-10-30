'use client';

import { useQuery } from '@apollo/client/react';
import AddItemButton from '@src/components/buttons/AddItemButton';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import EntitiesList from '@src/components/entity/EntitiesList';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import { GET_USER } from '@src/utils/graphQueries/user';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useParams } from 'next/navigation';
import router, { useRouter } from 'next/router';
import React, { FC } from 'react';

import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';

const EntityDashboard: FC = () => {
  const { user } = useSupabaseAuth();
  const params = useParams<{ organizationId: string }>();
  const router = useRouter();
  const orgId = params?.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, {
    variables: { id: orgId },
    skip: !orgId
  });
  const organization = organizationData?.getOrganization;
  // const { data: userData } = useQuery(GET_USER, { variables: { id: session.user.id } });
  // const user = userData?.queryUser[0];

  if (!organization) {
    return <></>;
  }

  const isAdminOrEditor = getIsEditorOrAdmin(session?.user?.id, organization);
  const entities = organization.legalEntities;
  const hasEntities = entities.length > 0;

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className=" ">
        {hasEntities ? (
          <>
            <EntitiesList entities={entities} />
            {isAdminOrEditor && (
              <AddItemButton
                onClick={() => router.push(`/${orgId}/create-entity`)}
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
              <>
                <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
                <hr className="my-6" />
                <CreateEntity organization={organization} actionOnCompletion={() => router.back()} />
              </>
            </EnsureProfileCompletion> */}
          </LimitedWidthSection>
        )}
      </div>
    </div>
  );
};

export default EntityDashboard;

import CreateEntity from '@src/components/entity/CreateEntity';
import EntitiesList from '@src/components/entity/EntitiesList';
import EntityCard from '@src/components/entity/EntityCard';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';

const EntityDashboard: FC = () => {
  const { data: session, status } = useSession();
  const orgId = router.query.organizationId;
  const { data: organizationData, refetch } = useQuery(GET_ORGANIZATION, { variables: { id: orgId } });
  const organization = organizationData?.getOrganization;
  // const { data: userData } = useQuery(GET_USER, { variables: { id: session.user.id } });
  // const user = userData?.queryUser[0];

  if (!organization) {
    return <></>;
  }
  const entities = organization.legalEntities;
  const hasEntities = entities.length > 0;
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className=" ">
        {hasEntities ? (
          <>
            <EntitiesList entities={entities} />
            <MajorActionButton className="w-full md:w-96" link={`/${orgId}/create-entity`}>
              Create another entity
            </MajorActionButton>
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

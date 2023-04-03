import CompleteIndividualEntity from '@src/components/account/CompleteIndividualEntity';
import CreateEntity from '@src/components/entity/CreateEntity';
import EnsureProfileCompletion from '@src/containers/EnsureProfileCompletion';
import EntitiesList from '@src/components/entity/EntitiesList';
import EntityCard from '@src/components/entity/EntityCard';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import MajorActionButton from '@src/components/buttons/MajorActionButton';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getNonHumanEntities } from '@src/utils/helpersUserAndEntity';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

const EntityDashboard: FC = () => {
  const { uuid } = useContext(UserAccountContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });
  const user = userData?.queryUser[0];

  const entities = getNonHumanEntities(user);

  const hasEntities = entities.length > 0;
  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <div className=" ">
        {hasEntities ? (
          <>
            <EntitiesList entities={entities} />
            <MajorActionButton className="w-full md:w-96" link="create-entity">
              Create another entity
            </MajorActionButton>
          </>
        ) : (
          <LimitedWidthSection center>
            <EnsureProfileCompletion
              user={user}
              explainerText="In order to create a business, we first need some personal information"
            >
              <>
                <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
                <hr className="my-6" />
                <CreateEntity actionOnCompletion={() => router.back()} />
              </>
            </EnsureProfileCompletion>
          </LimitedWidthSection>
        )}
      </div>
    </div>
  );
};

export default EntityDashboard;

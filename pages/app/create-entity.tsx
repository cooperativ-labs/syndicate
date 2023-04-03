import CompleteIndividualEntity from '@src/components/account/CompleteIndividualEntity';
import CreateEntity from '@src/components/entity/CreateEntity';
import FormCard from '@src/components/cards/FormCard';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import Loading from '@src/components/loading/Loading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getUserPersonalEntity } from '@src/utils/helpersUserAndEntity';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

const CreateEntityPage: FC = () => {
  const { uuid } = useContext(UserAccountContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });

  const user = userData?.queryUser[0];
  if (!user) {
    return <Loading />;
  }
  const userInfo = getUserPersonalEntity(user);
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LimitedWidthSection center>
          {userInfo.addresses[0] ? (
            <>
              <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
              <hr className="my-6" />
              <CreateEntity actionOnCompletion={() => router.back()} />
            </>
          ) : (
            <CompleteIndividualEntity userInfo={userInfo} />
          )}
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

import CompleteIndividualEntity from '@src/components/account/CompleteIndividualEntity';
import CreateEntity from '@src/components/entity/CreateEntity';
import FormCard from '@src/components/cards/FormCard';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';

import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC, useContext } from 'react';
import router from 'next/router';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getUserPersonalEntity } from '@src/utils/helpersUserAndEntity';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import LoadingModal from '@src/components/loading/ModalLoading';

const CreateEntityPage: FC = () => {
  const { data: session, status } = useSession();
  const { data: userData } = useQuery(GET_USER, { variables: { id: session.user.id } });

  const user = userData?.queryUser[0];

  if (!user) {
    return <LoadingModal />;
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
            <CompleteIndividualEntity userInfo={userInfo} user={user} />
          )}
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

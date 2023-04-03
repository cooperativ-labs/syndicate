import LinkLegal from '@src/components/legal/LinkLegal';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { useContext } from 'react';
import router from 'next/router';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { UserAccountContext } from '@src/SetAppContext';

const CreatePpmPage: NextPage = () => {
  const offeringId = router.query.offeringId;
  const { data: offeringData } = useQuery(GET_OFFERING, { variables: { id: offeringId } });
  const { uuid } = useContext(UserAccountContext);
  const { data: userData } = useQuery(GET_USER, { variables: { uuid: uuid } });

  if (!offeringData || !userData) {
    return <LoadingModal />;
  }
  const user = userData?.queryUser[0];
  const offering = offeringData.getOffering;

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LinkLegal user={user} offering={offering} />
      </ManagerWrapper>
    </div>
  );
};

export default CreatePpmPage;

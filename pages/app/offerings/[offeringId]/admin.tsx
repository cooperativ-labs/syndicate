import AddPropertyInfo from '@src/components/offering/AddPropertyInfo';
import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React from 'react';
import router from 'next/router';

import UpdateContractStatus from '@src/admin/UpdateContractStatus';
import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

const Admin: NextPage = () => {
  const offeringId = router.query.offeringId;
  const { data: offeringData, error } = useQuery(GET_OFFERING, { variables: { id: offeringId } });

  if (!offeringData) {
    return <LoadingModal />;
  }
  const offering = offeringData.getOffering;

  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <FormCard center>
          <UpdateContractStatus offering={offering} />
        </FormCard>
      </ManagerWrapper>
    </div>
  );
};

export default Admin;

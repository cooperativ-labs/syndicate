import AddPropertyInfo from '@src/components/offering/AddPropertyInfo';
import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React from 'react';
import router from 'next/router';

import { GET_OFFERING } from '@src/utils/dGraphQueries/offering';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

const AddProperty: NextPage = () => {
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
          <AddPropertyInfo
            entityId={offering.offeringEntity.id}
            entityOperatingCurrency={offering.offeringEntity.operatingCurrency}
          />
        </FormCard>
      </ManagerWrapper>
    </div>
  );
};

export default AddProperty;

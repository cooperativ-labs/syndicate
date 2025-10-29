'use client';

import AddPropertyInfo from '@src/components/offering/AddPropertyInfo';
import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { useQuery } from '@apollo/client/react';
import React from 'react';
import { useParams } from 'next/navigation';

const AddProperty = () => {
  const params = useParams<{ offeringId: string }>();
  const offeringId = params?.offeringId;
  const { data: offeringData } = useQuery(GET_OFFERING, {
    variables: { id: offeringId },
    skip: !offeringId
  });

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

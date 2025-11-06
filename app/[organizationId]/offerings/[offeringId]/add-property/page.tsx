'use client';

i;
import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import AddPropertyInfo from '@src/components/offering/AddPropertyInfo';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { GET_OFFERING } from '@src/utils/graphQueries/offering';
import { useParams } from 'next/navigation';
import React from 'react';

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

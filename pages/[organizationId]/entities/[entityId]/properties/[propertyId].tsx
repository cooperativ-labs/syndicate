import React from 'react';

import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import PropertyDetails from '@src/pages/PropertyDetails';
import router from 'next/router';
import { GET_RE_PROPERTY } from '@src/utils/dGraphQueries/reProperty';
import { NextPage } from 'next';
import { useQuery } from '@apollo/client';

const PropertyPage: NextPage = () => {
  const propertyId = router.query.propertyId;
  const { data: propertyData } = useQuery(GET_RE_PROPERTY, { variables: { id: propertyId } });

  if (!propertyData) {
    return <LoadingModal />;
  }

  const property = propertyData?.getRealEstateProperty;
  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <PropertyDetails property={property} />
      </ManagerWrapper>
    </div>
  );
};
export default PropertyPage;

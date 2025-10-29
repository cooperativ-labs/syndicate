"use client";

import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import PropertyDetails from '@src/pages/PropertyDetails';
import { GET_RE_PROPERTY } from '@src/utils/dGraphQueries/reProperty';
import { useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'next/navigation';

const PropertyPage = () => {
  const params = useParams<{ propertyId: string }>();
  const propertyId = params?.propertyId;
  const { data: propertyData } = useQuery(GET_RE_PROPERTY, {
    variables: { id: propertyId },
    skip: !propertyId,
  });

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


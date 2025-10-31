"use client";

import { useQuery } from "@apollo/client/react";
import LoadingModal from "@src/components/loading/ModalLoading";
import ManagerWrapper from "@src/containers/ManagerWrapper";
import PropertyDetails from "@src/screens/PropertyDetails";
import { GET_RE_PROPERTY } from "@src/utils/graphQueries/reProperty";
import { useParams } from "next/navigation";
import React from "react";

const PropertyPage = () => {
  const params = useParams<{ propertyId: string }>();
  const propertyId = params?.propertyId;
  const { data: propertyData } = useQuery(GET_RE_PROPERTY, {
    variables: { id: propertyId },
    skip: !propertyId
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

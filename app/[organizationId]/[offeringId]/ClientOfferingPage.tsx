"use client";

import { Offering } from "@gql/graphql";
import ProfilePrivateModal from "@src/containers/wallet/ProfilePrivateModal";
import Footer from "@src/Footer/Footer";
import OfferingProfile from "@src/screens/OfferingProfile";
import React from "react";

type ClientOfferingPageProps = {
  offering: Offering | null;
};

const ClientOfferingPage: React.FC<ClientOfferingPageProps> = ({ offering }) => {
  if (!offering || !offering.isPublic) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div>Sorry, this offering does not have a profile. </div>
      </div>
    );
  }

  const { id, accessCode } = offering;

  return (
    <div data-test="component-project" className="bg-gray-50">
      <ProfilePrivateModal offeringId={id} accessCode={accessCode} />
      <OfferingProfile offering={offering} />
      <Footer color="bg-gray-200" />
    </div>
  );
};

export default ClientOfferingPage;

// Types intentionally omitted here to avoid runtime typing issues in RSC
import { initializeApollo } from "@src/utils/apolloClient";
import { GET_OFFERING } from "@src/utils/graphQueries/offering";
import type { Metadata } from "next";
import { cache } from "react";
import React from "react";

import ClientOfferingPage from "./ClientOfferingPage";

const fetchOffering = cache(async (offeringId: string | undefined) => {
  if (!offeringId) {
    return null;
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: GET_OFFERING,
      variables: { id: offeringId }
    });

    return (data as any)?.getOffering ?? null;
  } catch (error) {
    console.error("Failed to load offering", error);
    return null;
  }
});

type Params = {
  params:
    | Promise<{ organizationId: string; offeringId: string }>
    | { organizationId: string; offeringId: string };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const resolvedParams = params instanceof Promise ? await params : params;
  const offering = await fetchOffering(resolvedParams.offeringId);

  if (!offering || !offering.isPublic) {
    return { title: "Offering not available" };
  }

  const { name, shortDescription, sharingImage, offeringEntity, id } = offering;
  const orgId = offeringEntity?.organization.id;
  const imageUrl = sharingImage
    ? `/assets/images/sharing-images/${sharingImage.url}`
    : "/assets/images/share.png";

  return {
    title: name,
    openGraph: {
      title: name,
      type: "website",
      description: shortDescription ?? undefined,
      url: `https://cooperativ.io/${orgId}/offerings/${id}`,
      images: [imageUrl]
    },
    twitter: {
      title: name,
      description: shortDescription ?? undefined,
      card: "summary_large_image",
      images: [imageUrl]
    }
  };
};

const OfferingPage = async ({ params }: Params) => {
  const resolvedParams = params instanceof Promise ? await params : params;
  const offering = await fetchOffering(resolvedParams.offeringId);
  return <ClientOfferingPage offering={offering} />;
};

export default OfferingPage;

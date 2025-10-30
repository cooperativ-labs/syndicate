import { initializeApollo } from '@src/utils/apolloClient';
import { GET_ORGANIZATION } from '@src/utils/dGraphQueries/organization';
import type { Metadata } from 'next';
import { Organization } from 'oldTypes';
import { cache } from 'react';
import React from 'react';

import ClientOrganizationPage from './ClientOrganizationPage';

const fetchOrganization = cache(async (organizationId: string | undefined) => {
  if (!organizationId) {
    return null;
  }

  try {
    const apolloClient = initializeApollo();
    const { data } = await apolloClient.query({
      query: GET_ORGANIZATION,
      variables: { id: organizationId }
    });

    return (data?.getOrganization ?? null) as Organization | null;
  } catch (error) {
    console.error('Failed to load organization', error);
    return null;
  }
});

type Params = {
  params: { organizationId: string };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const organization = await fetchOrganization(params.organizationId);

  if (!organization) {
    return { title: 'Organization not available' };
  }

  const { name, shortDescription, sharingImage, id } = organization;
  const imageUrl = sharingImage
    ? `/assets/images/sharing-images/${sharingImage.url}`
    : '/assets/images/share.png';

  return {
    title: name ?? undefined,
    openGraph: {
      title: name ?? '',
      type: 'website',
      description: shortDescription ?? undefined,
      url: `https://cooperativ.io/${id}/portal/`,
      images: [imageUrl]
    },
    twitter: {
      title: name ?? '',
      description: shortDescription ?? undefined,
      card: 'summary_large_image',
      images: [imageUrl]
    }
  };
};

const OrganizationRoute = async ({ params }: Params) => {
  const organization = await fetchOrganization(params.organizationId);
  return <ClientOrganizationPage organization={organization} />;
};

export default OrganizationRoute;

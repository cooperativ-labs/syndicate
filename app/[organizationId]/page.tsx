import { initializeApollo } from '@src/utils/apolloClient';
import { GET_ORGANIZATION } from '@src/utils/graphQueries/organization';
import type { Metadata } from 'next';
import { GetOrganizationQuery, Organization } from '@gql/graphql';
import { cache } from 'react';
import React from 'react';

import ClientOrganizationPage from './ClientOrganizationPage';
import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import { getOrganization, getOrganizations } from '@src/utils/actions/organizationActions';

type Params = {
  params: Promise<{ organizationId: string }> | { organizationId: string };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { organizationId } = params instanceof Promise ? await params : params;
  const organization = await getOrganization(organizationId);

  if (!organization) {
    return { title: 'Organization not available' };
  }

  const { name, short_description, banner_image, id } = organization as Organization;
  // const imageUrl = image
  //   ? `/assets/images/sharing-images/${image.url}`
  //   : '/assets/images/share.png';

  return {
    title: name ?? undefined,
    openGraph: {
      title: name ?? '',
      type: 'website',
      description: short_description ?? undefined,
      url: `https://cooperativ.io/${id}/portal/`,
      images: [banner_image ?? '/assets/images/share.png']
    },
    twitter: {
      title: name ?? '',
      description: short_description ?? undefined,
      card: 'summary_large_image',
      images: [banner_image ?? '/assets/images/share.png']
    }
  };
};

const OrganizationPage = async ({ params }: Params) => {
  const { organizationId } = params instanceof Promise ? await params : params;
  const organization = await getOrganization(organizationId);

  if (!organization) {
    return <OrganizationNotFound backHref={`/${organizationId}/portal`} />;
  }
  return <ClientOrganizationPage organization={organization} />;
};

export default OrganizationPage;

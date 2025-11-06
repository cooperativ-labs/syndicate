import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import { getOrganization } from '@src/utils/actions/organizationActions';
import type { Metadata } from 'next';

import ClientOrganizationPage from './ClientOrganizationPage';

type Params = {
  params: Promise<{ organizationId: string }> | { organizationId: string };
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { organizationId } = params instanceof Promise ? await params : params;
  const organization = await getOrganization(organizationId);

  if (!organization) {
    return { title: 'Organization not available' };
  }

  const { name, short_description, banner_image, id } = organization;
  // const imageUrl = image
  //   ? `/assets/images/sharing-images/${image.url}`
  //   : '/assets/images/share.png';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cooperativ.io'),
    title: name ?? undefined,
    openGraph: {
      title: name ?? '',
      type: 'website',
      description: short_description ?? undefined,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${id}/portal/`,
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

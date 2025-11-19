import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import { getOrganization } from '@src/utils/actions/organizationActions';

// export const generateMetadata = async ({
//   params
// }: {
//   params: Promise<{ organizationId: string }>;
// }): Promise<Metadata> => {
//   const { organizationId } = await params;
//   if (organizationId === 'dist') return { title: 'Organization not available' };
//   const organization = await getOrganization(
//     organizationId,
//     '[organizationId]/layout(generateMetadata)'
//   );

//   if (!organization) {
//     return { title: 'Organization not available' };
//   }

//   const { name, short_description, banner_image, id } = organization;
//   // const imageUrl = image
//   //   ? `/assets/images/sharing-images/${image.url}`
//   //   : '/assets/images/share.png';

//   return {
//     metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cooperativ.io'),
//     title: name ?? undefined,
//     openGraph: {
//       title: name ?? '',
//       type: 'website',
//       description: short_description ?? undefined,
//       url: `${process.env.NEXT_PUBLIC_SITE_URL}/${id}/portal/`,
//       images: [banner_image ?? '/assets/images/share.png']
//     },
//     twitter: {
//       title: name ?? '',
//       description: short_description ?? undefined,
//       card: 'summary_large_image',
//       images: [banner_image ?? '/assets/images/share.png']
//     }
//   };
// };

const OrganizationLayout = async ({
  params,
  children
}: {
  params: Promise<{ organizationId: string }>;
  children: React.ReactNode;
}) => {
  const { organizationId } = await params;

  // const organization = (await getOrganization(organizationId, '[organizationId]/layout')) || null;

  // if (!organization) {
  //   return <OrganizationNotFound backHref={`/manager`} />;
  // }
  return children;
};

export default OrganizationLayout;

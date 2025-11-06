// Types intentionally omitted here to avoid runtime typing issues in RSC

import { getOfferingWithDocumentsById } from '@src/utils/actions/offeringActions';
import type { Metadata } from 'next';

import ClientOfferingPage from './page';

type Params = {
  params:
    | Promise<{ organizationId: string; offeringId: string }>
    | { organizationId: string; offeringId: string };
};

// export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
//   const { offeringId } = await params;
//   const offering = await getOfferingById(offeringId);

//   if (!offering || !offering.is_public) {
//     return { title: 'Offering not available' };
//   }

//   const { name, short_description, image, legal_entity, id } = offering;
//   const orgId = legal_entity?.organization?.id ?? '';
//   const imageUrl = image
//     ? `/assets/images/sharing-images/${image.url}`
//     : '/assets/images/share.png';

//   return {
//     title: name,
//     openGraph: {
//       title: name,
//       type: 'website',
//       description: short_description ?? undefined,
//       url: `https://cooperativ.io/${orgId}/offerings/${id}`,
//       images: [imageUrl]
//     },
//     twitter: {
//       title: name,
//       description: short_description ?? undefined,
//       card: 'summary_large_image',
//       images: [imageUrl]
//     }
//   };
// };

const OfferingPage = async ({ params }: Params) => {
  const { offeringId } = await params;
  const offering = await getOfferingWithDocumentsById(offeringId);
  return <ClientOfferingPage offering={offering} />;
};

export default OfferingPage;

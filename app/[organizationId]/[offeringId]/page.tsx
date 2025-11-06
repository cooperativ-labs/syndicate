import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import Footer from '@src/Footer/Footer';
import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';
import { Button } from '@src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card';
import Link from 'next/link';
import { Metadata } from 'next';

type Params = {
  params: Promise<{ offeringId: string; organizationId: string }>;
};

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { offeringId } = await params;
  const offering = await getOfferingById(offeringId);

  if (!offering || !offering.is_public) {
    return { title: 'Offering not available' };
  }

  const { name, short_description, images, legalEntity, id } = offering;
  const orgId = legalEntity?.organization_id ?? '';
  const imageUrl = images?.[0]?.url ?? '/assets/images/share.png';

  return {
    title: name,
    openGraph: {
      title: name,
      type: 'website',
      description: short_description ?? undefined,
      url: `https://cooperativ.io/${orgId}/${id}`,
      images: [imageUrl]
    },
    twitter: {
      title: name,
      description: short_description ?? undefined,
      card: 'summary_large_image',
      images: [imageUrl]
    }
  };
};

export default async function ClientOfferingPage({ params }: Params) {
  const { offeringId, organizationId } = await params;
  const organization = await getOrganization(organizationId);
  const offering = await getOfferingById(offeringId);

  if (!organization || !offering.is_public) {
    return (
      <div className="w-full py-16 flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="max-w-xl w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Offering Profile Unavailable</CardTitle>
            <CardDescription>
              Sorry, this offering does not have a public profile available. It may be private or
              the link is incorrect.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-3">
            <Button asChild>
              <Link href={`/${organizationId}`}>Back to Organization</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div data-test="component-project" className="bg-gray-50">
      <ProfilePrivateModal offeringId={offering.id.toString()} accessCode={offering.access_code} />
      <OfferingProfile offering={offering} organization={organization} />
      <Footer color="bg-gray-200" />
    </div>
  );
}

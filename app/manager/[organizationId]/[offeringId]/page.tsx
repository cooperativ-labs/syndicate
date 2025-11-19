import { Button } from '@src/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@src/components/ui/card';
import ProfilePrivateModal from '@src/containers/wallet/ProfilePrivateModal';
import Footer from '@src/Footer/Footer';
import OfferingProfile from '@src/screens/OfferingProfile';
import { getOfferingById } from '@src/utils/actions/offeringActions';
import { getOrganization } from '@src/utils/actions/organizationActions';
import { Metadata } from 'next';
import Link from 'next/link';

type Params = {
  params: Promise<{ offeringId: string; organizationId: string }>;
};

export default async function ClientOfferingPage({ params }: Params) {
  const { offeringId, organizationId } = await params;
  const organization = await getOrganization(organizationId, '/[offeringId]');
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
              <Link href={`/portal/${organizationId}`}>Back to Organization</Link>
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

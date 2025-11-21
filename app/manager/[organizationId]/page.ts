import { redirect } from 'next/navigation';

export default async function OrganizationOverviewRoute({
  params
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const { organizationId } = await params;
  // redirect(`/manager/${organizationId}/overview`);
}

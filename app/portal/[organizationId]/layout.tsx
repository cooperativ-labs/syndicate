import OrganizationNotFound from '@src/components/alerts/OrganizationNotFound';
import { getOrganization } from '@src/utils/actions/organizationActions';

import { OrganizationsProvider } from '@contexts/OrganizationsContext';
import NavBar from '@src/containers/NavigationBar';
import { UserProvider } from '@contexts/UserContext';

const OrganizationLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ organizationId: string }>;
}) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId, '[organizationId]/layout');
  if (!organization) {
    return <OrganizationNotFound backHref={`/${organizationId}/portal`} />;
  }

  return (
    <UserProvider user={null}>
      <OrganizationsProvider organizations={[organization]}>
        <div className="flex">
          <div className="flex z-30 md:z-10 min-h-screen">
            {/* <PortalSideBar organizations={[organization]} />{' '} */}
          </div>
          <div className="w-full">
            <NavBar orgLogo={organization?.logo} orgName={organization.name} />

            <div className="grow z-10">
              <div className="mx-auto ">{children}</div>
            </div>
          </div>
        </div>
      </OrganizationsProvider>
    </UserProvider>
  );
};

export default OrganizationLayout;

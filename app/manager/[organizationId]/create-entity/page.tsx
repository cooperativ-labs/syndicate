import CreateEntity from '@src/components/entity/CreateEntity';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import WithAuthentication from '@src/containers/WithAuthentication';
import { getOrganization } from '@src/utils/actions/organizationActions';

const CreateEntityPage = async ({ params }: { params: Promise<{ organizationId: string }> }) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId, '/create-entity');
  if (!organization) {
    return <div>Organization not found</div>;
  }
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <WithAuthentication>
        <LimitedWidthSection center>
          <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
          <hr className="my-6" />
          <CreateEntity />
        </LimitedWidthSection>
      </WithAuthentication>
    </div>
  );
};

export default CreateEntityPage;

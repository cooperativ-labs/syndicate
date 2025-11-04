import CreateEntity from '@src/components/entity/CreateEntity';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import { getOrganization } from '@src/utils/actions/organizationActions';

const CreateEntityPage = async ({ params }: { params: { organizationId: string } }) => {
  const { organizationId } = await params;
  const organization = await getOrganization(organizationId);
  if (!organization) {
    return <div>Organization not found</div>;
  }
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LimitedWidthSection center>
          <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
          <hr className="my-6" />
          <CreateEntity organization={organization} />
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

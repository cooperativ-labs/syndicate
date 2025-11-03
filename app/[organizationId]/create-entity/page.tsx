import CreateEntity from '@src/components/entity/CreateEntity';
import LimitedWidthSection from '@src/containers/LimitedWidthSection';
import ManagerWrapper from '@src/containers/ManagerWrapper';

const CreateEntityPage = () => {
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <LimitedWidthSection center>
          <div className="text-cLightBlue font-bold text-lg">Create a legal business entity.</div>
          <hr className="my-6" />
          <CreateEntity />
        </LimitedWidthSection>
      </ManagerWrapper>
    </div>
  );
};

export default CreateEntityPage;

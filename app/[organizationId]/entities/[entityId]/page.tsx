import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import EntityDetails from '@src/screens/EntityDetails';
import { getLegalEntityById } from '@src/utils/actions/entityActions';

const EntityPage = async ({ params }: { params: { entityId: string } }) => {
  const { entityId } = await params;
  const entity = await getLegalEntityById(entityId);

  if (!entity) {
    return <LoadingModal />;
  }

  return (
    <div data-test="component-landing" className="h-full flex">
      <ManagerWrapper>
        <EntityDetails entity={entity} />
      </ManagerWrapper>
    </div>
  );
};

export default EntityPage;

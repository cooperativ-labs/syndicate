import LoadingModal from '@src/components/loading/ModalLoading';
import EntityDetails from '@src/screens/EntityDetails';
import { getLegalEntityById } from '@src/utils/actions/entityActions';

export default async function EntityLayout({ params }: { params: Promise<{ entityId: string }> }) {
  const { entityId } = await params;
  const entity = await getLegalEntityById(entityId);

  if (!entity) {
    return <LoadingModal />;
  }

  return (
    <div data-test='page-entity' className='h-full flex'>
      <EntityDetails entity={entity} />
    </div>
  );
}

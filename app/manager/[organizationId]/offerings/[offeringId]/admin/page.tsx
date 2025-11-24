import FormCard from '@src/components/cards/FormCard';
import LoadingModal from '@src/components/loading/ModalLoading';
import { getOfferingById } from '@src/utils/actions/offeringActions';

const Admin = async ({ params }: { params: Promise<{ offeringId: string }> }) => {
  const { offeringId } = await params;
  const offering = await getOfferingById(offeringId);

  if (!offering) {
    return <LoadingModal />;
  }

  return (
    <div data-test='component-create-project-page' className='h-full flex'>
      <FormCard center>
        <></>
      </FormCard>
    </div>
  );
};

export default Admin;

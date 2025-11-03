import LoadingModal from '@src/components/loading/ModalLoading';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import OfferingDetails from '@src/screens/OfferingDetails';
import { getOfferingWithDocumentsById } from '@src/utils/actions/offeringActions';

import React from 'react';

const OfferingPage = async ({ params }: { params: { offeringId: string } }) => {
  const { offeringId } = await params;
  const offering = await getOfferingWithDocumentsById(offeringId);

  if (!offering) {
    return <LoadingModal />;
  }
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <OfferingDetails offering={offering} />
      </ManagerWrapper>
    </div>
  );
};

export default OfferingPage;

import CreateOffering from '@src/components/offering/CreateOffering';
import FormCard from '@src/components/cards/FormCard';
import ManagerWrapper from '@src/containers/ManagerWrapper';
import React, { FC } from 'react';

const CreateOfferingPage: FC = () => {
  return (
    <div data-test="component-create-project-page" className="h-full flex">
      <ManagerWrapper>
        <CreateOffering />
      </ManagerWrapper>
    </div>
  );
};

export default CreateOfferingPage;

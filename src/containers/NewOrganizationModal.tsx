import { ApplicationStoreProps, store } from '@context/store';
import CreateOfferingPage from '@pages/[organizationId]/offerings/create-offering';
import CloseButton from '@src/components/buttons/CloseButton';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import React, { FC, useContext } from 'react';

const ModalCreateOrganization: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: toggleCreateOrganization, CreateOrgModalOpen } = applicationStore;
  if (CreateOrgModalOpen) {
    return (
      <div className="flex-grow z-10 bg-gradient-to-b from-gray-100 to-blue-50 h-screen">
        <div className="h-full px-4 md:px-8 py-2 md:py-5">
          <div className="mx-auto min-h-full">
            <CloseButton onClose={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })} />
            <div className="flex flex-grow justify-center h-full z-10">
              <div className="md:flex flex-col h-full w-full items-center pt-20">
                <div className="flex-col px-4 w-full" style={{ maxWidth: '600px' }}>
                  <h1 className="text-2xl font-bold font-cDarkBlue text-center mb-4">
                    To begin creating offerings, you'll need to create an organization.
                  </h1>
                  <div className="px-3  md:mx-2">
                    <CreateOrganization
                      actionOnCompletion={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ModalCreateOrganization;

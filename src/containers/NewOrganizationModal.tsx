import CloseButton from '@src/components/buttons/CloseButton';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import React, { FC, useContext, useEffect } from 'react';
import { ApplicationStoreProps, store } from '@context/store';
import { useWindowSize } from 'react-use';

const ModalCreateOrganization: FC = () => {
  const applicationStore: ApplicationStoreProps = useContext(store);
  const { dispatch: toggleCreateOrganization, CreateOrgModalOpen } = applicationStore;
  const windowSize = useWindowSize();

  useEffect(() => {
    if (CreateOrgModalOpen && windowSize.width > 768) {
      // setScrollY(window.scrollY);
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      // window.scrollTo(0, parseInt(scrollY));
    }
  }, [CreateOrgModalOpen, windowSize.width]);

  if (CreateOrgModalOpen) {
    return (
      <div
        data-test="component-create-new-org-modal"
        className="flex-grow z-50 bg-gradient-to-b from-gray-100 to-blue-50  absolute top-0 bottom-0 right-0 left-0 "
      >
        <div className="h-full px-4 md:px-8 py-2 md:py-5">
          <div className="mx-auto min-h-full">
            <div className="flex justify-end">
              <CloseButton onClick={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })} />
            </div>
            <div className="flex flex-grow justify-center h-full z-10">
              <div className="md:flex flex-col h-full w-full items-center pt-20">
                <div className="flex-col px-4 w-full" style={{ maxWidth: '600px' }}>
                  <h1 className="text-3xl font-bold font-cDarkBlue text-center mb-4">{`Create a new organization.`}</h1>
                  <div className="px-3  md:mx-2">
                    <CreateOrganization
                    // actionOnCompletion={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })}
                    />
                  </div>
                  <div className="flex justify-center uppercase mt-4">
                    <button
                      className="uppercase font-semibold text-sm"
                      onClick={() => toggleCreateOrganization({ type: 'TOGGLE_CREATE_ORG_MODAL' })}
                    >
                      close
                    </button>
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

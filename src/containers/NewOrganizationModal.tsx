'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import CreateOrganization from '@src/components/organization/CreateOrganization';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@src/components/ui/dialog';
import React, { FC } from 'react';

const ModalCreateOrganization: FC = () => {
  const { createOrganizationModalOpen, setCreateOrganizationModalOpen } = useOrganizations();

  return (
    <Dialog open={createOrganizationModalOpen} onOpenChange={setCreateOrganizationModalOpen}>
      <DialogContent
        data-test="component-create-new-org-modal"
        className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-cDarkBlue text-center">
            Create a new organization.
          </DialogTitle>
        </DialogHeader>
        <div className="px-3 md:mx-2">
          <CreateOrganization
            actionOnCompletion={() => setCreateOrganizationModalOpen(false)}
            noTitle
          />
        </div>
        <div className="flex justify-center uppercase mt-4">
          <button
            className="uppercase font-semibold text-sm"
            onClick={() => setCreateOrganizationModalOpen(false)}
          >
            close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateOrganization;

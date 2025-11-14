'use client';

import { useUserContext } from '@contexts/UserContext';
import AddressDisplay from '@src/components/address/AddressDisplay';
import CreateAddress from '@src/components/address/CreateAddress';
import DeleteButton from '@src/components/buttons/DeleteButton';
import AddOwningEntity from '@src/components/entity/AddOwningEntity';
import EntitySpecifications, {
  changeForm,
  EditEntitySelectionType
} from '@src/components/entity/EntitySpecifications';
import { Button } from '@src/components/ui/button';
import EntityTabContainer from '@src/containers/entity/EntityTabContainer';
import FormModal from '@src/containers/FormModal';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import { deleteAddress, removeOwner, updateLegalEntity } from '@src/utils/actions/entityActions';
import { getIsAdmin, getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';

import { LegalEntityWithSubsidiaries } from '@/types';

type EntityDetailsProps = {
  entity: LegalEntityWithSubsidiaries;
};

const EntityDetails: FC<EntityDetailsProps> = ({ entity }) => {
  const { userId } = useUserContext();
  const organization = entity.organization;

  const [addOwnerModal, setAddOwnerModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditEntitySelectionType>('none');
  const [alerted, setAlerted] = useState<boolean>(false);

  const isAdmin = userId && getIsAdmin(userId, organization);
  const isAdminOrEditor = getIsEditorOrAdmin(userId, organization);

  const {
    display_name,
    legal_name,
    subsidiaries,
    offerings,
    jurisdiction_id,
    operating_currency,
    owners,
    organization_id,
    addresses
  } = entity;

  const offeringsIncludingSubsidiaries = [
    subsidiaries?.map(entity => {
      if (entity) return entity.offerings;
    }),
    offerings
  ].flat();

  const handleDisplayNameChange = async (values: { displayName: string | undefined }) => {
    try {
      await updateLegalEntity({
        entityId: entity.id,
        displayName: values.displayName,
        legalName: entity.legal_name,
        // jurCountry: jurisdiction?.country,
        operatingCurrency: entity.operating_currency,
        organizationId: organization.id
      });
      setNameEditOn('none');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress({ geoAddressId: addressId, entityId: entity.id });
  };

  // should only be admin
  const handleRemoveOwner = (owner: string) => {
    removeOwner({ ownerId: owner, entityId: entity.id });
  };

  const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal
        formOpen={addOwnerModal}
        onClose={() => setAddOwnerModal(false)}
        title={`Add an address to ${entity.display_name}`}
      >
        <CreateAddress
          entity={entity}
          actionOnCompletion={() => submissionCompletion(setAddOwnerModal)}
        />
      </FormModal>
      <div className="flex items-center">
        <div>
          {nameEditOn === 'displayName' ? (
            changeForm('displayName', entity, setNameEditOn, handleDisplayNameChange)
          ) : (
            <div
              className="font-ubuntu text-3xl text-cDarkBlue font-semibold hover:cursor-pointer"
              onClick={() => setNameEditOn('displayName')}
            >
              {display_name}
            </div>
          )}
        </div>
      </div>
      <TwoColumnLayout>
        <div>
          {/* <hr className="my-4" /> */}
          <EntitySpecifications
            entity={entity}
            isManager={isAdminOrEditor}
            updateLegalEntity={updateLegalEntity}
          />

          <div>
            <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
              <SectionBlock asAccordion sectionTitle={'Locations'}>
                <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
                  {addresses?.map((address, i) => {
                    return (
                      <div key={i} className="p-3 bg-slate-100 rounded-md relative">
                        <div className="mr-10">
                          <AddressDisplay address={address} withCountry withLabel />{' '}
                        </div>
                        {address && (
                          <div className="absolute -right-1 -top-1">
                            <DeleteButton
                              onDelete={() => handleDeleteAddress(address.id)}
                              iconColor={'gray-800'}
                              bgColor={'white'}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {isAdminOrEditor && (
                  <Button
                    className="mt-4 rounded-md bg-cLightBlue p-2 px-4 text-white font-semibold"
                    onClick={() => setAddOwnerModal(true)}
                  >
                    Add Address
                  </Button>
                )}
              </SectionBlock>
            </div>
            <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
              <SectionBlock asAccordion sectionTitle={'Owners'}>
                <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mt-4">
                  {owners?.map((owner, i) => {
                    return (
                      <div key={i} className="p-3 bg-slate-100 rounded-md relative">
                        <div className="mr-10">{owner?.legalName}</div>
                        {isAdmin && owner && (
                          <div className="absolute -right-1 -top-1">
                            <DeleteButton
                              onDelete={() => handleRemoveOwner(owner.id)}
                              iconColor={'gray-800'}
                              bgColor={'white'}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <hr className="my-4" />
                {isAdmin && (
                  <AddOwningEntity ownedEntityId={entity.id} organization={organization} />
                )}
              </SectionBlock>
            </div>
          </div>
        </div>
        <></>
      </TwoColumnLayout>
      <EntityTabContainer
        subsidiaries={subsidiaries}
        offerings={offeringsIncludingSubsidiaries as Offering[]}
        entity={entity}
      />
    </div>
  );
};

export default EntityDetails;

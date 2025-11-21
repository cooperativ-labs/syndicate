'use client';

import AddressDisplay from '@src/components/address/AddressDisplay';
import CreateAddress from '@src/components/address/CreateAddress';
import DeleteButton from '@src/components/buttons/DeleteButton';
import AddOwningEntity from '@src/components/entity/AddOwningEntity';
import EntitySpecifications, {
  EditEntitySelectionType
} from '@src/components/entity/EntitySpecifications';
import { Button } from '@src/components/ui/button';
import EntityTabContainer from '@src/containers/entity/EntityTabContainer';
import FormModal from '@src/containers/FormModal';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import SectionBlock from '@src/containers/SectionBlock';
import { deleteAddress, removeOwner, updateEntityName } from '@src/utils/actions/entityActions';
import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useOrganizations } from '@contexts/OrganizationsContext';
import { LegalEntity, LegalEntityWithSubsidiaries, Offering } from '@/types';
import { changeForm } from '@src/components/organization/OrganizationSpecifications';
import { Input } from '@src/components/ui/input';
import { ButtonLoadingState, LoadingButton } from '@src/components/ui/loading-button';

type EntityDetailsProps = {
  entity: LegalEntityWithSubsidiaries;
};

const EntityDetails: FC<EntityDetailsProps> = ({ entity }) => {
  const { isEditorOrAdmin, isAdmin } = useOrganizations();

  const [addOwnerModal, setAddOwnerModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditEntitySelectionType>('none');

  const {
    id,
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

  const offeringWithOperatingCurrency = offerings.map(offering => {
    return {
      ...offering,
      legalEntity: entity
    };
  });

  const [buttonState, setButtonState] = useState<ButtonLoadingState>('default');
  const [displayName, setDisplayName] = useState(display_name);

  const handleDisplayNameChange = async () => {
    if (!displayName || !entity.id) return;
    setButtonState('loading');
    try {
      await updateEntityName({
        entityId: entity.id,
        displayName: displayName
      });
      setNameEditOn('none');
      setButtonState('default');
    } catch (error) {
      console.error(error);
      setButtonState('error');
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress({ geoAddressId: addressId, entityId: entity.id });
  };

  // should only be admin
  const handleRemoveOwner = (owner: string) => {
    removeOwner({ ownerId: owner, entityId: entity.id });
  };

  // const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
  //   setModal(false);
  // };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal
        formOpen={addOwnerModal}
        onClose={() => setAddOwnerModal(false)}
        title={`Add an address to ${entity.display_name}`}
      >
        <CreateAddress entity={entity} actionOnCompletion={() => setAddOwnerModal(false)} />
      </FormModal>
      <div className="flex items-center">
        <div>
          {nameEditOn === 'displayName' ? (
            <form>
              <Input type="text" required onChange={e => setDisplayName(e.target.value)} />
              <LoadingButton
                className=" bg-cLightBlue hover:bg-cLightBlue text-white font-semibold uppercase h-11 rounded w-full"
                onClick={e => {
                  e.preventDefault();
                  handleDisplayNameChange();
                }}
                buttonState={buttonState}
                text="Save changes"
              />

              <Button
                className="border-2 border-cLightBlue hover:bg-cLightBlue text-cLightBlue hover:text-white font-medium uppercase h-11 rounded w-full"
                onClick={e => {
                  e.preventDefault();
                  setNameEditOn('none');
                }}
              >
                Cancel
              </Button>
            </form>
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
          <EntitySpecifications entity={entity} isManager={isEditorOrAdmin} />

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
                {isEditorOrAdmin && (
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
                        <div className="mr-10">{owner?.legal_name}</div>
                        {isAdmin && owner && (
                          <div className="absolute -right-1 -top-1">
                            <DeleteButton
                              onDelete={() => handleRemoveOwner(owner.id.toString())}
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
                {isAdmin && <AddOwningEntity ownedEntityId={entity.id} />}
              </SectionBlock>
            </div>
          </div>
        </div>
        <></>
      </TwoColumnLayout>
      <EntityTabContainer
        subsidiaries={subsidiaries}
        offerings={offeringWithOperatingCurrency}
        entityId={entity.id}
        operatingCurrency={operating_currency}
        organizationId={organization_id}
      />
    </div>
  );
};

export default EntityDetails;

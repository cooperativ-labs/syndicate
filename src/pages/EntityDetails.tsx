import AddressDisplay from '@src/components/address/AddressDisplay';
import React, { Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { CurrencyCode, LegalEntity, Maybe, Offering } from 'types';
import { useMutation, useQuery } from '@apollo/client';

import { REMOVE_ENTITY_ADDRESS, REMOVE_ENTITY_OWNER, UPDATE_ENTITY_INFORMATION } from '@src/utils/dGraphQueries/entity';

import AddOwningEntity from '@src/components/entity/AddOwningEntity';
import Button from '@src/components/buttons/Button';
import CreateAddress from '@src/components/address/CreateAddress';
import DeleteButton from '@src/components/buttons/DeleteButton';
import EntitySpecifications, { changeForm, EditEntitySelectionType } from '@src/components/entity/EntitySpecifications';
import EntityTabContainer from '@src/containers/entity/EntityTabContainer';
import FormModal from '@src/containers/FormModal';
import SectionBlock from '@src/containers/SectionBlock';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { getIsAdmin, getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useSession } from 'next-auth/react';

type EntityDetailsProps = {
  entity: LegalEntity;
};

const EntityDetails: FC<EntityDetailsProps> = ({ entity }) => {
  const { data: session, status } = useSession();

  const [updateLegalEntity, { data: updateEntityData, error: updateEntityError }] =
    useMutation(UPDATE_ENTITY_INFORMATION);

  const [deleteAddress, { error: deleteError }] = useMutation(REMOVE_ENTITY_ADDRESS);
  const [removeOwner, { data, error: removeError }] = useMutation(REMOVE_ENTITY_OWNER);

  const [addOwnerModal, setAddOwnerModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditEntitySelectionType>('none');
  const [alerted, setAlerted] = useState<boolean>(false);
  const organization = entity.organization;
  const userId = session?.user.id;
  const isAdmin = userId && getIsAdmin(userId, organization);
  const isAdminOrEditor = getIsEditorOrAdmin(session?.user.id, organization);

  const error = updateEntityError || deleteError || removeError;
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong. ${error}`);
    setAlerted(true);
  }

  const {
    displayName,
    legalName,
    addresses,
    walletAddresses,
    subsidiaries,
    offerings,
    jurisdiction,
    operatingCurrency,
    owners,
  } = entity;

  const offeringsIncludingSubsidiaries = [
    subsidiaries?.map((entity) => {
      if (entity) return entity.offerings;
    }),
    offerings,
  ].flat();

  const handleDisplayNameChange = (values: { displayName: Maybe<string> | undefined }) => {
    updateLegalEntity({
      variables: {
        currentDate: currentDate,
        entityId: entity.id,
        displayName: values.displayName,
        legalName: legalName,
        jurCountry: jurisdiction?.country,
        operatingCurrencyCode: operatingCurrency,
      },
    }).then((res) => {
      setNameEditOn('none');
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress({ variables: { currentDate: currentDate, geoAddressId: addressId, entityId: entity.id } });
  };

  // should only be admin
  const handleRemoveOwner = (owner: string) => {
    removeOwner({ variables: { currentDate: currentDate, removeEntityOwner: owner, ownedEntityId: entity.id } });
  };

  const submissionCompletion = (setModal: Dispatch<SetStateAction<boolean>>) => {
    setModal(false);
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal
        formOpen={addOwnerModal}
        onClose={() => setAddOwnerModal(false)}
        title={`Add an address to ${entity.displayName}`}
      >
        <CreateAddress entity={entity} actionOnCompletion={() => submissionCompletion(setAddOwnerModal)} />
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
              {displayName}
            </div>
          )}
        </div>
      </div>
      <TwoColumnLayout>
        <div>
          {/* <hr className="my-4" /> */}
          <EntitySpecifications entity={entity} isManager={isAdminOrEditor} updateLegalEntity={updateLegalEntity} />

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
                {isAdmin && <AddOwningEntity ownedEntityId={entity.id} organization={organization} />}
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

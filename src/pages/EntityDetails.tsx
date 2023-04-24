import AddressDisplay from '@src/components/address/AddressDisplay';
import EmailAddressList from '@src/components/EmailAddressList';
import LinkedAccountsList from '@src/components/LinkedAccountsList';
import React, { FC, useContext, useEffect, useState } from 'react';
import RoundedImage from '@src/components/RoundedImage';
import SettingsAddEmail from '@src/components/account/SettingsAddEmail';
import TwoColumnLayout from '@src/containers/Layouts/TwoColumnLayout';
import { CurrencyCode, LegalEntity } from 'types';
import { useMutation, useQuery } from '@apollo/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { REMOVE_ENTITY_ADDRESS, UPDATE_ENTITY_INFORMATION } from '@src/utils/dGraphQueries/entity';

import DashboardCard from '@src/components/cards/DashboardCard';

import Button from '@src/components/buttons/Button';
import CreateAddress from '@src/components/address/CreateAddress';
import DeleteButton from '@src/components/buttons/DeleteButton';
import EntitySpecifications, { changeForm, EditSelectionType } from '@src/components/entity/EntitySpecifications';
import EntityTabContainer from '@src/containers/entity/EntityTabContainer';
import FormModal from '@src/containers/FormModal';
import SectionBlock from '@src/containers/SectionBlock';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { GET_USER } from '@src/utils/dGraphQueries/user';
import { getIsAdmin } from '@src/utils/helpersUserAndEntity';
import { useSession } from 'next-auth/react';

type EntityDetailsProps = {
  entity: LegalEntity;
};

const EntityDetails: FC<EntityDetailsProps> = ({ entity }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { data: userData, error: entityError } = useQuery(GET_USER, {
    variables: {
      id: userId,
    },
  });

  console.log(entity);

  const [updateLegalEntity, { data: updateEntityData, error: updateEntityError }] =
    useMutation(UPDATE_ENTITY_INFORMATION);

  const [deleteAddress, { error: deleteError }] = useMutation(REMOVE_ENTITY_ADDRESS);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [nameEditOn, setNameEditOn] = useState<EditSelectionType>('none');
  const [alerted, setAlerted] = useState<boolean>(false);

  const error = updateEntityError || deleteError;
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong. ${error}`);
    setAlerted(true);
  }

  const { displayName, legalName, addresses, walletAddresses, subsidiaries, taxId, jurisdiction, operatingCurrency } =
    entity;

  const offerings = subsidiaries
    .map((entity) => {
      return entity.offerings;
    })
    .flat();

  const handleDisplayNameChange = (values: {
    displayName: string;
    legalName: string;
    jurisdiction: string;
    operatingCurrency: CurrencyCode;
  }) => {
    updateLegalEntity({
      variables: {
        currentDate: currentDate,
        entityId: entity.id,
        displayName: values.displayName,
        legalName: legalName,
        jurisdiction: jurisdiction,
        operatingCurrency: operatingCurrency.code,
      },
    }).then((res) => {
      setNameEditOn('none');
    });
  };

  const handleDeleteAddress = (addressId: string) => {
    deleteAddress({ variables: { currentDate: currentDate, geoAddressId: addressId, entityId: entity.id } });
  };

  const submissionCompletion = (setModal) => {
    setModal(false);
  };

  return (
    <div data-test="component-dashboard" className="flex flex-col w-full h-full">
      <FormModal
        formOpen={addressModal}
        onClose={() => setAddressModal(false)}
        title={`Add an address to ${entity.displayName}`}
      >
        <CreateAddress entity={entity} actionOnCompletion={() => submissionCompletion(setAddressModal)} />
      </FormModal>
      <div className="flex items-center relative">
        <div className="flex backdrop-opacity-10 backdrop-invert w-full h-64 bg-gray-800/50 items-center">
          <div className="ml-4 flex items-center ">
            <div>
              {nameEditOn === 'displayName' ? (
                changeForm('displayName', entity, setNameEditOn, handleDisplayNameChange)
              ) : (
                <div
                  className="font-ubuntu text-3xl text-white font-semibold hover:cursor-pointer"
                  onClick={() => setNameEditOn('displayName')}
                >
                  {displayName}
                </div>
              )}
            </div>
          </div>
          <button
            className="absolute right-4 bottom-4 text-white"
            onClick={() => setImageModal(true)}
            aria-label="edit banner image"
            name="Edit banner image"
          >
            <FontAwesomeIcon icon="pen" />
          </button>
        </div>
      </div>
      <hr className="my-5 w-0" />
      <TwoColumnLayout twoThirdsLayout>
        <div>
          <DashboardCard>
            <hr className="my-4" />
            <EntitySpecifications entity={entity} isEntityOwner={true} updateLegalEntity={updateLegalEntity} />

            <div>
              <div className="mt-3 rounded-lg p-3 border-2 border-gray-200">
                <SectionBlock asAccordion sectionTitle={'Locations'}>
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
                    {addresses.map((address, i) => {
                      return (
                        <div key={i} className="p-3 bg-slate-100 rounded-md relative">
                          <div className="mr-10">
                            <AddressDisplay address={address} withCountry withLabel />{' '}
                          </div>
                          <div className="absolute -right-1 -top-1">
                            <DeleteButton
                              onDelete={() => handleDeleteAddress(address.id)}
                              iconColor={'gray-800'}
                              bgColor={'white'}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Button
                    className="mt-4 rounded-md bg-cLightBlue p-2 px-4 text-white font-semibold"
                    onClick={() => setAddressModal(true)}
                  >
                    Add Address
                  </Button>
                </SectionBlock>
              </div>
            </div>
          </DashboardCard>
        </div>

        {/* <div>
          <div className="mt-5 text-lg">Tab Section</div>
          <div>Section for changing address, contact info, profile picture, banner image</div>
          <div>Section for jurisdiction, tax Id, operating currency, legal note </div>
          <div>Section for adding socials</div>
        </div> */}
        <>
          <h2 className="text-cDarkBlue text-xl font-bold  mb-3 ">Team</h2>
        </>
      </TwoColumnLayout>
      <EntityTabContainer subsidiaries={subsidiaries} offerings={offerings} entity={entity} />
    </div>
  );
};

export default EntityDetails;

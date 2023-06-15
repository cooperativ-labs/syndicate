import AddressDisplay from '@src/components/address/AddressDisplay';
import FileUpload from '@src/components/form-components/FileUpload';
import PropertyImage from '@src/components/properties/PropertyImage';
import React, { FC, useContext, useState } from 'react';
import {
  ADD_PROPERTY_IMAGE,
  REMOVE_ENTITY_PROPERTY,
  UPDATE_RE_PROPERTY_INFO,
} from '@src/utils/dGraphQueries/reProperty';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { useMutation } from '@apollo/client';

import Button from '@src/components/buttons/Button';
import FormModal from '@src/containers/FormModal';
import Progress from '@src/components/offering/profile/Progress';
import router from 'next/router';
import UpdateAddress from '@src/components/address/UpdateAddress';
import UpdatePropertyDescription from '@src/components/properties/UpdatePropertyDescription';
import UpdatePropertyFinancials from '@src/components/properties/UpdatePropertyFinancials';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { getPropertyTypeOption } from '@src/utils/enumConverters';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { RealEstateProperty } from 'types';
import { UPDATE_ADDRESS } from '@src/utils/dGraphQueries/entity';
import { useSession } from 'next-auth/react';

type PropertyDetailsProps = {
  property: RealEstateProperty;
};

const PropertyDetails: FC<PropertyDetailsProps> = ({ property }) => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [addImage, { error: imageError }] = useMutation(ADD_PROPERTY_IMAGE);
  const [updateAddress, { error: addressError }] = useMutation(UPDATE_ADDRESS);
  const [updateProperty, { error: propertyError }] = useMutation(UPDATE_RE_PROPERTY_INFO);
  const [deleteProperty, { data: deleteData, error: deleteError }] = useMutation(REMOVE_ENTITY_PROPERTY);
  const [alerted, setAlerted] = useState<boolean>(false);
  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [financialsModal, setFinancialsModal] = useState<boolean>(false);

  const {
    id,
    address,
    amenitiesDescription,
    description,
    images,
    investmentStatus,
    owner,
    propertyType,
    assetValue,
    assetValueNote,
    closingCosts,
    downPayment,
    lenderFees,
    loan,
  } = property;

  const organization = owner?.organization;

  const isEntityManager = getIsEditorOrAdmin(userId, organization);

  const error = imageError || addressError || propertyError || deleteError;
  if (error && !alerted) {
    alert(`Oops. Looks like something went wrong: ${error.message}`);
    setAlerted(true);
  }

  if (deleteData) {
    router.back();
  }

  const addImageToDb = (url: string, fileId: string, label: string) => {
    addImage({
      variables: {
        propertyId: property.id,
        currentDate: currentDate,
        label: label,
        url: url,
        fileId: fileId,
      },
    });
  };

  return (
    <div className="flex min-h-full mx-auto px-4 md:px-8 md:mt-8" style={{ maxWidth: '1280px' }}>
      <FormModal formOpen={addressModal} onClose={() => setAddressModal(false)} title={'Edit Address'}>
        <UpdateAddress
          address={address}
          addressId={address?.id}
          addressLine1={address?.line1}
          updateAddress={updateAddress}
          setModal={() => setAddressModal(false)}
        />
      </FormModal>
      <FormModal formOpen={detailsModal} onClose={() => setDetailsModal(false)} title={'Edit Property Details'}>
        <UpdatePropertyDescription
          property={property}
          updateProperty={updateProperty}
          setModal={() => setDetailsModal(false)}
        />
      </FormModal>
      <FormModal
        formOpen={financialsModal}
        onClose={() => setFinancialsModal(false)}
        title={'Edit Property Financials'}
      >
        <UpdatePropertyFinancials
          property={property}
          updateProperty={updateProperty}
          setModal={() => setFinancialsModal(false)}
        />
      </FormModal>
      <div className=" z-10 md:z-10 min-h-screen w-full">
        <h1 className="text-2xl mb-5 md:text-3xl font-bold text-gray-700">{address?.line1}</h1>
        <Progress
          brandColor={'#275A8F'}
          lightBrand={false}
          propertyInvestmentStage={investmentStatus}
          className="flex mb-4"
        />

        <div>
          <span className="font-semibold">Property type: </span>
          {getPropertyTypeOption(propertyType)?.name}
        </div>
        <div>
          <span className="font-semibold">Description: </span>
          {description}
        </div>

        <hr className="my-4" />

        <div>
          <h2 className="font-bold text-gray-700">Images</h2>
          <div className="flex">
            {images?.map((image, i) => {
              return <PropertyImage key={i} image={image} propertyId={id} isOwner={isEntityManager} />;
            })}
          </div>
          {isEntityManager && (
            <FileUpload
              uploaderText="Add Picture"
              urlToDatabase={addImageToDb}
              accept={['jpg', 'jpeg', 'png']}
              baseUploadUrl={`/properties/${id}/${userId}`}
            />
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-gray-700">Address</h2>
            <AddressDisplay address={address} withCountry />
          </div>
          {isEntityManager && (
            <Button onClick={() => setAddressModal(true)}>
              <FontAwesomeIcon icon="pen" />
            </Button>
          )}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-gray-700">Amenities</h2> {amenitiesDescription}
          </div>
          {isEntityManager && (
            <Button onClick={() => setDetailsModal(true)}>
              <FontAwesomeIcon icon="pen" />
            </Button>
          )}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between">
          <div>
            <h2 className="font-bold text-gray-700">Financials</h2>{' '}
            <div>
              Asset value: {numberWithCommas(assetValue)} {assetValueNote && `(${assetValueNote})`}
            </div>
            <div>Loan amount: {numberWithCommas(loan)}</div>
            <div>Closing costs: {numberWithCommas(closingCosts)}</div>
            <div>Down payment: {numberWithCommas(downPayment)}</div>
            <div>Lender fees: {numberWithCommas(lenderFees)}</div>
          </div>
          {isEntityManager && (
            <Button onClick={() => setFinancialsModal(true)}>
              <FontAwesomeIcon icon="pen" />
            </Button>
          )}
        </div>

        {isEntityManager && (
          <>
            <hr className="my-4" />
            <div className="flex col-span-1 justify-center">
              <button
                className="bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full"
                aria-label="Delete this property"
                onClick={() =>
                  deleteProperty({
                    variables: { currentDate: currentDate, ownerId: property.owner?.id, propertyId: property.id },
                  })
                }
              >
                Remove this property from the offering
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default PropertyDetails;

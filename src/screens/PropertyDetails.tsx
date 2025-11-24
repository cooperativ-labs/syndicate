'use client';

import { useOrganizations } from '@contexts/OrganizationsContext';
import { useUserContext } from '@contexts/UserContext';
import AddressDisplay from '@src/components/address/AddressDisplay';
import UpdateAddress from '@src/components/address/UpdateAddress';
import FileUpload from '@src/components/form-components/FileUpload';
import ImageUpload from '@src/components/form-components/ImageUpload';
import Progress from '@src/components/offering/profile/Progress';
import PropertyImage from '@src/components/properties/PropertyImage';
import UpdatePropertyDescription from '@src/components/properties/UpdatePropertyDescription';
import UpdatePropertyFinancials from '@src/components/properties/UpdatePropertyFinancials';
import { Button } from '@src/components/ui/button';
import FormModal from '@src/containers/FormModal';
import { removeReProperty, uploadRePropertyAsset } from '@src/utils/actions/rePropertyActions';
import { getPropertyTypeOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { numberWithCommas } from '@src/utils/helpersMoney';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { Pencil } from 'lucide-react';
import React, { FC, useState } from 'react';

import { RealEstatePropertyWithAssets } from '@/types';

type PropertyDetailsProps = {
  property: RealEstatePropertyWithAssets;
};

const PropertyDetails: FC<PropertyDetailsProps> = ({ property }) => {
  const { isEditorOrAdmin } = useOrganizations();

  const [addressModal, setAddressModal] = useState<boolean>(false);
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  const [financialsModal, setFinancialsModal] = useState<boolean>(false);

  const {
    id,
    address,
    amenities_description,
    description,
    images,
    investment_status,
    property_type,
    asset_value,
    asset_value_note,
    closing_costs,
    down_payment,
    lender_fees,
    loan
  } = property;

  const addImageToDb = async (file: File) => {
    await uploadRePropertyAsset({
      offeringId: property.offering_id.toString(),
      rePropertyId: property.id,
      assetFile: file,
      assetName: file.name,
      assetType: 'image',
      revalidationPath: {
        path: `/manager/[organizationId]/entities/[entityId]/properties/[propertyId]`,
        type: 'page'
      }
    });
  };

  return (
    <div className='flex min-h-full mx-auto px-4 md:px-8 md:mt-8' style={{ maxWidth: '1280px' }}>
      {address && (
        <FormModal
          formOpen={addressModal}
          onClose={() => setAddressModal(false)}
          title={'Edit Address'}
        >
          <UpdateAddress
            address={address}
            addressId={address?.id}
            addressLine1={address?.line1}
            setModal={() => setAddressModal(false)}
          />
        </FormModal>
      )}
      <FormModal
        formOpen={detailsModal}
        onClose={() => setDetailsModal(false)}
        title={'Edit Property Details'}
      >
        <UpdatePropertyDescription property={property} setModal={() => setDetailsModal(false)} />
      </FormModal>
      <FormModal
        formOpen={financialsModal}
        onClose={() => setFinancialsModal(false)}
        title={'Edit Property Financials'}
      >
        <UpdatePropertyFinancials property={property} setModal={() => setFinancialsModal(false)} />
      </FormModal>
      <div className=' z-10 md:z-10 min-h-screen w-full'>
        <h1 className='text-2xl mb-5 md:text-3xl font-bold text-gray-700'>{address?.line1}</h1>
        <Progress
          brandColor={'#275A8F'}
          lightBrand={false}
          propertyInvestmentStage={investment_status}
          className='flex mb-4'
        />

        <div>
          <span className='font-semibold'>Property type: </span>
          {getPropertyTypeOption(property_type)?.name}
        </div>
        <div>
          <span className='font-semibold'>Description: </span>
          {description}
        </div>

        <hr className='my-4' />

        <div>
          <h2 className='font-bold text-gray-700'>Images</h2>
          <div className='flex'>
            {images?.map((image, i) => {
              return (
                <PropertyImage key={i} image={image} propertyId={id} isOwner={isEditorOrAdmin} />
              );
            })}
          </div>
          {isEditorOrAdmin && (
            <ImageUpload selectedImageUrl={images[0]?.url} onSubmit={addImageToDb} />
          )}
        </div>
        <hr className='my-4' />
        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-gray-700'>Address</h2>
            <AddressDisplay address={address} withCountry />
          </div>
          {isEditorOrAdmin && (
            <Button onClick={() => setAddressModal(true)}>
              <Pencil size={16} />
            </Button>
          )}
        </div>
        <hr className='my-4' />
        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-gray-700'>Amenities</h2> {amenities_description}
          </div>
          {isEditorOrAdmin && (
            <Button onClick={() => setDetailsModal(true)}>
              <Pencil size={16} />
            </Button>
          )}
        </div>

        <hr className='my-4' />

        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-gray-700'>Financials</h2>{' '}
            <div>
              Asset value: {numberWithCommas(asset_value)}{' '}
              {asset_value_note && `(${asset_value_note})`}
            </div>
            <div>Loan amount: {numberWithCommas(loan)}</div>
            <div>Closing costs: {numberWithCommas(closing_costs)}</div>
            <div>Down payment: {numberWithCommas(down_payment)}</div>
            <div>Lender fees: {numberWithCommas(lender_fees)}</div>
          </div>
          {isEditorOrAdmin && (
            <Button onClick={() => setFinancialsModal(true)}>
              <Pencil size={16} />
            </Button>
          )}
        </div>

        {isEditorOrAdmin && (
          <>
            <hr className='my-4' />
            <div className='flex col-span-1 justify-center'>
              <button
                className='bg-red-900 hover:bg-red-800 text-white font-bold uppercase mt-2 rounded p-2 w-full'
                aria-label='Delete this property'
                onClick={() =>
                  removeReProperty({
                    propertyId: property.id,
                    revalidationPath: {
                      path: `/manager/[organizationId]/offerings/${property.offering_id.toString()}`,
                      type: 'page'
                    }
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

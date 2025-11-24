'use server';

import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import {
  RealEstatePropertyWithAddress,
  RealEstatePropertyWithAssets,
  RevalidationPath
} from '@/types';
import { Image, InvestmentStatusType, RealEstatePropertyTypes } from '@/types';
import { Database } from '@/types/database.types';

import { addAddress } from './addressActions';
import { getFilesFromFolder, getPublicUrl } from './storageActions';

// =========== RE PROPERTY ================

export async function getReProperty(id: string): Promise<RealEstatePropertyWithAssets | null> {
  const supabase = createClient();

  const { data: property, error } = await supabase
    .from('real_estate_property')
    .select(
      'id, property_type, investment_status, address_id, amenities_description, description, asset_value, asset_value_note, loan, down_payment, lender_fees, closing_costs, offering_id, address:address(*)'
    )
    .eq('id', id)
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  if (!property) {
    return null;
  }
  const { images } = await getRePropertyAssets({
    offeringId: property.offering_id.toString(),
    rePropertyId: property.id
  });

  const propertyWithAssets = {
    ...property,
    // documents: documents,
    images: images
  } as RealEstatePropertyWithAssets;

  return propertyWithAssets;
}

export async function getRealEstatePropertiesFromOffering(
  offeringId: string
): Promise<RealEstatePropertyWithAssets[]> {
  const supabase = createClient();

  const { data: propertiesData, error: propertiesError } = await supabase
    .from('real_estate_property')
    .select(['*', 'address:address(*)'].join(', '))
    .eq('offering_id', Number(offeringId));
  if (propertiesError) {
    throw propertiesError;
  }

  const properties = propertiesData as unknown as RealEstatePropertyWithAddress[];

  const propertiesWithAssets = await Promise.all(
    properties.map(async (property: RealEstatePropertyWithAddress) => {
      const { images } = await getRePropertyAssets({
        offeringId: offeringId,
        rePropertyId: property.id.toString()
      });
      return {
        ...property,
        images: images
      } as RealEstatePropertyWithAssets;
    })
  );

  return propertiesWithAssets;
}

type AddRePropertyInfoParams = {
  offeringId: string;
  propertyType: RealEstatePropertyTypes;
  investmentStatus: InvestmentStatusType;
  amenitiesDescription?: string | null;
  description?: string | null;
  downPayment?: number | null;
  lenderFees?: number | null;
  closingCosts?: number | null;
  revalidationPath?: RevalidationPath;
};

export async function addRePropertyInfo(
  params: AddRePropertyInfoParams,
  revalidationPath?: RevalidationPath
): Promise<string | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('real_estate_property')
    .insert(
      {
        offering_id: Number(params.offeringId),
        property_type: params.propertyType,
        investment_status: params.investmentStatus,
        amenities_description: params.amenitiesDescription ?? null,
        description: params.description ?? null,
        down_payment: params.downPayment ?? null,
        lender_fees: params.lenderFees ?? null,
        closing_costs: params.closingCosts ?? null
      },
      { count: 'exact' }
    )
    .select('id')
    .single();

  if (error) {
    throw error;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
  return data.id ?? null;
}

export async function updateRePropertyDescription({
  rePropertyId,
  propertyType,
  investmentStatus,
  amenitiesDescription,
  description,
  revalidationPath
}: {
  rePropertyId: string;
  propertyType: RealEstatePropertyTypes;
  investmentStatus: InvestmentStatusType;
  amenitiesDescription?: string | null;
  description?: string | null;
  revalidationPath?: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('real_estate_property')
    .update({
      property_type: propertyType,
      investment_status: investmentStatus,
      amenities_description: amenitiesDescription ?? null,
      description: description ?? null
    })
    .eq('id', rePropertyId);

  if (error) {
    throw error;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
}

export async function UpdateRePropertyFinancials({
  rePropertyId,
  assetValue,
  assetValueNote,
  downPayment,
  lenderFees,
  closingCosts,
  loanAmount,
  revalidationPath
}: {
  rePropertyId: string;
  assetValue?: number | null;
  assetValueNote?: string | null;
  downPayment?: number | null;
  lenderFees?: number | null;
  closingCosts?: number | null;
  loanAmount?: number | null;
  revalidationPath?: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('real_estate_property')
    .update({
      asset_value: assetValue ?? null,
      asset_value_note: assetValueNote ?? null,
      down_payment: downPayment ?? null,
      lender_fees: lenderFees ?? null,
      closing_costs: closingCosts ?? null,
      loan: loanAmount ?? null
    })
    .eq('id', rePropertyId);

  if (error) {
    throw error;
  }

  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
}

export async function removeReProperty({
  propertyId,
  revalidationPath
}: {
  propertyId: string;
  revalidationPath?: RevalidationPath;
}): Promise<void> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('real_estate_property')
    .delete({ count: 'exact' })
    .eq('id', propertyId)
    .select('id');

  if (error) {
    throw error;
  }
  if (revalidationPath) {
    revalidatePath(revalidationPath.path, revalidationPath.type);
  }
}

export const uploadRePropertyAsset = async ({
  offeringId,
  rePropertyId,
  assetFile,
  assetName,
  assetType
}: {
  offeringId: string | number;
  rePropertyId: string;
  assetFile: File;
  assetName: string; //using file.name = "blob"
  assetType: 'image' | 'document';
  revalidationPath?: RevalidationPath;
}): Promise<void> => {
  const supabase = createClient();

  let assetPath = `${offeringId}/re/${rePropertyId}/${assetType}/${assetName}`;
  const { error: assetError } = await supabase.storage
    .from('entity-assets')
    .upload(assetPath, assetFile, {
      upsert: true
    });

  if (assetError) {
    throw new Error(assetError.message);
  }
};

export const getRePropertyAssets = async ({
  offeringId,
  rePropertyId
}: {
  offeringId: string | number;
  rePropertyId: string;
}): Promise<{
  images: Image[];
}> => {
  const imagesPath = `${offeringId.toString()}/re/${rePropertyId}/image`;

  const [images] = await Promise.all([
    getFilesFromFolder({
      bucket: 'entity-assets',
      folderPath: imagesPath
    })
  ]);

  let errors: Error[] = [];
  const imageItems = await Promise.all(
    images.map(async image => {
      const { data: publicUrlData, error: publicUrlError } = await getPublicUrl({
        bucket: 'entity-assets',
        path: `${imagesPath}/${image.name}`,
        source: 'rePropertyAssets'
      });
      if (publicUrlError) {
        errors.push(new Error(publicUrlError.message));
      }

      if (!publicUrlData) {
        errors.push(new Error(`Public URL is null for file: ${image.name}`));
        return {
          id: image.id,
          label: image.name,
          url: null,
          created_at: image.created_at
        };
      }

      return {
        id: image.id,
        label: image.name,
        url: publicUrlData,
        created_at: image.created_at,
        updated_at: image.updated_at,
        metadata: image.metadata
      };
    })
  );

  if (errors.length > 0) {
    throw new Error(errors.map(error => error.message).join(', '));
  }

  return {
    images: imageItems
  };
};

// =========== ADDRESS ================

type AddPropertyAddressParams = {
  offeringId: string;
  propertyId: string;
  addressLabel?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  city: string;
  stateProvince?: string | null;
  postalCode?: string | null;
  country: string;
  lat?: number | null;
  lng?: number | null;
  revalidationPath?: RevalidationPath;
};

type AddPropertyAddressResult = {
  affectedCount: number;
  records: Pick<Address, 'id' | 'label' | 'line1'>[];
};

export async function addPropertyAddress(params: AddPropertyAddressParams): Promise<void> {
  const supabase = createClient();

  // Get the legal_entity_id from the offering
  const { data: offering, error: offeringError } = await supabase
    .from('offering')
    .select('offering_entity_id')
    .eq('id', Number(params.offeringId))
    .single();

  if (offeringError || !offering) {
    throw new Error('Failed to fetch offering entity');
  }

  const addressId = await addAddress({
    city: params.city,
    country: params.country,
    label: params.addressLabel ?? null,
    lat: params.lat ?? null,
    legal_entity_id: offering.offering_entity_id,
    line1: params.addressLine1,
    line2: params.addressLine2,
    line3: params.addressLine3,
    lng: params.lng ?? null,
    postal_code: params.postalCode ?? null,
    state_province: params.stateProvince ?? null
  });
  // Update property's address_id if address was created successfully
  if (addressId) {
    await supabase
      .from('real_estate_property')
      .update({ address_id: addressId })
      .eq('id', params.propertyId);
  }

  if (params.revalidationPath) {
    revalidatePath(params.revalidationPath.path, params.revalidationPath.type);
  }
}

type RemovePropertyAddressResult = {
  affectedCount: number;
  records: Pick<Address, 'id'>[];
};

export async function removePropertyAddress(
  geoAddressId: string
): Promise<RemovePropertyAddressResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('address')
    .delete({ count: 'exact' })
    .eq('id', geoAddressId)
    .select('id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as RemovePropertyAddressResult['records']
  };
}

// =========== IMAGE ================

type AddPropertyImageParams = {
  url: string;
  label?: string | null;
  fileId?: string | null;
};

type AddPropertyImageResult = {
  affectedCount: number;
  records: Pick<Image, 'id' | 'label' | 'url' | 'file_id'>[];
};

export async function addPropertyImage(
  params: AddPropertyImageParams
): Promise<AddPropertyImageResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('image')
    .insert(
      {
        url: params.url,
        label: params.label ?? null,
        file_id: params.fileId ?? null
      },
      { count: 'exact' }
    )
    .select('id, label, url, file_id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as AddPropertyImageResult['records']
  };
}

type RemovePropertyImageResult = {
  affectedCount: number;
  records: Pick<Image, 'id'>[];
};

export async function removePropertyImage(imageId: string): Promise<RemovePropertyImageResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from('image')
    .delete({ count: 'exact' })
    .eq('id', imageId)
    .select('id');

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === 'number' ? count : (data?.length ?? 0),
    records: (data ?? []) as RemovePropertyImageResult['records']
  };
}

'use server';
import { LegalEntity } from '@gql/graphql';
import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import { LegalEntityWithSubsidiaries } from '@/types';

type AddLegalEntityParams = {
  organizationId: string | number;
  legalName: string;
  displayName: string;
  type: string; // legal_entity_type
  operatingCurrency: string; // currency_code
  entityPurpose?: string | null;
  jurCountry: string;
  jurProvince: string;
  addressLabel: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
};

type AddLegalEntityResult = {
  affectedCount: number;
  records: Pick<
    LegalEntity,
    | 'id'
    | 'tax_id'
    | 'display_name'
    | 'legal_name'
    | 'purpose'
    | 'jurisdiction_id'
    | 'operating_currency'
    | 'organization_id'
    | 'type'
  >[];
};

export async function addLegalEntity({
  organizationId,
  displayName,
  jurCountry,
  jurProvince,
  legalName,
  type,
  operatingCurrency,
  entityPurpose,
  addressLabel,
  addressLine1,
  addressLine2,
  city,
  stateProvince,
  postalCode,
  country,
  lat,
  lng
}: AddLegalEntityParams): Promise<void> {
  const supabase = createClient();

  const jurisdictionPayload = {
    country: jurCountry,
    province: jurProvince
  };
  const { data: jurisdictionData, error: jurisdictionError } = await supabase
    .from('jurisdiction')
    .insert(jurisdictionPayload)
    .select('id');
  if (jurisdictionError) {
    throw jurisdictionError;
  }

  const entityPayload = {
    organization_id: organizationId,
    type,
    legal_name: legalName,
    display_name: displayName,
    operating_currency: operatingCurrency,
    purpose: entityPurpose ?? null,
    jurisdiction_id: jurisdictionData[0].id
  };

  const { data, error, count } = await supabase
    .from('legal_entity')
    .insert(entityPayload, { count: 'exact' })
    .select(['id'].join(', '));
  if (error) {
    throw error;
  }
  console.log('data', data);

  if (data && count === 1) {
    const addressPayload = {
      legal_entity_id: data[0].id,
      label: addressLabel,
      line1: addressLine1,
      line2: addressLine2,
      city: city,
      state_province: stateProvince,
      postal_code: postalCode,
      country: country,
      lat: lat,
      lng: lng
    };

    const { data: addressData, error: addressError } = await supabase
      .from('address')
      .insert(addressPayload)
      .select('id');
  }
  if (error) {
    throw error;
  }

  revalidatePath(`/${organizationId}`, 'page');
}

const legelEntityFields = [
  '*',
  'subsidiaries:legal_entity_relationship!legal_entity_relationship_parent_entity_id_fkey(' +
    'id, relationship_type, child:legal_entity!legal_entity_relationship_child_entity_id_fkey(*)' +
    ')',
  'owners:legal_entity_relationship!legal_entity_relationship_child_entity_id_fkey(' +
    'id, relationship_type, parent:legal_entity!legal_entity_relationship_parent_entity_id_fkey(*)' +
    ')',
  'offerings:offering(*)',
  'addresses:address(*)',
  'organization(id, organization_user(id, user_id, permissions))'
].join(', ');

export async function getLegalEntityById(
  entityId: string
): Promise<LegalEntityWithSubsidiaries | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .select(`${legelEntityFields}`)
    .eq('id', entityId);
  if (error) {
    throw error;
  }
  if (!data) {
    return null;
  }
  console.log('data', data[0]);
  return data[0] as unknown as LegalEntityWithSubsidiaries;
}

export async function getEntitiesByOrganizationId(
  organizationId: string
): Promise<legalEntityWithSubsidiaries[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .select(`${legelEntityFields}`)
    .eq('organization_id', organizationId);
  if (error) {
    throw error;
  }
  if (!data) {
    return [];
  }
  return data as unknown as legalEntityWithSubsidiaries[];
}

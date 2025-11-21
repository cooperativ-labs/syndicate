'use server';
import { createClient } from '@supabase/utils/server';
import { revalidatePath } from 'next/cache';

import { CurrencyCodeType, LegalEntity, LegalEntityTypes } from '@/types';
import { LegalEntityWithSubsidiaries } from '@/types';

type AddLegalEntityParams = {
  organizationId: string | number;
  legalName: string;
  displayName: string;
  type: LegalEntityTypes; // legal_entity_type
  operatingCurrency: CurrencyCodeType; // currency_code
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
    organization_id: Number(organizationId),
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
    .select('id')
    .single();
  if (error) {
    throw error;
  }

  if (data && count === 1) {
    const addressPayload = {
      legal_entity_id: Number(data.id),
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
      .insert(addressPayload);
    if (addressError) {
      throw addressError;
    }
  }

  revalidatePath(`/manager/${organizationId}`, 'page');
}

//LegalEntityWithAddresses
const legelEntityFieldsAddress = ['*', 'addresses:address(*)'].join(', ');

//LegalEntityWithOffering
const legelEntityFieldsOffering = [
  '*, organizationId:organization_id',
  'offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address))'
].join(', ');

//LegalEntityWithSubsidiaries
const ownersAndSubsidiariesFields = [
  'subsidiaries:legal_entity_relationship!legal_entity_relationship_parent_entity_id_fkey(' +
    'id, relationship_type, child:legal_entity!legal_entity_relationship_child_entity_id_fkey(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address)))' +
    ')',
  'owners:legal_entity_relationship!legal_entity_relationship_child_entity_id_fkey(' +
    'id, relationship_type, parent:legal_entity!legal_entity_relationship_parent_entity_id_fkey(*,offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address)))' +
    ')'
].join(', ');

//LegalEntityFull
const legalEntityFullFields = [
  '*',
  legelEntityFieldsOffering,
  ownersAndSubsidiariesFields,
  'organization(id, organization_user(*))'
].join(', ');

export async function getLegalEntityById(
  entityId: string
): Promise<LegalEntityWithSubsidiaries | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .select(legalEntityFullFields)
    .eq('id', Number(entityId))
    .single();
  if (error) throw error;
  if (!data) return null;
  return data;
}

export async function getSimpleEntitiesByOrganizationId(
  organizationId: string
): Promise<{ id: number; legal_name: string | null; offeringCount: number }[] | []> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .select('id, legal_name', { count: 'exact' })
    .eq('organization_id', Number(organizationId));
  if (error) throw error;
  const offeringCount = data.length;
  const result = data.map(entity => ({
    id: entity.id,
    legal_name: entity.legal_name,
    offeringCount
  }));
  return result;
}
export async function getEntitiesByOrganizationId(
  organizationId: string
): Promise<LegalEntityWithSubsidiaries[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .select(ownersAndSubsidiariesFields)
    .eq('organization_id', Number(organizationId));
  if (error) {
    throw error;
  }
  if (!data) {
    return [];
  }
  return data;
}

export async function updateEntityName({
  entityId,
  displayName
}: {
  entityId: string | number;
  displayName: string;
}): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .update({
      display_name: displayName
    })
    .eq('id', Number(entityId));
  if (error) {
    throw error;
  }
  revalidatePath(`/manager/[organizationId]/entities/[entityId]`, 'page');
}

export async function updateLegalEntity({
  entityId,
  displayName,
  legalName,
  operatingCurrency,
  jurCountry,
  jurProvince,
  taxId,
  purpose
}: {
  entityId: string | number;
  displayName: string | undefined;
  legalName: string;
  operatingCurrency: CurrencyCodeType | null;
  jurCountry: string | undefined;
  jurProvince: string | undefined;
  taxId: string | undefined;
  purpose: string | undefined;
}): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity')
    .update({
      display_name: displayName,
      legal_name: legalName,
      operating_currency: operatingCurrency,
      tax_id: taxId,
      jurisdiction_id: jurCountry,
      purpose: purpose
    })
    .eq('id', Number(entityId));
  if (error) {
    throw error;
  }
  revalidatePath(`/manager/[organizationId]/entities/[entityId]`, 'layout');
}

export async function deleteAddress({
  geoAddressId,
  entityId
}: {
  geoAddressId: string | number;
  entityId: string | number;
}): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase.from('address').delete().eq('id', String(geoAddressId));
  if (error) {
    throw error;
  }
  revalidatePath(`/${entityId}/entities/${entityId}`, 'layout');
}

export async function addOwner({
  ownerId,
  entityId
}: {
  ownerId: string | number;
  entityId: string | number;
}): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase.from('legal_entity_relationship').insert({
    parent_entity_id: Number(ownerId),
    child_entity_id: Number(entityId),
    relationship_type: 'owner'
  });
  if (error) {
    throw error;
  }
  revalidatePath(`/manager/[organizationId]/entities/${entityId}`, 'layout');
}

export async function removeOwner({
  ownerId,
  entityId
}: {
  ownerId: string | number;
  entityId: string | number;
}): Promise<void> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('legal_entity_relationship')
    .delete()
    .eq('child_entity_id', Number(ownerId));
  if (error) {
    throw error;
  }
  revalidatePath(`/${entityId}/entities/${entityId}`, 'layout');
}

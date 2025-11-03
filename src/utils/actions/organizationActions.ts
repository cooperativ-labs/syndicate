'use server';

import { GetOrganizationQuery, LegalEntity, Organization } from '@gql/graphql';
import { createClient } from '@supabase/utils/server';

export const getOrganizations = async (
  orgIds: string[]
): Promise<(Organization & { legal_entities: LegalEntity[] })[]> => {
  const supabase = createClient();

  const { data: organizationsData, error: organizationsError } = await supabase
    .from('organization')
    .select(
      '*, organization_user(id, user_id, permissions), legal_entity(id, type, jurisdiction_id, legal_name, display_name, offering(id, is_public, access_code, short_description))'
    )
    .in('id', orgIds);
  if (organizationsError) {
    console.error(organizationsError);
    return [];
  }
  return organizationsData as unknown as (Organization & { legal_entities: LegalEntity[] })[];
};

export const getOrganization = async (
  id: string
): Promise<Organization & { legal_entities: LegalEntity[] }> => {
  const organizations = await getOrganizations([id]);
  return organizations[0];
};

export const getOrgsFromUser = async (
  userId?: string | null
): Promise<(Organization & { legal_entities: LegalEntity[] })[]> => {
  const supabase = createClient();
  let id = userId;
  if (!userId) {
    const { data: userData } = await supabase.auth.getUser();
    id = userData.user?.id;
  }

  if (!id) {
    return [];
  }

  const { data: memberships, error: membershipsErrors } = await supabase
    .from('organization_user')
    .select('organization_id')
    .eq('user_id', id);
  if (membershipsErrors) {
    console.error(membershipsErrors);
    return [];
  }

  if (!memberships || memberships.length === 0) {
    return [];
  }

  const organizations = await getOrganizations(memberships.map(org => org.organization_id));

  return organizations;
};

import type { Organization } from '@gql/graphql';
import type { User } from '@supabase/supabase-js';
import { createClient } from '@supabase/utils/client';
import router from 'next/router';

export const handleOrganizationChange = (id: string, postSelectionAction?: () => void) => {
  window.sessionStorage.setItem('CHOSEN_ORGANIZATION', id);
  router.push(`/${id}/overview`);
};

export const getOrgsFromUser = async (user: User | null) => {
  const supabase = createClient();
  if (!user) {
    return [];
  }
  const { data: memberships, error } = await supabase
    .from('organization_user')
    .select('organization_id')
    .eq('user_id', user.id);
  if (error) {
    console.error(error);
    return [];
  }

  if (!memberships || memberships.length === 0) {
    return [];
  }

  const { data: organizations, error: organizationsError } = await supabase
    .from('organization')
    .select('*')
    .in(
      'id',
      memberships.map(org => org.organization_id)
    );
  if (organizationsError) {
    console.error(organizationsError);
    return [];
  }
  return organizations ?? [];
};

export const cleanOrganizationArray = (organizations: Organization[]): Organization[] => {
  return organizations?.map((org: any) => {
    return (org as any).organization as Organization;
  });
};

export const getOrganizationUser = (userId: string | undefined, organization: Organization) => {
  return (organization as any).users?.find((user: any) => user?.user.id === userId);
};

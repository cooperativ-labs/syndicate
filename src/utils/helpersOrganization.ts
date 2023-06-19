import router from 'next/router';
import { Organization, OrganizationUser } from 'types';

export const handleOrganizationChange = (id: string, postSelectionAction?: () => void) => {
  window.sessionStorage.setItem('CHOSEN_ORGANIZATION', id);
  router.push(`/${id}/overview`);
  postSelectionAction && postSelectionAction();
};

export const cleanOrganizationArray = (organizations: Organization[]): Organization[] => {
  return organizations?.map((org) => {
    // @ts-ignore - this is a hack to remove the "organization" property from the organization object
    return org.organization;
  });
};

export const getOrganizationUser = (userId: string | undefined, organization: Organization) => {
  return organization.users?.find((user) => user?.user.id === userId);
};

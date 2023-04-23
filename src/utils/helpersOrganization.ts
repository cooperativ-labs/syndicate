import router from 'next/router';
import { Organization } from 'types';

export const handleOrganizationChange = (id: string, postSelectionAction?: () => void) => {
  window.sessionStorage.setItem('CHOSEN_ORGANIZATION', id);
  router.push(`/${id}`);
  postSelectionAction && postSelectionAction();
};

export const cleanOrganizationArray = (organizations: Organization[]): Organization[] => {
  return organizations?.map((org) => {
    // @ts-ignore - this is a hack to remove the "organization" property from the organization object
    return org.organization;
  });
};

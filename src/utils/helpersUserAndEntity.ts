import { Country, State } from "country-state-city";

import {
  Jurisdiction,
  LegalEntity,
  LegalEntityType,
  OrganizationComplete,
  OrganizationPermissionType,
  OrganizationPermissionTypes,
  OrganizationUser,
} from "@/types";
import { LegalEntityWithAddresses, OfferingFull } from "@/types";

// export const getUserPersonalEntity = (user: User) => {
//   const entityObject = user.legalEntities.find((entity) => entity.legalEntity.type === LegalEntityType.Individual);
//   if (entityObject) {
//     return entityObject.legalEntity;
//   }
//   return null;
// };

export const entityNotHuman = (entity: LegalEntity) => {
  return entity?.type !== LegalEntityType.INDIVIDUAL;
};

export const getSelectedAddressFromEntity = (
  entity: LegalEntityWithAddresses,
  addressId: string,
) => {
  return entity.addresses?.find((address) => address?.id === addressId);
};

// export const getNonHumanEntities = (user: User) => {
//   const removeHumans = user.legalEntities.filter((entity) => {
//     return entity.legalEntity.type !== LegalEntityType.Individual;
//   });
//   return removeHumans.map((entity) => entity.legalEntity);
// };

export const getOrgOfferingsFromEntity = (
  organization: OrganizationComplete,
): OfferingFull[] => {
  return organization.legalEntities?.map((entity) => entity?.offerings).flat();
};

export const getIsAdmin = ({ userId, organizationUsers }: {
  userId: string;
  organizationUsers: OrganizationUser[] | {
    id: string;
    user_id: string;
    permissions: OrganizationPermissionTypes[];
  }[];
}): boolean => {
  if (!organizationUsers) return false;
  const user = organizationUsers?.find((u) => u?.user_id === userId);
  return user?.permissions?.includes(OrganizationPermissionType.ADMIN) ?? false;
};

export const getIsEditorOrAdmin = (
  { userId, organizationUsers }: {
    userId: string | number | undefined;
    organizationUsers: OrganizationUser[] | {
      id: string;
      user_id: string;
      permissions: OrganizationPermissionTypes[] | undefined | null;
    }[];
  },
): boolean => {
  const user = organizationUsers?.find((u) =>
    u?.user_id.toString() === userId?.toString()
  );
  return (user?.permissions?.includes(OrganizationPermissionType.ADMIN) ??
    false) ||
    (user?.permissions?.includes(OrganizationPermissionType.EDITOR) ?? false);
};

export const renderJurisdiction = (
  jurisdiction: Jurisdiction | undefined,
): string | undefined => {
  const jurCountry = jurisdiction?.country;
  const jurProvince = jurisdiction?.province;
  const country = jurCountry && Country.getCountryByCode(jurCountry)?.name;
  const states = jurProvince && State.getStatesOfCountry(jurProvince);
  const province = states &&
    states.find((state) => state.isoCode === jurProvince)?.name;
  if (province) {
    return `${province}, ${country}`;
  }
  return country;
};

export const getEntityOptionsList = (entities: LegalEntity[]) => {
  const entityOptions = [...entities].reverse();
  return entityOptions;
};

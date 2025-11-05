import {
  Jurisdiction,
  LegalEntity,
  LegalEntityType,
  OrganizationPermissionType,
} from "@/types";
import { Country, State } from "country-state-city";
import {
  LegalEntityWithAddresses,
  OrganizationWithLegalEntities,
  OrganizationWithUsers,
} from "@/types";

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
  organization: OrganizationWithLegalEntities,
) => {
  return organization.legalEntities?.map((entity) => entity?.offerings).flat();
};

export const getIsAdmin = (
  userId: string,
  organization: {
    id: string;
    organizationUsers: { id: string; user_id: string; permissions: string }[];
  },
) => {
  return organization.organizationUsers?.find((u) => u?.user_id === userId)
    ?.permissions?.includes(OrganizationPermissionType.ADMIN);
};

export const getIsEditorOrAdmin = (
  userId: string | undefined,
  organization:
    | {
      id: string;
      organizationUsers: { id: string; user_id: string; permissions: string }[];
    }
    | undefined,
) => {
  const userPermissions = organization?.organizationUsers?.find((u) =>
    u?.user_id === userId
  )?.permissions;

  return (
    userPermissions?.includes(OrganizationPermissionType.ADMIN) ||
    userPermissions?.includes(OrganizationPermissionType.EDITOR)
  );
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

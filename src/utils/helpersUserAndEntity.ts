import {
  Jurisdiction,
  LegalEntity,
  LegalEntityType,
  Maybe,
  Organization,
  OrganizationPermissionType,
  User,
} from 'types';
import { Country, State } from 'country-state-city';

// export const getUserPersonalEntity = (user: User) => {
//   const entityObject = user.legalEntities.find((entity) => entity.legalEntity.type === LegalEntityType.Individual);
//   if (entityObject) {
//     return entityObject.legalEntity;
//   }
//   return null;
// };

export const entityNotHuman = (entity: LegalEntity) => {
  return entity?.type !== LegalEntityType.Individual;
};

export const getSelectedAddressFromEntity = (entity: LegalEntity, addressId: string) => {
  return entity.addresses?.find((address) => address?.id === addressId);
};

// export const getNonHumanEntities = (user: User) => {
//   const removeHumans = user.legalEntities.filter((entity) => {
//     return entity.legalEntity.type !== LegalEntityType.Individual;
//   });
//   return removeHumans.map((entity) => entity.legalEntity);
// };

export const getOrgOfferingsFromEntity = (organization: Organization) => {
  return organization.legalEntities?.map((entity) => entity?.offerings).flat();
};

export const getIsAdmin = (userId: string, organization: Organization) => {
  return organization.users
    ?.find((u) => u?.user.id === userId)
    ?.permissions?.includes(OrganizationPermissionType.Admin);
};

export const getIsEditorOrAdmin = (userId: string | undefined, organization: Organization | undefined) => {
  const userPermissions = organization?.users?.find((u) => u?.user.id === userId)?.permissions;
  return (
    userPermissions?.includes(OrganizationPermissionType.Admin) ||
    userPermissions?.includes(OrganizationPermissionType.Editor)
  );
};

export const renderJurisdiction = (jurisdiction: Maybe<Jurisdiction> | undefined): Maybe<string> | undefined => {
  const jurCountry = jurisdiction?.country;
  const jurProvince = jurisdiction?.province;
  const country = jurCountry && Country.getCountryByCode(jurCountry)?.name;
  const states = jurProvince && State.getStatesOfCountry(jurProvince);
  const province = states && states.find((state) => state.isoCode === jurProvince)?.name;
  if (province) {
    return `${province}, ${country}`;
  }
  return country;
};

export const getEntityOptionsList = (entities: LegalEntity[]) => {
  const entityOptions = [...entities].reverse();
  return entityOptions;
};

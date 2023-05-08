import { Jurisdiction, LegalEntity, LegalEntityType, Organization, OrganizationPermissionType, User } from 'types';
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
  return entity.addresses.find((address) => address.id === addressId);
};

// export const getNonHumanEntities = (user: User) => {
//   const removeHumans = user.legalEntities.filter((entity) => {
//     return entity.legalEntity.type !== LegalEntityType.Individual;
//   });
//   return removeHumans.map((entity) => entity.legalEntity);
// };

export const getOrgOfferingsFromEntity = (organization: Organization) => {
  return organization.legalEntities.map((entity) => entity?.offerings).flat();
};

export const getIsAdmin = (userId: string, organization: Organization) => {
  return organization.users.find((u) => u.user.id === userId).permissions.includes(OrganizationPermissionType.Admin);
};

export const getIsEditorOrAdmin = (userId: string, organization: Organization) => {
  const userPermissions = organization.users.find((u) => u.user.id === userId).permissions;
  return (
    userPermissions.includes(OrganizationPermissionType.Admin) ||
    userPermissions.includes(OrganizationPermissionType.Editor)
  );
};

export const renderJurisdiction = (jurisdiction: Jurisdiction) => {
  const country = Country.getCountryByCode(jurisdiction.country).name;
  const states = State.getStatesOfCountry(jurisdiction.country);
  const province = states.find((state) => state.isoCode === jurisdiction.province)?.name;
  if (province) {
    return `${province}, ${country}`;
  }
  return country;
};

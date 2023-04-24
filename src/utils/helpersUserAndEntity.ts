import { LegalEntity, LegalEntityType, Organization, OrganizationPermissionType, User } from 'types';

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

export const getEntityManagers = (entity: LegalEntity) => {
  const organization = entity.organization;
  return organization.users.filter((user) =>
    user.permissions.includes(OrganizationPermissionType.Admin || OrganizationPermissionType.Editor)
  );
};

export const getIsAdmin = (userId: string, organization: Organization) => {
  return organization.users.find((u) => u.user.id === userId).permissions.includes(OrganizationPermissionType.Admin);
};

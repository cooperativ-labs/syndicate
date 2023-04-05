import { LegalEntity, LegalEntityType, User } from 'types';

export const getUserPersonalEntity = (user: User) => {
  const entityObject = user.legalEntities.find((entity) => entity.legalEntity.type === LegalEntityType.Individual);
  if (entityObject) {
    return entityObject.legalEntity;
  }
  return null;
};

export const entityNotHuman = (entity: LegalEntity) => {
  return entity?.type !== LegalEntityType.Individual;
};

export const getSelectedEntity = (user: User, entityId: string) => {
  return user.legalEntities.find((entity) => entity?.legalEntity?.id === entityId)?.legalEntity;
};

export const getSelectedAddressFromEntity = (entity: LegalEntity, addressId: string) => {
  return entity.addresses.find((address) => address.id === addressId);
};

export const getNonHumanEntities = (user: User) => {
  const removeHumans = user.legalEntities.filter((entity) => {
    return entity.legalEntity.type !== LegalEntityType.Individual;
  });
  return removeHumans.map((entity) => entity.legalEntity);
};

export const getUserTitle = (userId: string, entity: LegalEntity) => {
  return entity.users.find((u) => {
    return u.user.id === userId;
  }).title;
};

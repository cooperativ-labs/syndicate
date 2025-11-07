'use client';

import React, { createContext, useContext } from 'react';

import { LegalEntityWithSubsidiaries } from '@/types';

type EntityContextValue = {
  entity: LegalEntityWithSubsidiaries;
};

const EntityContext = createContext<EntityContextValue | undefined>(undefined);

export function EntityProvider({
  entity,
  children
}: {
  entity: LegalEntityWithSubsidiaries;
  children: React.ReactNode;
}) {
  return <EntityContext.Provider value={{ entity }}>{children}</EntityContext.Provider>;
}

export function useEntity() {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('useEntity must be used within an EntityProvider');
  }
  return context;
}

export default EntityContext;

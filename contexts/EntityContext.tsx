'use client';

import React, { createContext, useContext } from 'react';

import { LegalEntityWithSubsidiaries } from '@/types';

type EntityContextValue = {
  entities: LegalEntityWithSubsidiaries[];
};

const EntityContext = createContext<EntityContextValue | undefined>(undefined);

export function EntityProvider({
  entities,
  children
}: {
  entities: LegalEntityWithSubsidiaries[];
  children: React.ReactNode;
}) {
  return <EntityContext.Provider value={{ entities }}>{children}</EntityContext.Provider>;
}

export function useEntities() {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('useEntity must be used within an EntityProvider');
  }
  return context;
}

export default EntityContext;

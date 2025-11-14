'use client';

import React, { createContext, useContext } from 'react';

import { LegalEntityWithAddresses, OfferingFull, OrganizationUser } from '@/types';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';
import { useUserContext } from './UserContext';

type OfferingContextValue = {
  offering: OfferingFull;
  organizationUsers: OrganizationUser[];
  isOfferingManager: boolean;
  legalEntity: LegalEntityWithAddresses;
};

const OfferingContext = createContext<OfferingContextValue | undefined>(undefined);

export function OfferingContextProvider({
  offering,
  organizationUsers,
  children
}: {
  offering: OfferingFull;
  organizationUsers: OrganizationUser[];
  children: React.ReactNode;
}) {
  const { userId } = useUserContext();
  const isOfferingManager = getIsEditorOrAdmin({
    userId: userId,
    organizationUsers: organizationUsers
  });
  const legalEntity = offering.legalEntity;
  return (
    <OfferingContext.Provider
      value={{ offering, organizationUsers, isOfferingManager, legalEntity }}
    >
      {children}
    </OfferingContext.Provider>
  );
}

export function useOffering() {
  const context = useContext(OfferingContext);
  if (!context) {
    throw new Error('useOffering must be used within an OfferingContextProvider');
  }
  return context;
}

export default OfferingContext;

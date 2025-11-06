'use client';

import { useParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { Organization } from '@/types';

type OrganizationsContextValue = {
  organizations: Organization[];
  // chosenOrganization: OrganizationWithLegalEntities | null;
  chosenOrganizationId: string | null;
  createOrganizationModalOpen: boolean;
  setCreateOrganizationModalOpen: (open: boolean) => void;
};

const OrganizationsContext = createContext<OrganizationsContextValue | undefined>(undefined);

export function OrganizationsProvider({
  organizations,
  children,
  savedOrganizationId
}: {
  organizations: Organization[];
  children: ReactNode;
  savedOrganizationId: string | null;
}) {
  const params = useParams<{ organizationId: string }>();
  const foundOrganizationId = params?.organizationId as string | undefined;
  const [chosenOrganizationId, setChosenOrganizationId] = useState<string | null>(null);
  const [createOrganizationModalOpen, setCreateOrganizationModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const setOrgId = foundOrganizationId ?? savedOrganizationId ?? null;
    setChosenOrganizationId(setOrgId);
  }, []);

  return (
    <OrganizationsContext.Provider
      value={{
        organizations,
        // chosenOrganization,
        chosenOrganizationId,
        createOrganizationModalOpen,
        setCreateOrganizationModalOpen
      }}
    >
      {children}
    </OrganizationsContext.Provider>
  );
}

export function useOrganizations() {
  const context = useContext(OrganizationsContext);
  if (!context) {
    throw new Error('useOrganizations must be used within an OrganizationsProvider');
  }
  return context;
}

'use client';

import { OrganizationWithLegalEntities } from '@/types';
import { useParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type OrganizationsContextValue = {
  organizations: OrganizationWithLegalEntities[];
  chosenOrganization: OrganizationWithLegalEntities | null;
  chosenOrganizationId: string | null;
};

const OrganizationsContext = createContext<OrganizationsContextValue | undefined>(undefined);

export function OrganizationsProvider({
  organizations,
  children,
  savedOrganizationId
}: {
  organizations: OrganizationWithLegalEntities[];
  children: ReactNode;
  savedOrganizationId: string | null;
}) {
  const params = useParams<{ organizationId: string }>();
  const foundOrganizationId = params?.organizationId as string | undefined;
  const [chosenOrganizationId, setChosenOrganizationId] = useState<string | null>(null);

  useEffect(() => {
    const setOrgId = foundOrganizationId ?? savedOrganizationId ?? null;
    setChosenOrganizationId(setOrgId);
  }, []);

  const chosenOrganization =
    organizations.find(organization => organization.id.toString() === chosenOrganizationId) || null;

  return (
    <OrganizationsContext.Provider
      value={{
        organizations,
        chosenOrganization,
        chosenOrganizationId
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

'use client';

import { useParams } from 'next/navigation';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { OrganizationWithUsers } from '@/types';
import { getIsAdmin } from '@src/utils/helpersUserAndEntity';
import { useUserContext } from './UserContext';
import { getIsEditorOrAdmin } from '@src/utils/helpersUserAndEntity';

type OrganizationsContextValue = {
  organizations: OrganizationWithUsers[];
  chosenOrganization: OrganizationWithUsers | null;
  chosenOrganizationId: string | null;
  isAdmin: boolean;
  isEditorOrAdmin: boolean;
  createOrganizationModalOpen: boolean;
  setCreateOrganizationModalOpen: (open: boolean) => void;
  setIsEditorOrAdmin: (isEditorOrAdmin: boolean) => void;
};

const OrganizationsContext = createContext<OrganizationsContextValue | undefined>(undefined);

export function OrganizationsProvider({
  organizations,
  children
}: {
  organizations: OrganizationWithUsers[];
  children: ReactNode;
}) {
  const params = useParams<{ organizationId: string }>();
  const { user } = useUserContext();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditorOrAdmin, setIsEditorOrAdmin] = useState<boolean>(false);
  const [createOrganizationModalOpen, setCreateOrganizationModalOpen] = useState<boolean>(false);
  const chosenOrganizationId = (params?.organizationId as string | undefined) || null;
  const chosenOrganization =
    organizations.find(organization => organization.id.toString() === chosenOrganizationId) || null;

  useEffect(() => {
    if (chosenOrganization) {
      setIsAdmin(
        getIsAdmin({
          userId: user?.id,
          organizationUsers: chosenOrganization.organizationUsers
        })
      );
      setIsEditorOrAdmin(
        getIsEditorOrAdmin({
          userId: user?.id,
          organizationUsers: chosenOrganization.organizationUsers
        })
      );
    }
  }, [chosenOrganization, user]);

  return (
    <OrganizationsContext.Provider
      value={{
        organizations,
        chosenOrganization,
        chosenOrganizationId,
        isAdmin,
        isEditorOrAdmin,
        createOrganizationModalOpen,
        setCreateOrganizationModalOpen,
        setIsEditorOrAdmin
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

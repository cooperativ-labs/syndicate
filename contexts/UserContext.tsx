'use client';

import { User } from '@supabase/supabase-js';
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react';

import { Profile } from '@/types';
// Define the context type
interface UserContextType {
  userId: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  email: string | undefined;
  user: User | null;
  loading: boolean;
  organizationUserId: string | undefined;
  setOrganizationUserId: Dispatch<SetStateAction<string | undefined>>;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export function UserProvider({
  children,
  userProfile,
  user
}: {
  children: ReactNode;
  userProfile?: Profile | null;
  user: User | null;
}) {
  const [settingsDialog, setSettingsDialog] = useState(false);
  const [organizationUserId, setOrganizationUserId] = useState<string | undefined>(undefined);

  const userEmail = user ? user.email : null;
  const value = {
    userId: user?.id || undefined,
    imageUrl: userProfile?.image || undefined,
    name: userProfile?.name || undefined,
    email: userEmail || undefined,
    user: user || null,
    loading: false,
    organizationUserId: organizationUserId || undefined,
    setOrganizationUserId
  };

  return <UserContext.Provider value={{ ...value }}>{children}</UserContext.Provider>;
}

// Custom hook to use the context
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

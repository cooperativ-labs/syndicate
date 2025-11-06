'use client';

import { Profile } from '@/types';
import { User } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useState } from 'react';
// Define the context type
interface UserContextType {
  userId: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  email: string | undefined;
  user: User | null;
  loading: boolean;
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
  const userEmail = user ? user.email : null;
  const value = {
    userId: user?.id || undefined,
    imageUrl: userProfile?.image || undefined,
    name: userProfile?.name || undefined,
    email: userEmail || undefined,
    user: user || null,
    loading: false
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

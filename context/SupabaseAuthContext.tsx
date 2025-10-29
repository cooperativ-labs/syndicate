import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';
// import { createClient } from '../supabase/utils/client';

type SupabaseAuthContextValue = {
  supabase: SupabaseClient;
  user: User | null;
  session: Session | null;
  loading: boolean;
};

const SupabaseAuthContext = createContext<SupabaseAuthContextValue | undefined>(undefined);

type SupabaseAuthProviderProps = {
  children: ReactNode;
};

export function SupabaseAuthProvider({ children }: SupabaseAuthProviderProps) {
  // const supabase = useMemo(() => {
  //   const client = createClient();
  //   console.log('Created Supabase client');
  //   return client;
  // }, []);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;


    // Get initial session
    supabase.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        console.log('getSession result:', {
          session,
          error,
          hasSession: !!session,
          hasUser: !!session?.user
        });
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      })
      .catch(err => {
        console.error('getSession error:', err);
        if (mounted) {
          setLoading(false);
        }
      });

    // Listen for auth changes
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      console.log('Auth state changed:', {
        event: _event,
        hasSession: !!session,
        hasUser: !!session?.user
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SupabaseAuthContext.Provider value={{ supabase, user, session, loading }}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (!context) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};

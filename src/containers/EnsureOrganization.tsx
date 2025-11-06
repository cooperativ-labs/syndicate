'use client';
import { Organization } from '@/types';
import { getOrgsFromUser } from '@src/utils/actions/organizationActions';
import type { User } from '@supabase/supabase-js';
import React, { FC, useEffect, useState } from 'react';

type EnsureProfileCompletionProps = {
  children: React.ReactNode;
  explainerText?: string;
  user: User | null;
};

const EnsureOrganization: FC<EnsureProfileCompletionProps> = ({
  children,
  explainerText,
  user
}) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  useEffect(() => {
    const fetchOrganizations = async () => {
      const organizations = await getOrgsFromUser();
      setOrganizations(organizations as Organization[]);
    };
    fetchOrganizations();
  }, [user]);
  return (
    <>
      {organizations && organizations.length > 0 ? (
        <>{children}</>
      ) : (
        <>
          <div className="text-cLightBlue font-bold text-lg">{explainerText}</div>
          FORM
        </>
      )}
    </>
  );
};

export default EnsureOrganization;

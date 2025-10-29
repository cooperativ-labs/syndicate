'use client';
import React, { FC, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { getOrgsFromUser } from '@src/utils/helpersOrganization';
import { Organization } from '@gql/graphql';

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
      const organizations = await getOrgsFromUser(user);
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

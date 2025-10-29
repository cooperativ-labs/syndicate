"use client";

import React, { useEffect } from 'react';
import { ADD_ORGANIZATION_EMAIL } from '@src/utils/dGraphQueries/organization';
import { sha256 } from 'js-sha256';
import { useMutation } from '@apollo/client';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

const ConfirmEmail = () => {
  const params = useParams<{ organizationId: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const orgId = params?.organizationId;
  const storedEmail = typeof window !== 'undefined' ? window.localStorage.getItem('email') : null;
  const hashStoredEmail = storedEmail && sha256(storedEmail);

  const [addOrganizationEmail, { error: errorEmail }] = useMutation(ADD_ORGANIZATION_EMAIL);

  useEffect(() => {
    if (!storedEmail || !hashStoredEmail || !orgId) {
      return;
    }

    if (hashStoredEmail !== token) {
      window.localStorage.removeItem('email');
      alert('Oops. Looks like there was a problem confirming your email address.');
      router.push(`/${orgId}/settings`);
      return;
    }

    addOrganizationEmail({
      variables: {
        organizationId: orgId,
        address: storedEmail,
        isPublic: true,
      },
    })
      .then(() => {
        window.localStorage.removeItem('email');
        alert('Email confirmed successfully!');
        router.push(`/${orgId}/settings`);
      })
      .catch(() => {
        window.localStorage.removeItem('email');
        alert('Oops. Looks like there was a problem confirming your email address.');
        router.push(`/${orgId}/settings`);
      });
  }, [storedEmail, hashStoredEmail, token, orgId, addOrganizationEmail, router]);

  useEffect(() => {
    if (errorEmail) {
      alert(`Oops. Looks like there was a problem adding your email address. ${errorEmail}`);
    }
  }, [errorEmail]);

  return (
    <div className="p-4 mx-auto max-w-xl bg-white rounded-xl shadow-lg">
      <h1 className="text-lg font-bold">Email Confirmed</h1>
      <p>
        Thank you! Your email address <strong>{storedEmail}</strong> has been successfully confirmed.
      </p>
    </div>
  );
};

export default ConfirmEmail;


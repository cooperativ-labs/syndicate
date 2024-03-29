import React from 'react';
import { ADD_ORGANIZATION_EMAIL } from '@src/utils/dGraphQueries/organization';
import { sha256 } from 'js-sha256';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const ConfirmEmail = () => {
  const router = useRouter();
  const { token, organizationId: orgId } = router.query;
  const storedEmail = window.localStorage.getItem('email');
  const hashStoredEmail = storedEmail && sha256(storedEmail);

  const [addOrganizationEmail, { error: errorEmail }] = useMutation(ADD_ORGANIZATION_EMAIL);

  const error = errorEmail;
  if (error) {
    alert(`Oops. Looks like there was a problem adding your email address. ${error}`);
  }

  //IF THIS ISN'T WORKING, TRY MOVING THIS TO THE _APP.JS FILE (weird copilot suggestion)
  // IF THIS ISN'T WORKING, THE ISSUE MAY BE THE DEPENDENCIES IN THE HOOK BELOW

  useEffect(() => {
    if (storedEmail && hashStoredEmail) {
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
      });
      window.localStorage.removeItem('email');
      alert('Email confirmed successfully!');
      router.push(`/${orgId}/settings`);
    }
  }, [storedEmail, router, hashStoredEmail, token, orgId, addOrganizationEmail]);

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

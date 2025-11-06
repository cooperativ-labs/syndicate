'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleOrganizationChange = async (id: string) => {
  const cookieStore = await cookies();
  cookieStore.set('CHOSEN_ORGANIZATION', id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30 // 30 days
  });
  redirect(`/${id}/overview`);
};

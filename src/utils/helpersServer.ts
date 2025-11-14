'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const organizationChangeServer = async (id: string) => {
  // const cookieStore = await cookies();
  // cookieStore.set('CHOSEN_ORGANIZATION', id, {
  //   maxAge: 60 * 60 * 24 * 30 // 30 days
  // });
  redirect(`/${id}/overview`);
};

export const setCookieApproval = async () => {
  const cookieStore = await cookies();
  cookieStore.set('user.analytics-approved', 'approved', {});
};

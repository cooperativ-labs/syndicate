import { redirect } from 'next/navigation';

export default async function AppRoute() {
  redirect(`/manager`);
}

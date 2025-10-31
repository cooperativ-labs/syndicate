import { useRouter } from 'next/router';

export default function EmailConfirmationPage() {
  const router = useRouter();
  console.log('siteUrl', process.env.NEXT_PUBLIC_SITE_URL);
  console.log('env', process.env.NODE_ENV);
  const { email } = router.query; // /confirm-your-email?email=a@b.com
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center w-64 md:w-96 text-center p-3 rounded-lg bg-zinc-100">
        <h1 className="text-lg font-semibold mb-2">{`Check your email.`}</h1>
        <p className="">{`We have sent an email to ${email ? email : 'you'} to confirm your address.`}</p>
      </div>
    </div>
  );
}

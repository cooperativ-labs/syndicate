import { createClient } from "../../../supabase/utils/client";
import router, { useRouter } from "next/router";

export const signIn = async (
 { email, password }: { email: string; password: string },
) => {
 const supabase = createClient();

 const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
 });

 if (error) {
  // Sentry.captureException(error);
  console.error(error);
  return router.push(`/login?form=password&message=${error.message}`);
 }

 return router.push("/");
};

export const signUp = async ({
 email,
 password,
 name,
 token,
 inviteEmail,
}: {
 email: string;
 password: string;
 name: string;
 token: string | null | undefined;
 inviteEmail: string | null | undefined;
}) => {
 const supabase = createClient();

 if (!inviteEmail && !email) {
  return router.push("/login?message=Missing required fields");
 }

 const { error, data } = await supabase.auth.signUp({
  email: inviteEmail ?? (email as string),
  password,
  options: {
   data: {
    name,

    has_password: true,
   },
  },
 });

 if (error) {
  // Sentry.captureException(error);
  return router.push(
   `/login?message=Could not create user${token ? "&code=" + token : ""}`,
  );
 }

 return router.push("/confirm-your-email?email=" + email);
};

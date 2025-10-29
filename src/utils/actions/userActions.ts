import { createClient } from "../../../supabase/utils/client";

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
   window.location.assign(`/login?form=password&message=${error.message}`);
   return;
  }

  window.location.assign("/");
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
  window.location.assign(
   `/login?message=Could not create user${token ? "&code=" + token : ""}`,
  );
  return;
 }

 window.location.assign("/confirm-your-email?email=" + email);
};

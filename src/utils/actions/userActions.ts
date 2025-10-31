"use server";
import { redirect } from "next/navigation";

import { createClient } from "@supabase/utils/server";

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
    return redirect(`/login?form=password&message=${error.message}`);
  }

  return redirect("/");
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
    return redirect("/login?message=Missing required fields");
  }

  const { error, data } = await supabase.auth.signUp({
    email: inviteEmail ?? (email as string),
    password,
  });

  if (error) {
    // Sentry.captureException(error);
    return redirect(
      `/login?message=Could not create user${token ? "&code=" + token : ""}`,
    );
  }

  return redirect("/confirm-your-email?email=" + email);
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return redirect(
      `/login?message=There may have been an error logging out. Please confirm. ${error}`,
    );
  }
  return redirect("/");
};

export async function signInWithEmail({
  email,
  shouldCreateUser,
  token,
  noRedirect = false,
}: {
  email: string;

  shouldCreateUser?: boolean;
  token?: string | null | undefined;
  noRedirect?: boolean;
}) {
  const supabase = createClient();

  if (shouldCreateUser) {
    let invitation;

    // if (token) {
    //  invitation = await db
    //   .selectFrom("userInvitation")
    //   .selectAll()
    //   .where("id", "=", token)
    //   .executeTakeFirstOrThrow();
    // }

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        shouldCreateUser,
        // data: {
        //  // name,
        //  // orgRoles: invitation && [
        //  //  {
        //  //   userRole: invitation.role,
        //  //   userOrg: invitation.organizationId,
        //  //  },
        //  // ],
        // },
      },
    });

    if (error) {
      console.error(error);
      return redirect(`/login?form=magic&message=${error.message}`);
    }
    if (noRedirect) {
      return;
    } else {
      return redirect("/check-your-email?email=" + email);
    }
    //https://supabase.com/docs/guides/auth/auth-email-templates#editing-email-templates (issue with some clients burning the confirmation link)
  } else {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        data: {
          email,
        },
      },
    });
    if (error) {
      // Sentry.captureException(error);
      return redirect(`/login?form=magic&message=${error.message}`);
    }
    if (noRedirect) {
      return;
    } else {
      return redirect("/check-your-email?email=" + email);
    }
  }
}

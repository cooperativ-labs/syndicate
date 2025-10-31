"use server";

import { createClient } from "@supabase/utils/server";

export const createOrganizationWithAdmin = async ({
  userId,
  name,
  logo,
  shortDescription,
  website,
  country,
  slug,
}: {
  userId: string;
  name: string;
  logo: string;
  shortDescription: string;
  website: string;
  country: string;
  slug: string;
}): Promise<{ organization_id: string; organization_user_id: string }> => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("create_organization_with_admin", {
    p_user_id: userId,
    p_name: name,
    p_logo: logo,
    p_short_description: shortDescription,
    p_website: website,
    p_country: country,
    p_slug: slug,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

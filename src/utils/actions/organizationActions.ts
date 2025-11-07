"use server";

import { createClient } from "@supabase/utils/server";

import {
  LegalEntity,
  Organization,
  OrganizationComplete,
  OrganizationWithLegalEntities,
} from "@/types";
import { revalidatePath } from "next/cache";

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
}): Promise<
  { organization_id: string; organization_user_id: string; slug: string }
> => {
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

  return {
    organization_id: data[0].organization_id,
    organization_user_id: data[0].organization_user_id,
    slug: data[0].slug,
  };
};

// const getOrganizations = async (
//   orgIds: string[],
// ): Promise<Organization[]> => {
//   const supabase = createClient();

//   const { data: organizationsData, error: organizationsError } = await supabase
//     .from("organization")
//     .select(
//       [
//         "*",
//         "organizationUsers:organization_user(id, user_id, permissions)",
//       ].join(", "),
//     )
//     .in("id", orgIds);
//   if (organizationsError) {
//     console.error("getOrganizations error", organizationsError);
//     return [];
//   }
//   return organizationsData;
// };

export const getOrganization = async (
  id: string,
): Promise<OrganizationComplete | null> => {
  const supabase = createClient();
  if (!id) {
    return null;
  }
  const { data: organizationsData, error: organizationsError } = await supabase
    .from("organization")
    .select(
      [
        "*",
        "organizationUsers:organization_user(id, user_id, permissions)",
        "linkedAccounts:linked_account(*)",
        "emailAddresses:email_address(*)",
        "legalEntities:legal_entity(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address), legalEntity:legal_entity(*)))",
      ].join(", "),
    )
    .eq("id", id)
    .single();

  if (organizationsError) {
    if (organizationsError.code === "PGRST116") {
      return null;
    }
    console.error("getOrganization Error", organizationsError);
    return null;
  }

  return organizationsData;
};

export const getOrgsFromUser = async (): Promise<Organization[] | []> => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.id) {
    return [];
  }

  try {
    const { data: organizationsData, error: organizationsErrors } =
      await supabase
        .from("organization_user")
        .select("org:organization(*)")
        .eq("user_id", user.id);

    if (organizationsErrors) {
      if (organizationsErrors.code === "PGRST116") {
        return [];
      }
      console.error("getOrgsFromUser Error", organizationsErrors);
      return [];
    }

    const organizations = organizationsData.map((organization) =>
      organization.org as unknown as Organization
    );
    if (!organizations) {
      return [];
    }
    return organizations;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addOrganizationEmail = async ({
  organizationId,
  address,
  isPublic,
}: {
  organizationId: string;
  address: string;
  isPublic: boolean;
}): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase.from("email_address").insert({
    organization_id: organizationId,
    address: address,
    is_public: isPublic,
  });
  if (error) {
    console.error("addOrganizationEmail Error", error);
  }
  revalidatePath(`/${organizationId}/settings`, "page");
};

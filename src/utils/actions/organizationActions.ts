"use server";

import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

import {
  LegalEntity,
  Organization,
  OrganizationComplete,
  OrganizationUser,
  OrganizationWithLegalEntities,
} from "@/types";

export const createOrganizationWithAdmin = async ({
  userId,
  name,
  logoFile,
  shortDescription,
  website,
  country,
  slug,
}: {
  userId: string;
  name: string;
  logoFile: File | null;
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
    p_logo: "/assets/images/logos/company-placeholder.jpeg",
    p_short_description: shortDescription,
    p_website: website,
    p_country: country,
    p_slug: slug,
  });
  if (error) {
    throw new Error(error.message);
  }
  if (logoFile) {
    const { data: logoData, error: logoError } = await supabase.storage.from(
      "organization-assets",
    ).upload(`${data[0].organization_id}/logo/${logoFile.name}`, logoFile);
    if (logoError) {
      throw new Error(logoError.message);
    }
    const logoUrl = logoData.fullPath;
    await supabase.from("organization").update({
      logo: logoUrl,
    }).eq("id", data[0].organization_id);
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
  source?: string,
): Promise<OrganizationComplete | null> => {
  const supabase = createClient();
  if (!id) {
    return null;
  }
  console.log("getOrganization id", { id, source });
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

    const organizations = organizationsData.map(
      (organization) => organization.org as unknown as Organization,
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

export const getOrganizationUser = async (
  organizationId: string,
): Promise<OrganizationUser | null> => {
  const supabase = createClient();
  const { data: organizationUserData, error: organizationUserError } =
    await supabase.from("organization_user").select(
      "*, notificationConfigurations:notification_configuration(*)",
    ).eq("organization_id", organizationId).single();
  if (organizationUserError) {
    console.error("getOrganizationUser Error", organizationUserError);
    return null;
  }
  return organizationUserData;
};
export const getOrganizationUsers = async ({
  organizationId,
}: {
  organizationId: string;
}): Promise<OrganizationUser[] | []> => {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.id) {
    return [];
  }
  const { data: organizationUsersData, error: organizationUsersError } =
    await supabase
      .from("organization_user")
      .select("*")
      .eq("organization_id", organizationId).eq("user_id", user.id);
  if (organizationUsersError) {
    console.error("getOrganizationUsers Error", organizationUsersError);
    return [];
  }
  return organizationUsersData;
};

export const updateOrganization = async ({
  organizationId,
  country,
  name,
  shortDescription,
  isPublic,
  logo,
  bannerImage,
  description,
}: {
  organizationId: string;
  country: string;
  name: string;
  shortDescription: string;
  isPublic: boolean;
  logo: string;
  bannerImage: string;
  description: string;
}): Promise<void> => {
  const supabase = createClient();
  const { error } = await supabase.from("organization").update({
    country: country,
    name: name,
    logo: logo,
    banner_image: bannerImage,
    is_public: isPublic,
    description: description,
    short_description: shortDescription,
  }).eq("id", organizationId);
  if (error) {
    console.error("updateOrganization Error", error);
  }
  revalidatePath(`/${organizationId}/settings`, "page");
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

export const removeTeamMember = async ({
  organizationId,
  organizationUserId,
}: {
  organizationId: string;
  organizationUserId: string;
}) => {
  const supabase = createClient();
  const { error } = await supabase.from("organization_user").delete().eq(
    "id",
    organizationUserId,
  );
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/${organizationId}/settings`, "page");
};

export const removeLinkedAccount = async ({
  organizationId,
  linkedAccountId,
}: {
  organizationId: string | number;
  linkedAccountId: string;
}) => {
  const supabase = createClient();
  const { error } = await supabase.from("linked_account").delete().eq(
    "id",
    linkedAccountId,
  );
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(`/${organizationId}/settings`, "page");
};

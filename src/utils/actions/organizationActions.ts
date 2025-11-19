"use server";

import { createClient } from "@supabase/utils/server";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

import {
  LegalEntity,
  NotificationConfiguration,
  Organization,
  OrganizationComplete,
  OrganizationUser,
  OrganizationUserPermissionTypes,
  OrganizationWithLegalEntities,
  OrganizationWithUsers,
} from "@/types";

import { getPublicUrl } from "./storageActions";
export const createOrganizationWithAdmin = async ({
  userId,
  name,
  logoFile,
  logoFileName,
  shortDescription,
  website,
  country,
  slug,
}: {
  userId: string;
  name: string;
  logoFile: File | null;
  logoFileName: string;
  shortDescription: string;
  website: string;
  country: string;
  slug: string;
}): Promise<
  { organization_id: string; organization_user_id: string; slug: string }
> => {
  const supabase = createClient();
  const saltySlug = slug.toLowerCase().trim().replace(/ /g, "-") + "-" +
    nanoid().slice(0, 4);

  const { data, error } = await supabase.rpc("create_organization_with_admin", {
    p_user_id: userId,
    p_name: name,
    p_logo: "/assets/images/logos/company-placeholder.jpeg",
    p_short_description: shortDescription,
    p_website: website,
    p_country: country,
    p_slug: saltySlug,
  });
  if (error) {
    throw new Error(error.message);
  }
  if (logoFile && logoFileName) {
    const { data: logoData, error: logoError } = await supabase.storage
      .from("organization-assets")
      .upload(`${data[0].organization_id}/logo/${logoFileName}`, logoFile);
    if (logoError) {
      console.error("createOrganizationWithAdmin Error", {
        logoError,
        logoFile,
      });
    }
    const logoUrl = logoData?.path;
    await supabase
      .from("organization")
      .update({
        logo: logoUrl || null,
      })
      .eq("id", data[0].organization_id);
  }

  return {
    organization_id: data[0].organization_id.toString(),
    organization_user_id: data[0].organization_user_id,
    slug: data[0].organization_slug,
  };
};

export const getOrganization = async (
  id: number | string,
  source?: string,
): Promise<OrganizationComplete | null> => {
  const supabase = createClient();

  if (!id) {
    return null;
  }
  const {
    data: organizationsData,
    error: organizationsError,
  }: {
    data: OrganizationComplete | null;
    error: any;
  } = await supabase
    .from("organization")
    .select(
      [
        "*",
        "organizationUsers:organization_user(id, user_id, permissions, profile(*))",
        "linkedAccounts:linked_account(*)",
        "emailAddresses:email_address(*)",
        "legalEntities:legal_entity(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address), legalEntity:legal_entity(*)))",
      ].join(", "),
    )
    .eq("id", Number(id))
    .single();

  if (organizationsError) {
    if (organizationsError.code === "PGRST116") {
      return null;
    }
    console.error("getOrganization Error", { organizationsError, id, source });
    return null;
  }

  if (!organizationsData) {
    return null;
  }

  const [logoUrl, bannerImageUrl] = await Promise.all([
    getPublicUrl({
      bucket: "organization-assets",
      path: organizationsData.logo,
      source: "getOrganization",
    }),
    getPublicUrl({
      bucket: "organization-assets",
      path: organizationsData.banner_image,
      source: "getOrganization",
    }),
  ]);

  organizationsData.logo = logoUrl.data || null;
  organizationsData.banner_image = bannerImageUrl.data || null;

  return organizationsData;
};

export const getOrgsFromUser = async (): Promise<
  OrganizationWithUsers[] | []
> => {
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
        .select("org:organization(*, organizationUsers:organization_user(*))")
        .eq("user_id", user.id);

    if (organizationsErrors) {
      if (organizationsErrors.code === "PGRST116") {
        return [];
      }
      console.error("getOrgsFromUser Error", organizationsErrors);
      return [];
    }

    const organizations = organizationsData.map(
      (organization) => {
        return {
          ...organization.org,
          organizationUsers: organization.org.organizationUsers,
        };
      },
    );
    if (!organizations) {
      return [];
    }

    const logoUrls = await Promise.all(
      organizations.map((organization) =>
        getPublicUrl({
          bucket: "organization-assets",
          path: organization.logo,
          source: "organizationActions",
        })
      ),
    );
    const organizationsWithLogos = organizations.map((organization, index) => ({
      ...organization,
      logo: logoUrls[index].data,
    }));

    return organizationsWithLogos;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOrganizationUser = async (
  organizationId: string,
): Promise<
  | (OrganizationUser & {
    notificationConfigurations: NotificationConfiguration[];
  })
  | null
> => {
  const supabase = createClient();
  const { data: organizationUserData, error: organizationUserError } =
    await supabase
      .from("organization_user")
      .select("*, notificationConfigurations:notification_configuration(*)")
      .eq("organization_id", Number(organizationId))
      .single();
  if (organizationUserError) {
    console.error("getOrganizationUser Error", organizationUserError);
    return null;
  }
  return organizationUserData;
};
export const getOrganizationUsers = async ({
  organizationId,
}: {
  organizationId: string | number;
}): Promise<OrganizationUser[] | []> => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.id) {
    return [];
  }
  const { data: organizationUsersData, error: organizationUsersError } =
    await supabase
      .from("organization_user")
      .select("*")
      .eq("organization_id", Number(organizationId))
      .eq("user_id", user.id);
  if (organizationUsersError) {
    console.error("getOrganizationUsers Error", organizationUsersError);
    return [];
  }
  return organizationUsersData;
};

export const addTeamMember = async ({
  organizationId,
  emailAddress,
  permission,
}: {
  organizationId: string;
  emailAddress: string;
  permission: OrganizationUserPermissionTypes;
}): Promise<void> => {
  const supabase = createClient();

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("id")
    .eq("email", emailAddress)
    .single();
  if (userError) {
    throw new Error(userError.message);
  }
  if (!userData) {
    throw new Error("User not found");
  }

  const { error: organizationUserError } = await supabase.from(
    "organization_user",
  ).insert({
    organization_id: Number(organizationId),
    user_id: userData.id,
    permission: permission,
  });
  if (organizationUserError) {
    throw new Error(organizationUserError.message);
  }
  revalidatePath(`/manager/${organizationId}`, "layout");
};

export const uploadOrganizationAsset = async ({
  organizationId,
  assetFile,
  assetName,
  assetType,
}: {
  organizationId: string | number;
  assetFile: File;
  assetName: string; //using file.name = "blob"
  assetType: "logo" | "banner_image";
}): Promise<void> => {
  const supabase = createClient();
  let assetPath = `${organizationId}/${assetType}/${assetName}`;
  const { data: assetData, error: assetError } = await supabase.storage
    .from("organization-assets")
    .upload(assetPath, assetFile, {
      upsert: true,
    });

  if (assetError) {
    throw new Error(assetError.message);
  }
  assetPath = assetData?.path || assetPath;
  await supabase
    .from("organization")
    .update({
      [assetType]: assetPath,
    })
    .eq("id", Number(organizationId));
  revalidatePath(`/manager/${organizationId}`, "layout");
};

export const deleteOrganizationAsset = async ({
  organizationId,
  assetUrl,
  assetType,
}: {
  organizationId: string | number;
  assetUrl: string;
  assetType: "logo" | "banner_image";
}): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase.storage.from("organization-assets").remove([
    assetUrl,
  ]);
  if (error) {
    throw new Error(error.message);
  }
  await supabase
    .from("organization")
    .update({
      [assetType]: null,
    })
    .eq("id", Number(organizationId));
  revalidatePath(`/manager/${organizationId}`, "layout");
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
  const { error } = await supabase
    .from("organization")
    .update({
      country: country,
      name: name,
      logo: logo,
      banner_image: bannerImage,
      is_public: isPublic,
      description: description,
      short_description: shortDescription,
    })
    .eq("id", Number(organizationId));
  if (error) {
    console.error("updateOrganization Error", error);
  }
  revalidatePath(`/manager/${organizationId}/settings`, "page");
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
    organization_id: Number(organizationId),
    address: address,
    is_public: isPublic,
  });
  if (error) {
    console.error("addOrganizationEmail Error", error);
  }
  revalidatePath(`/manager/${organizationId}/settings`, "page");
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
  revalidatePath(`/manager/${organizationId}/settings`, "page");
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
  revalidatePath(`/manager/${organizationId}/settings`, "page");
};

"use server";

import {
  LegalEntity,
  Organization,
  OrganizationComplete,
  OrganizationWithLegalEntities,
} from "@/types";
import { createClient } from "@supabase/utils/server";

export const getOrganizations = async (
  orgIds: string[],
): Promise<OrganizationWithLegalEntities[]> => {
  const supabase = createClient();

  const { data: organizationsData, error: organizationsError } = await supabase
    .from("organization")
    .select([
      "*",
      "organizationUsers:organization_user(id, user_id, permissions)",
      "legalEntities:legal_entity(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address)))",
    ].join(", "))
    .in("id", orgIds);
  if (organizationsError) {
    console.error("getOrganizations error", organizationsError);
    return [];
  }
  return organizationsData;
};

export const getOrganization = async (
  id: string,
): Promise<OrganizationComplete | null> => {
  const supabase = createClient();
  const { data: organizationsData, error: organizationsError } = await supabase
    .from("organization")
    .select([
      "*",
      "organizationUsers:organization_user(id, user_id, permissions)",
      "linkedAccounts:linked_account(*)",
      "emailAddresses:email_address(*)",
      "legalEntities:legal_entity(*, offerings:offering(*, offeringParticipants:offering_participant(*, walletAddress:wallet_address)))",
    ].join(", "))
    .eq("id", id)
    .single();

  if (organizationsError) {
    console.error(organizationsError);
    return null;
  }
  return organizationsData;
};

export const getOrgsFromUser = async (
  userId?: string | null,
): Promise<(Organization & { legal_entities: LegalEntity[] })[]> => {
  const supabase = createClient();
  let id = userId;
  if (!userId) {
    const { data: userData } = await supabase.auth.getUser();
    id = userData.user?.id;
  }

  if (!id) {
    return [];
  }

  const { data: memberships, error: membershipsErrors } = await supabase
    .from("organization_user")
    .select("organization_id")
    .eq("user_id", id);
  if (membershipsErrors) {
    console.error(membershipsErrors);
    return [];
  }

  if (!memberships || memberships.length === 0) {
    return [];
  }

  const organizations = await getOrganizations(
    memberships.map((org) => org.organization_id),
  );

  return organizations;
};

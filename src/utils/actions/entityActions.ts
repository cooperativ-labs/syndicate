"use server";
import { createClient } from "@supabase/utils/server";
import { LegalEntity } from "@gql/graphql";
import { revalidatePath } from "next/cache";

type AddLegalEntityParams = {
  organizationId: string | number;
  legalName: string;
  type: string; // legal_entity_type
  operatingCurrency: string; // currency_code
  entityPurpose?: string | null;
  addressLine1: string;
  addressLine2: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  lat: number;
  lng: number;
};

type AddLegalEntityResult = {
  affectedCount: number;
  records: Pick<
    LegalEntity,
    | "id"
    | "tax_id"
    | "display_name"
    | "legal_name"
    | "purpose"
    | "jurisdiction_id"
    | "operating_currency"
    | "organization_id"
    | "type"
  >[];
};

export async function addLegalEntity({
  organizationId,
  addressLine1,
  addressLine2,
  city,
  stateProvince,
  postalCode,
  country,
  lat,
  lng,
  legalName,
  type,
  operatingCurrency,
  entityPurpose,
}: AddLegalEntityParams): Promise<void> {
  const supabase = createClient();

  const insertPayload = {
    organization_id: organizationId,
    type,
    legal_name: legalName,
    display_name: legalName,
    operating_currency: operatingCurrency,
    purpose: entityPurpose ?? null,
  };

  const { data, error, count } = await supabase
    .from("legal_entity")
    .insert(insertPayload, { count: "exact" })
    .select(
      [
        "id",
        "tax_id",
        "display_name",
        "legal_name",
        "purpose",
        "jurisdiction_id",
        "operating_currency",
        "organization_id",
        "type",
      ].join(", "),
    );

  if (data) {
    const addressPayload = {
      legal_entity_id: data[0].id,
      label: "Primary Operating Address",
      line1: addressLine1,
      line2: addressLine2,
      city: city,
      state_province: stateProvince,
      postal_code: postalCode,
      country: country,
      lat: lat,
      lng: lng,
    };

    const { data: addressData, error: addressError } = await supabase
      .from("address")
      .insert(addressPayload)
      .select("id");
  }
  if (error) {
    throw error;
  }

  revalidatePath(`/${organizationId}`, "page");
}

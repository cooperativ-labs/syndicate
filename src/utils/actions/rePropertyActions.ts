"use server";

import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

import { RealEstatePropertyWithAddresses } from "@/types";
import { Database } from "@/types/database.types";

type RealEstateProperty =
  Database["public"]["Tables"]["real_estate_property"]["Row"];
type Address = Database["public"]["Tables"]["address"]["Row"];
type Image = Database["public"]["Tables"]["image"]["Row"];

// =========== RE PROPERTY ================

type GetRePropertyResult = {
  properties:
    & Pick<
      RealEstateProperty,
      | "id"
      | "property_type"
      | "investment_status"
      | "address_id"
      | "amenities_description"
      | "description"
      | "asset_value"
      | "asset_value_note"
      | "loan"
      | "down_payment"
      | "lender_fees"
      | "closing_costs"
      | "owner_id"
    >
    & {
      address?:
        | Pick<
          Address,
          | "id"
          | "label"
          | "line1"
          | "line2"
          | "line3"
          | "city"
          | "state_province"
          | "postal_code"
          | "country"
          | "lat"
          | "lng"
          | "legal_entity_id"
        >
        | null;
    };
}[];

export async function getReProperty(
  id: string,
): Promise<RealEstatePropertyWithAddresses | null> {
  const supabase = createClient();

  const { data: property, error } = await supabase
    .from("real_estate_property")
    .select(
      "id, property_type, investment_status, address_id, amenities_description, description, asset_value, asset_value_note, loan, down_payment, lender_fees, closing_costs, owner_id",
    )
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  if (!property) {
    return null;
  }

  // Fetch address if address_id exists
  let addressData = null;
  if (property.address_id) {
    const { data: address, error: addressError } = await supabase
      .from("address")
      .select(
        "id, label, line1, line2, line3, city, state_province, postal_code, country, lat, lng, legal_entity_id",
      )
      .eq("id", property.address_id)
      .single();

    if (!addressError && address) {
      addressData = address;
    }
  }

  return {
    ...property,
    addresses: [addressData] as Address[],
  };
}

export async function getRealEstateProperties(
  entityId: string,
): Promise<RealEstatePropertyWithAddresses[]> {
  const supabase = createClient();
  const { data: properties, error } = await supabase
    .from("real_estate_property")
    .select(
      [
        "*",
        "addresses:address(*)",
        "images:real_estate_property_image(*, image:image(*))",
      ].join(
        ", ",
      ),
    )
    .eq("owner_id", Number(entityId));
  if (error) {
    throw error;
  }
  return properties ?? [];
}

type AddRePropertyInfoParams = {
  entityId: string;
  propertyType: Database["public"]["Enums"]["real_estate_property_type"];
  investmentStatus: Database["public"]["Enums"]["asset_status"];
  amenitiesDescription?: string | null;
  description?: string | null;
  downPayment?: number | null;
  lenderFees?: number | null;
  closingCosts?: number | null;
};

type AddRePropertyInfoResult = {
  affectedCount: number;
  records: Pick<RealEstateProperty, "id" | "investment_status">[];
};

export async function addRePropertyInfo(
  params: AddRePropertyInfoParams,
): Promise<AddRePropertyInfoResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("real_estate_property")
    .insert(
      {
        owner_id: params.entityId,
        property_type: params.propertyType,
        investment_status: params.investmentStatus,
        amenities_description: params.amenitiesDescription ?? null,
        description: params.description ?? null,
        down_payment: params.downPayment ?? null,
        lender_fees: params.lenderFees ?? null,
        closing_costs: params.closingCosts ?? null,
      },
      { count: "exact" },
    )
    .select("id, investment_status");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddRePropertyInfoResult["records"],
  };
}

type UpdateRePropertyInfoParams = {
  rePropertyId: string;
  propertyType: Database["public"]["Enums"]["real_estate_property_type"];
  investmentStatus: Database["public"]["Enums"]["asset_status"];
  amenitiesDescription?: string | null;
  description?: string | null;
  assetValue?: number | null;
  assetValueNote?: string | null;
  downPayment?: number | null;
  lenderFees?: number | null;
  closingCosts?: number | null;
  loanAmount?: number | null;
};

type UpdateRePropertyInfoResult = {
  affectedCount: number;
  records: Pick<
    RealEstateProperty,
    | "id"
    | "investment_status"
    | "amenities_description"
    | "description"
    | "asset_value"
    | "asset_value_note"
    | "down_payment"
    | "lender_fees"
    | "closing_costs"
    | "loan"
    | "owner_id"
  >[];
};

export async function updateRePropertyInfo(
  params: UpdateRePropertyInfoParams,
): Promise<UpdateRePropertyInfoResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("real_estate_property")
    .update({
      property_type: params.propertyType,
      investment_status: params.investmentStatus,
      amenities_description: params.amenitiesDescription ?? null,
      description: params.description ?? null,
      asset_value: params.assetValue ?? null,
      asset_value_note: params.assetValueNote ?? null,
      down_payment: params.downPayment ?? null,
      lender_fees: params.lenderFees ?? null,
      closing_costs: params.closingCosts ?? null,
      loan: params.loanAmount ?? null,
    })
    .eq("id", params.rePropertyId)
    .select(
      "id, investment_status, amenities_description, description, asset_value, asset_value_note, down_payment, lender_fees, closing_costs, loan, owner_id",
    );

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as UpdateRePropertyInfoResult["records"],
  };
}

type RemoveEntityPropertyResult = {
  affectedCount: number;
  records: Pick<RealEstateProperty, "id">[];
};

export async function removeEntityProperty(
  propertyId: string,
): Promise<RemoveEntityPropertyResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("real_estate_property")
    .delete({ count: "exact" })
    .eq("id", propertyId)
    .select("id");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as RemoveEntityPropertyResult["records"],
  };
}

// =========== ADDRESS ================

type AddPropertyAddressParams = {
  propertyId: string;
  addressLabel?: string | null;
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  city: string;
  stateProvince?: string | null;
  postalCode?: string | null;
  country: string;
};

type AddPropertyAddressResult = {
  affectedCount: number;
  records: Pick<Address, "id" | "label" | "line1">[];
};

export async function addPropertyAddress(
  params: AddPropertyAddressParams,
): Promise<AddPropertyAddressResult> {
  const supabase = createClient();

  // First, fetch the property to get the owner_id (legal_entity_id)
  const { data: property, error: propertyError } = await supabase
    .from("real_estate_property")
    .select("owner_id")
    .eq("id", params.propertyId)
    .single();

  if (propertyError || !property) {
    throw propertyError || new Error("Property not found");
  }

  const { data, error, count } = await supabase
    .from("address")
    .insert(
      {
        label: params.addressLabel ?? null,
        line1: params.addressLine1,
        line2: params.addressLine2 ?? null,
        line3: params.addressLine3 ?? null,
        city: params.city,
        state_province: params.stateProvince ?? null,
        postal_code: params.postalCode ?? null,
        country: params.country,
        legal_entity_id: property.owner_id,
      },
      { count: "exact" },
    )
    .select("id, label, line1");

  if (error) {
    throw error;
  }

  // Update property's address_id if address was created successfully
  if (data && data.length > 0) {
    await supabase
      .from("real_estate_property")
      .update({ address_id: data[0].id })
      .eq("id", params.propertyId);
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddPropertyAddressResult["records"],
  };
}

type RemovePropertyAddressResult = {
  affectedCount: number;
  records: Pick<Address, "id">[];
};

export async function removePropertyAddress(
  geoAddressId: string,
): Promise<RemovePropertyAddressResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("address")
    .delete({ count: "exact" })
    .eq("id", geoAddressId)
    .select("id");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as RemovePropertyAddressResult["records"],
  };
}

// =========== IMAGE ================

type AddPropertyImageParams = {
  url: string;
  label?: string | null;
  fileId?: string | null;
};

type AddPropertyImageResult = {
  affectedCount: number;
  records: Pick<Image, "id" | "label" | "url" | "file_id">[];
};

export async function addPropertyImage(
  params: AddPropertyImageParams,
): Promise<AddPropertyImageResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("image")
    .insert(
      {
        url: params.url,
        label: params.label ?? null,
        file_id: params.fileId ?? null,
      },
      { count: "exact" },
    )
    .select("id, label, url, file_id");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as AddPropertyImageResult["records"],
  };
}

type RemovePropertyImageResult = {
  affectedCount: number;
  records: Pick<Image, "id">[];
};

export async function removePropertyImage(
  imageId: string,
): Promise<RemovePropertyImageResult> {
  const supabase = createClient();

  const { data, error, count } = await supabase
    .from("image")
    .delete({ count: "exact" })
    .eq("id", imageId)
    .select("id");

  if (error) {
    throw error;
  }

  return {
    affectedCount: typeof count === "number" ? count : (data?.length ?? 0),
    records: (data ?? []) as RemovePropertyImageResult["records"],
  };
}

"use server";
import { Address, RevalidationPath } from "@/types";
import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

type AddAddressParams = {
 city: string | null;
 country: string;
 label: string | null;
 lat: number | null;
 legal_entity_id: number;
 line1: string | null;
 line2?: string | null;
 line3?: string | null;
 lng: number | null;
 postal_code: string | null;
 state_province: string | null;
 revalidationPath?: RevalidationPath;
};
export async function addAddress({
 city,
 country,
 label,
 lat,
 legal_entity_id,
 line1,
 line2,
 line3,
 lng,
 postal_code,
 state_province,
 revalidationPath,
}: AddAddressParams): Promise<string | null> {
 const supabase = createClient();
 const { data, error } = await supabase.from("address").insert({
  city,
  country,
  label,
  lat,
  legal_entity_id,
  line1,
  line2,
  line3,
  lng,
  postal_code,
  state_province,
 }).select("id").single();
 if (error) throw error;

 if (revalidationPath) {
  revalidatePath(revalidationPath.path, revalidationPath.type);
 }
 return data.id;
}

type UpdateAddressParams = AddAddressParams & {
 id: string;
};

export async function updateAddress({
 id,
 label,
 line1,
 line2,
 line3,
 city,
 state_province,
 postal_code,
 country,
 lat,
 lng,
 revalidationPath,
}: UpdateAddressParams): Promise<void> {
 const supabase = createClient();
 const { data, error } = await supabase.from("address").update({
  label,
  line1,
  line2,
  line3,
  city,
  state_province,
  postal_code,
  country,
  lat,
  lng,
 }).eq("id", id);
 if (error) throw error;
 if (revalidationPath) {
  revalidatePath(revalidationPath.path, revalidationPath.type);
 }
}

"use server";
import { createClient } from "@supabase/utils/server";

export async function uploadFile({
 bucket,
 file,
 path,
}: {
 bucket: string;
 file: File;
 path: string;
}) {
 const supabase = createClient();

 if (!file) {
  throw new Error(`File is required, path: ${path}`);
 }
 const { data, error } = await supabase.storage.from(bucket).upload(
  `${path}`,
  file,
 );
 return { data, error };
}

export type StorageObject = {
 id: string;
 name: string;
 created_at: string;
 updated_at: string;
 metadata: any;
};

async function deleteFile({
 bucket,
 url,
 folderPath,
}: {
 bucket: string;
 url: string;
 folderPath: string;
}) {
 const fileName = url.split("/").pop();
 const path = `${folderPath}/${fileName}`;
 const supabase = createClient();
 const { data, error } = await supabase.storage.from(bucket).remove([path]);
 if (error) {
  throw new Error("Failed to delete image");
 }
 return data;
}

export async function getSignedUrl({
 bucket,
 path,
 source,
}: {
 bucket: string;
 path: string | null;
 source: string;
}) {
 const supabase = createClient();
 if (!path) {
  console.error("getSignedUrl Error", { path, source });
  return { data: null, error: new Error("Path is required") };
 }
 const { data, error } = await supabase.storage.from(bucket).createSignedUrl(
  path,
  60 * 60 * 24 * 30,
 );
 if (error) {
  console.error("getSignedUrl Error", { error, source });
 }
 return { data, error };
}

export async function getPublicUrl({
 bucket,
 path,
 source,
}: {
 bucket: string;
 path: string | null;
 source: string;
}) {
 const supabase = createClient();
 if (!path) {
  console.error("getPublicUrl Error", { path, source });
  return { data: null, error: new Error("Path is required") };
 }
 const { data } = supabase.storage.from(bucket).getPublicUrl(path);
 return { data: data.publicUrl, error: null };
}

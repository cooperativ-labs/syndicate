"use server";

import { createClient } from "@supabase/utils/server";
import { revalidatePath } from "next/cache";

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

export async function uploadFeedbackImage({
 file,
 feedbackId,
 fileName,
}: {
 file: FormData;
 feedbackId: string;
 fileName: string;
}) {
 const fileForUpload = file.get("image") as File;
 try {
  const response = await uploadFile({
   bucket: "feedback-images",
   file: fileForUpload,
   path: `${feedbackId}/${fileName}`,
  });
  return response.data;
 } catch (error) {
  console.error(error);
 }
 revalidatePath("/feedback", "page");
}

export async function getFeedbackImages(
 { feedbackId }: { feedbackId: string },
) {
 const supabase = createClient();
 const { data: imageList, error: imageListError } = await supabase.storage
  .from("feedback-images")
  .list(`${feedbackId}`);

 if (imageListError) {
  console.error("Error listing images:", imageListError);
  return [];
 }

 const imagePathList = imageList?.map((image: StorageObject) => {
  return `${feedbackId}/${image.name}`;
 });

 if (imagePathList.length < 1) return [];

 const { data, error } = await supabase.storage
  .from("feedback-images")
  .createSignedUrls(imagePathList, 3600);

 if (error) {
  console.error("Error getting images:", error);
  return [];
 }

 return data;
}

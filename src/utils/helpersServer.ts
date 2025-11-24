"use server";

import { DocumentFormat, DocumentFormatType } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const organizationChangeServer = async (id: string) => {
  // const cookieStore = await cookies();
  // cookieStore.set('CHOSEN_ORGANIZATION', id, {
  //   maxAge: 60 * 60 * 24 * 30 // 30 days
  // });
  redirect(`/manager/${id}/overview`);
};

export const setCookieApproval = async () => {
  const cookieStore = await cookies();
  cookieStore.set("user.analytics-approved", "approved", {});
};

export const getFileFormat = async (
  file: File,
): Promise<DocumentFormatType> => {
  const fileType = file.type;
  switch (fileType) {
    case "application/pdf":
      return DocumentFormat.PDF;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return DocumentFormat.WORD_DOC;
    case "text/markdown":
      return DocumentFormat.MARKDOWN;
    case "xls":
    case "xlsx":
      return DocumentFormat.EXCEL;
    default:
      return DocumentFormat.OTHER;
  }
};

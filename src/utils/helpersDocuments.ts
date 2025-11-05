import { Document, DocumentFormat, DocumentType } from "@/types";
import { Database } from "@/types/database.types";

export type urlToDatabaseProps = {
  url: string;
  fileId: string;
  title: string;
  docType: DocumentType | undefined;
  format: keyof typeof DocumentFormat | undefined;
};

// export type UrlToDatabase = (args: UrlToDatabaseArgs) => void;

export const getFileFormat = (file: File) => {
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

export const getDocumentsOfType = (
  documents: Document[] | undefined,
  type: Database["public"]["Enums"]["document_type"] | null,
) => {
  return documents?.filter((document) => document?.type === type);
};

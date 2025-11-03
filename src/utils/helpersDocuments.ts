import { Document, DocumentFormat, DocumentType, Maybe } from "@gql/graphql";

export type urlToDatabaseProps = {
  url: string;
  fileId: string;
  title: string;
  docType: DocumentType | undefined;
  format: DocumentFormat | undefined;
};

// export type UrlToDatabase = (args: UrlToDatabaseArgs) => void;

export const getFileFormat = (file: File) => {
  const fileType = file.type;
  switch (fileType) {
    case "application/pdf":
      return DocumentFormat.Pdf;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return DocumentFormat.WordDoc;
    case "text/markdown":
      return DocumentFormat.Markdown;
    case "xls":
    case "xlsx":
      return DocumentFormat.Excel;
    default:
      return DocumentFormat.Other;
  }
};

export const getDocumentsOfType = (
  documents: Document[] | undefined,
  type: DocumentType,
) => {
  return documents?.filter((document) => document?.type?.includes(type));
};

import { Document, DocumentFormat, DocumentType } from 'types';

export type urlToDatabaseProps = (url: string, title: string, docType: DocumentType, format: DocumentFormat) => void;

export const getFileFormat = (file: File) => {
  const fileType = file.type;
  switch (fileType) {
    case 'application/pdf':
      return DocumentFormat.Pdf;
    case 'application/msword' || 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return DocumentFormat.WordDoc;
    case 'text/markdown':
      return DocumentFormat.Markdown;
    case 'xls' || 'xlsx':
      return DocumentFormat.Excel;
    default:
      return DocumentFormat.Other;
  }
};

export const getDocumentsOfType = (documents: Document[], type: DocumentType) => {
  return documents.filter((document) => document.type.includes(type));
};

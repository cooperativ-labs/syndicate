import { removeOfferingDocument } from '@src/utils/actions/documentActions';
import { getDocFormatOption } from '@src/utils/enumConverters';
import { currentDate } from '@src/utils/graphQueries/gqlUtils';
import { File as FileIcon, FileSpreadsheet, FileText, Github, Play, Trash } from 'lucide-react';
import React, { FC } from 'react';

import { Document, Maybe } from '@/types';

const DocumentListItem: FC<{
  document: Maybe<Document>;
  offeringId: string | undefined;
  deleteButton?: boolean | undefined;
}> = ({ document, offeringId, deleteButton }) => {
  // const [deleteDocument, { error: deleteError }] = useMutation(REMOVE_OFFERING_DOCUMENT);

  const deleteDocument = async ({
    offeringId,
    documentId
  }: {
    offeringId: string;
    documentId: string;
  }) => {
    try {
      const response = await removeOfferingDocument({ offeringId, documentId });
      return response;
    } catch (error: any) {
      throw new Error('Error deleting document:', error);
    }
  };

  if (!document) return <></>;

  const { url, id, format, title, file_id } = document;

  const handleDelete = async () => {
    if (url?.includes('cooperativ-filestore.storage.googleapis')) {
      try {
        const response = await fetch(`/api/file/${file_id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const error = await response.text();
          if (error.includes('No such object')) {
            deleteDocument({
              variables: { currentDate: currentDate, offeringId: offeringId, documentId: id }
            });
          }
          throw new Error(error);
        }
        deleteDocument({
          variables: { currentDate: currentDate, offeringId: offeringId, documentId: id }
        });
      } catch (error: any) {
        throw new Error('Error details:', error);
      }
    } else {
      deleteDocument({
        variables: { currentDate: currentDate, offeringId: offeringId, documentId: id }
      });
    }
  };

  return (
    <div
      data-test="component-document-chip"
      className="bg-white flex my-2 p-1 max-h-16 items-center w-full rounded-xl justify-between shadow-lg border-2 border-gray-100"
    >
      <a
        href={url as string}
        target="_blank"
        rel="noreferrer"
        className="flex items-center shrink-0"
      >
        <div className="ml-2 w-10 h-10 text-3xl text-blue-900">
          {(() => {
            const iconName = getDocFormatOption(format)?.icon;
            switch (iconName) {
              case 'file-pdf':
                return <FileText />;
              case 'file-excel':
                return <FileSpreadsheet />;
              case 'file-alt':
                return <FileText />;
              case 'file-powerpoint':
                return <FileText />;
              case 'file-word':
                return <FileText />;
              case 'play':
                return <Play />;
              case 'github':
                return <Github />;
              default:
                return <FileIcon />;
            }
          })()}
        </div>
        <div className="d-block">
          <h1 className="font-bold text-sm truncate w:42  ">{title}</h1>
          <h2 className="text-gray-500 text-xs font-bold">
            {getDocFormatOption(format)?.subtitle}
          </h2>
        </div>
      </a>
      {deleteButton && (
        <button aria-label="delete-document" onClick={handleDelete}>
          <Trash className="text-lg text-gray-600 mr-2" />
        </button>
      )}
    </div>
  );
};

export default DocumentListItem;

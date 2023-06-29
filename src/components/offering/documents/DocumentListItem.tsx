import React, { FC } from 'react';
import { currentDate } from '@src/utils/dGraphQueries/gqlUtils';
import { Document, Maybe } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDocFormatOption } from '@src/utils/enumConverters';
import { IconName } from '@fortawesome/free-solid-svg-icons';
import { REMOVE_OFFERING_DOCUMENT } from '@src/utils/dGraphQueries/document';
import { useMutation } from '@apollo/client';

const DocumentListItem: FC<{
  document: Maybe<Document>;
  offeringId: string | undefined;
  deleteButton?: boolean | undefined;
}> = ({ document, offeringId, deleteButton }) => {
  const [deleteDocument, { error: deleteError }] = useMutation(REMOVE_OFFERING_DOCUMENT);

  if (!document) return <></>;

  const { url, id, fileId, format, title } = document;

  if (deleteError) {
    alert(`from Cloud Storage: ${deleteError}`);
  }
  const handleDelete = async () => {
    if (url?.includes('cooperativ-filestore.storage.googleapis')) {
      try {
        const response = await fetch(`/api/file/${fileId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const error = await response.text();
          if (error.includes('No such object')) {
            deleteDocument({
              variables: { currentDate: currentDate, offeringId: offeringId, documentId: id },
            });
          }
          throw new Error(error);
        }
        deleteDocument({ variables: { currentDate: currentDate, offeringId: offeringId, documentId: id } });
      } catch (error: any) {
        throw new Error('Error details:', error);
      }
    } else {
      deleteDocument({ variables: { currentDate: currentDate, offeringId: offeringId, documentId: id } });
    }
  };

  return (
    <div
      data-test="component-document-chip"
      className="bg-white flex my-2 p-1 max-h-16 items-center w-full rounded-xl justify-between shadow-lg border-2 border-gray-100"
    >
      <a href={url as string} target="_blank" rel="noreferrer" className="flex items-center flex-shrink-0">
        <div className="ml-2 w-10 h-10 text-3xl text-blue-900">
          <FontAwesomeIcon icon={`${getDocFormatOption(format)?.icon}` as IconName} />
        </div>
        <div className="d-block">
          <h1 className="font-bold text-sm truncate w:42  ">{title}</h1>
          <h2 className="text-gray-500 text-xs font-bold">{getDocFormatOption(format)?.subtitle}</h2>
        </div>
      </a>
      {deleteButton && (
        <button aria-label="delete-document" onClick={handleDelete}>
          <FontAwesomeIcon icon="trash" className="text-lg text-gray-600 mr-2" />
        </button>
      )}
    </div>
  );
};

export default DocumentListItem;

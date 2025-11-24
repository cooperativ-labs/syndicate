import { removeOfferingDocument } from '@src/utils/actions/documentActions';
import { getDocFormatOption } from '@src/utils/enumConverters';
import { File as FileIcon, FileSpreadsheet, FileText, Github, Play, Trash } from 'lucide-react';
import React, { FC } from 'react';

import { Document } from '@/types';

const DocumentListItem: FC<{
  document: Document;
  offeringId?: string;
  deleteButton?: boolean | undefined;
}> = ({ document, offeringId, deleteButton }) => {
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
    if (!offeringId) return;
    if (url?.includes('cooperativ-filestore.storage.googleapis')) {
      try {
        const response = await fetch(`/api/file/${file_id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const error = await response.text();
          if (error.includes('No such object')) {
            deleteDocument({ offeringId: offeringId, documentId: id });
          }
          throw new Error(error);
        }
        deleteDocument({ offeringId: offeringId, documentId: id });
      } catch (error: any) {
        throw new Error('Error details:', error);
      }
    } else {
      deleteDocument({ offeringId: offeringId, documentId: id });
    }
  };

  return (
    <div
      data-test='component-document-item'
      className='bg-white flex my-2 p-1 max-h-16 items-center w-full rounded-xl justify-between shadow-lg border-2 border-gray-100 '
    >
      <a
        href={url as string}
        target='_blank'
        rel='noreferrer'
        className='flex items-center shrink-0'
      >
        <div className='px-2  text-blue-900'>
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
        <div className='d-block'>
          <h1 className='font-bold text-sm w-42 truncate'>{title}</h1>
          <h2 className='text-gray-500 text-xs font-bold'>
            {getDocFormatOption(format)?.subtitle}
          </h2>
        </div>
      </a>

      {deleteButton && offeringId && (
        <button aria-label='delete-document' onClick={handleDelete}>
          <Trash size={20} className=' text-gray-600 mr-2' />
        </button>
      )}
    </div>
  );
};

export default DocumentListItem;

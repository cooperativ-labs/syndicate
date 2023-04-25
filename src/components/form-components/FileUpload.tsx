import cn from 'classnames';
import Compressor from 'compressorjs';
import DeleteButton from '../buttons/DeleteButton';
import React, { FC, useState } from 'react';
import { DocumentType } from 'types';
import { FileUploader } from 'react-drag-drop-files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFileFormat, urlToDatabaseProps } from '@src/utils/helpersDocuments';
import { IconName } from '@fortawesome/fontawesome-svg-core';

type FileUploadProps = {
  uploaderText: string;
  baseUploadUrl?: string;
  docType?: DocumentType;
  accept: string[];
  allowMultiple?: boolean;
  imagePreview?: string;
  className?: string;
  setImagePreview?: (image: string) => void;
  urlToDatabase: urlToDatabaseProps;
};

const FileUpload: FC<FileUploadProps> = ({
  uploaderText,
  baseUploadUrl,
  docType,
  accept,
  allowMultiple,
  imagePreview,
  className,
  setImagePreview,
  urlToDatabase,
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  function handleUploadFile(file) {
    const onUploadSuccess = (url: string, fileId: string) => {
      urlToDatabase(url, fileId, file.name, docType, getFileFormat(file));
      setProgressAmt(0);
      setUploading(false);
    };

    const uploadFile = async (file) => {
      if (!file) {
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append(`file`, file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Failed to upload file. Status: ${response.status}, Status Text: ${response.statusText}`);
        }

        const data = await response.json();
        onUploadSuccess?.(data.url, data.fileId);
      } catch (error) {
        throw new Error('Error details:', error);
      }
    };

    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      new Compressor(file, {
        quality: 0.6,
        convertTypes: ['image/png'],
        convertSize: 300000,
        success(result) {
          // console.log('Compressed file size (in bytes): ', result.size);
          uploadFile(result as File);
        },
        error(err) {
          alert(err.message);
        },
      });
    } else {
      uploadFile(file);
    }
  }

  return (
    <div className="flex flex-col">
      {imagePreview ? (
        <div className="relative">
          <div className="absolute -right-2 -top-2">
            <DeleteButton onDelete={() => setImagePreview('')} />
          </div>
          <img className="h-40 object-scale-down" src={imagePreview} />
        </div>
      ) : (
        <FileUploader multiple={allowMultiple} handleChange={handleUploadFile} name="file" types={accept}>
          <div
            className={cn(
              className
                ? className
                : 'flex p-3 mt-1 bg-gray-100  h-24 items-center justify-center rounded-md border-2 border-dashed border-cLightBlue border-opacity-40'
            )}
          >
            <FontAwesomeIcon icon={'arrow-up-from-bracket' as IconName} className="text-3xl text-gray-600 mr-4" />
            <div>
              <div className="text-gray-700 text-bold text-lg uppercase">{uploaderText}</div>
              <div className="text-sm mt-1 "> Drag and drop or click to upload</div>
              {uploading && <progress className="mt-1" value={progressAmt} max="100" />}
            </div>
          </div>
        </FileUploader>
      )}
    </div>
  );
};

export default FileUpload;

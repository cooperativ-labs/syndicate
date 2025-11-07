'use client';

import { getFileFormat, urlToDatabaseProps } from '@src/utils/helpersDocuments';
import { createClient } from '@supabase/utils/client';
import Compressor from 'compressorjs';
import { FC, useState } from 'react';

import { DocumentType } from '@/types';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../ui/drag_and_drop';

type FileUploadProps = {
  uploaderText: string;
  url: string;
  bucket: string;
  docType?: DocumentType | undefined;
  accept: string[];
  allowMultiple?: boolean;
  imagePreview?: string;
  className?: string;
  setImagePreview?: (image: string) => void;
  urlToDatabase: ({ url, fileId, title, docType, format }: urlToDatabaseProps) => void;
};

const FileUpload: FC<FileUploadProps> = ({
  uploaderText,
  url,
  bucket,
  docType,
  accept,
  allowMultiple,
  imagePreview,
  className,
  setImagePreview,
  urlToDatabase
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  async function handleUploadFile(file: File) {
    const onUploadSuccess = (url: string, fileId: string) => {
      urlToDatabase({ url, fileId, title: file.name, docType, format: getFileFormat(file) });
      setProgressAmt(0);
      setUploading(false);
    };

    const uploadFile = async (file: File) => {
      if (!file) {
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append(`file`, file);

      try {
        const supabase = createClient();
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(`${url}/${file.name}`, file);

        if (error) {
          throw new Error(`Failed to upload file. Error: ${error.message}`);
        }

        onUploadSuccess?.(data.path, data.id);
      } catch (error: any) {
        throw new Error('Error details:', error);
      }
    };

    if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
      new Compressor(file, {
        quality: 0.6,
        convertTypes: ['image/png'],
        convertSize: 300000,
        success(result) {
          uploadFile(result as File);
        },
        error(err) {
          alert(err.message);
        }
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
            {setImagePreview && <DeleteButton onDelete={() => setImagePreview('')} />}
          </div>
          <img className="h-40 object-scale-down" src={imagePreview} />
        </div>
      ) : (
        // <FileUploader
        //   multiple={allowMultiple}
        //   handleChange={handleUploadFile}
        //   name="file"
        //   types={accept}
        // >
        //   <div
        //     className={cn(
        //       className
        //         ? className
        //         : 'flex p-3 mt-1 bg-gray-100  h-24 items-center justify-center rounded-md border-2 border-dashed border-cLightBlue border-opacity-40'
        //     )}
        //   >
        //     <UploadCloud className="text-3xl text-gray-600 mr-4" />
        //     <div>
        //       <div className="text-gray-700 text-bold text-lg uppercase">{uploaderText}</div>
        //       <div className="text-sm mt-1 "> Drag and drop or click to upload</div>
        //       {uploading && <progress className="mt-1" value={progressAmt} max="100" />}
        //     </div>
        //   </div>
        // </FileUploader>
        <DragAndDrop
          onUpload={handleUploadFile}
          uploadButtonText={uploaderText}
          acceptedFileTypes={accept.join(', ')}
          acceptedMimeTypes={accept}
          title="Drag and drop or click to upload"
          description={`${accept.join(', ')} files only.`}
          progressAmt={progressAmt}
        />
      )}
    </div>
  );
};

export default FileUpload;

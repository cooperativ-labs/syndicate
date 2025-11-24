'use client';

import { Upload } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../DndFiles';
import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';

type FileUploadProps = {
  uploaderText: string;
  accept?: string[];
  acceptedMimeTypes?: string[];
  allowMultiple?: boolean;
  imagePreview?: string;
  className?: string;
  onSubmit: (files: File[]) => Promise<void>;
  setImagePreview?: (image: string) => void;
  setIsSelected?: React.Dispatch<React.SetStateAction<boolean>>;
};

const FileUpload: FC<FileUploadProps> = ({
  setIsSelected,
  uploaderText,
  accept = ['.pdf', '.doc', '.docx', '.txt', '.md', '.csv', '.xls', '.xlsx', '.ppt', '.pptx'],
  acceptedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'text/markdown',
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  ],
  imagePreview,
  className,
  setImagePreview,
  onSubmit
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadButtonState, setUploadButtonState] = useState<ButtonLoadingState>('default');

  async function handleUploadFile(files: File[]) {
    setUploadButtonState('loading');
    try {
      await onSubmit(files);
      setUploadButtonState('success');
    } catch (error) {
      toast.error(`Failed to upload file. Error: ${error}`);
      setUploadButtonState('error');
    }
  }

  const handleOnSelect = async (file: File | null) => {
    if (file) {
      setSelectedFiles([...selectedFiles, file]);
      setIsSelected?.(true);
    } else {
      setIsSelected?.(false);
    }
  };

  const onClear = () => {
    setSelectedFiles([]);
    setIsSelected?.(false);
  };

  return (
    <div className='flex flex-col gap-2'>
      {imagePreview ? (
        <div className='relative'>
          <div className='absolute -right-2 -top-2'>
            {setImagePreview && <DeleteButton onDelete={() => setImagePreview('')} />}
          </div>
          <img className='h-40 object-scale-down' src={imagePreview} />
        </div>
      ) : (
        <DragAndDrop
          multiple={false}
          acceptedFileTypes={accept}
          acceptedMimeTypes={acceptedMimeTypes}
          title='Drag and drop or click'
          description='Chose a file to upload.'
          progressAmt={progressAmt}
          onSelect={handleOnSelect}
          onClear={onClear}
        />
      )}
      {selectedFiles.length > 0 && (
        <div className='flex justify-end w-full'>
          <LoadingButton
            buttonState={uploadButtonState}
            onClick={() => handleUploadFile(selectedFiles)}
            className='w-full'
            text={
              <span className='flex items-center gap-2'>
                <Upload className='h-4 w-4' />
                {uploaderText}
              </span>
            }
            loadingText='Uploading...'
            successText='Uploaded!'
            errorText='Upload failed'
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;

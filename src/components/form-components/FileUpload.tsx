'use client';

import { Upload } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../DndFiles';
import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';

type FileUploadProps = {
  uploaderText: string;
  accept: string[];
  allowMultiple?: boolean;
  imagePreview?: string;
  className?: string;
  setImagePreview?: (image: string) => void;
  onSubmit: (file: File) => Promise<void>;
};

const FileUpload: FC<FileUploadProps> = ({
  uploaderText,
  accept,
  imagePreview,
  className,
  setImagePreview,
  onSubmit
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadButtonState, setUploadButtonState] = useState<ButtonLoadingState>('default');

  async function handleUploadFile(file: File) {
    setUploading(true);
    console.log(file);
    try {
      await onSubmit(file);
      setUploading(false);
    } catch (error) {
      toast.error(`Failed to upload file. Error: ${error}`);
      setUploading(false);
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
        <DragAndDrop
          setSelectedFile={setSelectedFile}
          selectedFile={selectedFile}
          uploadButtonText={uploaderText}
          acceptedFileTypes={accept.join(', ')}
          acceptedMimeTypes={accept}
          title="Drag and drop or click"
          description="Chose a file to upload."
          progressAmt={progressAmt}
        />
      )}
      {selectedFile && (
        <div className="flex justify-end w-full">
          <LoadingButton
            buttonState={uploadButtonState}
            onClick={() => handleUploadFile(selectedFile)}
            className="gap-2"
            text={
              <span className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {uploaderText}
              </span>
            }
            loadingText="Uploading..."
            successText="Uploaded!"
            errorText="Upload failed"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;

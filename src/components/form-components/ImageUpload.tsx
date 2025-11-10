'use client';

import { FC, useEffect, useState } from 'react';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../ui/drag_and_drop';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';
import Image from 'next/image';

type ImageUploadProps = {
  uploaderText: string;
  accept: string[];
  allowMultiple?: boolean;
  className?: string;
  onSubmit: (file: File) => Promise<void>;
};

const ImageUpload: FC<ImageUploadProps> = ({
  uploaderText,
  accept,
  className,
  allowMultiple,
  onSubmit
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadButtonState, setUploadButtonState] = useState<ButtonLoadingState>('default');

  // console.log('imagePreview', imagePreview);

  // useEffect(() => {
  //   if (selectedFile) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(selectedFile);
  //   } else {
  //     setImagePreview(null);
  //   }
  // }, [selectedFile]);

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
      {/* {imagePreview ? (
        <div className="relative">
          <div className="absolute -right-2 -top-2">
            {setImagePreview && <DeleteButton onDelete={() => setImagePreview('')} />}
          </div>
          <Image
            className="h-40 object-scale-down"
            src={imagePreview}
            alt="Image Preview"
            width={160}
            height={160}
          />
        </div>
      ) : ( */}
      <DragAndDrop
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        multiple={allowMultiple}
        uploadButtonText={uploaderText}
        acceptedFileTypes={accept.join(', ')}
        acceptedMimeTypes={accept}
        title="Drag and drop or click"
        description="Chose a file to upload."
        progressAmt={progressAmt}
      />
      {/* )} */}
    </div>
  );
};

export default ImageUpload;

'use client';

import { FC, useEffect, useState } from 'react';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../ui/drag_and_drop';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { ButtonLoadingState, LoadingButton } from '../ui/loading-button';
import Image from 'next/image';
import { fileToImageUrl } from '@src/utils/helpersDocuments';

type ImageUploadProps = {
  uploaderText: string;
  accept: string[];
  allowMultiple?: boolean;
  className?: string;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (imageUrl: string | null) => void;
  onSubmit: (file: File) => Promise<void>;
};

const ImageUpload: FC<ImageUploadProps> = ({
  uploaderText,
  accept,
  className,
  allowMultiple,
  selectedImageUrl,
  setSelectedImageUrl,
  onSubmit
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [uploadButtonState, setUploadButtonState] = useState<ButtonLoadingState>('default');

  async function handleUploadFile(file: File | null) {
    if (!file) {
      return;
    }
    await onSubmit(file);
  }

  return (
    <div className="flex flex-col">
      <DragAndDrop
        onSelect={handleUploadFile}
        selectedImageUrl={selectedImageUrl}
        setSelectedImageUrl={setSelectedImageUrl}
        multiple={allowMultiple}
        uploadButtonText={uploaderText}
        acceptedFileTypes={accept.join(', ')}
        acceptedMimeTypes={accept}
        title="Drag and drop or click"
        description="Chose a file to upload."
        progressAmt={progressAmt}
      />
    </div>
  );
};

export default ImageUpload;

'use client';

import {
  fileToImageUrl,
  handleImageCompression,
  validateFileSize
} from '@src/utils/helpersDocuments';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';
import { toast } from 'sonner';

import DeleteButton from '../buttons/DeleteButton';
import DragAndDrop from '../DndFiles';
import { cn } from '@src/lib/utils';

type ImageUploadProps = {
  accept: string[];
  title?: string;
  description?: string;
  allowMultiple?: boolean;
  classNames?: string;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (imageUrl: string | null) => void;
  onSubmit: (file: File) => Promise<void>;
  onDelete: () => Promise<void>;
};

const ImageUpload: FC<ImageUploadProps> = ({
  accept,
  title = 'Drag and drop or click',
  description = 'Chose a file to upload.',
  allowMultiple,
  selectedImageUrl,
  setSelectedImageUrl,
  onSubmit,
  onDelete,
  classNames
}) => {
  const [progressAmt, setProgressAmt] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleImageProcessing = async (file: File) => {
    setIsProcessing(true);
    try {
      const compressedFile = await handleImageCompression(file);
      if (!compressedFile) {
        toast.error('Failed to compress file');
        return;
      }
      const sizeValidation = validateFileSize(compressedFile, false);
      if (!sizeValidation.isValid) {
        toast.error(sizeValidation.errorMessage || 'File too large');
        return;
      }

      setSelectedImageUrl(await fileToImageUrl(compressedFile));
      return compressedFile;
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error(
        `${error instanceof Error ? error.message : 'Failed to process file. Please try again.'}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  async function handleUploadFile(file: File | null) {
    if (!file) {
      return;
    }
    const compressedFile = await handleImageProcessing(file);
    if (compressedFile) {
      await onSubmit(compressedFile);
    }
  }

  return (
    <div className={cn('flex flex-col', classNames)}>
      {isProcessing ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="size-6 animate-spin" />
        </div>
      ) : selectedImageUrl ? (
        <div className="relative">
          <div className="absolute -right-2 -top-2">
            <DeleteButton onDelete={onDelete} />
          </div>
          <img className="h-40 object-scale-down" src={selectedImageUrl} />
        </div>
      ) : (
        <DragAndDrop
          onSelect={handleUploadFile}
          setSelectedImageUrl={setSelectedImageUrl}
          multiple={allowMultiple}
          isImage={true}
          acceptedFileTypes={accept.join(', ')}
          acceptedMimeTypes={accept}
          title={title}
          description={description}
          progressAmt={progressAmt}
        />
      )}
    </div>
  );
};

export default ImageUpload;

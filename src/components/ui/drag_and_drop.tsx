'use client';

import { Button } from '@src/components/ui/button';
import { Input } from '@src/components/ui/input';
import { cn } from '@src/lib/utils';
import { fileToImageUrl, getIsImage, handleImageCompression } from '@src/utils/helpersDocuments';
import { validateFileSize } from '@src/utils/helpersDocuments';
import { FileText, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface DragAndDropProps {
  acceptedFileTypes?: string;
  acceptedMimeTypes?: string[];
  title?: string;
  description?: string;
  uploadButtonText?: string;
  className?: string;
  progressAmt?: number;
  multiple?: boolean;
  onSelect: (file: File | null) => Promise<void>;
  selectedImageUrl: string | null;
  setSelectedImageUrl: (imageUrl: string | null) => void;
}

export default function DragAndDrop({
  acceptedFileTypes = '.csv,text/csv',
  acceptedMimeTypes = ['text/csv'],
  title = 'Choose or drag and drop a file',
  description = 'Files only.',
  uploadButtonText = 'Upload File',
  className,
  progressAmt = 0,
  multiple = false,
  onSelect
  // selectedImageUrl,
  // setSelectedImageUrl
}: DragAndDropProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const handleFileButtonClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (fileInputRef.current !== null) {
      fileInputRef.current.click();
    }
  };

  const validateFile = (file: File): boolean => {
    return acceptedMimeTypes.includes(file.type);
  };

  const createImagePreview = async (file: File) => {
    if (!getIsImage(file)) {
      setSelectedImageUrl(null);
      return;
    }
    const imageUrl = await fileToImageUrl(file);
    setSelectedImageUrl(imageUrl);
  };

  const handleImageProcessing = async (file: File) => {
    console.log('handleImageProcessing', file);
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
      createImagePreview(compressedFile);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing image:', error);
      toast.error(
        `${error instanceof Error ? error.message : 'Failed to upload file. Please try again.'}`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      try {
        if (getIsImage(file)) {
          const compressedFile = await handleImageProcessing(file);
          if (compressedFile) {
            onSelect(compressedFile);
          }
        } else {
          onSelect(file);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(
          `${error instanceof Error ? error.message : 'Failed to upload file. Please try again.'}`
        );
      }
    } else {
      toast.error(`Please select a valid file type: ${acceptedMimeTypes.join(', ')}`);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    const file = files[0];
    if (file && validateFile(file)) {
      if (getIsImage(file)) {
        const compressedFile = await handleImageProcessing(file);
        if (compressedFile) {
          onSelect(compressedFile);
        }
      } else {
        onSelect(file);
      }
    } else {
      toast.error(`Please drop a valid file type: ${acceptedMimeTypes.join(', ')}`);
    }
  };

  const clearSelectedFile = () => {
    onSelect(null);
    setSelectedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const imageUploadDisplay = (selectedFile: File) => {
    if (selectedImageUrl) {
      return (
        <div className="relative flex flex-col items-center justify-center gap-3">
          <img
            className="h-40 w-auto max-w-full object-contain rounded"
            src={selectedImageUrl}
            alt={selectedFile.name}
          />
          <div className="flex items-center justify-center gap-3 w-full">
            <div className="flex flex-col items-center text-center">
              <span className="font-medium text-green-800">{selectedFile.name}</span>
              <span className="text-sm text-green-600">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation();
                clearSelectedFile();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  const fileUploadDisplay = ({ fileName, fileSize }: { fileName: string; fileSize: number }) => {
    return (
      <div className="flex items-center justify-center gap-3">
        <FileText className="h-8 w-8 text-green-600" />
        <div className="flex flex-col items-start text-left">
          <span className="font-medium text-green-800">{fileName}</span>
          <span className="text-sm text-green-600">{fileSize} KB</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={e => {
            e.stopPropagation();
            clearSelectedFile();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Input
        type="file"
        multiple={multiple}
        ref={fileInputRef}
        accept={acceptedFileTypes}
        className="hidden"
        onChange={handleFileChange}
      />

      <div
        className={cn(
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer',
          isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
          selectedFile && 'border-green-500 bg-green-50'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={e => handleFileButtonClick(e)}
      >
        {selectedFile ? (
          getIsImage(selectedFile) && selectedImageUrl ? (
            imageUploadDisplay(selectedFile)
          ) : (
            fileUploadDisplay({ fileName: selectedFile.name, fileSize: selectedFile.size / 1024 })
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="space-y-2 flex items-center gap-4 ">
              <Upload className="h-10 w-10 mx-auto pt-1 text-muted-foreground" />
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            {/* {uploadButtonState === 'loading' && ( */}
            <progress className="mt-1" value={progressAmt} max="100" />
            {/* )} */}
          </div>
        )}
      </div>

      {/* Upload button */}
    </div>
  );
}

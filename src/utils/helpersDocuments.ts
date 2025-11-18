"use client";

import imageCompression from "browser-image-compression";

import {
  Document,
  DocumentFormat,
  DocumentFormatType,
  DocumentType,
} from "@/types";

// File size limits
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_VIDEO_SIZE_MB = 50; // 50MB limit for videos

// Supported file types
export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const SUPPORTED_VIDEO_TYPES = [
  "video/mp4",
  "video/mov",
  "video/avi",
  "video/webm",
  "video/mkv",
  "video/m4v",
];

export const getFileFormat = (file: File): DocumentFormatType => {
  const fileType = file.type;
  switch (fileType) {
    case "application/pdf":
      return DocumentFormat.PDF;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return DocumentFormat.WORD_DOC;
    case "text/markdown":
      return DocumentFormat.MARKDOWN;
    case "xls":
    case "xlsx":
      return DocumentFormat.EXCEL;
    default:
      return DocumentFormat.OTHER;
  }
};

export const getDocumentsOfType = (
  documents: Document[] | undefined,
  type: string | null,
) => {
  if (!documents) return [];
  return documents.filter((document) => document?.type === type);
};

export const getIsImage = (file: File): boolean => {
  return file?.type?.startsWith("image/");
};

export const handleImageCompression = async (
  imageFile: File,
): Promise<File | undefined> => {
  const options = {
    maxSizeMB: MAX_IMAGE_SIZE_MB,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error("Image compression error details:", {
      error,
      errorMessage: error instanceof Error ? error.message : "Unknown error",
      errorStack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }
};

export const fileToImageUrl = (file: File): Promise<string> => {
  if (!file) return Promise.resolve("");
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };

    reader.onerror = () => {
      console.error("FileReader error:", {
        error: reader.error,
        errorCode: reader.error?.name,
        errorMessage: reader.error?.message,
        fileDetails: {
          name: file.name,
          type: file.type,
          size: file.size,
          lastModified: file.lastModified,
        },
      });
      reject(
        new Error(
          `Failed to read file: ${reader.error?.message || "Unknown error"}`,
        ),
      );
    };

    reader.readAsDataURL(file);
  });
};

export const fileToVideoUrl = (file: File): Promise<string> => {
  if (!file) return Promise.resolve("");
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const validateFileSize = (
  file: File,
  isVideo: boolean = false,
): { isValid: boolean; errorMessage?: string } => {
  const maxSizeMB = isVideo ? MAX_VIDEO_SIZE_MB : MAX_IMAGE_SIZE_MB;
  const fileSizeMB = file.size / (1024 * 1024);

  if (fileSizeMB > maxSizeMB) {
    return {
      isValid: false,
      errorMessage: `File size (${
        fileSizeMB.toFixed(
          1,
        )
      }MB) exceeds the maximum limit of ${maxSizeMB}MB for ${
        isVideo ? "videos" : "images"
      }.`,
    };
  }

  return { isValid: true };
};

export const validateFileType = (
  file: File,
): { isValid: boolean; isVideo: boolean; errorMessage?: string } => {
  const isImage = SUPPORTED_IMAGE_TYPES.includes(file.type);
  const isVideo = SUPPORTED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return {
      isValid: false,
      isVideo: false,
      errorMessage:
        `Unsupported file type: ${file.type}. Please upload an image (JPEG, PNG, GIF, WebP) or video (MP4, MOV, AVI, WebM, MKV, M4V).`,
    };
  }

  return { isValid: true, isVideo };
};

export const getMediaDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      resolve(video.duration);
    };

    video.onerror = () => {
      reject(new Error("Failed to load video metadata"));
    };

    video.src = URL.createObjectURL(file);
  });
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

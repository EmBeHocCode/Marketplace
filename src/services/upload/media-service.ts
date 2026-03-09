import { acceptedImageMimeTypes, maxUploadSizeInBytes } from "@/constants/media";
import type { MediaAsset } from "@/types/domain";

export function validateFileType(fileType: string) {
  return acceptedImageMimeTypes.includes(fileType);
}

export function validateFileSize(size: number) {
  return size <= maxUploadSizeInBytes;
}

export function generateAltText(fileName: string, usageType: string) {
  return `${usageType.toLowerCase()} ${fileName.replace(/\.[^.]+$/, "")}`;
}

export function uploadFileMock(asset: Omit<MediaAsset, "id" | "createdAt" | "altText">) {
  return {
    id: `media-${Date.now()}`,
    createdAt: new Date().toISOString(),
    altText: generateAltText(asset.fileName, asset.usageType),
    ...asset
  } satisfies MediaAsset;
}

export function deleteFileMock(fileUrl: string) {
  return {
    success: true,
    fileUrl
  };
}

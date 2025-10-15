import { useState, useMemo } from "react";
import type { UploadedFile, UploadContext } from "@/components/InlineUploadButton";

export function useUploads() {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);

  const handleUpload = (files: UploadedFile[]) => {
    console.log("[UPLOAD] handleUpload received:", files.length);
    setUploads(prev => [...files, ...prev]);
  };

  const filesFor = (petId: string, context?: UploadContext) =>
    uploads.filter((u) => u.petId === petId && (!context || u.context === context));

  return useMemo(
    () => ({ uploads, handleUpload, filesFor, setUploads }),
    [uploads]
  );
}

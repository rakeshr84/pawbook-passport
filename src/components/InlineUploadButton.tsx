import React from "react";

export type UploadContext =
  | "documents" | "medical-records" | "vaccination" | "treatment" | "exam" | "pre-travel" | "signature";

export interface UploadedFile {
  id: string;
  petId: string;
  context: UploadContext;
  name: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
}

export function InlineUploadButton({
  label,
  petId,
  context,
  accept = "application/pdf,image/*",
  capture,
  multiple = true,
  onUpload,
  className = "",
  debugTag,
}: {
  label: string;
  petId: string;
  context: UploadContext;
  accept?: string;
  capture?: "environment" | "user";
  multiple?: boolean;
  onUpload: (files: UploadedFile[]) => void;
  className?: string;
  debugTag?: string;
}) {
  return (
    <label
      className={
        "relative inline-flex items-center justify-center " +
        "px-6 h-12 rounded-2xl bg-white border border-gray-200 text-gray-800 font-light " +
        "hover:shadow-md active:translate-y-px transition-all " +
        "cursor-pointer select-none " +
        "z-20 " + // lift above stray overlays
        className
      }
      data-upload-debug={debugTag}
    >
      {label}
      {/* This input covers the entire button surface and triggers the picker natively */}
      <input
        type="file"
        accept={accept}
        {...(capture ? { capture } : {})}
        multiple={multiple}
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => {
          const list = e.target.files;
          if (!list || !list.length) return;
          const out: UploadedFile[] = Array.from(list).map((f) => ({
            id: crypto.randomUUID(),
            petId,
            context,
            name: f.name,
            mime: f.type || "application/octet-stream",
            size: f.size,
            url: URL.createObjectURL(f),
            createdAt: new Date().toISOString(),
          }));
          onUpload(out);
          (e.currentTarget as HTMLInputElement).value = ""; // allow same file again
        }}
      />
    </label>
  );
}

import React, { useRef } from "react";

export type UploadContext =
  | "documents"
  | "medical-records"
  | "vaccination"
  | "treatment"
  | "exam"
  | "pre-travel";

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

export function UniversalUploadButton({
  label,
  petId,
  context,
  onUpload,
  accept = "application/pdf,image/*",
  capture,
  multiple = true,
  className = "",
  debugTag,
  disabled = false,
}: {
  label: string;
  petId?: string;
  context: UploadContext;
  onUpload: (files: UploadedFile[]) => void;
  accept?: string;
  capture?: "environment" | "user";
  multiple?: boolean;
  className?: string;
  debugTag?: string;
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[UPLOAD] Button clicked", { label, context, debugTag, petId });
    
    if (disabled) {
      console.warn("[UPLOAD] Disabled click", { label, context, debugTag });
      return;
    }
    if (!petId) {
      console.warn("[UPLOAD] No petId provided", { label, context, debugTag });
    }
    inputRef.current?.click();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list || !list.length) {
      console.log("[UPLOAD] Picker closed (no files)", { label, context, debugTag });
      return;
    }
    const out: UploadedFile[] = Array.from(list).map((f) => ({
      id: crypto.randomUUID(),
      petId: petId ?? "__MISSING_PET__",
      context,
      name: f.name,
      mime: f.type || "application/octet-stream",
      size: f.size,
      url: URL.createObjectURL(f),
      createdAt: new Date().toISOString(),
    }));
    console.log("[UPLOAD] Picked", {
      label,
      context,
      debugTag,
      count: out.length,
      types: out.map(x => x.mime),
    });
    onUpload(out);
    e.target.value = "";
  };

  return (
    <>
      <button
        type="button"
        onClick={openPicker}
        className={
          className || 
          "w-full px-6 h-14 rounded-2xl bg-white border border-gray-200 text-gray-800 font-light " +
          "hover:shadow-md active:translate-y-px transition-all relative z-10"
        }
        disabled={disabled}
        aria-disabled={disabled}
        data-upload-debug={debugTag}
      >
        {label}
      </button>
      <input
        ref={inputRef}
        className="hidden"
        type="file"
        accept={accept}
        {...(capture ? { capture } : {})}
        multiple={multiple}
        onChange={onChange}
      />
    </>
  );
}

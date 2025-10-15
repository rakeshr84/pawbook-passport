import React, { useRef } from "react";

export type UploadContext =
  | "documents"
  | "medical-records"
  | "vaccination"
  | "treatment"
  | "exam"
  | "pre-travel"
  | "signature";

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

  const openPicker = () => {
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
      console.log("[UPLOAD] Picker closed w/o files", { label, context, debugTag });
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
    <div className="relative" data-upload-debug={debugTag} style={{ zIndex: 10 }}>
      <button
        type="button"
        onClick={openPicker}
        className={
          "px-6 h-12 rounded-2xl bg-white border border-gray-200 text-gray-800 font-light " +
          "hover:shadow-md active:translate-y-px transition-all " + className
        }
        disabled={disabled}
        aria-disabled={disabled}
      >
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        {...(capture ? { capture } : {})}
        multiple={multiple}
        onChange={onChange}
      />
    </div>
  );
}

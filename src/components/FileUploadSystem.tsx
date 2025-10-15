import React, { useRef } from "react";

export interface UploadedFile {
  id: string;
  petId: string;
  context: string;   // "documents" | "medical-records" | "pre-travel" | "vaccination" | ...
  name: string;
  mime: string;
  size: number;
  url: string;       // object URL
  createdAt: string; // ISO
}

export function FileUploadButton({
  label,
  accept = "application/pdf,image/*",
  capture,
  multiple = true,
  onUpload,
  context,
  petId,
  className = "",
}: {
  label: string;
  accept?: string;
  capture?: "environment" | "user";
  multiple?: boolean;
  onUpload: (files: UploadedFile[]) => void;
  context: string;
  petId: string;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) return;

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
    e.target.value = ""; // allow reselecting the same file
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ref.current?.click();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className || "w-full px-6 h-14 rounded-2xl bg-white border border-gray-200 text-gray-800 font-light hover:shadow-md active:translate-y-px transition-all"}
      >
        {label}
      </button>
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept={accept}
        {...(capture ? { capture } : {})}
        multiple={multiple}
        onChange={onChange}
      />
    </>
  );
}

export function FilePreviewList({
  files,
  onRemove,
}: {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}) {
  if (files.length === 0) return null;

  return (
    <div className="mt-4 space-y-2">
      {files.map((f) => (
        <div
          key={f.id}
          className="flex items-center gap-3 bg-white/70 p-3 rounded-2xl border border-gray-200"
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center flex-shrink-0">
            {f.mime.startsWith("image/") ? (
              <img src={f.url} className="object-cover w-full h-full" alt={f.name} />
            ) : (
              <span className="text-xs text-gray-600">PDF</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-900 truncate">{f.name}</div>
            <div className="text-xs text-gray-500">
              {(f.size / 1048576).toFixed(2)} MB
            </div>
          </div>
          <a
            href={f.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-700 text-sm underline whitespace-nowrap"
          >
            Open
          </a>
          <button
            onClick={() => onRemove(f.id)}
            className="text-red-600 text-sm whitespace-nowrap"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

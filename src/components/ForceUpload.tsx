import React, { useRef } from "react";

interface ForceUploadProps {
  accept?: string;
  multiple?: boolean;
  onSelect: (files: FileList) => void;
  label: string;
  className?: string;
}

export function ForceUpload({
  accept = "application/pdf,image/*",
  multiple = true,
  onSelect,
  label,
  className = "",
}: ForceUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    console.log("ForceUpload button clicked, triggering file picker...");
    inputRef.current?.click();
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleClick}
        className={
          "inline-flex items-center justify-center px-6 h-12 rounded-2xl " +
          "bg-gray-900 text-white font-medium hover:shadow-md active:translate-y-px " +
          "transition-all cursor-pointer select-none " +
          className
        }
      >
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        style={{ display: 'none' }}
        onChange={(e) => {
          console.log("File input changed, files:", e.target.files);
          if (e.target.files?.length) {
            onSelect(e.target.files);
            e.target.value = "";
          }
        }}
      />
    </div>
  );
}

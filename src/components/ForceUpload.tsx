import React from "react";

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
  return (
    <label
      className={
        "relative inline-flex items-center justify-center px-6 h-12 rounded-2xl " +
        "bg-gray-900 text-white font-medium hover:shadow-md active:translate-y-px " +
        "transition-all cursor-pointer select-none " +
        className
      }
    >
      {label}
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        onChange={(e) => {
          if (e.target.files?.length) {
            onSelect(e.target.files);
            e.target.value = "";
          }
        }}
      />
    </label>
  );
}

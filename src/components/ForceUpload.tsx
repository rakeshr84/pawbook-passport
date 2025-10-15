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
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const triggerFileDialog = () => {
    // attach input to body if shadow DOM breaks click
    if (!hiddenInputRef.current) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = accept;
      input.multiple = multiple;
      input.style.display = "none";
      input.addEventListener("change", (e: any) => {
        if (e.target.files?.length) onSelect(e.target.files);
        document.body.removeChild(input);
      });
      document.body.appendChild(input);
      input.click();
    } else {
      hiddenInputRef.current.click();
    }
  };

  return (
    <button
      type="button"
      onClick={triggerFileDialog}
      className={
        "relative inline-flex items-center justify-center px-6 h-12 rounded-2xl " +
        "bg-gray-900 text-white font-medium hover:shadow-md active:translate-y-px " +
        "transition-all cursor-pointer select-none " +
        className
      }
    >
      {label}
      <input
        ref={hiddenInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onSelect(e.target.files);
          e.target.value = "";
        }}
      />
    </button>
  );
}

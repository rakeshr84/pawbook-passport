import React, { useRef } from "react";

export interface FilePickerProps {
  accept?: string;                 // e.g., "application/pdf,image/*"
  capture?: "environment" | "user";
  multiple?: boolean;
  onPick: (files: FileList) => void;
  children: React.ReactNode;       // the button
}

export function FilePicker({
  accept = "", 
  capture, 
  multiple = false, 
  onPick, 
  children,
}: FilePickerProps) {
  const ref = useRef<HTMLInputElement>(null);
  
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
        className="w-full h-14 px-6 rounded-2xl bg-white border border-gray-200 text-gray-800 font-light shadow
                   hover:shadow-md active:translate-y-px transition-all"
      >
        {children}
      </button>
      <input
        ref={ref}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        {...(capture ? { capture } : {})}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length) onPick(files);
          // allow re-picking the same file
          (e.target as HTMLInputElement).value = "";
        }}
      />
    </>
  );
}

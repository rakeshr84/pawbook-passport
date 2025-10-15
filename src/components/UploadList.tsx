import React from "react";
import type { UploadedFile } from "@/components/UniversalUpload";

export function UploadList({ items, onRemove }:{
  items: UploadedFile[]; onRemove:(id:string)=>void;
}) {
  if (!items?.length) return null;
  return (
    <div className="mt-4 space-y-2">
      {items.map((f) => (
        <div key={f.id} className="flex items-center gap-3 bg-white/70 p-3 rounded-2xl border border-gray-200">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center flex-shrink-0">
            {f.mime.startsWith("image/") ? (
              <img src={f.url} className="object-cover w-full h-full" alt={f.name} />
            ) : (
              <span className="text-xs text-gray-600">PDF</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-900 truncate">{f.name}</div>
            <div className="text-xs text-gray-500">{(f.size/1048576).toFixed(2)} MB</div>
          </div>
          <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-700 text-sm underline">Open</a>
          <button onClick={() => onRemove(f.id)} className="text-red-600 text-sm">Remove</button>
        </div>
      ))}
    </div>
  );
}

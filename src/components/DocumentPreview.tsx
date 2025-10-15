import { FileText } from 'lucide-react';
import { PetDocument } from '@/types/document';

interface DocumentPreviewProps {
  documents: PetDocument[];
  onRemove: (docId: string) => void;
}

export function DocumentPreview({ documents, onRemove }: DocumentPreviewProps) {
  if (documents.length === 0) return null;

  return (
    <div className="mt-4 grid sm:grid-cols-2 gap-3">
      {documents.map(d => (
        <div 
          key={d.id} 
          className="flex items-center gap-3 bg-white/70 rounded-2xl p-3 border border-gray-200"
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border flex-shrink-0">
            {d.thumbnail ? (
              <img src={d.thumbnail} className="object-cover w-full h-full" alt={d.title} />
            ) : (
              <FileText size={20} className="text-gray-600" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm text-gray-900 truncate">{d.title}</div>
            <div className="text-xs text-gray-500">{(d.size / 1024 / 1024).toFixed(2)} MB</div>
          </div>
          <div className="flex items-center gap-2">
            <a 
              href={d.url} 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-700 text-sm underline"
            >
              Open
            </a>
            <button
              className="text-red-600 text-sm"
              onClick={() => onRemove(d.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

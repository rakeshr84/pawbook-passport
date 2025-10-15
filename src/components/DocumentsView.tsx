import { useState } from 'react';
import { FileText, Image as ImageIcon, Camera } from 'lucide-react';
import { PetDocument, DocKind } from '@/types/document';
import { FilePicker } from '@/components/FilePicker';

interface DocumentsViewProps {
  petId: string;
  petName: string;
  documents: PetDocument[];
  onAddDocuments: (petId: string, kind: DocKind, files: FileList) => void;
  onRemoveDocument: (docId: string) => void;
  onBack: () => void;
}

export function DocumentsView({
  petId,
  petName,
  documents,
  onAddDocuments,
  onRemoveDocument,
  onBack,
}: DocumentsViewProps) {
  const [docFilter, setDocFilter] = useState<DocKind | "all">("all");
  
  const kinds: (DocKind | "all")[] = ["all", "pretravel", "certificate", "exam", "treatment", "lab", "other"];
  const kindLabels: Record<DocKind | "all", string> = {
    all: "All",
    pretravel: "Pre-Travel",
    certificate: "Certificates",
    exam: "Exams",
    treatment: "Treatments",
    lab: "Labs",
    other: "Other",
  };

  const filteredDocs = documents.filter(d => 
    d.pet_id === petId && (docFilter === "all" || d.kind === docFilter)
  );

  const hasDocs = documents.filter(d => d.pet_id === petId).length > 0;

  return (
    <div className="min-h-screen gradient-bg py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-foreground font-light smooth-transition mb-4"
        >
          ← Back
        </button>

        <div className="space-y-3 mb-8">
          <h1 className="text-4xl font-light text-foreground">Documents</h1>
          <p className="text-muted-foreground font-light">
            {petName}'s medical documents and certificates
          </p>
        </div>

        {!hasDocs ? (
          // Empty state with FilePicker
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-5 flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">All documents in one place</h2>
            <p className="text-gray-600 font-light mb-6">
              Upload vaccination certificates, medical reports, and other important documents for {petName}.
            </p>

            <div className="max-w-xs mx-auto mb-4">
              <FilePicker
                accept="application/pdf,image/*"
                onPick={(files) => onAddDocuments(petId, "other", files)}
              >
                + Upload Documents
              </FilePicker>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-gray-500 font-light hover:text-gray-700"
            >
              I'll do this later
            </button>
          </div>
        ) : (
          <>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {kinds.map(kind => (
                <button
                  key={kind}
                  onClick={() => setDocFilter(kind)}
                  className={`px-4 py-2 rounded-full font-light transition-all ${
                    docFilter === kind
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {kindLabels[kind]}
                </button>
              ))}
            </div>

            {/* Documents list */}
            {filteredDocs.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center mb-6">
                <p className="text-muted-foreground font-light">No {docFilter !== "all" ? kindLabels[docFilter].toLowerCase() : ""} documents yet</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {filteredDocs.map(d => (
                  <div 
                    key={d.id} 
                    className="flex items-center gap-3 bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-gray-200 shadow-sm"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center border flex-shrink-0">
                      {d.thumbnail ? (
                        <img src={d.thumbnail} className="object-cover w-full h-full" alt={d.title} />
                      ) : (
                        <FileText size={24} className="text-gray-600" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate">{d.title}</div>
                      <div className="text-xs text-gray-500">{(d.size / 1024 / 1024).toFixed(2)} MB</div>
                      <div className="text-xs text-gray-500 capitalize">{d.kind}</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <a 
                        href={d.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-blue-700 text-sm underline whitespace-nowrap"
                      >
                        Open
                      </a>
                      <button
                        className="text-red-600 text-sm whitespace-nowrap"
                        onClick={() => onRemoveDocument(d.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add more buttons */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-gray-900 mb-4">Add More Documents</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <FilePicker 
                  accept="application/pdf,image/*" 
                  onPick={(files) => onAddDocuments(petId, "other", files)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText size={20} />
                    Add More
                  </div>
                </FilePicker>
                
                <FilePicker 
                  accept="image/*" 
                  capture="environment" 
                  onPick={(files) => onAddDocuments(petId, "other", files)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Camera size={20} />
                    Scan with Camera
                  </div>
                </FilePicker>
                
                <FilePicker 
                  accept="application/pdf" 
                  onPick={(files) => onAddDocuments(petId, "other", files)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <FileText size={20} />
                    Add PDF
                  </div>
                </FilePicker>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

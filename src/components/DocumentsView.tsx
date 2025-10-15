import React, { useMemo, useState } from 'react';
import { InlineUploadButton, UploadedFile } from '@/components/InlineUploadButton';
import { UploadList } from '@/components/UploadList';

interface DocumentsViewProps {
  petId: string;
  petName: string;
  uploads: UploadedFile[];
  onUpload: (files: UploadedFile[]) => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

export function DocumentsView({
  petId,
  petName,
  uploads,
  onUpload,
  onRemove,
  onBack,
}: DocumentsViewProps) {
  // Local, in-memory document list for this view.
  type DocItem = {
    id: string;
    petId: string;
    name: string;
    mime: string;
    size: number;
    url: string;        // object URL
    createdAt: string;
  };

  const [docs, setDocs] = useState<DocItem[]>([]);

  const docsForThisPet = useMemo(
    () => docs.filter(d => d.petId === petId),
    [docs, petId]
  );

  // Handler used by the input below
  function handlePick(list: FileList | null) {
    if (!list || !list.length) return;
    const added: DocItem[] = Array.from(list).map((f) => ({
      id: crypto.randomUUID(),
      petId,
      name: f.name,
      mime: f.type || "application/octet-stream",
      size: f.size,
      url: URL.createObjectURL(f),
      createdAt: new Date().toISOString(),
    }));
    setDocs(prev => [...added, ...prev]); // newest first
  }

  const [docFilter, setDocFilter] = useState<string>("all");
  
  const contexts = ["all", "documents", "vaccination", "treatment", "exam", "pre-travel", "lab"];
  const contextLabels: Record<string, string> = {
    all: "All",
    documents: "Documents",
    vaccination: "Vaccinations",
    treatment: "Treatments",
    exam: "Exams",
    "pre-travel": "Pre-Travel",
    lab: "Labs",
  };

  const filteredUploads = uploads.filter(u => 
    docFilter === "all" || u.context === docFilter
  );

  const hasDocs = docsForThisPet.length > 0;

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

            {/* Unblockable upload button (label wraps the file input) */}
            <label
              className="relative inline-flex items-center justify-center
                         px-6 h-12 rounded-2xl bg-gray-900 text-white font-medium
                         hover:shadow-md active:translate-y-px transition-all cursor-pointer select-none
                         w-[260px] mx-auto"
              data-upload-debug="documents-empty-cta"
            >
              + Upload Documents
              <input
                type="file"
                accept="application/pdf,image/*"
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  handlePick(e.currentTarget.files);
                  // allow choosing the *same* file again later
                  e.currentTarget.value = "";
                }}
              />
            </label>

            {docsForThisPet.length > 0 && (
              <div className="mt-6 space-y-2 max-w-2xl mx-auto">
                {docsForThisPet.map((f) => (
                  <div key={f.id} className="flex items-center gap-3 bg-white/70 p-3 rounded-2xl border border-gray-200">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center">
                      {f.mime.startsWith("image/") ? (
                        <img src={f.url} alt="" className="object-cover w-full h-full" />
                      ) : (
                        <span className="text-xs text-gray-600">PDF</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-gray-900 truncate">{f.name}</div>
                      <div className="text-xs text-gray-500">{(f.size / 1048576).toFixed(2)} MB</div>
                    </div>
                    <a href={f.url} target="_blank" rel="noreferrer" className="text-blue-700 text-sm underline">Open</a>
                    <button
                      onClick={() => setDocs(prev => prev.filter(x => x.id !== f.id))}
                      className="text-red-600 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

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
              {contexts.map(ctx => (
                <button
                  key={ctx}
                  onClick={() => setDocFilter(ctx)}
                  className={`px-4 py-2 rounded-full font-light transition-all ${
                    docFilter === ctx
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white/60 text-gray-700 hover:bg-white/80'
                  }`}
                >
                  {contextLabels[ctx]}
                </button>
              ))}
            </div>

            {/* Documents list */}
            {filteredUploads.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 text-center mb-6">
                <p className="text-muted-foreground font-light">
                  No {docFilter !== "all" ? contextLabels[docFilter].toLowerCase() : ""} documents yet
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <UploadList items={filteredUploads} onRemove={onRemove} />
              </div>
            )}

            {/* Add more buttons */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-gray-900 mb-4">Add More Documents</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <InlineUploadButton
                  label="Add More"
                  accept="application/pdf,image/*"
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                  debugTag="documents-add-more"
                />
                
                <InlineUploadButton
                  label="Scan with Camera"
                  accept="image/*"
                  capture="environment"
                  multiple={false}
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                  debugTag="documents-camera"
                />
                
                <InlineUploadButton
                  label="Add PDF"
                  accept="application/pdf"
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                  debugTag="documents-add-pdf"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

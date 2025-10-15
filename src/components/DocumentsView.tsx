import { useState } from 'react';
import { FileText, Camera } from 'lucide-react';
import { FileUploadButton, FilePreviewList, UploadedFile } from '@/components/FileUploadSystem';

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

  const hasDocs = uploads.length > 0;

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
              <FileUploadButton
                label="+ Upload Documents"
                accept="application/pdf,image/*"
                multiple
                petId={petId}
                context="documents"
                onUpload={onUpload}
              />
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
                <FilePreviewList files={filteredUploads} onRemove={onRemove} />
              </div>
            )}

            {/* Add more buttons */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-gray-900 mb-4">Add More Documents</h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <FileUploadButton
                  label="Add More"
                  accept="application/pdf,image/*"
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                />
                
                <FileUploadButton
                  label="Scan with Camera"
                  accept="image/*"
                  capture="environment"
                  multiple={false}
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                />
                
                <FileUploadButton
                  label="Add PDF"
                  accept="application/pdf"
                  petId={petId}
                  context="documents"
                  onUpload={onUpload}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

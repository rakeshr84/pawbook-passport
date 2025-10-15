import React, { useMemo, useState } from 'react';
import { UploadedFile } from '@/components/InlineUploadButton';
import { UploadList } from '@/components/UploadList';
import { ForceUpload } from '@/components/ForceUpload';

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

  const [docs, setDocs] = useState<UploadedFile[]>([]);
  const [docFilter, setDocFilter] = useState<string>('all');

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

  // Combine global uploads + locally added docs
  const allUploads = useMemo(() => [...uploads, ...docs], [uploads, docs]);

  const filteredUploads = allUploads.filter(
    (u) => docFilter === "all" || u.context === docFilter
  );

  const docsForThisPet = useMemo(
    () => allUploads.filter((d) => d.petId === petId),
    [allUploads, petId]
  );

  const hasDocs = docsForThisPet.length > 0;

  // ✅ Unified file upload handler
  const handleUploadFiles = (list: FileList | null, context: UploadedFile['context'] = "documents") => {
    if (!list || !list.length) return;
    const added: UploadedFile[] = Array.from(list).map((f) => ({
      id: crypto.randomUUID(),
      petId,
      context,
      name: f.name,
      mime: f.type || "application/octet-stream",
      size: f.size,
      url: URL.createObjectURL(f),
      createdAt: new Date().toISOString(),
    }));
    // update local + global
    setDocs((prev) => [...added, ...prev]);
    onUpload(added);
  };

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
          // ---------------------- Empty State ----------------------
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-10 shadow-lg text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 mx-auto mb-5 flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
            <h2 className="text-2xl font-light text-gray-900 mb-2">
              All documents in one place
            </h2>
            <p className="text-gray-600 font-light mb-6">
              Upload vaccination certificates, medical reports, and other important documents for {petName}.
            </p>

            {/* ✅ Fixed upload button */}
            <ForceUpload
              label="+ Upload Documents"
              accept="application/pdf,image/*"
              multiple
              onSelect={(files) => handleUploadFiles(files, "documents")}
              className="w-[260px] mx-auto"
            />

            {docsForThisPet.length > 0 && (
              <div className="mt-6 space-y-2 max-w-2xl mx-auto">
                {docsForThisPet.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-3 bg-white/70 p-3 rounded-2xl border border-gray-200"
                  >
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border flex items-center justify-center">
                      {f.mime.startsWith("image/") ? (
                        <img
                          src={f.url}
                          alt=""
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-xs text-gray-600">PDF</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm text-gray-900 truncate">
                        {f.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {(f.size / 1048576).toFixed(2)} MB
                      </div>
                    </div>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 text-sm underline"
                    >
                      Open
                    </a>
                    <button
                      onClick={() =>
                        setDocs((prev) => prev.filter((x) => x.id !== f.id))
                      }
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
              className="text-gray-500 font-light hover:text-gray-700 mt-6"
            >
              I'll do this later
            </button>
          </div>
        ) : (
          // ---------------------- Documents list view ----------------------
          <>
            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {contexts.map((ctx) => (
                <button
                  key={ctx}
                  onClick={() => setDocFilter(ctx)}
                  className={`px-4 py-2 rounded-full font-light transition-all ${
                    docFilter === ctx
                      ? "bg-primary text-primary-foreground"
                      : "bg-white/60 text-gray-700 hover:bg-white/80"
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
                  No{" "}
                  {docFilter !== "all"
                    ? contextLabels[docFilter].toLowerCase()
                    : ""}{" "}
                  documents yet
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <UploadList items={filteredUploads} onRemove={onRemove} />
              </div>
            )}

            {/* Add more */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-gray-900 mb-4">
                Add More Documents
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                <ForceUpload
                  label="Add More"
                  accept="application/pdf,image/*"
                  multiple={true}
                  onSelect={(files) => handleUploadFiles(files, "documents")}
                  className="bg-white border border-gray-200 text-gray-800 font-light"
                />

                <ForceUpload
                  label="Scan with Camera"
                  accept="image/*"
                  multiple={false}
                  onSelect={(files) => handleUploadFiles(files, "documents")}
                  className="bg-white border border-gray-200 text-gray-800 font-light"
                />

                <ForceUpload
                  label="Add PDF"
                  accept="application/pdf"
                  multiple={true}
                  onSelect={(files) => handleUploadFiles(files, "documents")}
                  className="bg-white border border-gray-200 text-gray-800 font-light"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

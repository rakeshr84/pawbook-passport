import React, { useState } from 'react';
import { FileText, Upload, Camera, ChevronRight, Download, Trash2 } from 'lucide-react';
import { ForceUpload } from '@/components/ForceUpload';
import { Button } from '@/components/ui/button';

export interface RecordDocument {
  id: string;
  petId: string;
  category: 'vaccination' | 'treatment' | 'travel' | 'lab' | 'other';
  name: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
}

interface RecordsTabProps {
  petId?: string;
  petName?: string;
  documents: RecordDocument[];
  onUpload: (files: FileList, category: RecordDocument['category']) => void;
  onRemove: (id: string) => void;
}

type CategoryFilter = 'all' | 'vaccination' | 'treatment' | 'travel' | 'lab';

const RecordsTab = ({ petId, petName = 'your pet', documents, onUpload, onRemove }: RecordsTabProps) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const categories: Array<{ id: CategoryFilter; label: string; emoji: string; uploadCategory?: RecordDocument['category'] }> = [
    { id: 'all', label: 'All Documents', emoji: '📁' },
    { id: 'vaccination', label: 'Vaccination Proof', emoji: '💉', uploadCategory: 'vaccination' },
    { id: 'treatment', label: 'Treatments', emoji: '💊', uploadCategory: 'treatment' },
    { id: 'travel', label: 'Travel Certificates', emoji: '✈️', uploadCategory: 'travel' },
    { id: 'lab', label: 'Labs', emoji: '🔬', uploadCategory: 'lab' },
  ];

  const filteredDocuments = activeCategory === 'all' 
    ? documents.filter(d => d.petId === petId)
    : documents.filter(d => d.petId === petId && d.category === activeCategory);

  const handleUploadFiles = (files: FileList | null, category: RecordDocument['category']) => {
    if (!files || !files.length || !petId) return;
    
    onUpload(files, category);
    
    // Show success animation for this category
    setUploadSuccess(category);
    setTimeout(() => setUploadSuccess(null), 2000);
  };

  const getCategoryCount = (cat: CategoryFilter) => {
    if (cat === 'all') return documents.filter(d => d.petId === petId).length;
    return documents.filter(d => d.petId === petId && d.category === cat).length;
  };

  return (
    <div className="min-h-screen gradient-bg pb-24 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-light text-foreground mb-2 flex items-center gap-2">
            <FileText className="w-8 h-8 text-accent" />
            Records
          </h1>
          <p className="text-muted-foreground font-light">
            Keep their records safe in one calm place
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 animate-fade-in">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl font-light whitespace-nowrap ios-transition ${
                activeCategory === cat.id
                  ? 'gradient-accent text-white shadow-lg'
                  : 'glass-effect text-foreground hover:bg-accent/10'
              }`}
            >
              {cat.emoji} {cat.label}
              {getCategoryCount(cat.id) > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {getCategoryCount(cat.id)}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="glass-effect rounded-3xl p-10 shadow-lg text-center animate-fade-in">
            <div className="w-20 h-20 rounded-full gradient-accent mx-auto mb-5 flex items-center justify-center shadow-lg animate-glow-pulse">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-light text-foreground mb-2">
              {activeCategory === 'all' ? 'No documents yet' : `No ${categories.find(c => c.id === activeCategory)?.label.toLowerCase()}`}
            </h2>
            <p className="text-muted-foreground font-light mb-6">
              Upload files to keep {petName}'s records organized
            </p>
          </div>
        )}

        {/* Document Categories with Inline Upload */}
        {filteredDocuments.length > 0 && (
          <div className="space-y-6 animate-fade-in">
            {categories.filter(c => c.id !== 'all').map((cat) => {
              const categoryDocs = documents.filter(d => d.petId === petId && d.category === cat.uploadCategory);
              const isActive = activeCategory === 'all' || activeCategory === cat.id;
              
              if (!isActive) return null;

              return (
                <div 
                  key={cat.id} 
                  className={`glass-effect rounded-3xl p-6 shadow-lg ${
                    uploadSuccess === cat.uploadCategory ? 'animate-glow-pulse' : ''
                  }`}
                >
                  {/* Category Header with Upload Buttons */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-medium text-foreground flex items-center gap-2">
                      <span className="text-2xl">{cat.emoji}</span>
                      {cat.label}
                      {categoryDocs.length > 0 && (
                        <span className="text-sm font-light text-muted-foreground ml-2">
                          ({categoryDocs.length})
                        </span>
                      )}
                    </h3>

                    <div className="flex gap-2">
                      <ForceUpload
                        label=""
                        accept="application/pdf,image/*"
                        multiple
                        onSelect={(files) => handleUploadFiles(files, cat.uploadCategory!)}
                        className="px-3 py-2 rounded-2xl glass-effect hover:bg-accent/10 ios-transition button-glow-tap"
                        icon={<Upload className="w-4 h-4 text-accent" />}
                      />
                      <ForceUpload
                        label=""
                        accept="image/*"
                        multiple
                        onSelect={(files) => handleUploadFiles(files, cat.uploadCategory!)}
                        className="px-3 py-2 rounded-2xl glass-effect hover:bg-accent/10 ios-transition button-glow-tap"
                        icon={<Camera className="w-4 h-4 text-accent" />}
                      />
                    </div>
                  </div>

                  {/* Documents List */}
                  {categoryDocs.length > 0 ? (
                    <div className="space-y-3">
                      {categoryDocs.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center gap-3 glass-effect p-3 rounded-2xl hover:shadow-md ios-transition"
                        >
                          {/* Thumbnail */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
                            {doc.mime.startsWith('image/') ? (
                              <img
                                src={doc.url}
                                alt={doc.name}
                                className="object-cover w-full h-full"
                              />
                            ) : (
                              <FileText className="w-6 h-6 text-muted-foreground" />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                              {doc.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {(doc.size / 1048576).toFixed(2)} MB · {new Date(doc.createdAt).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <a
                              href={doc.url}
                              download={doc.name}
                              className="p-2 rounded-xl glass-effect hover:bg-accent/10 ios-transition"
                            >
                              <Download className="w-4 h-4 text-accent" />
                            </a>
                            <button
                              onClick={() => onRemove(doc.id)}
                              className="p-2 rounded-xl glass-effect hover:bg-destructive/10 ios-transition"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground font-light text-center py-4">
                      No {cat.label.toLowerCase()} uploaded yet
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecordsTab;

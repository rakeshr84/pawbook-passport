import React from 'react';
import { X, FileText, Syringe, Pill, FlaskConical, Plane } from 'lucide-react';
import { RecordDocument } from './RecordsTab';

interface AddRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectType: (type: RecordDocument['category']) => void;
  activeFilter?: string;
}

const recordTypes = [
  { 
    id: 'vaccination' as const, 
    label: 'Vaccination Record', 
    icon: Syringe,
    description: 'Upload proof of vaccination',
    gradient: 'from-blue-400 to-cyan-400'
  },
  { 
    id: 'treatment' as const, 
    label: 'Treatment Record', 
    icon: Pill,
    description: 'Medical treatments and prescriptions',
    gradient: 'from-purple-400 to-pink-400'
  },
  { 
    id: 'lab' as const, 
    label: 'Lab Result', 
    icon: FlaskConical,
    description: 'Test results and diagnostics',
    gradient: 'from-green-400 to-emerald-400'
  },
  { 
    id: 'travel' as const, 
    label: 'Travel Certificate', 
    icon: Plane,
    description: 'Documents for pet travel',
    gradient: 'from-orange-400 to-amber-400'
  },
  { 
    id: 'other' as const, 
    label: 'Other Document', 
    icon: FileText,
    description: 'Any other records or files',
    gradient: 'from-gray-400 to-slate-400'
  },
];

export const AddRecordModal: React.FC<AddRecordModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectType,
  activeFilter 
}) => {
  if (!isOpen) return null;

  // Filter types based on active category
  const filteredTypes = activeFilter && activeFilter !== 'all'
    ? recordTypes.filter(type => type.id === activeFilter)
    : recordTypes;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 pointer-events-none"
        onClick={onClose}
      >
        <div 
          className="w-full max-w-lg glass-effect rounded-3xl shadow-2xl overflow-hidden pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'linear-gradient(180deg, #FDFDFC, #F3FFF9)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 
                  className="text-foreground"
                  style={{ 
                    fontFamily: 'SF Pro Display, -apple-system, system-ui, sans-serif',
                    fontSize: '20pt',
                    fontWeight: 400,
                  }}
                >
                  Add New Record
                </h2>
                <p 
                  className="text-muted-foreground mt-1"
                  style={{ 
                    fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
                    fontSize: '14pt',
                    fontWeight: 300,
                  }}
                >
                  Choose what you'd like to upload
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full glass-effect hover:bg-accent/10 ios-transition"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Options Grid */}
          <div className="p-6 space-y-3">
            {filteredTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    onSelectType(type.id);
                    onClose();
                  }}
                  className="w-full glass-effect rounded-2xl p-4 hover:shadow-lg ios-transition button-glow-tap text-left group"
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div 
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div 
                        className="text-foreground group-hover:text-accent ios-transition"
                        style={{ 
                          fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
                          fontSize: '16pt',
                          fontWeight: 500,
                        }}
                      >
                        {type.label}
                      </div>
                      <div 
                        className="text-muted-foreground text-sm mt-0.5"
                        style={{ 
                          fontFamily: 'SF Pro Text, -apple-system, system-ui, sans-serif',
                          fontWeight: 300,
                        }}
                      >
                        {type.description}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 ios-transition">
                      →
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

import { useState, useEffect } from 'react';
import { ChevronLeft, Camera, Upload, Lightbulb } from 'lucide-react';
import { VaccinationRecord } from '@/types/medical';
import { InlineUploadButton, UploadedFile } from '@/components/InlineUploadButton';
import { UploadList } from '@/components/UploadList';

interface VaccineDetailsFormProps {
  petData: {
    name: string;
    dateOfBirth: string;
    vetClinic?: string;
    vetName?: string;
    vetAddress?: string;
    vetPhone?: string;
  };
  selectedVaccine: string;
  onSave: (record: Omit<VaccinationRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => void;
  onBack: () => void;
  onCancel: () => void;
  petId?: string;
  uploads?: UploadedFile[];
  onUpload?: (files: UploadedFile[]) => void;
  onRemoveUpload?: (id: string) => void;
}

// Helper functions
function suggestValidFrom(vaccinationDate: string): string {
  if (!vaccinationDate) return '';
  const date = new Date(vaccinationDate);
  date.setDate(date.getDate() + 21); // +21 days
  return date.toISOString().split('T')[0];
}

function suggestValidUntil(vaccinationDate: string, vaccineType: string): string {
  if (!vaccinationDate) return '';
  const date = new Date(vaccinationDate);
  
  // Most vaccines: 1 year
  if (vaccineType === 'rabies' || vaccineType === 'bordetella' || vaccineType === 'lepto') {
    date.setFullYear(date.getFullYear() + 1);
  }
  // DHPP: 3 years (for adults)
  else if (vaccineType === 'dhpp') {
    date.setFullYear(date.getFullYear() + 3);
  }
  // Default: 1 year
  else {
    date.setFullYear(date.getFullYear() + 1);
  }
  
  return date.toISOString().split('T')[0];
}

export default function VaccineDetailsForm({
  petData,
  selectedVaccine,
  onSave,
  onBack,
  onCancel,
  petId,
  uploads = [],
  onUpload,
  onRemoveUpload,
}: VaccineDetailsFormProps) {
  const [usePrimaryVet, setUsePrimaryVet] = useState(true);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    manufacturer: '',
    product_name: '',
    batch_number: '',
    vaccination_date: '',
    valid_from: '',
    valid_until: '',
    vet_name: petData.vetName || '',
    vet_clinic: petData.vetClinic || '',
    vet_address: petData.vetAddress || '',
    vet_phone: petData.vetPhone || '',
    reminder_enabled: true,
    reminder_days_before: 30,
    notes: '',
  });

  // Auto-suggest dates when vaccination date changes
  useEffect(() => {
    if (formData.vaccination_date) {
      setFormData(prev => ({
        ...prev,
        valid_from: suggestValidFrom(formData.vaccination_date),
        valid_until: suggestValidUntil(formData.vaccination_date, selectedVaccine.toLowerCase())
      }));
    }
  }, [formData.vaccination_date, selectedVaccine]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      vaccine_type: selectedVaccine,
      vaccine_name: selectedVaccine,
      manufacturer: formData.manufacturer,
      product_name: formData.product_name,
      batch_number: formData.batch_number,
      vaccination_date: new Date(formData.vaccination_date),
      valid_from: new Date(formData.valid_from),
      valid_until: new Date(formData.valid_until),
      vet_name: formData.vet_name,
      vet_clinic: formData.vet_clinic,
      vet_address: formData.vet_address,
      vet_phone: formData.vet_phone,
      extracted_via_ocr: false,
      reminder_enabled: formData.reminder_enabled,
      reminder_days_before: formData.reminder_days_before,
      status: 'valid',
      notes: formData.notes,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-light text-gray-900">
              {selectedVaccine} Vaccination Details
            </h1>
            <p className="text-gray-500 font-light mt-1">Official passport format</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Vaccine Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Vaccine Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Manufacturer *
                </label>
                <input
                  type="text"
                  required
                  value={formData.manufacturer}
                  onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                  placeholder="e.g., Zoetis, Merck, Boehringer Ingelheim"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.product_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, product_name: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                  placeholder="e.g., Nobivac, Vanguard, Duramune"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch/Lot Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.batch_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, batch_number: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                  placeholder="e.g., A142E01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Batch Sticker (Optional)
                </label>
                <div className="flex gap-3">
                  <label className="flex-1 cursor-pointer">
                    <input type="file" accept="image/*" capture="environment" className="hidden" />
                    <div className="flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-200">
                      <Camera className="w-5 h-5" />
                      Take Photo
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" />
                    <div className="flex items-center justify-center gap-2 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-200">
                      <Upload className="w-5 h-5" />
                      Upload File
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Dates */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Dates</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Vaccination *
                </label>
                <input
                  type="date"
                  required
                  value={formData.vaccination_date}
                  onChange={(e) => setFormData(prev => ({ ...prev, vaccination_date: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid From
                </label>
                <input
                  type="date"
                  value={formData.valid_from}
                  onChange={(e) => setFormData(prev => ({ ...prev, valid_from: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                />
                <p className="text-sm text-gray-500 font-light mt-2">
                  Usually 21 days after vaccination date
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valid Until *
                </label>
                <input
                  type="date"
                  required
                  value={formData.valid_until}
                  onChange={(e) => setFormData(prev => ({ ...prev, valid_until: e.target.value }))}
                  className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                />
                <p className="text-sm text-gray-500 font-light mt-2">
                  Typically 1 year from vaccination date
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.reminder_enabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, reminder_enabled: e.target.checked }))}
                  className="w-5 h-5 rounded border-gray-300"
                />
                <span className="font-light text-gray-700">
                  Remind me 30 days before expiration
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Veterinarian Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Veterinarian Information</h2>
            
            {petData.vetClinic && (
              <div className="mb-6">
                <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-200">
                  <input
                    type="radio"
                    checked={usePrimaryVet}
                    onChange={() => {
                      setUsePrimaryVet(true);
                      setFormData(prev => ({
                        ...prev,
                        vet_name: petData.vetName || '',
                        vet_clinic: petData.vetClinic || '',
                        vet_address: petData.vetAddress || '',
                        vet_phone: petData.vetPhone || '',
                      }));
                    }}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Use Primary Vet</div>
                    <div className="text-sm text-gray-600 font-light">{petData.vetClinic}</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:border-gray-400 transition-all duration-200 mt-3">
                  <input
                    type="radio"
                    checked={!usePrimaryVet}
                    onChange={() => setUsePrimaryVet(false)}
                    className="w-5 h-5"
                  />
                  <div className="font-medium text-gray-900">Different Veterinarian</div>
                </label>
              </div>
            )}

            {!usePrimaryVet && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veterinarian Name
                  </label>
                  <input
                    type="text"
                    value={formData.vet_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, vet_name: e.target.value }))}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                    placeholder="Dr. Sarah Johnson"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    value={formData.vet_clinic}
                    onChange={(e) => setFormData(prev => ({ ...prev, vet_clinic: e.target.value }))}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                    placeholder="Happy Paws Veterinary Clinic"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.vet_address}
                    onChange={(e) => setFormData(prev => ({ ...prev, vet_address: e.target.value }))}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                    placeholder="123 Main Street, City, State"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.vet_phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, vet_phone: e.target.value }))}
                    className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Vet Signature/Stamp (Optional)
              </label>
              <div className="flex flex-col items-center gap-3">
                <label className="relative inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-xl font-light cursor-pointer hover:bg-gray-50 transition-all duration-200">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Signature
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setSignatureFile(file);
                      setSignaturePreview(URL.createObjectURL(file));
                    }}
                  />
                </label>
                {signaturePreview && (
                  <div className="mt-2 flex flex-col items-center">
                    <img 
                      src={signaturePreview} 
                      alt="Signature preview"
                      className="h-16 object-contain rounded-md border" 
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSignatureFile(null);
                        setSignaturePreview(null);
                      }}
                      className="text-sm text-red-600 mt-1 underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Supporting Documents */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Supporting Documents</h2>
            
            <div className="space-y-6">
              {petId && onUpload && (
                <>
            <div className="grid sm:grid-cols-3 gap-3">
              <InlineUploadButton
                label="Upload PDF"
                accept="application/pdf"
                petId={petId}
                context="vaccination"
                onUpload={onUpload}
                debugTag="vaccine-upload-pdf"
              />
              
              <InlineUploadButton
                label="Upload Image"
                accept="image/*"
                petId={petId}
                context="vaccination"
                onUpload={onUpload}
                debugTag="vaccine-upload-image"
              />
              
              <InlineUploadButton
                label="Take Photo"
                accept="image/*"
                capture="environment"
                multiple={false}
                petId={petId}
                context="vaccination"
                onUpload={onUpload}
                debugTag="vaccine-camera"
              />
                  </div>

                  {onRemoveUpload && (
                    <UploadList 
                      items={uploads.filter(u => u.petId === petId && u.context === 'vaccination')} 
                      onRemove={onRemoveUpload} 
                    />
                  )}
                </>
              )}

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700 font-light">
                    <strong className="font-medium">Tips for Good Photos</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Ensure good lighting</li>
                      <li>• Capture entire certificate</li>
                      <li>• Include all text clearly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Notes */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Notes</h2>
            
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full px-6 py-4 border border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 font-light transition-all duration-200"
              rows={4}
              placeholder="Any additional notes about this vaccination..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
            >
              Save Vaccination ✓
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

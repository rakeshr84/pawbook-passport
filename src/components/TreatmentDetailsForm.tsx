import { useState } from 'react';
import { ChevronLeft, Camera, Upload } from 'lucide-react';
import { PetFormData } from '@/types/pet';
import { TreatmentRecord } from '@/types/medical';
import { InlineUploadButton, UploadedFile } from '@/components/InlineUploadButton';
import { UploadList } from '@/components/UploadList';

interface TreatmentDetailsFormProps {
  petData: PetFormData;
  treatmentType: string;
  onSave: (record: Omit<TreatmentRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => void;
  onBack: () => void;
  onCancel: () => void;
  petId?: string;
  uploads?: UploadedFile[];
  onUpload?: (files: UploadedFile[]) => void;
  onRemoveUpload?: (id: string) => void;
}

export default function TreatmentDetailsForm({
  petData,
  treatmentType,
  onSave,
  onBack,
  onCancel,
  petId,
  uploads = [],
  onUpload,
  onRemoveUpload,
}: TreatmentDetailsFormProps) {
  const [productName, setProductName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [dosage, setDosage] = useState('');
  const [dateAdministered, setDateAdministered] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [vetName, setVetName] = useState(petData.vetClinic || '');
  const [vetClinic, setVetClinic] = useState('');
  const [vetPhone, setVetPhone] = useState(petData.vetPhone || '');
  const [notes, setNotes] = useState('');

  const getTreatmentTypeDisplay = () => {
    const displays: Record<string, string> = {
      'anti-parasitic': 'Anti-Parasitic',
      'deworming': 'Deworming',
      'echinococcus': 'Echinococcus',
      'medication': 'Medication',
      'other': 'Treatment',
    };
    return displays[treatmentType] || 'Treatment';
  };

  const getReminderText = () => {
    const reminders: Record<string, string> = {
      'anti-parasitic': '7 days',
      'deworming': '14 days',
      'echinococcus': 'N/A - one-time for travel',
      'medication': 'as prescribed',
      'other': '7 days',
    };
    return reminders[treatmentType] || '7 days';
  };

  const getScheduleHint = () => {
    const hints: Record<string, string> = {
      'anti-parasitic': 'Usually monthly or every 3 months',
      'deworming': 'Usually every 3-6 months',
      'echinococcus': 'Only for travel - 24-120 hours before departure',
      'medication': 'Based on prescription duration',
      'other': '',
    };
    return hints[treatmentType] || '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productName || !dateAdministered) {
      alert('Please fill in all required fields');
      return;
    }

    const record: Omit<TreatmentRecord, 'id' | 'pet_id' | 'created_at' | 'updated_at'> = {
      treatment_type: treatmentType as TreatmentRecord['treatment_type'],
      product_name: productName,
      manufacturer,
      batch_number: batchNumber,
      dosage: treatmentType === 'medication' ? dosage : undefined,
      date_administered: new Date(dateAdministered),
      next_due_date: nextDueDate ? new Date(nextDueDate) : undefined,
      reminder_enabled: reminderEnabled,
      reminder_days_before: 7,
      vet_name: vetName,
      vet_clinic: vetClinic,
      vet_phone: vetPhone,
      notes,
    };

    onSave(record);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-4xl font-light text-gray-900">
              {getTreatmentTypeDisplay()} Details
            </h1>
            <p className="text-gray-500 font-light mt-1">Official record format</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Product Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="e.g., Simparica, Drontal, etc."
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Manufacturer
                </label>
                <input
                  type="text"
                  value={manufacturer}
                  onChange={(e) => setManufacturer(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="e.g., Zoetis, Bayer, etc."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Batch/Lot Number
                </label>
                <input
                  type="text"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Optional"
                />
              </div>

              {treatmentType === 'medication' && (
                <div>
                  <label className="block text-gray-700 font-light mb-2">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                    placeholder="e.g., 10mg once daily"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Dates & Schedule */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Dates & Schedule</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Date Administered *
                </label>
                <input
                  type="date"
                  value={dateAdministered}
                  onChange={(e) => setDateAdministered(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Next Due Date
                </label>
                <input
                  type="date"
                  value={nextDueDate}
                  onChange={(e) => setNextDueDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                />
                {getScheduleHint() && (
                  <p className="text-sm text-gray-500 font-light mt-2">
                    {getScheduleHint()}
                  </p>
                )}
              </div>

              {treatmentType !== 'echinococcus' && (
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={reminderEnabled}
                    onChange={(e) => setReminderEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <label htmlFor="reminder" className="text-gray-700 font-light">
                    Remind me {getReminderText()} before next due date
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Veterinarian Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Veterinarian Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Veterinarian Name
                </label>
                <input
                  type="text"
                  value={vetName}
                  onChange={(e) => setVetName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Dr. Smith"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Clinic Name
                </label>
                <input
                  type="text"
                  value={vetClinic}
                  onChange={(e) => setVetClinic(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Animal Hospital"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={vetPhone}
                  onChange={(e) => setVetPhone(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
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
                context="treatment"
                onUpload={onUpload}
                debugTag="treatment-upload-pdf"
              />
              
              <InlineUploadButton
                label="Upload Image"
                accept="image/*"
                petId={petId}
                context="treatment"
                onUpload={onUpload}
                debugTag="treatment-upload-image"
              />
              
              <InlineUploadButton
                label="Take Photo"
                accept="image/*"
                capture="environment"
                multiple={false}
                petId={petId}
                context="treatment"
                onUpload={onUpload}
                debugTag="treatment-camera"
              />
                  </div>

                  {onRemoveUpload && (
                    <UploadList 
                      items={uploads.filter(u => u.petId === petId && u.context === 'treatment')} 
                      onRemove={onRemoveUpload} 
                    />
                  )}
                </>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <label className="block text-gray-700 font-light mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
            >
              Cancel
            </button>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-light hover:bg-gray-50 transition-all duration-300"
              >
                ← Back
              </button>
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Save Treatment ✓
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
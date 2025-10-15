import { useState } from 'react';
import { ChevronLeft, Upload, Camera } from 'lucide-react';
import { PetFormData } from '@/types/pet';
import { ClinicalExam } from '@/types/medical';
import { normalizeSpecies } from '@/lib/utils';

interface ExamDetailsFormProps {
  petData: PetFormData;
  examType: string;
  onSave: (record: Omit<ClinicalExam, 'id' | 'pet_id' | 'created_at' | 'updated_at'>) => void;
  onBack: () => void;
  onCancel: () => void;
}

export default function ExamDetailsForm({
  petData,
  examType,
  onSave,
  onBack,
  onCancel,
}: ExamDetailsFormProps) {
  const [examDate, setExamDate] = useState('');
  const [reason, setReason] = useState('');
  const [noSignsOfDisease, setNoSignsOfDisease] = useState(false);
  const [fitToTransport, setFitToTransport] = useState(false);
  const [fitForJourney, setFitForJourney] = useState(false);
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [temperature, setTemperature] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState<'F' | 'C'>('F');
  const [heartRate, setHeartRate] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [findings, setFindings] = useState('');
  const [vetName, setVetName] = useState('');
  const [vetClinic, setVetClinic] = useState(petData.vetClinic || '');
  const [vetAddress, setVetAddress] = useState('');
  const [vetPhone, setVetPhone] = useState(petData.vetPhone || '');
  const [vetLicense, setVetLicense] = useState('');
  const [notes, setNotes] = useState('');

  const petCategory = normalizeSpecies(petData.category);

  const getExamTypeDisplay = () => {
    const displays: Record<string, string> = {
      'annual': 'Annual Checkup',
      'pre-travel': 'Pre-Travel Certificate',
      'illness': 'Illness Visit',
      'follow-up': 'Follow-up Examination',
      'other': 'Health Examination',
    };
    return displays[examType] || 'Health Examination';
  };

  const getNormalTemp = () => {
    if (petCategory === 'dog' || petCategory === 'cat') {
      return 'Normal: 100.5-102.5°F (38-39°C)';
    }
    return 'Varies by species';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!examDate || !vetName || !vetClinic) {
      alert('Please fill in all required fields');
      return;
    }

    const record: Omit<ClinicalExam, 'id' | 'pet_id' | 'created_at' | 'updated_at'> = {
      exam_type: examType as ClinicalExam['exam_type'],
      exam_date: new Date(examDate),
      reason,
      no_signs_of_disease: noSignsOfDisease,
      fit_to_transport: fitToTransport,
      fit_for_journey: fitForJourney,
      weight: weight ? parseFloat(weight) : undefined,
      weight_unit: weightUnit,
      temperature: temperature ? parseFloat(temperature) : undefined,
      temperature_unit: temperatureUnit,
      heart_rate: heartRate ? parseInt(heartRate) : undefined,
      respiratory_rate: respiratoryRate ? parseInt(respiratoryRate) : undefined,
      findings,
      vet_name: vetName,
      vet_clinic: vetClinic,
      vet_address: vetAddress,
      vet_phone: vetPhone,
      vet_license: vetLicense,
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
              {getExamTypeDisplay()}
            </h1>
            <p className="text-gray-500 font-light mt-1">Official record format</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Examination Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Examination Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Date of Examination *
                </label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Reason for Visit
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 resize-none"
                  placeholder="e.g., Annual wellness checkup, travel certificate, etc."
                />
              </div>
            </div>
          </div>

          {/* Health Declaration (For Travel Certificates) */}
          {examType === 'pre-travel' && (
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl font-light text-gray-900 mb-6">Health Declaration</h2>
              
              <p className="text-gray-600 font-light mb-6">
                Required certifications for international travel
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="noDisease"
                    checked={noSignsOfDisease}
                    onChange={(e) => setNoSignsOfDisease(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <label htmlFor="noDisease" className="text-gray-700 font-light">
                    No signs of infectious or contagious disease
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="fitTransport"
                    checked={fitToTransport}
                    onChange={(e) => setFitToTransport(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <label htmlFor="fitTransport" className="text-gray-700 font-light">
                    Fit to transport by air/sea/land
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="fitJourney"
                    checked={fitForJourney}
                    onChange={(e) => setFitForJourney(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <label htmlFor="fitJourney" className="text-gray-700 font-light">
                    Fit for journey to destination country
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Vital Signs */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Vital Signs (Optional)</h2>
            
            <div className="space-y-6">
              {/* Weight */}
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Weight
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                    placeholder="0.0"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as 'lbs' | 'kg')}
                    className="px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  >
                    <option value="lbs">lbs</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Temperature
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    className="flex-1 px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                    placeholder="0.0"
                  />
                  <select
                    value={temperatureUnit}
                    onChange={(e) => setTemperatureUnit(e.target.value as 'F' | 'C')}
                    className="px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  >
                    <option value="F">°F</option>
                    <option value="C">°C</option>
                  </select>
                </div>
                <p className="text-sm text-gray-500 font-light mt-2">
                  {getNormalTemp()}
                </p>
              </div>

              {/* Heart Rate */}
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Heart Rate (bpm)
                </label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="e.g., 80"
                />
              </div>

              {/* Respiratory Rate */}
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Respiratory Rate (breaths/min)
                </label>
                <input
                  type="number"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="e.g., 20"
                />
              </div>
            </div>
          </div>

          {/* Findings & Notes */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Examination Findings</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Veterinarian's Findings
                </label>
                <textarea
                  value={findings}
                  onChange={(e) => setFindings(e.target.value)}
                  rows={4}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 resize-none"
                  placeholder="Physical examination findings, diagnosis, recommendations..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Your Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200 resize-none"
                  placeholder="Add any additional notes..."
                />
              </div>
            </div>
          </div>

          {/* Veterinarian Information */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Veterinarian Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Veterinarian Name *
                </label>
                <input
                  type="text"
                  value={vetName}
                  onChange={(e) => setVetName(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Dr. Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Clinic Name *
                </label>
                <input
                  type="text"
                  value={vetClinic}
                  onChange={(e) => setVetClinic(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Animal Hospital"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={vetAddress}
                  onChange={(e) => setVetAddress(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="123 Main St, City, State"
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

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Veterinary License Number
                </label>
                <input
                  type="text"
                  value={vetLicense}
                  onChange={(e) => setVetLicense(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl border border-gray-200 font-light focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-200"
                  placeholder="Optional"
                />
              </div>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Supporting Documents</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Health Certificate / Exam Report
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300"
                  >
                    <Camera className="w-5 h-5" />
                    Take Photo
                  </button>
                  <button
                    type="button"
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300"
                  >
                    <Upload className="w-5 h-5" />
                    Upload PDF
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-light mb-2">
                  Veterinarian Signature (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300 mx-auto"
                  >
                    <Upload className="w-5 h-5" />
                    Upload Signature
                  </button>
                </div>
              </div>
            </div>
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
                Save Examination ✓
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
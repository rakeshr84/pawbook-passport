import { useState } from 'react';
import { Camera, Upload, Lightbulb, Check, ChevronRight } from 'lucide-react';
import { ExtractedVaccine } from '@/types/medical';

interface OCRScannerProps {
  onBack: () => void;
  onComplete: (vaccines: ExtractedVaccine[]) => void;
  onEditManually: () => void;
}

const OCRScanner = ({ onBack, onComplete, onEditManually }: OCRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [extractedVaccines, setExtractedVaccines] = useState<ExtractedVaccine[]>([
    {
      vaccine_name: 'DAPP',
      vaccination_date: '2025-11-10',
      valid_until: '2028-10-10',
      vet_name: 'Dr. Omid Mavedati',
      vet_clinic: 'Beach Avenue Animal Hospital',
      selected: true
    },
    {
      vaccine_name: 'Rabies',
      vaccination_date: '2025-11-10',
      valid_until: '2026-11-10',
      vet_name: 'Dr. Omid Mavedati',
      vet_clinic: 'Beach Avenue Animal Hospital',
      selected: true
    },
    {
      vaccine_name: 'Bordetella',
      vaccination_date: '2025-11-10',
      valid_until: '2026-11-10',
      vet_name: 'Dr. Omid Mavedati',
      vet_clinic: 'Beach Avenue Animal Hospital',
      selected: true
    }
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsScanning(true);
      // Simulate OCR processing
      setTimeout(() => {
        setIsScanning(false);
        setHasScanned(true);
      }, 2000);
    }
  };

  const toggleVaccineSelection = (index: number) => {
    setExtractedVaccines(prev => 
      prev.map((vaccine, i) => 
        i === index ? { ...vaccine, selected: !vaccine.selected } : vaccine
      )
    );
  };

  const handleComplete = () => {
    const selectedVaccines = extractedVaccines.filter(v => v.selected);
    onComplete(selectedVaccines);
  };

  const selectedCount = extractedVaccines.filter(v => v.selected).length;

  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 flex items-center justify-center px-6">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-lg text-center">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h3 className="text-2xl font-light text-gray-900 mb-2">Scanning Certificate...</h3>
          <p className="text-gray-600 font-light">Extracting vaccination information</p>
        </div>
      </div>
    );
  }

  if (hasScanned) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Success message */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Check className="w-6 h-6 text-green-600" />
              <div className="font-medium text-gray-900">Found {extractedVaccines.length} vaccinations!</div>
            </div>
            
            <div className="space-y-4">
              
              {extractedVaccines.map((vaccine, index) => (
                <div key={index} className="bg-white rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-gray-900">{vaccine.vaccine_name}</div>
                      <div className="text-sm text-gray-600 font-light">
                        Administered: {new Date(vaccine.vaccination_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded"
                        checked={vaccine.selected}
                        onChange={() => toggleVaccineSelection(index)}
                      />
                      <span className="text-sm font-light text-gray-600">Add</span>
                    </label>
                  </div>
                  <div className="text-sm text-gray-600 font-light space-y-1">
                    <p>Due: {new Date(vaccine.valid_until).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</p>
                    {vaccine.vet_name && <p>Vet: {vaccine.vet_name}</p>}
                    {vaccine.vet_clinic && <p>Clinic: {vaccine.vet_clinic}</p>}
                  </div>
                </div>
              ))}
              
            </div>
            
            <div className="mt-4 text-sm text-gray-600 font-light">
              ℹ️ Please review extracted information for accuracy
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex gap-4">
            <button 
              onClick={onBack}
              className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light"
            >
              Cancel
            </button>
            <button 
              onClick={handleComplete}
              disabled={selectedCount === 0}
              className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Selected Vaccines ({selectedCount})
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={onEditManually}
              className="text-sm text-gray-600 hover:text-gray-900 font-light"
            >
              Something wrong? Edit manually →
            </button>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Camera className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-light text-gray-900 mb-2">Upload Vaccination Certificate</h2>
            <p className="text-gray-600 font-light">
              We'll automatically extract vaccine details from your certificate
            </p>
          </div>
          
          <div className="space-y-4">
            {/* Camera Upload */}
            <label className="block cursor-pointer">
              <input 
                type="file" 
                accept="image/*" 
                capture="environment" 
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-gray-400 transition-all duration-300 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="font-medium text-gray-900 mb-2">Take Photo of Certificate</div>
                <div className="text-sm text-gray-500 font-light">Best for mobile devices</div>
              </div>
            </label>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/60 text-gray-400 font-light">or</span>
              </div>
            </div>
            
            {/* File Upload */}
            <label className="block cursor-pointer">
              <input 
                type="file" 
                accept="image/*,application/pdf" 
                className="hidden"
                onChange={handleFileUpload}
              />
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:border-gray-400 transition-all duration-300 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <div className="font-medium text-gray-900 mb-2">Upload File</div>
                <div className="text-sm text-gray-500 font-light">Supports JPG, PNG, or PDF</div>
              </div>
            </label>
          </div>
          
          {/* Tips */}
          <div className="bg-blue-50 rounded-xl p-4 mt-6">
            <div className="flex gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700 font-light">
                <strong className="font-medium">Tips for best results:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Ensure certificate is fully visible</li>
                  <li>• Use good lighting</li>
                  <li>• Keep text straight and clear</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            <button 
              onClick={onBack}
              className="flex-1 px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default OCRScanner;

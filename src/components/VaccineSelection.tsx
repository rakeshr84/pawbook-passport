import { useState } from 'react';
import { Zap, ChevronLeft } from 'lucide-react';
import { PetFormData } from '@/types/pet';

interface VaccineSelectionProps {
  petData: PetFormData;
  onBack: () => void;
  onNext: (selectedVaccine: string, customName?: string) => void;
  onUploadCertificate: () => void;
}

const VaccineSelection = ({ petData, onBack, onNext, onUploadCertificate }: VaccineSelectionProps) => {
  const [selectedVaccine, setSelectedVaccine] = useState<string>('');
  const [customVaccineName, setCustomVaccineName] = useState<string>('');
  const [puppyDose, setPuppyDose] = useState<string>('');

  // Calculate pet age in months
  const calculateAgeInMonths = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const months = (today.getFullYear() - birthDate.getFullYear()) * 12 + 
                   (today.getMonth() - birthDate.getMonth());
    return months;
  };

  const petAgeInMonths = calculateAgeInMonths(petData.dateOfBirth);
  const isPuppy = petAgeInMonths < 6;

  const handleNext = () => {
    if (selectedVaccine === 'custom' && customVaccineName.trim()) {
      onNext(selectedVaccine, customVaccineName);
    } else if (selectedVaccine) {
      onNext(selectedVaccine);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-light text-gray-900">Add Vaccination</h1>
            <p className="text-gray-500 font-light mt-1">{petData.name}</p>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg space-y-6">
          
          {/* Quick Onboard Banner */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <Zap className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Already Vaccinated?</h3>
                <p className="text-sm text-gray-600 font-light mb-4">
                  Don't worry about past history! Just add your pet's most recent vaccinations. We'll track from here.
                </p>
                <button 
                  onClick={onUploadCertificate}
                  className="text-sm text-blue-600 font-medium hover:text-blue-700"
                >
                  Got vaccination certificate? Upload to auto-fill →
                </button>
              </div>
            </div>
          </div>

          {/* Vaccine Selection */}
          {isPuppy ? (
            <>
              <h3 className="text-lg font-medium text-gray-900">🐶 Puppy Vaccination Series</h3>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-sm text-gray-700 font-light">
                  Puppies need multiple doses. Select which dose this is:
                </p>
              </div>
              
              <div className="space-y-3">
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="dhpp"
                    className="hidden peer" 
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">DHPP (Distemper Combo)</div>
                    <div className="text-sm text-gray-500 font-light mb-2">Core vaccine series</div>
                    {selectedVaccine === 'dhpp' && (
                      <select 
                        value={puppyDose}
                        onChange={(e) => setPuppyDose(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm font-light"
                      >
                        <option value="">Select dose...</option>
                        <option value="dose1">Dose 1 (6-8 weeks)</option>
                        <option value="dose2">Dose 2 (10-12 weeks)</option>
                        <option value="dose3">Dose 3 (14-16 weeks)</option>
                      </select>
                    )}
                  </div>
                </label>
                
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="rabies"
                    className="hidden peer"
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">Rabies (First dose)</div>
                    <div className="text-sm text-gray-500 font-light">At 14-16 weeks • Required for travel</div>
                  </div>
                </label>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900">🌟 Recommended Vaccines</h3>
              
              <div className="space-y-3">
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="rabies" 
                    className="hidden peer"
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">Rabies</div>
                    <div className="text-sm text-gray-500 font-light">Required for travel • Due annually</div>
                  </div>
                </label>
                
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="dhpp" 
                    className="hidden peer"
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">DHPP (Distemper Combo)</div>
                    <div className="text-sm text-gray-500 font-light">Core vaccine • Due every 1-3 years</div>
                  </div>
                </label>
                
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="bordetella" 
                    className="hidden peer"
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">Bordetella (Kennel Cough)</div>
                    <div className="text-sm text-gray-500 font-light">For boarding/daycare • Annual</div>
                  </div>
                </label>
                
                <label className="block cursor-pointer">
                  <input 
                    type="radio" 
                    name="vaccine" 
                    value="lepto" 
                    className="hidden peer"
                    onChange={(e) => setSelectedVaccine(e.target.value)}
                  />
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                    <div className="font-medium text-gray-900 mb-1">Leptospirosis</div>
                    <div className="text-sm text-gray-500 font-light">Regional recommendation • Annual</div>
                  </div>
                </label>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Other Vaccines</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                    <span className="font-light text-gray-700">Lyme Disease</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300" />
                    <span className="font-light text-gray-700">Canine Influenza</span>
                  </label>
                </div>
              </div>
              
              <label className="block cursor-pointer mt-4">
                <input 
                  type="radio" 
                  name="vaccine" 
                  value="custom" 
                  className="hidden peer"
                  onChange={(e) => setSelectedVaccine(e.target.value)}
                />
                <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-400 peer-checked:border-gray-900 peer-checked:bg-gray-50 transition-all duration-200">
                  <div className="font-medium text-gray-900 mb-2">Custom/Other</div>
                  {selectedVaccine === 'custom' && (
                    <input 
                      type="text" 
                      placeholder="Enter vaccine name..."
                      value={customVaccineName}
                      onChange={(e) => setCustomVaccineName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400 font-light"
                    />
                  )}
                </div>
              </label>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-8">
            <button 
              onClick={onBack}
              className="px-8 py-4 text-gray-600 hover:text-gray-900 font-light transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleNext}
              disabled={!selectedVaccine || (selectedVaccine === 'custom' && !customVaccineName.trim())}
              className="flex-1 bg-gray-900 text-white py-4 px-8 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: Details →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VaccineSelection;

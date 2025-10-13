import { ChevronLeft, Plus, Stethoscope, Lightbulb, FileText } from 'lucide-react';
import { PetFormData } from '@/types/pet';
import { VaccinationRecord } from '@/types/medical';

interface MedicalDashboardProps {
  petData: PetFormData;
  onBack: () => void;
  onAddVaccination: () => void;
  onAddTreatment?: () => void;
  onAddExam?: () => void;
  onViewFullHistory?: () => void;
  onViewVaccinationList?: () => void;
  vaccinations?: VaccinationRecord[];
}

const MedicalDashboard = ({ 
  petData, 
  onBack, 
  onAddVaccination,
  onAddTreatment,
  onAddExam,
  onViewFullHistory,
  onViewVaccinationList,
  vaccinations = []
}: MedicalDashboardProps) => {
  
  const calculateAge = (dateOfBirth: string): string => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    const years = today.getFullYear() - birthDate.getFullYear();
    const months = today.getMonth() - birthDate.getMonth();
    
    let ageString = '';
    if (years > 0) ageString += `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0 && years < 5) {
      ageString += `${ageString ? ', ' : ''}${months} month${months > 1 ? 's' : ''}`;
    }
    
    return ageString || 'Less than 1 month';
  };

  const hasRecords = vaccinations.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img 
            src={petData.profilePhotoPreview} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
            alt={petData.name}
          />
          <div className="flex-1">
            <h1 className="text-4xl font-light text-gray-900">{petData.name}'s Medical Records</h1>
            <p className="text-gray-500 font-light mt-1">
              {petData.breed} • {calculateAge(petData.dateOfBirth)}
            </p>
          </div>
        </div>

        {!hasRecords ? (
          <>
            {/* Empty State Message */}
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-light text-gray-900 mb-3">
                Start tracking {petData.name}'s health
              </h2>
              <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
                Keep all vaccination records, treatments, and health exams organized in one place
              </p>
            </div>

            {/* Get Started Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">What would you like to add first?</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                
                {/* Vaccinations */}
                <button 
                  onClick={onAddVaccination}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💉</div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">Vaccinations</h4>
                  <p className="text-gray-600 font-light text-sm mb-4">
                    Track vaccine records and get reminders
                  </p>
                  <div className="text-blue-600 font-medium text-sm">
                    Add Vaccine →
                  </div>
                </button>

                {/* Treatments */}
                <button 
                  onClick={onAddTreatment}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">💊</div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">Treatments</h4>
                  <p className="text-gray-600 font-light text-sm mb-4">
                    Log flea/tick, deworming, medications
                  </p>
                  <div className="text-blue-600 font-medium text-sm">
                    Add Treatment →
                  </div>
                </button>

                {/* Examinations */}
                <button 
                  onClick={onAddExam}
                  className="bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🏥</div>
                  <h4 className="text-xl font-medium text-gray-900 mb-2">Health Exam</h4>
                  <p className="text-gray-600 font-light text-sm mb-4">
                    Record checkups and vet visits
                  </p>
                  <div className="text-blue-600 font-medium text-sm">
                    Add Exam →
                  </div>
                </button>
                
              </div>
              
              {/* Quick Onboard Banner */}
              <div className="bg-blue-50 rounded-2xl p-6 mt-8">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Already have vaccination records?</h4>
                    <p className="text-sm text-gray-600 font-light mb-3">
                      No need to enter complete history! Just add your pet's most recent vaccinations and we'll track from here.
                    </p>
                    <p className="text-sm text-gray-600 font-light">
                      💡 You can upload certificate photos for easy reference when adding vaccines.
                    </p>
                  </div>
                </div>
              </div>
              
            </div>
          </>
        ) : (
          <>
            {/* Health Status Card */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-2xl font-light text-gray-900">Health Status: Up to Date</h2>
              </div>
              <p className="text-gray-600 font-light">
                Next Due: Rabies Booster on December 15, 2025 (62 days)
              </p>
            </div>

            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              
              <div 
                onClick={onViewVaccinationList}
                className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">💉</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Vaccinations</h3>
                <p className="text-gray-600 font-light mb-4">
                  ✓ {vaccinations.length} vaccine{vaccinations.length !== 1 ? 's' : ''} on record<br/>
                  ⚠️ Rabies due in 2 months
                </p>
                <button className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200">
                  View All →
                </button>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="text-4xl mb-4">💊</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Treatments</h3>
                <p className="text-gray-600 font-light mb-4">
                  ✓ 0 treatments recorded<br/>
                  ✓ All up to date
                </p>
                <button className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200">
                  View All →
                </button>
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Examinations</h3>
                <p className="text-gray-600 font-light mb-4">
                  ✓ Last: June 15, 2024<br/>
                  ℹ️ Next due in 4 months
                </p>
                <button className="text-gray-900 font-medium hover:text-gray-600 transition-colors duration-200">
                  View All →
                </button>
              </div>
              
            </div>

            {/* Quick Actions */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
              <h3 className="text-2xl font-light text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                
                <button 
                  onClick={onAddVaccination}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Add Vaccination
                </button>
                
                <button 
                  onClick={onAddTreatment}
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Add Treatment
                </button>
                
                <button 
                  onClick={onAddExam}
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                  Schedule Exam
                </button>
                
                <button 
                  onClick={onViewFullHistory}
                  className="flex items-center justify-center gap-3 px-6 py-4 border border-gray-300 text-gray-700 rounded-xl font-light hover:bg-gray-50 transition-all duration-300"
                >
                  <FileText className="w-5 h-5" />
                  View Timeline
                </button>
                
              </div>
            </div>

            {/* Recent Timeline Preview */}
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-light text-gray-900">Recent Activity</h3>
                {onViewFullHistory && (
                  <button 
                    onClick={onViewFullHistory}
                    className="text-gray-600 font-light hover:text-gray-900 transition-colors duration-200"
                  >
                    View Full History →
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                
                <div className="flex gap-4 pb-4 border-b border-gray-200">
                  <div className="text-2xl">💊</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Flea/Tick Treatment</p>
                    <p className="text-sm text-gray-500 font-light">October 15, 2024</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pb-4 border-b border-gray-200">
                  <div className="text-2xl">💉</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Bordetella Vaccine</p>
                    <p className="text-sm text-gray-500 font-light">September 10, 2024</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="text-2xl">🏥</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Annual Checkup</p>
                    <p className="text-sm text-gray-500 font-light">June 15, 2024</p>
                  </div>
                </div>
                
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};

export default MedicalDashboard;

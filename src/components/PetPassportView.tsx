import { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Building2,
  Stethoscope,
  Plus,
  Share2,
  Edit3
} from 'lucide-react';
import { PetFormData, UserFormData, Category } from '@/types/pet';

interface PetPassportViewProps {
  petData: PetFormData;
  userData: UserFormData | null;
  user?: { full_name?: string; email?: string; phone?: string } | null;
  category: Category;
  onBack: () => void;
  onAddMedicalRecords?: () => void;
  onAddAnother?: () => void;
  onEditProfile?: () => void;
}

const PetPassportView = ({ 
  petData, 
  userData, 
  user,
  category,
  onBack,
  onAddMedicalRecords,
  onAddAnother,
  onEditProfile
}: PetPassportViewProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'medical' | 'documents'>('profile');

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

  const formattedDate = new Date(petData.dateOfBirth).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const calculatedAge = calculateAge(petData.dateOfBirth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-purple-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-light text-gray-900">Pet Passport</h1>
        </div>

        {/* Main Passport Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden">
          
          {/* Pet Header */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 md:p-12 text-center">
            <img 
              src={petData.profilePhotoPreview}
              alt={petData.name}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border-4 border-white shadow-lg"
            />
            <h2 className="text-4xl font-light text-gray-900 mb-2">{petData.name}</h2>
            <p className="text-xl text-gray-600 font-light mb-1">
              {category.name.slice(0, -1)} • {calculatedAge} old
            </p>
            <p className="text-gray-500 font-light">
              {petData.gender.charAt(0).toUpperCase() + petData.gender.slice(1)} • {petData.weight} {petData.weightUnit}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 px-8 bg-white/40">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === 'profile'
                  ? 'text-gray-900 font-medium border-gray-900'
                  : 'text-gray-500 font-light border-transparent hover:text-gray-700'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === 'medical'
                  ? 'text-gray-900 font-medium border-gray-900'
                  : 'text-gray-500 font-light border-transparent hover:text-gray-700'
              }`}
            >
              Medical Records
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-6 py-4 transition-all duration-200 border-b-2 ${
                activeTab === 'documents'
                  ? 'text-gray-900 font-medium border-gray-900'
                  : 'text-gray-500 font-light border-transparent hover:text-gray-700'
              }`}
            >
              Documents
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8 md:p-12">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                
                {/* Pet Information Section */}
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Pet Information
                  </h3>
                  <div className="space-y-4">
                    
                    <div className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Name</div>
                        <div className="text-gray-900 font-medium">{petData.name}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Species & Breed</div>
                        <div className="text-gray-900 font-medium">{category.name.slice(0, -1)} • {petData.breed}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Date of Birth</div>
                        <div className="text-gray-900 font-medium">
                          {formattedDate}
                          <span className="text-gray-500 font-light ml-2">
                            ({calculatedAge} old)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Gender & Weight</div>
                        <div className="text-gray-900 font-medium">
                          {petData.gender.charAt(0).toUpperCase() + petData.gender.slice(1)} • {petData.weight} {petData.weightUnit}
                        </div>
                      </div>
                    </div>
                    
                    {petData.colorMarkings && (
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 font-light">Color & Markings</div>
                          <div className="text-gray-900 font-medium">{petData.colorMarkings}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Microchip Number</div>
                        <div className="text-gray-900 font-medium font-mono text-sm">
                          {petData.microchipNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner Information Section */}
                <div>
                  <h3 className="text-xl font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    Owner Information
                  </h3>
                  <div className="space-y-4">
                    
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Name</div>
                        <div className="text-gray-900 font-medium">{user?.full_name || userData?.fullName || '—'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Email</div>
                        <div className="text-gray-900 font-medium">{user?.email || userData?.email || '—'}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-500 font-light">Phone</div>
                        <div className="text-gray-900 font-light">{user?.phone || userData?.phone || '—'}</div>
                      </div>
                    </div>

                    {onEditProfile && (
                      <button
                        onClick={onEditProfile}
                        className="mt-4 px-6 py-3 rounded-xl border border-gray-300 font-light hover:bg-gray-50 transition-all duration-200"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                {/* Veterinary Information */}
                {petData.vetClinic && (
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-4 pb-2 border-b border-gray-200">
                      Primary Veterinarian
                    </h3>
                    <div className="space-y-4">
                      
                      <div className="flex items-start gap-3">
                        <Building2 className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-sm text-gray-500 font-light">Clinic</div>
                          <div className="text-gray-900 font-medium">{petData.vetClinic}</div>
                        </div>
                      </div>
                      
                      {petData.vetPhone && (
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 font-light">Phone</div>
                            <div className="text-gray-900 font-medium">{petData.vetPhone}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Medical Records Tab */}
            {activeTab === 'medical' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="text-center py-12">
                  
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="w-10 h-10 text-blue-600" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-3">
                    Keep {petData.name} healthy and organized
                  </h3>
                  
                  <p className="text-gray-600 font-light mb-8 max-w-md mx-auto">
                    Track vaccinations, treatments, and health exams all in one place. 
                    Get automatic reminders so you never miss an important date.
                  </p>
                  
                  <button 
                    onClick={onAddMedicalRecords}
                    className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Medical Records
                  </button>
                  
                  <div className="mt-4">
                    <button className="text-gray-600 hover:text-gray-900 font-light text-sm transition-colors duration-200">
                      I'll do this later
                    </button>
                  </div>
                  
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                <div className="text-center py-12">
                  
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-purple-600" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 mb-3">
                    All documents in one place
                  </h3>
                  
                  <p className="text-gray-600 font-light mb-8 max-w-md mx-auto">
                    Upload vaccination certificates, medical reports, and other important 
                    documents for {petData.name}.
                  </p>
                  
                  <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Upload Documents
                  </button>
                  
                  <div className="mt-4">
                    <button className="text-gray-600 hover:text-gray-900 font-light text-sm transition-colors duration-200">
                      I'll do this later
                    </button>
                  </div>
                  
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-1 gap-4">
          
          <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white/60 backdrop-blur-md border border-gray-200 text-gray-700 rounded-2xl font-light hover:bg-white hover:shadow-lg transition-all duration-300">
            <Share2 className="w-5 h-5" />
            Share Passport
          </button>
          
        </div>

        {onAddAnother && (
          <button 
            onClick={onAddAnother}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-2xl font-medium hover:bg-gray-800 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Another Pet
          </button>
        )}

        {/* Next Steps Tips */}
        <div className="bg-blue-50 rounded-2xl p-6">
          <h4 className="font-medium text-gray-900 mb-3">💡 Next Steps</h4>
          <ul className="space-y-2 text-sm text-gray-700 font-light">
            <li>• Add vaccination records to track {petData.name}'s health</li>
            <li>• Upload medical documents for easy access</li>
            <li>• Set up reminders for upcoming vaccinations</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PetPassportView;

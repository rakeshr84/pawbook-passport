import { useState } from 'react';
import { 
  ChevronLeft, 
  Heart, 
  FileText, 
  Mail, 
  Phone, 
  Building2,
  Stethoscope,
  Plus,
  Share2,
  Edit3,
  Activity,
  Sparkles
} from 'lucide-react';
import { PetFormData, UserFormData, Category } from '@/types/pet';
import { HealthState } from '@/types/health';
import HealthTracking from '@/components/HealthTracking';
import { defaultAvatarFor, formatSpeciesBreed } from '@/lib/utils';
import { PetAvatar } from '@/components/PetAvatar';
import { Button } from '@/components/ui/button';

interface PetPassportViewProps {
  petData: PetFormData;
  userData: UserFormData | null;
  user?: { full_name?: string; email?: string; phone?: string } | null;
  category: Category;
  petId: string;
  health: HealthState;
  onBack: () => void;
  onAddMedicalRecords?: () => void;
  onAddDocuments?: () => void;
  onAddAnother?: () => void;
  onEditProfile?: () => void;
  onDeletePet?: () => void;
  onSaveWeight: (weight: number, unit: "kg" | "lbs", date: string) => void;
  onSaveFood: (amount: number, date: string, name?: string) => void;
  onSaveWater: (amount: number, date: string) => void;
  onSaveActivity: (duration: number, kind: "walk" | "play" | "training", date: string, distanceKm?: number) => void;
  onSaveMed: (name: string, taken: boolean, date: string, dose?: string) => void;
}

const PetPassportView = ({ 
  petData, 
  userData, 
  user,
  category,
  petId,
  health,
  onBack,
  onAddMedicalRecords,
  onAddDocuments,
  onAddAnother,
  onEditProfile,
  onDeletePet,
  onSaveWeight,
  onSaveFood,
  onSaveWater,
  onSaveActivity,
  onSaveMed
}: PetPassportViewProps) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'medical' | 'documents' | 'health'>('profile');

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
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 ios-transition"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-light text-foreground">Pet Passport</h1>
        </div>

        {/* Main Passport Card */}
        <div className="glass-effect rounded-3xl shadow-xl overflow-hidden">
          
          {/* Pet Header */}
          <div className="gradient-accent p-8 text-center relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <PetAvatar pet={petData} size={120} />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 gradient-accent rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-3xl font-light text-white mb-1">{petData.name}</h2>
              <p className="text-lg text-white/90 font-light mb-0.5">
                {formatSpeciesBreed(petData.category, petData.breed)} • {calculatedAge} old
              </p>
              <p className="text-white/80 font-light text-sm">
                {petData.gender.charAt(0).toUpperCase() + petData.gender.slice(1)} • {petData.weight} {petData.weightUnit}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-border px-4 bg-background/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-5 py-3 ios-transition border-b-2 text-sm ${
                activeTab === 'profile'
                  ? 'text-accent font-medium border-accent'
                  : 'text-muted-foreground font-light border-transparent hover:text-foreground'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('medical')}
              className={`px-5 py-3 ios-transition border-b-2 text-sm ${
                activeTab === 'medical'
                  ? 'text-accent font-medium border-accent'
                  : 'text-muted-foreground font-light border-transparent hover:text-foreground'
              }`}
            >
              Medical
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`px-5 py-3 ios-transition border-b-2 text-sm ${
                activeTab === 'documents'
                  ? 'text-accent font-medium border-accent'
                  : 'text-muted-foreground font-light border-transparent hover:text-foreground'
              }`}
            >
              Documents
            </button>
            <button
              onClick={() => setActiveTab('health')}
              className={`px-5 py-3 ios-transition border-b-2 text-sm whitespace-nowrap ${
                activeTab === 'health'
                  ? 'text-accent font-medium border-accent'
                  : 'text-muted-foreground font-light border-transparent hover:text-foreground'
              }`}
            >
              Health
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Pet Information Section */}
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Pet Information
                  </h3>
                  <div className="space-y-3">
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <Heart className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Name</div>
                          <div className="text-foreground font-medium">{petData.name}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Species & Breed</div>
                          <div className="text-foreground font-medium">{formatSpeciesBreed(petData.category, petData.breed)}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Date of Birth</div>
                          <div className="text-foreground font-medium">
                            {formattedDate}
                            <span className="text-muted-foreground font-light ml-2 text-sm">
                              ({calculatedAge} old)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Gender & Weight</div>
                          <div className="text-foreground font-medium">
                            {petData.gender.charAt(0).toUpperCase() + petData.gender.slice(1)} • {petData.weight} {petData.weightUnit}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {petData.colorMarkings && (
                      <div className="glass-effect rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground font-light">Color & Markings</div>
                            <div className="text-foreground font-medium">{petData.colorMarkings}</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Microchip Number</div>
                          <div className="text-foreground font-medium font-mono text-sm">
                            {petData.microchipNumber}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owner Information Section */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-accent" />
                    Owner Information
                  </h3>
                  <div className="space-y-3">
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Name</div>
                          <div className="text-foreground font-medium">{user?.full_name || userData?.fullName || 'Not added yet'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <Mail className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Email</div>
                          <div className="text-foreground font-medium">{user?.email || userData?.email || 'Not added yet'}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass-effect rounded-2xl p-4">
                      <div className="flex items-start gap-3">
                        <Phone className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground font-light">Phone</div>
                          <div className="text-foreground font-light">{user?.phone || userData?.phone || 'Not added yet'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      {onEditProfile && (
                        <Button
                          onClick={onEditProfile}
                          variant="outline"
                          size="sm"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit Profile
                        </Button>
                      )}

                      {onDeletePet && (
                        <Button
                          onClick={onDeletePet}
                          variant="destructive"
                          size="sm"
                        >
                          Delete Pet
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Veterinary Information */}
                {petData.vetClinic && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
                      <Stethoscope className="w-5 h-5 text-accent" />
                      Primary Veterinarian
                    </h3>
                    <div className="space-y-3">
                      
                      <div className="glass-effect rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <Building2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="text-xs text-muted-foreground font-light">Clinic</div>
                            <div className="text-foreground font-medium">{petData.vetClinic}</div>
                          </div>
                        </div>
                      </div>
                      
                      {petData.vetPhone && (
                        <div className="glass-effect rounded-2xl p-4">
                          <div className="flex items-start gap-3">
                            <Phone className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-xs text-muted-foreground font-light">Phone</div>
                              <div className="text-foreground font-medium">{petData.vetPhone}</div>
                            </div>
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
              <div className="space-y-6 animate-fade-in">
                <div className="text-center py-10">
                  
                  <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-glow-pulse">
                    <Stethoscope className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-foreground mb-2">
                    Keep {petData.name} healthy and organized
                  </h3>
                  
                  <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
                    Track vaccinations, treatments, and health exams all in one place 🐾
                  </p>
                  
                  <Button 
                    onClick={onAddMedicalRecords}
                    variant="gradient"
                    size="lg"
                    className="mb-3"
                  >
                    <Plus className="w-5 h-5" />
                    Add Medical Records
                  </Button>
                  
                  <div>
                    <button className="text-muted-foreground hover:text-foreground font-light text-sm ios-transition">
                      I'll do this later
                    </button>
                  </div>
                  
                </div>
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center py-10">
                  
                  <div className="w-20 h-20 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-glow-pulse">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-foreground mb-2">
                    Keep their records safe 🐾
                  </h3>
                  
                  <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
                    Upload vaccination certificates, medical reports, and other important 
                    documents for {petData.name}.
                  </p>
                  
                  <Button 
                    onClick={onAddDocuments}
                    variant="gradient"
                    size="lg"
                    className="mb-3"
                  >
                    <Plus className="w-5 h-5" />
                    Upload Documents
                  </Button>
                  
                  <div>
                    <button className="text-muted-foreground hover:text-foreground font-light text-sm ios-transition">
                      I'll do this later
                    </button>
                  </div>
                  
                </div>
              </div>
            )}

            {activeTab === 'health' && (
              <HealthTracking
                petId={petId}
                petName={petData.name}
                petBreed={petData.breed}
                petDateOfBirth={petData.dateOfBirth}
                health={health}
                onSaveWeight={onSaveWeight}
                onSaveFood={onSaveFood}
                onSaveWater={onSaveWater}
                onSaveActivity={onSaveActivity}
                onSaveMed={onSaveMed}
              />
            )}

          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-1 gap-3">
          
          <Button
            variant="glass"
            className="w-full justify-center gap-3"
          >
            <Share2 className="w-5 h-5" />
            Share Passport
          </Button>
          
        </div>

        {onAddAnother && (
          <Button
            onClick={onAddAnother}
            variant="outline"
            className="w-full justify-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Add Another Pet
          </Button>
        )}

        {/* Tips */}
        <div className="glass-effect rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            Next Steps
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground font-light">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Add vaccination records to never miss an important date</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Upload medical documents for easy access when needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              <span>Share passport with your vet for faster checkups</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PetPassportView;

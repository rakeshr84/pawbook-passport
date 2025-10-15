import { useState } from 'react';
import { ChevronLeft, Plus, Stethoscope, Lightbulb, FileText, Sparkles } from 'lucide-react';
import { PetFormData } from '@/types/pet';
import { VaccinationRecord } from '@/types/medical';
import { PetAvatar } from '@/components/PetAvatar';
import { formatSpeciesBreed } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MedicalDashboardProps {
  pet: any;
  onBack: () => void;
  onAddVaccination: () => void;
  onAddTreatment: () => void;
  onAddExam: () => void;
  onViewFullHistory: () => void;
  onViewVaccinationList: () => void;
  onViewTreatmentList: () => void;
  onViewExamList: () => void;
  onViewDocuments?: () => void;
  vaccinations: VaccinationRecord[];
  treatments: any[];
  examinations: any[];
}

const MedicalDashboard = ({ 
  pet, 
  onBack, 
  onAddVaccination,
  onAddTreatment,
  onAddExam,
  onViewFullHistory,
  onViewVaccinationList,
  onViewTreatmentList,
  onViewExamList,
  onViewDocuments,
  vaccinations,
  treatments,
  examinations,
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

  const hasRecords = vaccinations.length > 0 || treatments.length > 0 || examinations.length > 0;

  return (
    <div className="min-h-screen gradient-bg py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={onBack}
            className="p-2 rounded-full hover:bg-white/20 ios-transition"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
          <PetAvatar pet={pet} size={64} />
          <div className="flex-1">
            <h1 className="text-3xl font-light text-foreground">{pet.name}'s Health</h1>
            <p className="text-muted-foreground font-light mt-0.5 text-sm">
              {formatSpeciesBreed(pet.species || pet.category, pet.breed)} • {pet.ageLabel || calculateAge(pet.dateOfBirth)}
            </p>
          </div>
        </div>

        {!hasRecords ? (
          <>
            {/* Empty State Message */}
            <div className="text-center py-10">
              <div className="w-24 h-24 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-glow-pulse">
                <Stethoscope className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-light text-foreground mb-2">
                Start tracking {pet.name}'s health
              </h2>
              <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
                Keep all vaccination records, treatments, and health exams organized in one place 🐾
              </p>
            </div>

            {/* Get Started Card */}
            <div className="glass-effect rounded-3xl p-8 shadow-lg">
              <h3 className="text-xl font-light text-foreground mb-6 text-center">What would you like to add first?</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                
                {/* Vaccinations */}
                <button 
                  onClick={onAddVaccination}
                  className="glass-effect rounded-2xl p-6 shadow hover:shadow-lg ios-transition text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 ios-transition">💉</div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Vaccinations</h4>
                  <p className="text-muted-foreground font-light text-sm mb-3">
                    Track vaccine records and get reminders
                  </p>
                  <div className="text-accent font-medium text-sm">
                    Add Vaccine →
                  </div>
                </button>

                {/* Treatments */}
                <button 
              onClick={onAddTreatment}
                  className="glass-effect rounded-2xl p-6 shadow hover:shadow-lg ios-transition text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 ios-transition">💊</div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Treatments</h4>
                  <p className="text-muted-foreground font-light text-sm mb-3">
                    Log flea/tick, deworming, medications
                  </p>
                  <div className="text-accent font-medium text-sm">
                    Add Treatment →
                  </div>
                </button>

                {/* Examinations */}
                <button 
              onClick={onAddExam}
                  className="glass-effect rounded-2xl p-6 shadow hover:shadow-lg ios-transition text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 ios-transition">🏥</div>
                  <h4 className="text-lg font-medium text-foreground mb-2">Health Exam</h4>
                  <p className="text-muted-foreground font-light text-sm mb-3">
                    Record checkups and vet visits
                  </p>
                  <div className="text-accent font-medium text-sm">
                    Add Exam →
                  </div>
                </button>
                
              </div>
              
              {/* Quick Onboard Banner */}
              <div className="glass-effect rounded-2xl p-5 mt-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Already have vaccination records?</h4>
                    <p className="text-sm text-muted-foreground font-light mb-2">
                      No need to enter complete history! Just add your pet's most recent vaccinations and we'll track from here.
                    </p>
                    <p className="text-sm text-muted-foreground font-light">
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
            {vaccinations.length > 0 && (
              <div className="glass-effect rounded-3xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-glow-pulse"></div>
                  <h2 className="text-xl font-light text-foreground">Health Records</h2>
                </div>
                <p className="text-muted-foreground font-light">
                  {vaccinations.length} vaccination{vaccinations.length !== 1 ? 's' : ''} on record
                </p>
              </div>
            )}

            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              
              <div 
                onClick={onViewVaccinationList}
                className="glass-effect rounded-2xl p-5 shadow hover:shadow-lg ios-transition cursor-pointer"
              >
                <div className="text-4xl mb-3">💉</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Vaccinations</h3>
                <p className="text-muted-foreground font-light mb-3 text-sm">
                  ✓ {vaccinations.length} vaccine{vaccinations.length !== 1 ? 's' : ''} on record
                </p>
                <button className="text-accent font-medium hover:text-accent/80 ios-transition text-sm">
                  View All →
                </button>
              </div>

              <div 
                onClick={onViewTreatmentList}
                className="glass-effect rounded-2xl p-5 shadow hover:shadow-lg ios-transition cursor-pointer"
              >
                <div className="text-4xl mb-3">💊</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Treatments</h3>
                <p className="text-muted-foreground font-light mb-3 text-sm">
                  {treatments.length > 0 ? `✓ ${treatments.length} treatment${treatments.length !== 1 ? 's' : ''} on record` : 'Not added yet — want to?'}
                </p>
                <button className="text-accent font-medium hover:text-accent/80 ios-transition text-sm">
                  View All →
                </button>
              </div>

              <div 
                onClick={onViewExamList}
                className="glass-effect rounded-2xl p-5 shadow hover:shadow-lg ios-transition cursor-pointer"
              >
                <div className="text-4xl mb-3">🏥</div>
                <h3 className="text-lg font-medium text-foreground mb-2">Health Exams</h3>
                <p className="text-muted-foreground font-light mb-3 text-sm">
                  {examinations.length > 0 ? `✓ ${examinations.length} exam${examinations.length !== 1 ? 's' : ''} on record` : 'Not added yet — want to?'}
                </p>
                <button className="text-accent font-medium hover:text-accent/80 ios-transition text-sm">
                  View All →
                </button>
              </div>
              
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-light text-foreground mb-4">Quick Actions</h3>
              <div className="grid md:grid-cols-2 gap-3">
                
                <Button 
                  onClick={onAddVaccination}
                  variant="gradient"
                >
                  <Plus className="w-5 h-5" />
                  Add Vaccination
                </Button>
                
                <Button 
                  onClick={onAddTreatment}
                  variant="outline"
                >
                  <Plus className="w-5 h-5" />
                  Add Treatment
                </Button>
                
                <Button 
                  onClick={onAddExam}
                  variant="outline"
                >
                  <Plus className="w-5 h-5" />
                  Schedule Exam
                </Button>
                
                {onViewDocuments && (
                  <Button 
                    onClick={onViewDocuments}
                    variant="outline"
                  >
                    <FileText className="w-5 h-5" />
                    View Documents
                  </Button>
                )}
                
                <Button 
                  onClick={onViewFullHistory}
                  variant="outline"
                  className="md:col-span-2"
                >
                  <FileText className="w-5 h-5" />
                  View Timeline
                </Button>
                
              </div>
            </div>

            {/* Recent Timeline Preview */}
            {vaccinations.length > 0 && (
              <div className="glass-effect rounded-3xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-light text-foreground">Recent Activity</h3>
                  {onViewFullHistory && (
                    <button 
                      onClick={onViewFullHistory}
                      className="text-muted-foreground font-light hover:text-foreground ios-transition text-sm"
                    >
                      View Full History →
                    </button>
                  )}
                </div>
                
                <div className="space-y-3">
                  {vaccinations.slice(0, 3).map((vaccination, index) => (
                    <div key={vaccination.id} className={`flex gap-4 ${index < 2 ? 'pb-3 border-b border-border' : ''}`}>
                      <div className="text-2xl">💉</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{vaccination.vaccine_name}</p>
                        <p className="text-sm text-muted-foreground font-light">
                          {new Date(vaccination.vaccination_date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}


      </div>
    </div>
  );
};

export default MedicalDashboard;
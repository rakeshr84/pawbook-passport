import { Heart, Syringe, Pill, Activity, ChevronRight } from 'lucide-react';
import { PetCardData } from '@/components/Dashboard';

interface HealthTabProps {
  pet?: PetCardData;
  vaccinationCount?: number;
  treatmentCount?: number;
  onOpenVaccinations: () => void;
  onOpenTreatments: () => void;
  onOpenTracking: () => void;
  nextVaccineDue?: string;
  nextTreatmentDue?: string;
}

const HealthTab = ({
  pet,
  vaccinationCount = 0,
  treatmentCount = 0,
  onOpenVaccinations,
  onOpenTreatments,
  onOpenTracking,
  nextVaccineDue,
  nextTreatmentDue,
}: HealthTabProps) => {
  return (
    <div className="min-h-screen gradient-bg pb-24 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-light text-foreground mb-2 flex items-center gap-2">
            <Heart className="w-8 h-8 text-accent" />
            Health Overview
          </h1>
          {pet && (
            <p className="text-muted-foreground font-light">
              Managing {pet.name}'s health records
            </p>
          )}
        </div>

        {/* Health Sections */}
        <div className="space-y-4 animate-fade-in">
          
          {/* Vaccinations Card */}
          <button
            onClick={onOpenVaccinations}
            className="w-full glass-effect rounded-3xl p-6 shadow-lg hover:shadow-xl active:scale-[0.98] ios-transition text-left group button-glow-tap"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center text-2xl shadow-lg">
                  💉
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1 group-hover:text-accent ios-transition">
                    Vaccinations
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    {vaccinationCount === 0 
                      ? 'No vaccinations added yet' 
                      : `${vaccinationCount} ${vaccinationCount === 1 ? 'record' : 'records'}`}
                    {nextVaccineDue && ` · Next due ${nextVaccineDue}`}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 ios-transition opacity-60 group-hover:opacity-100" />
            </div>
          </button>

          {/* Treatments Card */}
          <button
            onClick={onOpenTreatments}
            className="w-full glass-effect rounded-3xl p-6 shadow-lg hover:shadow-xl active:scale-[0.98] ios-transition text-left group button-glow-tap"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center text-2xl shadow-lg">
                  💊
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1 group-hover:text-accent ios-transition">
                    Treatments
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    {treatmentCount === 0 
                      ? 'No treatments added yet' 
                      : `${treatmentCount} ${treatmentCount === 1 ? 'record' : 'records'}`}
                    {nextTreatmentDue && ` · Next due ${nextTreatmentDue}`}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 ios-transition opacity-60 group-hover:opacity-100" />
            </div>
          </button>

          {/* Health Tracking Card */}
          <button
            onClick={onOpenTracking}
            className="w-full glass-effect rounded-3xl p-6 shadow-lg hover:shadow-xl active:scale-[0.98] ios-transition text-left group button-glow-tap"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center text-2xl shadow-lg">
                  📈
                </div>
                <div>
                  <h3 className="text-xl font-medium text-foreground mb-1 group-hover:text-accent ios-transition">
                    Health Tracking
                  </h3>
                  <p className="text-sm text-muted-foreground font-light">
                    Monitor weight, food, water & activity
                  </p>
                </div>
              </div>
              <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 ios-transition opacity-60 group-hover:opacity-100" />
            </div>
          </button>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 glass-effect rounded-3xl p-6 shadow-lg animate-fade-in">
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            Health Tips
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <p className="text-muted-foreground font-light">
                Keep vaccination records up to date for travel and boarding
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <p className="text-muted-foreground font-light">
                Track weight regularly to catch health changes early
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-accent">•</span>
              <p className="text-muted-foreground font-light">
                Set reminders for monthly flea & tick prevention
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTab;
